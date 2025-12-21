import { useState } from "react";
import { RefreshCw, ChevronDown, Globe } from "lucide-react";
import { Project } from "../../types";
import { ProjectHeader } from "./ProjectHeader";
import { PROJECT_NAVIGATION_ITEMS } from "../../constants";
import { NotificationPanel } from "../common/NotificationPanel";
import { SmartImageDetail } from "./SmartImageDetail";
import { AndroidTVDetail } from "./AndroidTVDetail";
import { AndroidTVDetailFigma } from "./AndroidTVDetailFigma";
import { TestComparisonToast } from "../results/TestComparisonToast";
import { BaselineImageInput } from "../common/BaselineImageInput";
import { ControlBar } from "../common/ControlBar";
import { BrowserPreview } from "../common/BrowserPreview";

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
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <ProjectHeader
        project={project}
        onBack={onBack}
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
        <div className="px-4 md:px-8 py-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-280px)] bg-background">
          {/* Baselining Images */}
          <div className="w-full lg:w-[400px] bg-muted rounded-lg p-5 flex flex-col gap-5 border border-border max-h-[600px] lg:max-h-full">
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
            <div className="flex-1 bg-muted rounded-lg p-5 pb-3 flex flex-col gap-5 border border-border">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <h3 className="text-foreground text-[20px]">
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
                    <span className="text-foreground text-sm">
                      Resolution :
                    </span>
                    <button className="bg-accent flex items-center gap-2 px-2.5 py-2 rounded border border-border hover:opacity-80 transition-opacity">
                      <RefreshCw className="w-3.5 h-3.5 text-foreground" />
                      <span className="text-foreground text-sm font-mono">
                        Fetch
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Browser Preview Component */}
              <BrowserPreview
                url={websiteUrl}
                onUrlChange={handleWebsiteUrlChange}
                selectedBrowser={selectedBrowser}
                onBrowserChange={setSelectedBrowser}
              />
            </div>
          ) : (
            <div className="flex-1 bg-muted rounded-lg p-5 flex flex-col items-center justify-center gap-10 border border-border min-h-[400px]">
              <div className="text-center">
                <p className="text-foreground text-lg mb-3 font-mono">
                  Receiving....
                </p>
                <p className="text-muted-foreground font-mono">
                  Waiting for image to receive
                  <br />
                  from Android build
                </p>
              </div>
              <button className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
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
