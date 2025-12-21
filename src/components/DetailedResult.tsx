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
  Plus,
  Minus,
} from "lucide-react";
import { ProjectHeader } from "./ProjectHeader";
import { Theme } from "../types";

const imgFrame21 =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop";

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
  const [selectedBuild, setSelectedBuild] = useState(buildVersion);

  const buildVersions = ["v12.224", "v12.223", "v12.222", "v12.221", "v12.220"];

  const onBuildChange = (version: string) => {
    setSelectedBuild(version);
  };

  // Mock data for the detailed result
  // Mock data fallbacks if not yet loaded
  const testStatus = resultData?.resultStatus === 0 ? "FAILED" : "PASSED"; // 0 is usually success? Wait, established incorrectly in mocked data above?
  // In ResultTab, 0 was FAIL (red). So 0 is FAIL.

  const differentPercentage = resultData?.diffPercent ?? 0;
  const detectedIssues = 0; // Backend doesn't return issues yet?

  const baselineImageUrl = resultData?.baselineImageUrl || "https://placehold.co/800x450?text=No+Baseline";
  const liveImageUrl = resultData?.actualImageUrl || "https://placehold.co/800x450?text=No+Actual";
  const differenceImageUrl = resultData?.diffImageUrl || "https://placehold.co/800x450?text=No+Diff";

  const issues: Issue[] = [
    {
      id: "1",
      severity: "Major",
      title: "Significant color mismatch detected",
      description: "Significant color mismatch detected",
      coordinates: "x: 0, y: 0 • 100×100",
    },
    {
      id: "2",
      severity: "Major",
      title: "Padding is not as per figma baseline image",
      description: "Padding is not as per figma baseline image",
      coordinates: "x: 10, y: 15 • 75×75",
    },
    {
      id: "3",
      severity: "Major",
      title: "Text is not matching",
      description: "Text is not matching",
      coordinates: "x: 20, y: 25 • 50×50",
    },
    {
      id: "4",
      severity: "Medium",
      title: "Color scheme applied incorrectly",
      description: "Color scheme applied incorrectly",
      coordinates: "x: 30, y: 35 • 150×150",
    },
    {
      id: "5",
      severity: "Major",
      title: "Color scheme applied incorrectly",
      description: "Color scheme applied incorrectly",
      coordinates: "x: 30, y: 35 • 150×150",
    },
  ];

  const severityCounts = {
    Major: 5,
    Medium: 1,
    Low: 0,
  };

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
      <div className="w-full border-b border-white/10 bg-[#0A0A0A]">
        <div className="flex items-center justify-between px-[32px] py-[12px]">
          <div>
            <p className="text-white/50 text-[12px] mb-[2px]">ScreenName :</p>
            <div className="flex items-center gap-8">
              <p className="text-white text-[20px] font-bold">{testName}</p>
              <div className="flex items-center gap-[12px]">
                <span className="text-white/50 text-[14px]">Status :</span>
                <div className={`border px-[10px] py-[3px] rounded-[4px] flex items-center gap-[6px] ${testStatus === "FAILED" ? "bg-[#450a0a] border-red-900/50" : "bg-green-900/20 border-green-900/50"}`}>
                  <div className={`w-2 h-2 rounded-full ${testStatus === "FAILED" ? "bg-red-600" : "bg-green-500"}`}></div>
                  <span className={`${testStatus === "FAILED" ? "text-red-500" : "text-green-500"} text-[12px] font-bold tracking-wide`}>
                    {loading ? "LOADING..." : testStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            {/* Build version dropdown */}
            <div className="flex items-center gap-[10px]">
              <p className="font-semibold text-[14px] text-black dark:text-white">
                Build :
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsBuildDropdownOpen(!isBuildDropdownOpen)}
                  className="px-[10px] py-[10px] rounded-[4px] border border-[#6bdf95]/30 text-[#6bdf95] text-[14px] font-mono flex items-center gap-[8px] hover:bg-[#6bdf95]/10 transition-colors"
                >
                  <span>{selectedBuild}</span>
                  <ChevronDown className="w-[14px] h-[14px]" />
                </button>
                {isBuildDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[40]"
                      onClick={() => setIsBuildDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-[45px] w-[130px] bg-white dark:bg-zinc-800 rounded-[8px] shadow-lg z-[50] border border-black/10 dark:border-white/10 overflow-hidden">
                      {buildVersions.map((version) => (
                        <button
                          key={version}
                          onClick={() => {
                            onBuildChange(version);
                            setIsBuildDropdownOpen(false);
                          }}
                          className={`w-full px-[16px] py-[12px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left ${version === selectedBuild
                            ? "bg-black/5 dark:bg-white/5"
                            : ""
                            }`}
                        >
                          <span className="text-black dark:text-white text-[14px] font-mono">
                            {version}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-[12px] py-[10px] rounded-[4px] bg-white text-black border border-white text-[14px] font-mono font-bold flex items-center gap-[8px] hover:bg-white/90 transition-colors disabled:opacity-50 shadow-sm"
            >
              <Download className="w-[14px] h-[14px]" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleRaiseIssue}
              className="px-[12px] py-[10px] rounded-[4px] bg-white text-black border border-white text-[14px] font-mono font-bold hover:bg-white/90 transition-colors shadow-sm"
            >
              Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Image Viewer */}
        <div className="flex-1 bg-[#050505] p-[20px] flex flex-col border-r border-white/10">
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

            {/* Zoom Controls */}
            <div className="flex items-center bg-[#1A1A1A] rounded-[6px] border border-white/10 p-[2px]">
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-white/5 text-white/70 rounded-[4px]">
                <Minus className="w-[14px] h-[14px]" />
              </button>
              <div className="w-[40px] text-center text-[12px] text-white font-mono">
                100%
              </div>
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-white/5 text-white/70 rounded-[4px]">
                <Plus className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>

          {/* Image Frame */}
          <div className="flex-1 bg-[#111] rounded-[8px] border border-white/10 p-4 flex items-center justify-center overflow-hidden relative group">
            <div className="relative shadow-2xl transition-transform duration-200">
              {activeTab === "baseline" && (
                <img
                  src={baselineImageUrl}
                  alt="Baseline"
                  className="max-w-full max-h-[70vh] rounded-[4px] object-contain"
                />
              )}
              {activeTab === "live" && (
                <img
                  src={liveImageUrl}
                  alt="Live"
                  className="max-w-full max-h-[70vh] rounded-[4px] object-contain"
                />
              )}
              {activeTab === "difference" && (
                <img
                  src={differenceImageUrl}
                  alt="Difference"
                  className="max-w-full max-h-[70vh] rounded-[4px] object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Stats & Issues */}
        <div className="w-[400px] bg-[#0A0A0A] flex flex-col border-l border-white/10">
          {/* Stats Header */}
          <div className="p-[24px] border-b border-white/10 bg-[#0A0A0A]">
            <div className="grid grid-cols-2 gap-6 mb-[24px]">
              <div>
                <p className="text-white/40 text-[12px] uppercase tracking-wider mb-[4px]">
                  Diff Percentage
                </p>
                <p className="text-white text-[36px] font-light leading-none tracking-tight">
                  {differentPercentage}%
                </p>
              </div>
              <div>
                <p className="text-white/40 text-[12px] uppercase tracking-wider mb-[8px]">
                  Final Verdict
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApprove}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-all text-[12px] font-medium ${finalVerdict === "approve"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white"
                      }`}
                  >
                    <Check className="w-[12px] h-[12px]" />
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-all text-[12px] font-medium ${finalVerdict === "reject"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white"
                      }`}
                  >
                    <XIcon className="w-[12px] h-[12px]" />
                    Reject
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white/40 text-[12px] uppercase tracking-wider mb-[4px]">
                Detected Issues
              </p>
              <p className="text-white text-[36px] font-light leading-none tracking-tight">
                {detectedIssues}
              </p>
            </div>

            {/* Warning Info */}
            <div className="mt-[20px] bg-[#151515] border border-white/5 rounded-[6px] p-[12px] flex items-start gap-3">
              <AlertTriangle className="w-[14px] h-[14px] text-amber-500/70 mt-[2px] shrink-0" />
              <p className="text-white/50 text-[11px] leading-relaxed">
                This action is final. Once submitted, the verdict cannot be
                changed.
              </p>
            </div>
          </div>

          {/* Issues Content */}
          <div className="flex-1 overflow-y-auto p-[24px]">
            <h3 className="text-white text-[16px] font-semibold mb-[8px]">
              Issue Overview
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed mb-[24px]">
              When the user is traveling, an error pop-up should appear with the
              message "Are you traveling?" instead of that, we are getting
              "Oops! Something went wrong."
            </p>

            {/* Severity Cards */}
            <div className="grid grid-cols-3 gap-[8px] mb-[24px]">
              <div className="bg-[#1A0A0A] border border-red-500/20 rounded-[6px] p-[10px]">
                <p className="text-red-400 text-[11px] font-medium mb-[2px]">Major</p>
                <p className="text-red-500 text-[20px] font-bold">
                  {severityCounts.Major}
                </p>
              </div>
              <div className="bg-[#1A150A] border border-amber-500/20 rounded-[6px] p-[10px]">
                <p className="text-amber-400 text-[11px] font-medium mb-[2px]">Medium</p>
                <p className="text-amber-500 text-[20px] font-bold">
                  {severityCounts.Medium}
                </p>
              </div>
              <div className="bg-[#0A101A] border border-blue-500/20 rounded-[6px] p-[10px]">
                <p className="text-blue-400 text-[11px] font-medium mb-[2px]">Low</p>
                <p className="text-blue-500 text-[20px] font-bold">
                  {severityCounts.Low}
                </p>
              </div>
            </div>

            {/* Issue List */}
            <div className="space-y-[10px]">
              {issues.map((issue) => {
                const isMajor = issue.severity === "Major";
                const isMedium = issue.severity === "Medium";

                const borderColor = isMajor
                  ? "border-red-900/40 hover:border-red-500/50"
                  : isMedium
                    ? "border-amber-900/40 hover:border-amber-500/50"
                    : "border-blue-900/40 hover:border-blue-500/50";
                const bgBase = isMajor
                  ? "bg-[#1A0A0A]"
                  : isMedium
                    ? "bg-[#1A150A]"
                    : "bg-[#0A101A]";
                const textColor = isMajor
                  ? "text-red-400"
                  : isMedium
                    ? "text-amber-400"
                    : "text-blue-400";

                return (
                  <div
                    key={issue.id}
                    className={`${bgBase} border ${borderColor} rounded-[6px] p-[12px] transition-colors cursor-pointer group`}
                  >
                    <div className="flex items-center gap-2 mb-[6px]">
                      <AlertTriangle
                        className={`w-[12px] h-[12px] ${textColor}`}
                      />
                      <span
                        className={`${textColor} text-[11px] font-bold uppercase tracking-wide`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-gray-200 text-[13px] font-medium mb-[4px] group-hover:text-white transition-colors">
                      {issue.title}
                    </p>
                    <p className="text-white/30 text-[11px] font-mono">
                      {issue.coordinates}
                    </p>
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
