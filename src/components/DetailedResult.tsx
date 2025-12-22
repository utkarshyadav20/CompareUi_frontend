import { useState, useEffect } from "react";
import apiClient from "../api/client";
import {
  ChevronLeft,
  Bell,
  ChevronDown,
  Check,
  X as XIcon,
  Download,
  AlertTriangle,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { ProjectHeader } from "./ProjectHeader";
import { Theme } from "../types";
import { useDiffProcessor } from "../hooks/useDiffProcessor";

interface Issue {
  id: string;
  severity: "Major" | "Medium" | "Low";
  title: string;
  description: string;
  coordinates: string;
}

interface DetailedResultProps {
  testId: string;
  testName: string;
  projectId: string;
  platformType: string;
  onBack: () => void;
  buildVersion: string;
  buildVersions?: any[]; // Added optional prop
  onBuildChange?: (build: any) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  isNotificationOpen: boolean;
  onNotificationToggle: () => void;
  isProfileMenuOpen: boolean;
  onProfileMenuToggle: () => void;
}

export function DetailedResult({
  testId,
  testName,
  projectId,
  platformType,
  onBack,
  buildVersion = "v12.224",
  buildVersions = [],
  onBuildChange,
  theme,
  onThemeChange,
  isNotificationOpen,
  onNotificationToggle,
  isProfileMenuOpen,
  onProfileMenuToggle,
}: DetailedResultProps) {
  const [activeTab, setActiveTab] = useState<
    "baseline" | "live" | "difference"
  >("baseline");
  const [isDownloading, setIsDownloading] = useState(false);
  const [finalVerdict, setFinalVerdict] = useState<"approve" | "reject" | null>(
    null
  );

  console.log("DetailedResult mounted with testId:", testId);

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Assume buildVersion passed is the ID, if it's strictly a version string we might need ID.
        // But in previous steps we saw buildId being passed around as selectedBuild.
        const res = await apiClient.get('/result/details', {
          params: {
            projectId,
            buildId: buildVersion,
            screenName: testName, // testName is mapped to screenName/imageName
            projectType: platformType
          }
        });
        setResultData(res.data);
      } catch (err) {
        console.error("Failed to fetch detailed result:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId && buildVersion && testName) {
      fetchDetails();
    }
  }, [projectId, buildVersion, testName, platformType]);


  // Build Dropdown State
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);

  const testStatus = resultData?.resultStatus === 0 ? "FAILED" : "PASSED";
  const differentPercentage = resultData?.diffPercent ?? 0;

  const baselineImageUrl = resultData?.baselineImageUrl || "https://placehold.co/800x450?text=No+Baseline";
  const liveImageUrl = resultData?.actualImageUrl || "https://placehold.co/800x450?text=No+Actual";
  const differenceImageUrl = resultData?.diffImageUrl || "https://placehold.co/800x450?text=No+Diff";

  // Use Custom Hook for Diff Processing
  const { boxes, counts, isProcessing, dimensions } = useDiffProcessor(differenceImageUrl);

  const detectedIssues = boxes.length;
  const severityCounts = counts;

  // Convert boxes to Issues for the list
  const issues: Issue[] = boxes.map((box, index) => ({
    id: box.id,
    severity: box.severity,
    title: `${box.severity} difference detected`,
    description: `Density: ${(box.density * 100).toFixed(1)}%`,
    coordinates: `x: ${Math.round(box.x)}, y: ${Math.round(box.y)} • ${Math.round(box.width)}×${Math.round(box.height)}`
  }));

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("PDF report downloaded.");
    setIsDownloading(false);
  };

  const handleRaiseIssue = () => {
    alert("Raise Issue clicked.");
  };

  const handleApprove = () => {
    setFinalVerdict("approve");
  };

  const handleReject = () => {
    setFinalVerdict("reject");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <ProjectHeader
        title="Detailed Result"
        onBack={onBack}
        theme={theme}
        onThemeChange={onThemeChange}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={onNotificationToggle}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={onProfileMenuToggle}
        hideNavigation={true}
      />
      {/* Screen Info Bar */}
      <div className="w-full border-b border-zinc-800 bg-zinc-900 relative">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Screen Name */}
          <div>
            <p className="font-mono text-zinc-400 text-xs mb-1">ScreenName</p>
            <p className="font-mono text-zinc-100 text-xl font-bold">{testName}</p>
          </div>

          {/* Center: Status */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-3">
            <span className="font-mono text-zinc-400 text-sm">Status</span>
            <div className={`border px-2.5 py-1 rounded flex items-center gap-2 ${testStatus === "FAILED" ? "bg-red-950/30 border-red-900/50" : "bg-green-950/30 border-green-900/50"}`}>
              <div className={`w-2 h-2 rounded-full ${testStatus === "FAILED" ? "bg-red-500" : "bg-green-500"}`}></div>
              <span className={`font-mono text-xs font-bold ${testStatus === "FAILED" ? "text-red-400" : "text-green-400"}`}>
                {loading ? "LOADING..." : testStatus}
              </span>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-4">
            {/* Build version dropdown */}
            <div className="flex items-center gap-3">
              <p className="font-mono text-zinc-400 text-sm">
                Build
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsBuildDropdownOpen(!isBuildDropdownOpen)}
                  className="h-[41px] border border-[rgba(107,223,149,0.3)] rounded-[4px] flex items-center gap-[10px] px-[10px] hover:bg-white/5 transition-colors"
                >
                  <p className="font-mono text-[14px] text-[#6bdf95]">
                    {(() => {
                      if (!buildVersion) return 'Select Build';
                      // buildVersion is typically a string ID here based on usage in AndroidTVDetailFigma
                      const found = buildVersions.find(v => (typeof v === 'string' ? v === buildVersion : v.buildId === buildVersion));
                      if (found && typeof found !== 'string') return found.buildName || found.buildId;
                      return buildVersion;
                    })()}
                  </p>
                  <ChevronDown className="w-[14px] h-[14px] text-[#6bdf95]" />
                </button>
                {isBuildDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[40]"
                      onClick={() => setIsBuildDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-[45px] w-[130px] bg-[#1e1e1e] rounded-[8px] shadow-2xl z-[50] border border-white/20 overflow-hidden">
                      {buildVersions.map((version) => {
                        const buildId = typeof version === 'string' ? version : version.buildId;
                        const buildName = typeof version === 'string' ? version : (version.buildName || `Build ${version.buildId}`);
                        const isSelected = buildVersion === buildId;

                        return (
                          <button
                            key={buildId}
                            onClick={() => {
                              if (onBuildChange) {
                                onBuildChange(version);
                              }
                              setIsBuildDropdownOpen(false);
                            }}
                            className={`w-full px-[16px] py-[12px] hover:bg-white/10 transition-colors text-left ${isSelected
                              ? "bg-white/5"
                              : ""
                              }`}
                          >
                            <span className="text-white text-[14px] font-mono">
                              {buildName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-3 py-2 rounded bg-white text-black border border-white text-sm font-mono font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleRaiseIssue}
              className="px-3 py-2 rounded bg-white text-black border border-white text-sm font-mono font-bold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Image Viewer */}
        <div className="w-[65%] bg-[#050505] p-[20px] flex flex-col border-r border-white/10">
          {/* Controls Row */}
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex items-center bg-[#1A1A1A] p-1 rounded-[6px] border border-white/5">
              {[
                { id: "baseline", label: "Baseline Image" },
                { id: "live", label: "Live Image" },
                { id: "difference", label: "Image Difference" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-[4px] text-[13px] font-medium transition-all ${activeTab === tab.id
                    ? "bg-[#2A2A2A] text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Legend for Difference Highlighting */}
            {activeTab === 'live' && boxes.length > 0 && (
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-1.5 px-3 rounded-[6px] border border-white/5 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500/50 border border-red-500 rounded-[1px]"></div>Major</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-yellow-500/50 border border-yellow-500 rounded-[1px]"></div>Medium</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-green-500/50 border border-green-500 rounded-[1px]"></div>Low</div>
              </div>
            )}
          </div>

          {/* Image Frame */}
          <div className="flex-1 bg-[#111] rounded-[8px] border border-white/10 p-4 flex items-center justify-center overflow-hidden relative group">
            <div className="relative w-full h-full flex items-center justify-center">
              {activeTab === "baseline" && (
                <img
                  src={baselineImageUrl}
                  alt="Baseline"
                  className="max-w-full max-h-full object-contain rounded-[4px] shadow-2xl"
                />
              )}
              {activeTab === "live" && (
                <div className="relative max-w-full max-h-full flex items-center justify-center">
                  <img
                    src={liveImageUrl}
                    alt="Live"
                    className="max-w-full max-h-full object-contain rounded-[4px] shadow-2xl block"
                  />
                  {/* SVG Overlay for Boxes */}
                  {dimensions && (
                    <svg
                      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                      preserveAspectRatio="xMidYMid meet"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ zIndex: 10 }}
                    >
                      {boxes.map((box) => {
                        let strokeColor = 'rgb(21, 93, 252)'; // Low (Greenish-Blue default)
                        let fillColor = 'rgba(21, 93, 252, 0.2)';

                        if (box.severity === 'Major') {
                          strokeColor = 'rgb(255, 100, 103)';
                          fillColor = 'rgba(255, 0, 0, 0.2)';
                        } else if (box.severity === 'Medium') {
                          strokeColor = 'rgb(253, 199, 0)';
                          fillColor = 'rgba(255, 200, 0, 0.2)';
                        }

                        return (
                          <rect
                            key={box.id}
                            x={box.x}
                            y={box.y}
                            width={box.width}
                            height={box.height}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={dimensions.width < 1000 ? 1 : 2} // Adaptive stroke
                            rx={4}
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>
              )}
              {activeTab === "difference" && (
                <img
                  src={differenceImageUrl}
                  alt="Difference"
                  className="max-w-full max-h-full object-contain rounded-[4px] shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Stats & Issues */}
        {/* RIGHT PANEL */}
        <div className="w-[35%] bg-gradient-to-b from-black to-[#050505] flex flex-col border-l border-white/10 ">
          {/* STATS */}
          <div className="p-6 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wide" style={{ fontWeight: 600 }}>
                  Different Percentage
                </p>
                <p
                  className="text-white tracking-tight drop-shadow-lg"
                  style={{ fontSize: 'xx-large', fontWeight: 800 }}
                >
                  {differentPercentage}%
                </p>

                <p className="text-zinc-500 mt-6 text-sm font-medium mb-1 uppercase tracking-wide">Detected Issues</p>
                <p
                  className="text-white tracking-tight"
                  style={{ fontSize: 'xx-large', fontWeight: 800 }}
                >
                  {detectedIssues}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-sm mb-3">Final Verdict</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    className={`px-4 py-2 rounded-md border flex gap-2 items-center transition-all ${finalVerdict === "approve"
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "border-white/20 text-white/70 hover:border-white hover:text-white"
                      }`}
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className={`px-4 py-2 rounded-md border flex gap-2 items-center transition-all ${finalVerdict === "reject"
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "border-white/20 text-white/70 hover:border-white hover:text-white"
                      }`}
                  >
                    <XIcon size={16} /> Reject
                  </button>
                </div>

                <div className="mt-6 bg-black/60 border border-white/10 rounded-md p-3 flex gap-2">
                  <AlertTriangle className="text-yellow-500 shrink-0" size={16} />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    This action is final. Once submitted, the verdict cannot be
                    changed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ISSUES */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Issue Overview</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {isProcessing ? "Analyzing differences..." : "Issues detected automatically based on visual differences."}
            </p>

            {/* SEVERITY CARDS */}
            <div className="flex gap-[10px] mb-8 overflow-x-auto pb-2">
              <div className="bg-[rgba(255,0,0,0.1)] content-stretch flex flex-col gap-[10px] items-start min-w-[80px] p-[12px] relative rounded-[8px] shrink-0 w-[160px]">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[8px]"></div>
                <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[16px] w-full" style={{ color: 'rgb(255, 100, 103)' }}>Major</p>
                <div className="content-stretch flex items-end relative shrink-0 w-full">
                  <p className="font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap" style={{ color: 'red' }}>
                    {severityCounts.Major}
                  </p>
                </div>
              </div>

              <div className="bg-[rgba(119,119,0,0.1)] content-stretch flex flex-col gap-[10px] items-start min-w-[80px] p-[12px] relative rounded-[8px] shrink-0 w-[160px]">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[8px]"></div>
                <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[16px] w-full" style={{ color: 'rgb(253, 199, 0)' }}>Medium</p>
                <div className="content-stretch flex items-end relative shrink-0 w-full">
                  <p className="font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap" style={{ color: 'rgb(208, 135, 0)' }}>
                    {severityCounts.Medium}
                  </p>
                </div>
              </div>

              <div className="bg-[rgba(0,0,211,0.1)] content-stretch flex flex-col gap-[10px] items-start min-w-[80px] p-[12px] relative rounded-[8px] shrink-0 w-[160px]">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[8px]"></div>
                <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[16px] w-full" style={{ color: 'rgb(21, 93, 252)' }}>Low</p>
                <div className="content-stretch flex items-end relative shrink-0 w-full">
                  <p className="font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap" style={{ color: 'rgb(21, 93, 252)' }}>
                    {severityCounts.Low}
                  </p>
                </div>
              </div>
            </div>

            {/* ISSUE LIST */}
            <div className="flex flex-col gap-0 w-full" style={{ height: '50vh' }}>
              {issues.length === 0 && !isProcessing && (
                <p className="text-zinc-500 text-sm text-center py-4">No issues detected.</p>
              )}
              {issues.map((issue) => {
                const isMajor = issue.severity === "Major";
                const isMedium = issue.severity === "Medium";

                // Title Color
                const titleColor = isMajor
                  ? 'rgb(255, 100, 103)'
                  : isMedium
                    ? 'rgb(253, 199, 0)'
                    : 'rgb(21, 93, 252)';

                // Icon Color
                const iconColor = isMajor
                  ? 'rgb(255, 0, 0)'
                  : isMedium
                    ? 'rgb(253, 199, 0)'
                    : 'rgb(21, 93, 252)';

                return (
                  <div key={issue.id} className="content-stretch flex items-center justify-center px-[14px] py-[10px] relative w-full border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[8px] items-center not-italic px-0 py-[2px] relative shrink-0 text-nowrap">
                        {isMajor ? (
                          <AlertCircle size={12} style={{ color: iconColor }} />
                        ) : (
                          <AlertTriangle size={12} style={{ color: iconColor }} />
                        )}
                        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[16px]">
                          <p className="leading-[normal] text-nowrap" style={{ color: titleColor }}>{issue.severity}</p>
                        </div>
                      </div>
                      <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
                        <div className="relative shrink-0">
                          <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap font-mono" style={{ color: titleColor }}>
                            {issue.title}
                          </p>
                        </div>
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="relative shrink-0">
                            <p className="leading-[24px] not-italic relative shrink-0 text-[16px] text-[#52525c] text-nowrap font-mono">
                              {issue.coordinates}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
