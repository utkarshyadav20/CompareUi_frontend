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
import { ProjectHeader } from "../project/ProjectHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <ProjectHeader
        title="Detailed Result"
        onBack={onBack}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={onNotificationToggle}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={onProfileMenuToggle}
        hideNavigation={true}
      />

      {/* Screen Info Bar */}
      <div className="w-full border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-muted-foreground text-[12px] mb-[2px]">
              ScreenName :
            </p>
            <div className="flex items-center gap-4">
              <p className="text-foreground text-[20px] font-bold">
                {testName}
              </p>
              <div className="flex items-center gap-[8px]">
                <span className="text-muted-foreground text-[14px]">
                  Status :
                </span>
                <div className="bg-red-900/20 border border-red-900/50 px-[8px] py-[2px] rounded-[4px] flex items-center gap-[6px]">
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
              <p className="font-semibold text-[14px] text-foreground">
                Build :
              </p>
              <Select value={selectedBuild} onValueChange={onBuildChange}>
                <SelectTrigger className="h-auto w-auto gap-[8px] rounded-[4px] border border-green-500/30 !bg-background px-[10px] py-[10px] font-mono text-[14px] text-green-500 hover:bg-green-500/10 focus:ring-0 focus:ring-offset-0 data-[state=open]:border-green-500 data-[state=open]:ring-0">
                  <SelectValue placeholder="Select build">
                    {selectedBuild}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-[130px] border border-border !bg-popover text-foreground shadow-xl">
                  {buildVersions.map((version) => (
                    <SelectItem
                      key={version}
                      value={version}
                      className={`font-mono text-[14px] cursor-pointer transition-colors focus:bg-accent focus:text-accent-foreground ${
                        version === selectedBuild
                          ? "bg-accent/50 text-green-500 focus:text-green-500"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      {version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-[10px] py-[10px] rounded-[4px] border border-blue-500/30 text-blue-500 text-[14px] font-mono flex items-center gap-[8px] hover:bg-blue-500/10 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleRaiseIssue}
              className="px-[10px] py-[10px] rounded-[4px] bg-red-500/10 border border-red-500/30 text-red-500 text-[14px] font-mono font-bold hover:bg-red-500/20 transition-colors shadow-sm"
            >
              Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Image Viewer */}
        <div className="flex-1 bg-muted/50 p-[20px] flex flex-col border-r border-border">
          {/* Controls Row */}
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex items-center bg-transparent gap-4">
              <button
                onClick={() => setActiveTab("baseline")}
                className={`text-[14px] font-mono font-medium ${
                  activeTab === "baseline"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Baseline Image
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`px-3 py-1 rounded-[4px] text-[14px] font-mono font-medium ${
                  activeTab === "live"
                    ? "bg-secondary text-secondary-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Live image
              </button>
              <button
                onClick={() => setActiveTab("difference")}
                className={`text-[14px] font-mono font-medium ${
                  activeTab === "difference"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Image Difference
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-card rounded-[4px] border border-border p-[2px]">
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-accent text-muted-foreground">
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-[40px] text-center text-[12px] text-foreground font-mono">
                100
              </div>
              <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-accent text-muted-foreground">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Frame */}
          <div className="flex-1 bg-card rounded-[8px] border border-border p-4 flex items-center justify-center overflow-hidden relative">
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
        <div className="w-[450px] flex flex-col border-l border-border p-4 bg-background">
          {/* Stats Header */}
          <div className="p-[24px] border-b border-border">
            <div className="flex justify-between items-start mb-[24px]">
              <div>
                <p className="text-muted-foreground">Different Percentage</p>
                <p className="text-foreground text-[32px] font-light leading-none">
                  {differentPercentage}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-[8px]">Final Verdict</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApprove}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                      finalVerdict === "approve"
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-transparent hover:bg-accent"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-medium">Approve</span>
                  </button>
                  <button
                    onClick={handleReject}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] border transition-colors ${
                      finalVerdict === "reject"
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-transparent hover:bg-accent"
                    }`}
                  >
                    <XIcon className="w-4 h-4" />
                    <span className="font-medium">Reject</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Detected Issues</p>
              <p className="text-foreground text-[32px] font-light leading-none">
                {detectedIssues}
              </p>
            </div>

            {/* Warning Info */}
            <div className="mt-[20px] bg-card border border-border rounded-[4px] p-[10px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground mt-[2px] shrink-0" />
              <p className="text-muted-foreground leading-relaxed">
                This action is final. Once submitted, the verdict cannot be
                changed.
              </p>
            </div>
          </div>

          {/* Issues Content */}
          <div className="flex-1 overflow-y-auto p-[24px]">
            <h3 className="text-foreground text-[18px] font-bold mb-[8px]">
              Issue Overview
            </h3>
            <p className="text-muted-foreground/80 text-[13px] leading-relaxed mb-[24px]">
              When the user is traveling, an error pop-up should appear with the
              message "Are you traveling?" instead of that , we are getting
              "Oops! Something went wrong." message in the current UI
            </p>

            {/* Severity Cards */}
            <div className="grid grid-cols-3 gap-[10px] mb-[24px]">
              <div className="bg-red-500/10 border border-red-500/20 rounded-[6px] p-[12px]">
                <p className="text-red-500">Major</p>
                <p className="text-red-500 text-[20px] font-bold">
                  {severityCounts.Major}
                </p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-[6px] p-[12px]">
                <p className="text-yellow-500">Medium</p>
                <p className="text-yellow-500 text-[20px] font-bold">
                  {severityCounts.Medium}
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-[6px] p-[12px]">
                <p className="text-blue-500">Low</p>
                <p className="text-blue-500 text-[20px] font-bold">
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
                  ? "bg-red-500/5"
                  : isMedium
                  ? "bg-yellow-500/5"
                  : "bg-blue-500/5";
                const textColor = isMajor
                  ? "text-red-500"
                  : isMedium
                  ? "text-yellow-500"
                  : "text-blue-500";

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
                    <p className="text-foreground text-[13px] font-medium mb-[4px]">
                      {issue.title}
                    </p>
                    <p className="text-muted-foreground text-[11px] font-mono">
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
