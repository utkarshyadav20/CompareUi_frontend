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
import { usePDF } from '@react-pdf/renderer';
import { PDFReportDocument } from "./common/report/detailed/PDFReportDocument";


interface Issue {
  id: string;
  severity: "Major" | "Medium" | "Low";
  title: string;
  description: string;
  coordinates: string;
  serialNumber: string;
  component?: string;
  dimension?: string;
  actual?: string;
  expected?: string;
}

interface DetailedResultProps {
  testId: string;
  testName: string;
  projectId: string;
  projectName?: string; // Optional prop for project name
  platformType: string;
  onBack: () => void;
  buildVersion: string;
  buildVersions?: any[]; // Added optional prop
  onBuildChange?: (build: any) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  isNotificationOpen: boolean;
  onNotificationToggle: () => void;

}

export function DetailedResult({
  testId,
  testName,
  projectId,
  projectName, // Destructure projectName
  platformType,
  onBack,
  buildVersion = "v12.224",
  buildVersions = [],
  onBuildChange,
  theme,
  onThemeChange,
  isNotificationOpen,
  onNotificationToggle,

}: DetailedResultProps) {
  const [activeTab, setActiveTab] = useState<
    "baseline" | "live" | "difference"
  >("baseline");
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatePdf, setGeneratePdf] = useState(false);
  const [status, setStatus] = useState<string>("UNKNOWN");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const [finalVerdict, setFinalVerdict] = useState<"approve" | "reject" | null>(
    null
  );


  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const [modelResult, setModelResult] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [res, modelRes] = await Promise.all([
          apiClient.get('/result/details', {
            params: {
              projectId,
              buildId: buildVersion,
              screenName: testName,
              projectType: platformType
            }
          }),
          apiClient.get('/result/model-result', {
            params: {
              projectId,
              buildId: buildVersion,
              imageName: testName,
              projectType: platformType
            }
          }).catch(err => ({ data: null }))
        ]);

        setResultData(res.data);
        setModelResult(modelRes.data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId && buildVersion && testName) {
      fetchDetails();
    }
  }, [projectId, buildVersion, testName, platformType]);

  useEffect(() => {
    if (resultData?.resultStatus !== undefined) {
      let s = resultData.resultStatus.toString();
      if (s === "0" || s === "FAILED" || s === "fail") s = "FAILED";
      else if (s === "1" || s === "PASSED" || s === "pass") s = "PASSED";
      else if (s === "2") s = "INPROGRESS";
      else if (s === "3") s = "ON HOLD";
      else s = s.toUpperCase();
      setStatus(s);
    }
  }, [resultData]);

  // PDF Generation Hook
  const [instance, updateInstance] = usePDF({
    document: <PDFReportDocument
      result={resultData || {}} // Placeholder to satisfy types, but effectively empty if null
      modelResult={modelResult}
      projectName={projectName || "No Project Name"}
      appName=""
      deviceType={platformType}
      buildName={""}
    />
  });

  // Watch for generation request and completion
  useEffect(() => {
    if (generatePdf && !instance.loading && instance.url) {
      // Create temporary link and click it
      const link = document.createElement('a');
      link.href = instance.url;
      link.download = `${testName}_Report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset state
      setGeneratePdf(false);
      setIsDownloading(false);
    }
  }, [generatePdf, instance.loading, instance.url, testName]);

  const handleDownloadClick = () => {
    if (!resultData) return;
    setIsDownloading(true);
    setGeneratePdf(true);

    // Trigger generation with actual data
    updateInstance(
      <PDFReportDocument
        result={resultData}
        modelResult={modelResult}
        projectName={projectName || "No Project Name"}
        appName=""
        deviceType={platformType}
        buildName={(buildVersions.find(v => (typeof v === 'string' ? v === buildVersion : v.buildId === buildVersion)) as any)?.buildName || buildVersion}
      />
    );
  };


  // Build Dropdown State
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);

  const testStatus = resultData?.resultStatus === 0 ? "FAILED" : "PASSED";
  const differentPercentage = resultData?.diffPercent ?? 0;

  const baselineImageUrl = resultData?.baselineImageUrl || "https://placehold.co/800x450?text=No+Baseline";
  const liveImageUrl = resultData?.actualImageUrl || "https://placehold.co/800x450?text=No+Actual";
  const differenceImageUrl = resultData?.diffImageUrl || "https://placehold.co/800x450?text=No+Diff";

  interface DiffBox {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    density: number;
    severity: 'Major' | 'Medium' | 'Low';
    pixelCount: number;
    title?: string;
    description?: string;
    serialNumber?: string;
    component?: string;
    dimension?: string;
    actual?: string;
    expected?: string;
  }

  // Merge modelResult descriptions into resultData boxes
  const coordinates = resultData?.coordinates || {};
  const originalBoxes: DiffBox[] = coordinates.boxes || [];
  let boxes: DiffBox[] = [];

  if (modelResult && modelResult.coordsVsText) {
    try {
      const analysisItems = typeof modelResult.coordsVsText === 'string'
        ? JSON.parse(modelResult.coordsVsText)
        : modelResult.coordsVsText;

      // Create a map of original boxes for geometry lookup
      const originalBoxMap = new Map(originalBoxes.map(b => [b.id, b]));

      // Group analysis items by ID
      const groupedItems = new Map<string, any[]>();
      if (Array.isArray(analysisItems)) {
        analysisItems.forEach((item: any) => {
          const id = item.id || 'unknown';
          if (!groupedItems.has(id)) {
            groupedItems.set(id, []);
          }
          groupedItems.get(id)!.push(item);
        });
      }

      // Drive from grouped items
      boxes = Array.from(groupedItems.entries()).map(([id, items], index) => {
        // Try to find matching box in original results
        const matchingBox = originalBoxMap.get(id);

        // Parse ID "x-y" if geometry not found
        let x = 0, y = 0, width = 50, height = 50;

        if (matchingBox) {
          x = matchingBox.x;
          y = matchingBox.y;
          width = matchingBox.width;
          height = matchingBox.height;
        } else if (id && id.includes('-')) {
          const [xStr, yStr] = id.split('-');
          x = parseInt(xStr, 10) || 0;
          y = parseInt(yStr, 10) || 0;
        }

        // Merge descriptions and titles
        // Merge descriptions and titles
        const uniqueTitles = Array.from(new Set(items.map(i => i.type))).filter(Boolean);
        let description = '';
        if (items.length > 1) {
          description = items.map((i, idx) => `${idx + 1}. ${i.description}`).join('\n\n');
        } else {
          description = items[0].description;
        }

        const component = items[0].component || '';
        const dimension = items[0].dimension || '';
        const actual = items[0].actual || '';
        const expected = items[0].expected || '';

        const title = component && dimension ? `${component} • ${dimension}` : (uniqueTitles.join(' & ') || 'Issue');

        return {
          id: id || `issue-${index}`,
          x,
          y,
          width,
          height,
          density: matchingBox?.density || 1,
          severity: matchingBox?.severity || 'Medium',
          pixelCount: matchingBox?.pixelCount || 0,
          title: title || 'Issue',
          description: description,
          serialNumber: (index + 1).toString().padStart(2),
          component,
          dimension,
          actual,
          expected
        };
      });

    } catch (e) {
      console.error("Error parsing modelResult coordsVsText", e);
      boxes = originalBoxes; // Fallback
    }
  } else {
    boxes = originalBoxes;
  }

  const counts = coordinates.counts || { Major: 0, Medium: 0, Low: 0 };
  const dimensions = coordinates.dimensions || null;
  const isProcessing = false;

  const detectedIssues = boxes.length;
  const severityCounts = counts;

  // Convert boxes to Issues for the list
  const issues: Issue[] = boxes.map((box: any) => ({
    id: box.id,
    severity: box.severity,
    title: box.title || box.component || `${box.severity} difference detected`,
    description: box.description || `Density: ${(box.density * 100).toFixed(1)}%`,
    coordinates: `x: ${Math.round(box.x)}, y: ${Math.round(box.y)} • ${Math.round(box.width)}×${Math.round(box.height)}`,
    serialNumber: box.serialNumber || '00',
    component: box.component,
    dimension: box.dimension,
    actual: box.actual,
    expected: box.expected
  }));
  console.log("issues", issues);
  // Removed manual handleDownloadPDF to avoid Buffer issues. 
  // We will use PDFDownloadLink component instead for direct download.


  const handleRaiseIssue = () => {
    alert("Raise Issue clicked.");
  };

  const handleApprove = () => {
    setFinalVerdict("approve");
  };

  const handleReject = () => {
    setFinalVerdict("reject");
  };

  const [hoveredIssueId, setHoveredIssueId] = useState<string | null>(null);
  const [tooltipIssueId, setTooltipIssueId] = useState<string | null>(null);

  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState("");

  const handleEditDescription = (id: string, currentDescription: string) => {
    setEditingIssueId(id);
    setTempDescription(currentDescription);
  };

  const handleSaveDescription = async (id: string) => {
    if (!tempDescription.trim()) {
      setEditingIssueId(null);
      return;
    }

    try {
      const buildIdToUse = typeof buildVersion === 'string' ? buildVersion : (buildVersion as any).buildId;

      await apiClient.post(`/result/update-model-item?projectId=${projectId}&buildId=${buildIdToUse}&screenName=${testName}`, {
        itemId: id,
        updates: { description: tempDescription }
      });

      // Update local state to reflect changes immediately
      if (modelResult) {
        let currentCoords = typeof modelResult.coordsVsText === 'string'
          ? JSON.parse(modelResult.coordsVsText)
          : modelResult.coordsVsText;

        if (Array.isArray(currentCoords)) {
          const updatedCoords = currentCoords.map((item: any) =>
            item.id === id ? { ...item, description: tempDescription } : item
          );

          setModelResult({
            ...modelResult,
            coordsVsText: updatedCoords
          });
        }
      }

    } catch (error) {
      console.error("Failed to update description:", error);
      alert("Failed to save description");
    } finally {
      setEditingIssueId(null);
    }
  };

  const handleStatusSelect = async (newStatus: string) => {
    setStatus(newStatus);
    setIsStatusDropdownOpen(false);

    try {
      const buildIdToUse = typeof buildVersion === 'string' ? buildVersion : (buildVersion as any).buildId;
      await apiClient.post(`/result/update-status?projectId=${projectId}&buildId=${buildIdToUse}&screenName=${testName}`, {
        status: newStatus
      });
      console.log("Status updated successfully in DB");
    } catch (error) {
      console.error("Failed to update status in DB:", error);
      alert("Failed to update status in database");
    }
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
            <div className="relative">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="focus:outline-none"
              >
                {(() => {
                  const s = status.toLowerCase();
                  let bgColor = "bg-zinc-800";
                  let borderColor = "border-zinc-700";
                  let dotColor = "bg-zinc-500";
                  let textColor = "text-zinc-400";

                  if (s === 'pass' || s === 'passed') {
                    bgColor = "bg-green-950/30";
                    borderColor = "border-green-900/50";
                    dotColor = "bg-green-500";
                    textColor = "text-green-400";
                  } else if (s === 'fail' || s === 'failed' || s === 'error') {
                    bgColor = "bg-red-950/30";
                    borderColor = "border-red-900/50";
                    dotColor = "bg-red-500";
                    textColor = "text-red-400";
                  } else if (s === 'inprogress') {
                    bgColor = "bg-yellow-950/30";
                    borderColor = "border-yellow-900/50";
                    dotColor = "bg-yellow-500";
                    textColor = "text-yellow-400";
                  }

                  return (
                    <div className={`border px-2.5 py-1 rounded flex items-center gap-2 ${bgColor} ${borderColor} hover:bg-white/5 transition-colors cursor-pointer`}>
                      <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                      <span className={`font-mono text-xs font-bold ${textColor}`}>
                        {loading ? "LOADING..." : status.toUpperCase()}
                      </span>
                      <ChevronDown className={`w-3 h-3 ${textColor}`} />
                    </div>
                  );
                })()}
              </button>

              {isStatusDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsStatusDropdownOpen(false)} />
                  <div className="absolute left-1/2 -translate-x-1/2 top-[40px] w-[150px] bg-[#1a1a1a] rounded-md shadow-2xl z-50 border border-zinc-700 overflow-hidden py-1">
                    {["PASSED", "FAILED", "INPROGRESS", "ON HOLD"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleStatusSelect(opt)}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${opt === 'PASSED' ? 'bg-green-500' :
                          opt === 'FAILED' ? 'bg-red-500' :
                            opt === 'INPROGRESS' ? 'bg-yellow-500' :
                              'bg-zinc-500'
                          }`}></div>
                        {opt}
                        {status === opt && <Check className="w-3 h-3 ml-auto text-white" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
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
                            <span className="text-white text-[14px] font-DMSans">
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



            {/* Using standard button that triggers usePDF generation */}
            <button
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className="px-3 py-2 rounded bg-black text-white border border-white text-sm font-DMSans font-regular flex items-center gap-2 hover:bg-zinc-200 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-wait" style={{ border: 'solid 1px white' }}
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating...' : 'Download Report'}</span>
            </button>

            <button
              onClick={handleRaiseIssue}
              className="px-3 py-2 rounded bg-white text-black border border-white text-sm font-DMSans font-bold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)] w-full overflow-hidden">
        {/* Left Panel - Image Viewer */}
        <div
          className="bg-[#050505] p-[20px] flex flex-col border-r border-white/10"
          style={{ width: '55%', flex: '0 0 55%', minWidth: 0 }}
        >
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
          <div className="flex-1 bg-[#111] rounded-[8px] border border-white/10 p-4 flex items-center justify-center relative group overflow-hidden">
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
                        let strokeColor = 'rgb(34, 197, 94)'; // Low (Green default)
                        let fillColor = 'rgba(34, 197, 94, 0.2)';

                        if (box.severity === 'Major') {
                          strokeColor = 'rgb(255, 100, 103)';
                          fillColor = 'rgba(255, 0, 0, 0.2)';
                        } else if (box.severity === 'Medium') {
                          strokeColor = 'rgb(253, 199, 0)';
                          fillColor = 'rgba(255, 200, 0, 0.2)';
                        }

                        // Determine if we should highlight this box or dim it
                        const isHovered = hoveredIssueId === box.id;
                        const isAnyHovered = !!hoveredIssueId;

                        let finalStrokeWidth = dimensions.width < 1000 ? 1 : 2;
                        let finalOpacity = 1;

                        if (isAnyHovered) {
                          if (isHovered) {
                            finalStrokeWidth = dimensions.width < 1000 ? 3 : 5; // Thicker border
                            finalOpacity = 1; // Full visibility
                          } else {
                            finalOpacity = 0.2; // Dim others
                          }
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
                            strokeWidth={finalStrokeWidth}
                            rx={4}
                            style={{
                              opacity: finalOpacity,
                              transition: 'opacity 0.2s ease, stroke-width 0.2s ease',
                              cursor: 'pointer',
                              pointerEvents: 'all'
                            }}
                            onMouseEnter={() => {
                              setHoveredIssueId(box.id);
                              setTooltipIssueId(box.id);
                            }}
                            onMouseLeave={() => {
                              setHoveredIssueId(null);
                              setTooltipIssueId(null);
                            }}
                          />
                        );
                      })}
                      {/* Render Serial Numbers on top of boxes */}
                      {boxes.map((box) => {
                        const isHovered = hoveredIssueId === box.id;
                        const isAnyHovered = !!hoveredIssueId;
                        let finalOpacity = 1;
                        if (isAnyHovered) {
                          finalOpacity = isHovered ? 1 : 0.2;
                        }

                        return (
                          <g key={`serial-${box.id}`} style={{ opacity: finalOpacity, transition: 'opacity 0.2s ease', pointerEvents: 'none' }}>
                            <rect
                              x={box.x}
                              y={box.y - 40}
                              width={48}
                              height={36}
                              fill={box.severity === 'Major' ? 'rgb(255, 100, 103)' : box.severity === 'Medium' ? 'rgb(253, 199, 0)' : 'rgb(34, 197, 94)'}
                              rx={4}
                            />
                            <text
                              x={box.x + 24}
                              y={box.y - 12}
                              textAnchor="middle"
                              fill="white"
                              fontSize={30}
                              fontWeight={1000}
                              stroke="white"
                              strokeWidth={0.8}
                              paintOrder="stroke"
                              fontFamily="Inter, Arial, sans-serif"
                            >
                              {box.serialNumber}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  )}

                  {/* Tooltip Overlay */}
                  {tooltipIssueId && dimensions && (() => {
                    const box = boxes.find(b => b.id === tooltipIssueId);
                    if (!box) return null;

                    const leftPercent = (box.x / dimensions.width) * 100;
                    const topPercent = ((box.y + box.height) / dimensions.height) * 100;
                    const bottomPercent = 100 - topPercent;

                    // Smart positioning logic
                    const isNearBottom = topPercent > 80;
                    const isNearLeft = leftPercent < 20;
                    const isNearRight = leftPercent > 80;

                    let style: React.CSSProperties = {};

                    // Y Positioning
                    if (isNearBottom) {
                      // Switch to showing ABOVE the box
                      style.bottom = `${100 - (box.y / dimensions.height * 100)}%`;
                      style.marginBottom = '12px';
                    } else {
                      style.top = `${topPercent}%`;
                      style.marginTop = '12px';
                    }

                    // X Positioning
                    if (isNearLeft) {
                      style.left = '0%';
                      style.marginLeft = '-10px'; // Slight offset
                    } else if (isNearRight) {
                      style.right = '0%';
                      style.marginRight = '-10px';
                    } else {
                      style.left = `${leftPercent}%`;
                      style.transform = 'translateX(-50%)';
                    }

                    return (
                      <div
                        className="absolute z-50 bg-[#09090b] border border-zinc-800 text-white p-3 rounded-lg shadow-2xl max-w-[280px] min-w-[200px] pointer-events-none"
                        style={style}
                      >
                        <div className="flex items-center gap-2 mb-2 border-b border-zinc-800 pb-2">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                            {box.title}
                          </span>
                        </div>
                        <p className="font-sans leading-relaxed text-zinc-300 text-[13px] font-medium">
                          {box.description}
                        </p>
                      </div>
                    );
                  })()}
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
        <div
          className="bg-gradient-to-b from-black to-[#050505] flex flex-col border-l border-white/10"
          style={{ width: '45%', flex: '0 0 45%', minWidth: 0 }}
        >
          {/* STATS */}
          <div className=" border-b border-white/10 bg-black/40 backdrop-blur-xl" style={{ background: "#252525", padding: "0px", height: "13rem" }}>
            <div className="grid grid-cols-2 gap-10" style={{ height: "100%" }}>
              <div style={{ padding: "20px", rowGap: "1%", display: "flex", flexDirection: "column", gap: "1em", justifyContent: "space-around" }}>
                <div>
                  <p className="text-sm font-medium mb-1  tracking-wide" style={{ letterSpacing: '.2px', color: '#ffffff80' }}>
                    Different Percentage
                  </p>
                  <p
                    className="text-white tracking-tight drop-shadow-lg"
                    style={{ fontSize: 'xx-large', fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}
                  >
                    {differentPercentage}%
                  </p>
                </div>

                <div>
                  <p className="mt-6 text-sm font-medium mb-1  tracking-wide" style={{ letterSpacing: '.2px', color: '#ffffff80' }}>Detected Issues</p>
                  <p
                    className="text-white tracking-tight"
                    style={{ fontSize: 'xx-large', fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}
                  >
                    {detectedIssues}
                  </p>
                </div>
              </div>

              <div style={{ background: "#00000040", padding: "20px", display: "flex", flexDirection: "column", gap: "1em", justifyContent: "space-around" }}>
                <data value="">
                  <p className="text-zinc-400 text-sm mb-3" style={{ letterSpacing: '.2px', color: '#ffffff80' }}>Final Verdict</p>
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
                </data>

                <div className="mt-6 bg-white/80 border bg-black  rounded-md p-3 flex gap-2" style={{ color: "#ffffff60", border: 'solid 1px #ffffff40' }}>
                  <AlertTriangle className=" shrink-0" size={16} />
                  <p className="text-xs leading-relaxed">
                    This action is final. Once submitted, the verdict cannot be changed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ISSUES */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-white">Issue Overview
              </h3>
              {(!modelResult || !modelResult.coordsVsText) && (
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    background: "linear-gradient(90deg, #4FC3F7, #7E57C2, #EC407A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  (Smart description loading)
                </span>
              )}
            </div>
            <p className="text-[14px] text-zinc-400 font-mono leading-relaxed whitespace-normal break-words">
              {isProcessing ? "Analyzing differences..." : modelResult?.summary}
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

              <div className="bg-[rgba(34,197,94,0.1)] content-stretch flex flex-col gap-[10px] items-start min-w-[80px] p-[12px] relative rounded-[8px] shrink-0 w-[160px]">
                <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[8px]"></div>
                <p className="font-sans font-normal leading-[normal] relative shrink-0 text-[16px] w-full" style={{ color: 'rgb(34, 197, 94)' }}>Low</p>
                <div className="content-stretch flex items-end relative shrink-0 w-full">
                  <p className="font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap" style={{ color: 'rgb(34, 197, 94)' }}>
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
                    : 'rgb(34, 197, 94)';

                // Icon Color
                const iconColor = isMajor
                  ? 'rgb(255, 0, 0)'
                  : isMedium
                    ? 'rgb(253, 199, 0)'
                    : 'rgb(34, 197, 94)';

                // Edit mode state
                const isEditing = editingIssueId === issue.id;

                return (
                  <div
                    key={issue.id}
                    className="flex flex-col gap-4 border-b border-zinc-800 hover:bg-white/5 transition-colors cursor-pointer"
                    style={{ paddingBottom: '13px' }}
                    onMouseEnter={() => setHoveredIssueId(issue.id)}
                    onMouseLeave={() => setHoveredIssueId(null)}
                  >
                    {/* Row 1: Serial + Severity */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold text-white">#{issue.serialNumber}</span>
                      <div className="flex items-center gap-2 ml-2">
                        {isMajor ? (
                          <AlertCircle size={18} style={{ color: 'rgb(255, 0, 0)' }} />
                        ) : (
                          <AlertTriangle size={18} style={{ color: iconColor }} />
                        )}
                        <span className="font-mono text-lg font-bold" style={{ color: titleColor }}>
                          {issue.severity}
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Grid for Component & Type */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-zinc-500 text-xs font-mono mb-1" style={{ color: '#697281' }}>Component</p>
                        <p className="text-zinc-200 text-sm font-sans">{issue.component || '-'}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs font-mono mb-1" style={{ color: '#697281' }}>Type</p>
                        <p className="text-zinc-200 text-sm font-sans">{issue.dimension || '-'}</p>
                      </div>
                    </div>

                    {/* Row 3: Description (Editable) */}
                    <div>
                      <p className="text-zinc-500 text-xs font-mono mb-1" style={{ color: '#697281' }}>Description</p>
                      <div
                        className={`relative w-full ${isEditing ? 'border border-blue-500 rounded p-1' : ''}`}
                      >
                        {isEditing ? (
                          <textarea
                            autoFocus
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            onBlur={() => handleSaveDescription(issue.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSaveDescription(issue.id);
                              }
                            }}
                            className="w-full bg-zinc-900 text-zinc-200 text-[14px] font-sans p-2 rounded outline-none border border-blue-500 resize-none"
                            rows={3}
                          />
                        ) : (
                          <p
                            className="text-[14px] text-zinc-200 font-sans leading-relaxed whitespace-normal break-words cursor-text hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditDescription(issue.id, issue.description);
                            }}
                          >
                            {issue.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 4: Expected */}
                    {issue.expected && (
                      <div>
                        <p className="text-[14px] font-sans text-zinc-300">
                          <span className="font-bold text-zinc-400 mr-" style={{ color: '#697281' }}>Expected : </span>
                          {issue.expected}
                        </p>
                      </div>
                    )}

                    {/* Row 5: Actual */}
                    {issue.actual && (
                      <div>
                        <p className="text-[14px] font-sans text-zinc-300">
                          <span className="font-bold text-zinc-400 mr-1" style={{ color: '#697281' }}>Actual : </span>
                          {issue.actual}
                        </p>
                      </div>
                    )}
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
