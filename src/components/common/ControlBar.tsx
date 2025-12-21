import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export interface ControlBarProps {
  // Shared Props
  selectedMethod: "Pixelmatch" | "Noise";
  onMethodChange: (method: "Pixelmatch" | "Noise") => void;
  threshold: string;
  onThresholdChange: (threshold: string) => void;
  onStartComparison: () => void;

  // Search Props (Optional)
  searchQuery?: string;
  onSearchChange?: (query: string) => void;

  // AI Agent Props (Optional)
  aiAgent?: "Yes" | "No";
  onAiAgentChange?: (agent: "Yes" | "No") => void;

  // Build Props (Optional)
  selectedBuild?: string;
  onBuildChange?: (build: string) => void;
  buildVersions?: string[];
}

export function ControlBar({
  selectedMethod,
  onMethodChange,
  threshold,
  onThresholdChange,
  onStartComparison,
  searchQuery,
  onSearchChange,
  aiAgent,
  onAiAgentChange,
  selectedBuild,
  onBuildChange,
  buildVersions,
}: ControlBarProps) {
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isThresholdDropdownOpen, setIsThresholdDropdownOpen] = useState(false);
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);

  // Helper for threshold options
  const thresholdOptions = ["1x", "2x", "3x", "4x", "5x"];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-[32px] py-[11px] bg-background border-b border-border">
        {/* Left Side: Search (if provided) */}
        <div className="flex items-center">
          {onSearchChange && (
            <div className="w-full md:w-[380px] max-w-[380px] border border-border rounded-lg px-3 md:px-5 py-2.5 flex items-center gap-2.5 text-muted-foreground bg-transparent">
              <Search className="w-[18px] h-[18px]" />
              <input
                type="text"
                placeholder="Search Baseline images"
                value={searchQuery || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
          )}
        </div>

        {/* Right side - Method, Threshold, Build, Start Button */}
        <div className="flex items-center gap-[20px]">
          {/* Method Dropdown */}
          <div className="flex items-center gap-[10px]">
            <p className="font-semibold text-[14px] text-foreground">
              Method :
            </p>
            <div className="relative">
              <button
                onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                className={`px-[10px] py-[10px] rounded-[4px] border ${
                  selectedMethod
                    ? "bg-muted border-border text-foreground"
                    : "border-green-500/30 text-green-400"
                } text-[14px] font-mono flex items-center gap-[8px] hover:bg-accent transition-colors`}
              >
                <span>{selectedMethod}</span>
                <ChevronDown className="w-[14px] h-[14px] text-muted-foreground" />
              </button>
              {isMethodDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[40]"
                    onClick={() => setIsMethodDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[45px] w-[130px] bg-popover rounded-[8px] shadow-lg z-[50] border border-border overflow-hidden">
                    {(["Pixelmatch", "Noise"] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          onMethodChange(method);
                          setIsMethodDropdownOpen(false);
                        }}
                        className="w-full px-[16px] py-[12px] hover:bg-accent transition-colors text-left"
                      >
                        <span className="text-foreground text-[14px] font-mono">
                          {method}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* AI Agent Toggle (If Provided) */}
          {onAiAgentChange && (
            <div className="flex items-center gap-2.5">
              <span className="text-foreground text-sm font-semibold">
                AI agent :
              </span>
              <div className="flex gap-1">
                {(["Yes", "No"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => onAiAgentChange(option)}
                    className={`px-2.5 py-2 rounded text-sm font-mono transition-colors ${
                      aiAgent === option
                        ? "border border-green-500/30 text-green-400"
                        : "bg-muted border border-border text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Threshold Dropdown */}
          <div className="flex items-center gap-[10px]">
            <p className="font-semibold text-[14px] text-foreground">
              Threshold :
            </p>
            <div className="relative">
              <button
                onClick={() =>
                  setIsThresholdDropdownOpen(!isThresholdDropdownOpen)
                }
                className={`w-[60px] px-[10px] py-[10px] rounded-[4px] border ${
                  threshold
                    ? "bg-muted border-border text-foreground"
                    : "border border-[#6bdf95]/30 text-[#6bdf95]"
                } text-[14px] font-mono flex items-center justify-between hover:bg-accent transition-colors`}
              >
                <span>{threshold}</span>
                <ChevronDown className="w-[14px] h-[14px]" />
              </button>
              {isThresholdDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[40]"
                    onClick={() => setIsThresholdDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[45px] w-[60px] bg-popover rounded-[8px] shadow-lg z-[50] border border-border overflow-hidden">
                    {thresholdOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          onThresholdChange(t);
                          setIsThresholdDropdownOpen(false);
                        }}
                        className="w-full px-[16px] py-[12px] hover:bg-accent transition-colors"
                      >
                        <span className="text-foreground text-[14px] font-mono">
                          {t}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Build Dropdown (If Provided) */}
          {buildVersions && onBuildChange && (
            <div className="flex items-center gap-[10px]">
              <p className="font-semibold text-[14px] text-foreground">
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
                    <div className="absolute right-0 top-[45px] w-[130px] bg-popover rounded-[8px] shadow-lg z-[50] border border-border overflow-hidden">
                      {buildVersions.map((version) => (
                        <button
                          key={version}
                          onClick={() => {
                            onBuildChange(version);
                            setIsBuildDropdownOpen(false);
                          }}
                          className={`w-full px-[16px] py-[12px] hover:bg-accent transition-colors text-left ${
                            version === selectedBuild ? "bg-muted/50" : ""
                          }`}
                        >
                          <span className="text-foreground text-[14px] font-mono">
                            {version}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={onStartComparison}
            className="bg-foreground text-background px-[16px] py-[11.798px] rounded-[7.26px] flex items-center gap-[9.075px] text-[14px] font-semibold hover:opacity-90 transition-colors"
          >
            <span>✦</span>
            <span>Start Comparing UI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
