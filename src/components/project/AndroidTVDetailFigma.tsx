import { useState } from "react";
import {
  Search,
  Grid2X2,
  List,
  ArrowRight,
  Link as LinkIcon,
  Upload,
  Folder,
  X,
  RotateCw,
  Trash2,
  ChevronDown,
} from "lucide-react";
import svgPaths from "../../imports/svg-yp1cueaie8";
import { ResultTab } from "../results/ResultTab";
import { DetailedResult } from "../results/DetailedResult";
import { ActivityTab } from "../settings/ActivityTab";
import { DBConnectionTab } from "../settings/DBConnectionTab";
import { IntegrationTab } from "../settings/IntegrationTab";
import { SupportTab } from "../support/SupportTab";
import { SettingsTab } from "../settings/SettingsTab";
import {
  BaselineImage,
  BaselineImageInput,
} from "../common/BaselineImageInput";
import { ControlBar } from "../common/ControlBar";

import { ProjectHeader } from "./ProjectHeader";
import { Project, Theme } from "../../types";
import { PROJECT_NAVIGATION_ITEMS } from "../../constants";

interface AndroidTVDetailFigmaProps {
  projectId: string;
  projectName: string;
  platformType: string;
  onBack?: () => void;
}

export function AndroidTVDetailFigma({
  projectId,
  projectName = "Gray Media _ KTWX",
  platformType = "Android TV Physical Device",
  onBack,
}: AndroidTVDetailFigmaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMethod, setSelectedMethod] = useState<"Pixelmatch" | "Noise">(
    "Pixelmatch"
  );
  const [threshold, setThreshold] = useState("3x");
  const [selectedBuild, setSelectedBuild] = useState("v1.0.234.1");
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isThresholdDropdownOpen, setIsThresholdDropdownOpen] = useState(false);
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);
  const [baselineUrl, setBaselineUrl] = useState("");
  const [baselineImages, setBaselineImages] = useState<BaselineImage[]>([]);
  const [actualImages, setActualImages] = useState<BaselineImage[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("testingpanel");
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const buildVersions = [
    "v1.0.235.1",
    "v1.0.234.1",
    "v1.0.233.1",
    "v1.0.232.1",
  ];
  const thresholdOptions = ["1x", "2x", "3x", "4x", "5x"];

  const project: Project = {
    id: projectId,
    platform: projectName,
    platformType: platformType,
    status: "running", // specific status not passed, defaulting
    iconBg: "bg-transparent", // Custom styling used before
    type: "Android TV",
    timestamp: "",
    icon: (
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 37 37"
      >
        <rect fill="rgba(46, 255, 46, 0.4)" height="37" rx="8" width="37" />
        <path d={svgPaths.p824ec00} fill="white" />
      </svg>
    ),
  };

  const navigationItems = PROJECT_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    active: activeTab === item.label.toLowerCase().replace(" ", ""),
  }));

  // Helper handling for file inputs to reset value after selection allowing same file to be selected again
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handler: (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "baseline" | "actual"
    ) => void,
    type: "baseline" | "actual"
  ) => {
    handler(e, type);
    e.target.value = "";
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "baseline" | "actual"
  ) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const newImage: BaselineImage = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            url: e.target?.result as string,
            width: img.width,
            height: img.height,
          };

          if (type === "baseline") {
            setBaselineImages((prev) => [...prev, newImage]);
          } else {
            setActualImages((prev) => [...prev, newImage]);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      console.log("CSV Content:", content);
      alert(
        "CSV uploaded! In production, this would parse the CSV and fetch images from the URLs."
      );
    };
    reader.readAsText(file);

    // Reset input value
    event.target.value = "";
  };

  const handleUrlSubmit = () => {
    if (!baselineUrl.trim()) return;
    // Simulate adding images from Figma URL
    const mockImage: BaselineImage = {
      id: Date.now().toString(),
      name: "Homescreen.png",
      url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      width: 1920,
      height: 1080,
    };
    setBaselineImages((prev) => [...prev, mockImage]);
    console.log("Submitting Figma URL:", baselineUrl);
  };

  const handleDeleteImage = (id: string, type: "baseline" | "actual") => {
    if (type === "baseline") {
      setBaselineImages((prev) => prev.filter((img) => img.id !== id));
    } else {
      setActualImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  const handleDeleteAllBaseline = () => {
    if (confirm("Are you sure you want to delete all baseline images?")) {
      setBaselineImages([]);
    }
  };

  const handleBrowseFolder = () => {
    // Create a file input for folder browsing
    const input = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true;
    input.multiple = true;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            const newImage: BaselineImage = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              url: evt.target?.result as string,
              width: img.width,
              height: img.height,
            };
            setActualImages((prev) => [...prev, newImage]);
          };
          img.src = evt.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  };

  // Filter baseline images based on search query
  const filteredBaselineImages = baselineImages.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewTest = (testId: string) => {
    setSelectedTestId(testId);
  };

  const handleBackToResults = () => {
    setSelectedTestId(null);
  };

  // If viewing detailed result, show DetailedResult component
  if (selectedTestId) {
    const testCases = [
      { id: "1", name: "HomeScreen" },
      { id: "2", name: "ProfilePage" },
      { id: "3", name: "Settings" },
      { id: "4", name: "Notifications" },
      { id: "5", name: "Messages" },
      { id: "6", name: "Dashboard" },
      { id: "7", name: "HelpCenter" },
      { id: "8", name: "AboutUs" },
    ];
    const testCase = testCases.find((t) => t.id === selectedTestId);

    return (
      <DetailedResult
        testId={selectedTestId}
        testName={testCase?.name || "Detail Screen"}
        onBack={handleBackToResults}
        buildVersion="v12.224"
        theme={theme}
        onThemeChange={setTheme}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
      />
    );
  }

  return (
    <div className="bg-black flex flex-col gap-[2px] min-h-screen w-full">
      <ProjectHeader
        project={project}
        onBack={onBack || (() => {})}
        theme={theme}
        onThemeChange={setTheme}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        navigationItems={navigationItems}
      />

      {/* Conditional Content based on activeTab */}
      {activeTab === "result" ? (
        <ResultTab
          buildVersion={selectedBuild}
          selectedBuild={selectedBuild}
          buildVersions={buildVersions}
          onBuildChange={setSelectedBuild}
          onViewTest={handleViewTest}
        />
      ) : activeTab === "testingpanel" ? (
        <>
          {/* Controls Bar */}
          <div className="dark">
            <ControlBar
              searchQuery={searchQuery} // Figma view has filtering but maybe not exposed in UI previously? Ah wait, it didn't have search input visible in the screenshot code analysis, let me double check. Actually the screenshot analysis on line 41 shows `const [searchQuery, setSearchQuery] = useState("");` and line 197 uses it. BUT the inline JSX I'm replacing (lines 345-498) DOES NOT have a search input. It seems AndroidTVDetailFigma only had the right side controls. I will pass NO search props if it wasn't there, OR add it if requested.
              // Wait, looking at the previous analysis of AndroidTVDetailFigma lines 345-498...
              // It STARTS with `<div className="w-full"> <div className="flex items-center justify-end..."`.
              // "justify-end" implies no left content.
              // So for this file, I will NOT pass searchQuery props (or pass null/undefined), effectively hiding the search bar on the left, matching previous UI.

              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
              threshold={threshold}
              onThresholdChange={setThreshold}
              onStartComparison={() => console.log("Start Comparison")}
              selectedBuild={selectedBuild}
              onBuildChange={setSelectedBuild}
              buildVersions={buildVersions}
            />
          </div>

          {/* Main Content - Two Panels */}
          <div className="flex-1 flex px-[32px] pb-[25px]">
            {/* Left Panel - Baselining Images */}
            <div className="w-[384px] bg-white/10 border border-black flex flex-col shrink-0 overflow-hidden">
              <BaselineImageInput
                images={filteredBaselineImages}
                hasImages={baselineImages.length > 0}
                selectedImageId={selectedCardId}
                baselineUrl={baselineUrl}
                onBaselineUrlChange={setBaselineUrl}
                onUrlSubmit={handleUrlSubmit}
                onFileUpload={(e) =>
                  handleFileChange(e, handleImageUpload, "baseline")
                }
                onCsvUpload={(e) =>
                  handleFileChange(e, handleCSVUpload, "baseline")
                }
                onSelectImage={setSelectedCardId}
                onRefreshAll={() => console.log("Refresh all baseline images")}
                onRemoveAll={handleDeleteAllBaseline}
                onRemoveImage={(id) => handleDeleteImage(id, "baseline")}
                onRefreshImage={(id) => console.log("Refresh image", id)}
                onReplaceImage={(id) => console.log("Replace image", id)}
              />
            </div>

            {/* Right Panel - Actual Build Images */}
            <div className="flex-1 bg-white/10 border border-black p-[20px] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <p className="font-bold text-[20px] text-white mb-[20px]">
                Actual Build images
              </p>

              {actualImages.length === 0 ? (
                <>
                  <div className="flex-1" />
                  {/* Centered Content - Empty State */}
                  <div className="flex flex-col items-center gap-[37px] mb-auto">
                    <p className="text-[18px] font-mono text-white/50 text-center">
                      Waiting for image to receive
                      <br />
                      from Android build
                    </p>

                    <button
                      onClick={handleBrowseFolder}
                      className="flex items-center gap-[11px] text-[18px] text-white hover:opacity-80 transition-opacity"
                    >
                      <Folder className="w-[18px] h-[18px]" />
                      <span className="underline decoration-solid">
                        Browse Folder
                      </span>
                    </button>
                  </div>
                  <div className="flex-1" />
                </>
              ) : (
                <>
                  {/* Browse Folder Button when images exist */}
                  <div className="flex justify-end mb-[20px]">
                    <button
                      onClick={handleBrowseFolder}
                      className="flex items-center gap-[11px] text-[14px] text-white bg-white/10 px-[16px] py-[10px] rounded-[8px] hover:bg-white/20 transition-colors"
                    >
                      <Folder className="w-[16px] h-[16px]" />
                      <span>Browse Folder</span>
                    </button>
                  </div>

                  {/* Display Actual Images in Grid */}
                  <div className="grid grid-cols-3 gap-[15px]">
                    {actualImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[8px]">
                          <div className="flex flex-col items-center justify-center size-full">
                            <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip p-[6px] relative size-full">
                              {/* Filename and dimensions */}
                              <div className="content-stretch flex items-start justify-between leading-[normal] relative shrink-0 text-[12px] text-nowrap w-full">
                                <p
                                  className="font-bold overflow-ellipsis overflow-hidden relative shrink-0 text-white flex-1 mr-[8px]"
                                  style={{
                                    fontVariationSettings: "'opsz' 14",
                                  }}
                                  title={image.name}
                                >
                                  {image.name}
                                </p>
                                <p
                                  className="font-normal relative shrink-0 text-[rgba(255,255,255,0.2)]"
                                  style={{
                                    fontVariationSettings: "'opsz' 14",
                                  }}
                                >
                                  {image.width}x{image.height}
                                </p>
                              </div>

                              {/* Image */}
                              <div className="aspect-[16/9] relative rounded-[3px] shrink-0 w-full">
                                <img
                                  alt={image.name}
                                  className="absolute inset-0 max-w-none object-center object-cover pointer-events-none rounded-[3px] size-full"
                                  src={image.url}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            aria-hidden="true"
                            className="absolute border-[0.5px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteImage(image.id, "actual")}
                          className="absolute top-[5px] right-[5px] bg-red-500 text-white p-[6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                        >
                          <X className="w-[12px] h-[12px]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : activeTab === "activity" ? (
        <ActivityTab />
      ) : activeTab === "dbconnection" ? (
        <DBConnectionTab />
      ) : activeTab === "integration" ? (
        <IntegrationTab />
      ) : activeTab === "support" ? (
        <SupportTab />
      ) : activeTab === "settings" ? (
        <SettingsTab />
      ) : (
        <div className="px-[32px] py-[24px] text-white">
          <p className="text-white/50 text-center">
            Content for {activeTab} tab coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
