import { useState } from "react";
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

  // Build Dropdown State
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);
  const [selectedBuild, setSelectedBuild] = useState(buildVersion);

  const buildVersions = ["v12.224", "v12.223", "v12.222", "v12.221", "v12.220"];

  const onBuildChange = (version: string) => {
    setSelectedBuild(version);
  };

  // Mock data for the detailed result
  const testStatus = "FAILED";
  const differentPercentage = 80.24;
  const detectedIssues = 6;

  const baselineImageUrl =
    "https://images.unsplash.com/photo-1574267432644-f74bc7c02d60?w=800&h=450&fit=crop";
  const liveImageUrl =
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=450&fit=crop";
  const differenceImageUrl =
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop";

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
        <div className="flex items-center justify-between px-[24px] py-[12px]">
          <div>
            <p className="text-white/50 text-[12px] mb-[2px]">ScreenName :</p>
            <div className="flex items-center gap-4">
              <p className="text-white text-[20px] font-bold">{testName}</p>
              <div className="flex items-center gap-[8px]">
                <span className="text-white/50 text-[14px]">Status :</span>
                <div className="bg-[#450a0a] border border-red-900/50 px-[8px] py-[2px] rounded-[4px] flex items-center gap-[6px]">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span className="text-red-500 text-[12px] font-bold tracking-wide">
                    FAILED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[12px]">
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
                          className={`w-full px-[16px] py-[12px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left ${
                            version === selectedBuild
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
              className="px-[10px] py-[10px] rounded-[4px] border border-[#3b82f6]/30 text-[#3b82f6] text-[14px] font-mono flex items-center gap-[8px] hover:bg-[#3b82f6]/10 transition-colors disabled:opacity-50"
            >
              <Download className="w-[14px] h-[14px]" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleRaiseIssue}
              className="px-[10px] py-[10px] rounded-[4px] bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-[14px] font-mono font-bold hover:bg-[#ef4444]/20 transition-colors shadow-sm"
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
            <div className="flex items-center bg-transparent gap-4">
              <button
                onClick={() => setActiveTab("baseline")}
                className={`text-[14px] font-mono font-medium ${
                  activeTab === "baseline"
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Baseline Image
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`px-3 py-1 rounded-[4px] text-[14px] font-mono font-medium ${
                  activeTab === "live"
                    ? "bg-[#1A1A1A] text-white border border-white/10"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Live image
              </button>
              <button
                onClick={() => setActiveTab("difference")}
                className={`text-[14px] font-mono font-medium ${
                  activeTab === "difference"
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Image Difference
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-[#1A1A1A] rounded-[4px] border border-white/10 p-[2px]">
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-white/5 text-white/70">
                <Minus className="w-[14px] h-[14px]" />
              </button>
              <div className="w-[40px] text-center text-[12px] text-white font-mono">
                100
              </div>
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-white/5 text-white/70">
                <Plus className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>

          {/* Image Frame */}
          <div className="flex-1 bg-[#111] rounded-[8px] border border-white/10 p-4 flex items-center justify-center overflow-hidden relative">
            <div className="relative shadow-2xl">
              {/* Mock browser frame/header if needed? The image just shows the content. */}
              {activeTab === "baseline" && (
                <img
                  src={baselineImageUrl}
                  alt="Baseline"
                  className="max-w-full max-h-[70vh] rounded-[4px]"
                />
              )}
              {activeTab === "live" && (
                <img
                  src={liveImageUrl}
                  alt="Live"
                  className="max-w-full max-h-[70vh] rounded-[4px]"
                />
              )}
              {activeTab === "difference" && (
                <img
                  src={differenceImageUrl}
                  alt="Difference"
                  className="max-w-full max-h-[70vh] rounded-[4px]"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Stats & Issues */}
        <div className="w-[450px] bg-[#111] flex flex-col border-l border-white/10">
          {/* Stats Header */}
          <div className="p-[24px] border-b border-white/10">
            <div className="flex justify-between items-start mb-[24px]">
              <div>
                <p className="text-white/50 text-[13px] mb-[4px]">
                  Different Percentage
                </p>
                <p className="text-white text-[32px] font-light leading-none">
                  {differentPercentage}%
                </p>
              </div>
              <div>
                <p className="text-white/50 text-[13px] mb-[8px]">
                  Final Verdict
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApprove}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                      finalVerdict === "approve"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Check className="w-[14px] h-[14px]" />
                    <span className="text-[13px] font-medium">Approve</span>
                  </button>
                  <button
                    onClick={handleReject}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                      finalVerdict === "reject"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-transparent hover:bg-white/5"
                    }`}
                  >
                    <XIcon className="w-[14px] h-[14px]" />
                    <span className="text-[13px] font-medium">Reject</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white/50 text-[13px] mb-[4px]">
                Detected Issues
              </p>
              <p className="text-white text-[32px] font-light leading-none">
                {detectedIssues}
              </p>
            </div>

            {/* Warning Info */}
            <div className="mt-[20px] bg-[#1A1A1A] border border-white/5 rounded-[4px] p-[10px] flex items-start gap-2">
              <AlertTriangle className="w-[14px] h-[14px] text-white/30 mt-[2px] shrink-0" />
              <p className="text-white/50 text-[11px] leading-relaxed">
                This action is final. Once submitted, the verdict cannot be
                changed.
              </p>
            </div>
          </div>

          {/* Issues Content */}
          <div className="flex-1 overflow-y-auto p-[24px]">
            <h3 className="text-white text-[18px] font-bold mb-[8px]">
              Issue Overview
            </h3>
            <p className="text-white/60 text-[13px] leading-relaxed mb-[24px]">
              When the user is traveling, an error pop-up should appear with the
              message "Are you traveling?" instead of that , we are getting
              "Oops! Something went wrong." message in the current UI
            </p>

            {/* Severity Cards */}
            <div className="grid grid-cols-3 gap-[10px] mb-[24px]">
              <div className="bg-[#1f1111] border border-red-900/40 rounded-[6px] p-[12px]">
                <p className="text-[#ff5555] text-[13px] mb-[2px]">Major</p>
                <p className="text-[#ff5555] text-[20px] font-bold">
                  {severityCounts.Major}
                </p>
              </div>
              <div className="bg-[#1f1c11] border border-yellow-900/40 rounded-[6px] p-[12px]">
                <p className="text-[#fbbf24] text-[13px] mb-[2px]">Medium</p>
                <p className="text-[#fbbf24] text-[20px] font-bold">
                  {severityCounts.Medium}
                </p>
              </div>
              <div className="bg-[#0f141f] border border-blue-900/40 rounded-[6px] p-[12px]">
                <p className="text-[#3b82f6] text-[13px] mb-[2px]">Low</p>
                <p className="text-[#3b82f6] text-[20px] font-bold">
                  {severityCounts.Low}
                </p>
              </div>
            </div>

            {/* Issue List */}
            <div className="space-y-[8px]">
              {issues.map((issue) => {
                const isMajor = issue.severity === "Major";
                const isMedium = issue.severity === "Medium";
                // const isLow = issue.severity === 'Low';

                const borderColor = isMajor
                  ? "border-red-900/30"
                  : isMedium
                  ? "border-yellow-900/30"
                  : "border-blue-900/30";
                const bgBase = isMajor
                  ? "bg-[#1f1111]"
                  : isMedium
                  ? "bg-[#1f1c11]"
                  : "bg-[#0f141f]";
                const textColor = isMajor
                  ? "text-[#ff5555]"
                  : isMedium
                  ? "text-[#fbbf24]"
                  : "text-[#3b82f6]";

                return (
                  <div
                    key={issue.id}
                    className={`${bgBase} border ${borderColor} rounded-[4px] p-[12px]`}
                  >
                    <div className="flex items-center gap-2 mb-[4px]">
                      <AlertTriangle
                        className={`w-[12px] h-[12px] ${textColor}`}
                      />
                      <span
                        className={`${textColor} text-[12px] font-semibold uppercase`}
                      >
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-gray-300 text-[13px] font-medium mb-[4px]">
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
