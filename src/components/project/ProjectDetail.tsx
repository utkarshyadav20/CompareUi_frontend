import { useState } from "react";
import { RefreshCw, ChevronDown, Globe } from "lucide-react";
import { Project, Theme } from "../../types";
import { ProjectHeader } from "./ProjectHeader";
import { PROJECT_NAVIGATION_ITEMS } from "../../constants";
import { NotificationPanel } from "../common/NotificationPanel";
import { SmartImageDetail } from "./SmartImageDetail";
import { AndroidTVDetail } from "./AndroidTVDetail";
import { AndroidTVDetailFigma } from "./AndroidTVDetailFigma";
import { TestComparisonToast } from "../results/TestComparisonToast";
import { BaselineImageInput } from "../common/BaselineImageInput";
import { ControlBar } from "../common/ControlBar";

// Tabs
import { ActivityTab } from "../settings/ActivityTab";
import { ResultTab } from "../results/ResultTab";
import { DBConnectionTab } from "../settings/DBConnectionTab";
import { IntegrationTab } from "../settings/IntegrationTab";
import { SupportTab } from "../support/SupportTab";
import { SettingsTab } from "../settings/SettingsTab";
import { DetailedResult } from "../results/DetailedResult";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ProjectDetail({
  project,
  onBack,
  theme,
  onThemeChange,
}: ProjectDetailProps) {
  const [selectedMethod, setSelectedMethod] = useState<"Pixelmatch" | "Noise">(
    "Noise"
  );
  const [aiAgent, setAiAgent] = useState<"Yes" | "No">("Yes");
  const [threshold, setThreshold] = useState<string>("3x");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [baselineUrl, setBaselineUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>(
    project.type === "Smart Image" ? "testingpanel" : "overview"
  );
  const [openImageMenuId, setOpenImageMenuId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
    }>
  >([]);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteUrlError, setWebsiteUrlError] = useState(false);
  const [selectedBrowser, setSelectedBrowser] = useState<
    "Chrome" | "Safari" | "Microsoft Edge" | "Firefox"
  >("Chrome");
  const [isBrowserDropdownOpen, setIsBrowserDropdownOpen] = useState(false);
  const [showComparisonToast, setShowComparisonToast] = useState(false);

  // Result Tab State
  const [selectedBuild, setSelectedBuild] = useState("v1.0.234.1");
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const buildVersions = [
    "v1.0.235.1",
    "v1.0.234.1",
    "v1.0.233.1",
    "v1.0.232.1",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setUploadedImages((prev) => [
            ...prev,
            {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              url: e.target?.result as string,
              width: img.width,
              height: img.height,
            },
          ]);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // CSV upload logic would go here
    console.log("CSV file uploaded:", file.name);
  };

  const handleUrlSubmit = () => {
    if (!baselineUrl.trim()) return;
    // Add mock image for demonstration
    setUploadedImages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "Screen from URL",
        url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800",
        width: 1920,
        height: 1080,
      },
    ]);
    setBaselineUrl("");
  };

  const handleWebsiteUrlChange = (url: string) => {
    setWebsiteUrl(url);
    // Validate URL
    if (url && !url.match(/^https?:\/\/.+/)) {
      setWebsiteUrlError(true);
    } else {
      setWebsiteUrlError(false);
    }
  };

  // Standardized navigation items
  const navigationItems = PROJECT_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    active: activeTab === item.label.toLowerCase().replace(" ", ""),
  }));

  // Filter images based on search query
  const filteredImages = uploadedImages.filter((image) =>
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
        onThemeChange={onThemeChange}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
      />
    );
  }

  // Use Figma design for Android TV projects
  if (project.type === "Android TV") {
    return (
      <AndroidTVDetailFigma
        projectId={project.id}
        projectName={project.platform}
        platformType={project.platformType}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <ProjectHeader
        project={project}
        onBack={onBack}
        theme={theme}
        onThemeChange={onThemeChange}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
        isProfileMenuOpen={isProfileMenuOpen}
        onProfileMenuToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        navigationItems={navigationItems}
      />

      {/* Controls Bar - Show only on overview/testingpanel tab */}
      {(activeTab === "overview" || activeTab === "testingpanel") && (
        <ControlBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
          threshold={threshold}
          onThresholdChange={setThreshold}
          aiAgent={aiAgent}
          onAiAgentChange={setAiAgent}
          onStartComparison={() => setShowComparisonToast(true)}
        />
      )}

      {/* Main Content - Conditional rendering based on activeTab */}
      {(activeTab === "overview" || activeTab === "testingpanel") &&
      project.type === "Smart Image" ? (
        <SmartImageDetail projectId={project.id} />
      ) : (activeTab === "overview" || activeTab === "testingpanel") &&
        (project.type === "Mobile" || project.type === "Roku TV") ? (
        <AndroidTVDetail
          projectId={project.id}
          platformType={project.platformType}
          onStartComparison={() => setShowComparisonToast(true)}
        />
      ) : activeTab === "overview" || activeTab === "testingpanel" ? (
        <div className="px-4 md:px-8 py-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-280px)]">
          {/* Baselining Images */}
          <div className="w-full lg:w-[400px] bg-black/5 dark:bg-white/10 rounded-lg p-5 flex flex-col gap-5 border border-black/10 dark:border-white/10 max-h-[600px] lg:max-h-full">
            <BaselineImageInput
              images={filteredImages}
              hasImages={uploadedImages.length > 0}
              selectedImageId={selectedImageId}
              baselineUrl={baselineUrl}
              onBaselineUrlChange={setBaselineUrl}
              onUrlSubmit={handleUrlSubmit}
              onFileUpload={handleFileUpload}
              onCsvUpload={handleCsvUpload}
              onSelectImage={setSelectedImageId}
              onRefreshAll={() => console.log("Refresh all images")}
              onRemoveAll={() => {
                setUploadedImages([]);
                setSelectedImageId(null);
              }}
              onRemoveImage={(id) => {
                setUploadedImages((prev) =>
                  prev.filter((img) => img.id !== id)
                );
                if (selectedImageId === id) setSelectedImageId(null);
              }}
              onRefreshImage={(id) => console.log("Refresh image", id)}
              onReplaceImage={(id) => console.log("Replace image", id)}
            />
          </div>

          {/* Right Panel - Website Preview or Actual Build Images */}
          {project.type === "Website" ? (
            <div className="flex-1 bg-black/5 dark:bg-white/10 rounded-lg p-5 pb-3 flex flex-col gap-5 border border-black/10 dark:border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h3 className="text-black dark:text-white text-[20px]">
                    Live Website Preview
                  </h3>
                  <div className="bg-[rgba(3,46,21,0.5)] flex items-center gap-2 px-2 py-1.5 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-400 text-sm font-mono">
                      Sim Connected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="text-black dark:text-white text-sm">
                      Resolution :
                    </span>
                    <button className="bg-black/10 dark:bg-white/10 flex items-center gap-2 px-2.5 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/15 dark:hover:bg-white/15 transition-colors">
                      <RefreshCw className="w-3.5 h-3.5 text-black dark:text-white" />
                      <span className="text-black dark:text-white text-sm font-mono">
                        Fetch
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <span className="text-black dark:text-white text-sm">
                      Browser :
                    </span>
                    <button
                      onClick={() =>
                        setIsBrowserDropdownOpen(!isBrowserDropdownOpen)
                      }
                      className="flex items-center gap-2 px-2.5 py-2 rounded border border-green-500/30 hover:bg-green-500/10 transition-colors"
                    >
                      <span className="text-green-400 text-sm font-mono">
                        {selectedBrowser}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-green-400" />
                    </button>

                    {/* Browser Dropdown Menu */}
                    {isBrowserDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setIsBrowserDropdownOpen(false)}
                        />
                        <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#191919] border border-black/20 dark:border-white/30 rounded-md shadow-lg z-40 overflow-hidden">
                          <div className="p-1">
                            {(
                              [
                                "Chrome",
                                "Safari",
                                "Microsoft Edge",
                                "Firefox",
                              ] as const
                            ).map((browser) => (
                              <button
                                key={browser}
                                onClick={() => {
                                  setSelectedBrowser(browser);
                                  setIsBrowserDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2 flex items-center gap-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded ${
                                  selectedBrowser === browser
                                    ? "bg-black/5 dark:bg-white/5 text-green-400"
                                    : "text-black dark:text-white"
                                }`}
                              >
                                <span className="font-mono">{browser}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Browser Mockup */}
              <div className="flex-1 bg-[#09090b] rounded-[10px] p-4 pb-2 flex flex-col gap-3 border border-[#27272a]">
                {/* Browser Address Bar */}
                <div className="flex items-center gap-2 h-8">
                  {/* Traffic Lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>

                  {/* URL Input */}
                  <div className="flex-1 bg-white/5 rounded border border-white/50 flex items-center gap-2 px-2.5 py-2">
                    <Globe className="w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                      placeholder="Enter your live url here ..."
                      className="flex-1 bg-transparent text-black dark:text-white text-sm outline-none placeholder:text-black/50 dark:placeholder:text-white/50"
                    />
                  </div>

                  {/* Refresh Button */}
                  <button
                    onClick={() => {
                      // Force iframe reload by updating the key
                      if (websiteUrl && !websiteUrlError) {
                        const iframe = document.querySelector(
                          'iframe[title="Website Preview"]'
                        ) as HTMLIFrameElement;
                        if (iframe) {
                          iframe.src = iframe.src;
                        }
                      }
                    }}
                    className="bg-[#27272a] p-2 rounded hover:bg-[#3a3a3d] transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#9f9fa9]" />
                  </button>
                </div>

                {/* Browser Content Area */}
                <div className="flex-1 bg-[rgba(24,24,27,0.5)] rounded border border-[#3f3f46] flex items-center justify-center min-h-[400px] overflow-hidden relative">
                  {websiteUrlError ? (
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <p className="text-yellow-500 text-lg font-mono mb-2">
                        Invalid URL
                      </p>
                      <p className="text-[#71717b] text-sm font-mono">
                        Please enter a valid URL starting with http:// or
                        <br />
                        https://
                      </p>
                    </div>
                  ) : websiteUrl ? (
                    <iframe
                      key={websiteUrl}
                      src={websiteUrl}
                      className="w-full h-full border-0"
                      title="Website Preview"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-black dark:text-white text-lg font-mono mb-2">
                        Waiting
                      </p>
                      <p className="text-black/50 dark:text-[#71717b] text-sm font-mono">
                        Enter website URL to preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-black/5 dark:bg-white/10 rounded-lg p-5 flex flex-col items-center justify-center gap-10 border border-black/10 dark:border-white/10 min-h-[400px]">
              <div className="text-center">
                <p className="text-black dark:text-white text-lg mb-3 font-mono">
                  Receiving....
                </p>
                <p className="text-black/50 dark:text-white/50 font-mono">
                  Waiting for image to receive
                  <br />
                  from Android build
                </p>
              </div>
              <button className="flex items-center gap-2 text-black dark:text-white hover:opacity-80 transition-opacity">
                <RefreshCw className="w-4 h-4" />
                <span className="underline">Refresh</span>
              </button>
            </div>
          )}
        </div>
      ) : null}

      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "support" && <SupportTab />}
      {activeTab === "integration" && <IntegrationTab />}
      {activeTab === "activity" && <ActivityTab />}
      {activeTab === "dbconnection" && <DBConnectionTab />}
      {activeTab === "result" && (
        <ResultTab
          buildVersion={selectedBuild}
          selectedBuild={selectedBuild}
          buildVersions={buildVersions}
          onBuildChange={setSelectedBuild}
          onViewTest={handleViewTest}
        />
      )}

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Test Comparison Toast */}
      {showComparisonToast && (
        <TestComparisonToast
          onClose={() => setShowComparisonToast(false)}
          onViewReport={() => {
            console.log("View full report clicked");
            setShowComparisonToast(false);
            // Navigate to results tab or open results modal
            // You might want to switch activeTab to 'result' here if needed
            setActiveTab("result");
          }}
        />
      )}
    </div>
  );
}
