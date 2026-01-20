import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export interface ControlBarProps {
  // Shared Props
  selectedMethod: "Pixelmatch" | "Noise";
  onMethodChange: (method: "Pixelmatch" | "Noise") => void;
  sensitivity: string;
  onSensitivityChange: (sensitivity: string) => void;
  minScore?: number;
  onMinScoreChange?: (score: number) => void;
  onStartComparison: () => void;

  // Search Props (Optional)
  searchQuery?: string;
  onSearchChange?: (query: string) => void;

  // AI Agent Props (Optional)
  aiAgent?: "Yes" | "No";
  onAiAgentChange?: (agent: "Yes" | "No") => void;

  // Build Props (Optional)
  selectedBuild?: any;
  onBuildChange?: (build: any) => void;
  buildVersions?: any[];

  // Loading State
  isLoading?: boolean;
}

export function ControlBar({
  selectedMethod,
  onMethodChange,
  sensitivity,
  onSensitivityChange,
  minScore,
  onMinScoreChange,
  onStartComparison,
  searchQuery,
  onSearchChange,
  aiAgent,
  onAiAgentChange,
  selectedBuild,
  onBuildChange,
  buildVersions,
  isLoading = false,
}: ControlBarProps) {
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isSensitivityDropdownOpen, setIsSensitivityDropdownOpen] = useState(false);
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);

  // Helper for sensitivity options
  const sensitivityOptions = ["1x", "2x", "3x", "4x", "5x"];

  return (
    /* 
       FIX 1: Added 'relative' and 'z-50'. 
       This ensures the entire ControlBar creates a high stacking context 
       so its children (dropdowns) can float over the page content below.
    */
    <div className="w-full relative z-40">
      <div className="flex items-center justify-between px-[32px] py-[11px] bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
        {/* Left Side: Search (if provided) */}
        <div className="flex items-center">
          {onSearchChange && (
            <div className="w-full md:w-[380px] max-w-[380px] border border-black/50 dark:border-white/50 rounded-lg px-3 md:px-5 py-2.5 flex items-center gap-2.5 text-black/50 dark:text-white/50 bg-transparent">
              <Search className="w-[18px] h-[18px]" />
              <input
                type="text"
                placeholder="Search Baseline images"
                value={searchQuery || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 text-sm"
              />
            </div>
          )}
        </div>

        {/* Right side - Method, Sensitivity, Build, Start Button */}
        <div className="flex items-center gap-[20px]">
          {/* Method Dropdown */}
          {/* <div className="flex items-center gap-[10px]">
            <p className="font-semibold text-[14px] text-black dark:text-white">
              Method :
            </p>
            <div className="relative">
              <button
                onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                className={`px-[10px] py-[10px] rounded-[4px] border ${selectedMethod
                  ? "bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white"
                  : "border-green-500/30 text-green-400"
                  } text-[14px] font-mono flex items-center gap-[8px] hover:bg-black/15 dark:hover:bg-white/15 transition-colors`}
              >
                <span>{selectedMethod}</span>
                <ChevronDown className="w-[14px] h-[14px] text-black/50 dark:text-white/50" />
              </button>
              {isMethodDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[40]"
                    onClick={() => setIsMethodDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[45px] w-[130px] bg-white dark:bg-zinc-800 rounded-[8px] shadow-lg z-[50] border border-black/10 dark:border-white/10 overflow-hidden">
                    {(["Pixelmatch", "Noise"] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          onMethodChange(method);
                          setIsMethodDropdownOpen(false);
                        }}
                        className="w-full px-[16px] py-[12px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left"
                      >
                        <span className="text-black dark:text-white text-[14px] font-mono">
                          {method}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div> */}

          {/* AI Agent Toggle (If Provided) */}
          {/* {onAiAgentChange && (
            <div className="flex items-center gap-2.5">
              <span className="text-black dark:text-white text-sm font-semibold">
                AI agent :
              </span>
              <div className="flex gap-1">
                {(["Yes", "No"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => onAiAgentChange(option)}
                    className={`px-2.5 py-2 rounded text-sm font-mono transition-colors ${aiAgent === option
                      ? "border border-green-500/30 text-green-400"
                      : "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

          )} */}

          {/* Min Score Input */}
          {onMinScoreChange && (
            <div className="flex items-center gap-[10px]">
              <p className="font-semibold text-[14px] text-black dark:text-white">
                Max mismatch allowed:
              </p>
              <div className="relative flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minScore !== undefined ? 100 - minScore : ''}
                  placeholder="20"
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    if (isNaN(val)) val = 0;
                    if (val > 100) val = 100;
                    if (val < 0) val = 0;
                    onMinScoreChange(100 - val);
                  }}
                  className="w-[60px] px-[10px] py-[10px] rounded-[4px] border border-[#6bdf95]/30 text-[#6bdf95] text-[14px] font-mono bg-transparent outline-none text-center placeholder-[#6bdf95]/30 focus:border-[#6bdf95]/60 transition-colors"
                />
                <span className=" text-[#6bdf95]/50 text-xs pointer-events-none">%</span>
              </div>
            </div>
          )}

          {/* Sensitivity Dropdown */}
          <div className="flex items-center gap-[10px]">
            <p className="font-semibold text-[14px] text-black dark:text-white">
              Sensitivity :
            </p>
            <div className="relative">
              <button
                onClick={() =>
                  setIsSensitivityDropdownOpen(!isSensitivityDropdownOpen)
                }
                className={`w-[60px] px-[10px] py-[10px] rounded-[4px] border ${sensitivity
                  ? "bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white"
                  : "border border-[#6bdf95]/30 text-[#6bdf95]"
                  } text-[14px] font-mono flex items-center justify-between hover:bg-black/15 dark:hover:bg-white/10 transition-colors`}
              >
                <span>{sensitivity}</span>
                <ChevronDown className="w-[14px] h-[14px]" />
              </button>
              {isSensitivityDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[40]"
                    onClick={() => setIsSensitivityDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[45px] w-[60px] bg-[#1e1e1e] rounded-[8px] shadow-lg z-[50] border border-white/20 overflow-hidden">
                    {sensitivityOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          onSensitivityChange(t);
                          setIsSensitivityDropdownOpen(false);
                        }}
                        className="w-full px-[16px] py-[12px] hover:bg-white/10 transition-colors"
                      >
                        <span className="text-white text-[14px] font-mono">
                          {t}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Build Dropdown */}
          {buildVersions && onBuildChange && (
            <div className="flex items-center gap-[10px]">
              <p className="font-semibold text-[14px] text-black dark:text-white">
                Build :
              </p>
              {/* 
                  FIX 2: Added z-index logic here. 
                  When open, this container jumps to z-50 to ensure it sits 
                  above the 'Start Comparing' button to its right.
              */}
              <div className={`relative ${isBuildDropdownOpen ? "z-50" : ""}`}>
                <button
                  onClick={() => setIsBuildDropdownOpen(!isBuildDropdownOpen)}
                  className="px-[10px] py-[10px] rounded-[4px] border border-[#6bdf95]/30 text-[#6bdf95] text-[14px] font-mono flex items-center gap-[8px] hover:bg-[#6bdf95]/10 transition-colors"
                >
                  <span>
                    {typeof selectedBuild === 'string'
                      ? selectedBuild
                      : (selectedBuild?.buildName || (selectedBuild ? `Build ${selectedBuild.buildId}` : 'Select Build'))
                    }
                  </span>
                  <ChevronDown className="w-[14px] h-[14px]" />
                </button>
                {isBuildDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[9995]"
                      onClick={() => setIsBuildDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-[45px] w-[130px] bg-[#1e1e1e] rounded-[8px] shadow-2xl z-[9999] border border-white/20 overflow-hidden">
                      {buildVersions.length > 0 ? (
                        buildVersions.map((build) => {
                          const buildId = typeof build === 'string' ? build : build.buildId;
                          const buildName = typeof build === 'string' ? build : (build.buildName || `Build ${build.buildId}`);
                          const isSelected = typeof selectedBuild === 'string'
                            ? selectedBuild === build
                            : selectedBuild?.buildId === build.buildId;

                          return (
                            <button
                              key={buildId}
                              onClick={() => {
                                onBuildChange(build);
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
                        })
                      ) : (
                        <div className="px-[16px] py-[12px] text-white/50 text-[14px] font-mono">
                          No builds found
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={onStartComparison}
            disabled={isLoading}
            className={`bg-black dark:bg-white text-white dark:text-black px-[16px] py-[11.798px] rounded-[7.26px] flex items-center gap-[9.075px] text-[14px] font-semibold hover:bg-black/90 dark:hover:bg-white/90 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>✦</span>
            )}
            <span>{isLoading ? 'Comparing...' : 'Start Comparing UI'}</span>
          </button>
        </div>
      </div>
    </div>

  );
}