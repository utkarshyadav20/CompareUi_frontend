import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Project, Theme } from "../types";
import { ProjectHeader } from "./ProjectHeader";
import { PROJECT_NAVIGATION_ITEMS } from "../constants";
import { NotificationPanel } from "./NotificationPanel";
import { SmartImageDetail } from "./SmartImageDetail";
import { AndroidTVDetail } from "./AndroidTVDetail";
import { AndroidTVDetailFigma } from "./AndroidTVDetailFigma";
import { TestComparisonToast } from "./TestComparisonToast";
import { BaselineImageInput } from "./ui/BaselineImageInput";
import { ControlBar } from "./ui/ControlBar";
import { BrowserPreview } from "./common/BrowserPreview";
import { EmptyState } from "./common/EmptyState";
import apiClient from '../api/client';

// Tabs
import { ActivityTab } from "./ActivityTab";
import { ResultTab } from "./ResultTab";
import { SettingsTab } from "./SettingsTab";
import { DetailedResult } from "./DetailedResult";

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
  /* Removed duplicate websiteUrl declaration */
  const [showComparisonToast, setShowComparisonToast] = useState(false);

  // Build State
  const [builds, setBuilds] = useState<any[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<any | null>(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await apiClient.get('/project/builds', {
          params: { projectId: project.id }
        });
        console.log('Fetched builds:', response.data);
        setBuilds(response.data);
        if (response.data.length > 0) {
          // Default to the first build
          setSelectedBuild(response.data[0]);
        } else {
          console.log('No builds found for project:', project.id);
        }
      } catch (error) {
        console.error('Failed to fetch builds:', error);
      }
    };
    fetchBuilds();
  }, [project.id]);

  // Result Tab State
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

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

  // Use Figma design for Android TV, Roku TV, and Mobile projects
  if (project.type === "Android TV" || project.type === "Roku TV" || project.type === "Mobile") {
    return (
      <AndroidTVDetailFigma
        projectId={project.id}
        projectName={project.platform}
        platformType={project.platformType}
        onBack={onBack}
        project={project}
        buildVersions={builds}
        selectedBuild={selectedBuild}
        onBuildChange={setSelectedBuild}
        onStartComparison={() => setShowComparisonToast(true)}
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
          buildVersions={builds}
          selectedBuild={selectedBuild}
          onBuildChange={setSelectedBuild}
        />
      )}

      {/* Main Content - Conditional rendering based on activeTab */}
      {(activeTab === "overview" || activeTab === "testingpanel") &&
        project.type === "Smart Image" ? (
        <SmartImageDetail projectId={project.id} />
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
            <BrowserPreview
              url={websiteUrl}
              onUrlChange={setWebsiteUrl}
              status="connected"
            />
          ) : (
            <EmptyState
              icon={RefreshCw}
              title="Receiving..."
              description={
                <>
                  Waiting for image to receive
                  <br />
                  from Android build
                </>
              }
              action={
                <button className="flex items-center gap-2 text-black dark:text-white hover:opacity-80 transition-opacity underline">
                  Refresh
                </button>
              }
              className="bg-black/5 dark:bg-white/10 rounded-lg border border-black/10 dark:border-white/10 min-h-[400px]"
            />
          )}
        </div>
      ) : null}


      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "activity" && <ActivityTab />}
      {activeTab === "result" && (
        <ResultTab
          buildVersion={selectedBuild?.buildName || ""}
          selectedBuild={selectedBuild}
          buildVersions={builds}
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
