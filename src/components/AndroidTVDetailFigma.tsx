import { useState, useEffect, useRef } from "react";
import { uploadToCloudinary } from '../utils/cloudinary';
import {
  Search,
  Grid2X2,
  List,
  ArrowRight,
  Link as LinkIcon,
  Upload,
  Folder,
  X,
  ChevronLeft
} from "lucide-react";
// import imgFrame21 from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";
import svgPaths from "../imports/svg-yp1cueaie8";
import LoaderGif from "../assets/Loader.gif";
import { ResultTab } from "./ResultTab";
import { DetailedResult } from "./DetailedResult";
import { TestComparisonToast } from "./TestComparisonToast";
import { ActivityTab } from "./ActivityTab";
import { SettingsTab } from "./SettingsTab";
import { BaselineImage, BaselineImageInput } from "./ui/BaselineImageInput";
import { ControlBar } from "./ui/ControlBar";

import { ProjectHeader } from "./ProjectHeader";
import { Project, Theme } from "../types";
import { PROJECT_NAVIGATION_ITEMS } from "../constants";
import { ImageCard } from "./common/ImageCard";
import { EmptyState } from "./common/EmptyState";
import { ImageGrid } from "./common/ImageGridPanel";
import { FigmaApi } from '../api/generated';
import { API_BASE_URL } from '../api/config';
import apiClient from '../api/client';
import { Buffer } from 'buffer';

const mapScreenToImage = (screen: any): BaselineImage => ({
  id: screen.id ? screen.id.toString() : Date.now().toString(),
  name: screen.screenName,
  // The backend returns the URL directly in extractedImage
  url: screen.extractedImage || '',
  width: 0,
  height: 0,
});

interface AndroidTVDetailFigmaProps {
  projectId: string;
  projectName: string;
  platformType: string;
  onBack?: () => void;
  project: Project;
  // Build props
  buildVersions: any[];
  selectedBuild: any;
  onBuildChange: (build: any) => void;
  onStartComparison?: () => void;
}

export function AndroidTVDetailFigma({
  projectId,
  projectName = "Gray Media _ KTWX",
  platformType = "Android TV Physical Device",
  onBack,
  project: projectProp,
  buildVersions,
  selectedBuild,
  onBuildChange,
  onStartComparison
}: AndroidTVDetailFigmaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showComparisonToast, setShowComparisonToast] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMethod, setSelectedMethod] = useState<"Pixelmatch" | "Noise">(
    "Pixelmatch"
  );
  const [sensitivity, setSensitivity] = useState("3x");
  const [minScore, setMinScore] = useState<number>(80); // Default 93% match
  // const [selectedBuild, setSelectedBuild] = useState("v1.0.234.1"); // Removed internal state
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isSensitivityDropdownOpen, setIsSensitivityDropdownOpen] = useState(false);
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);
  const [baselineUrl, setBaselineUrl] = useState("");
  const [baselineImages, setBaselineImages] = useState<BaselineImage[]>([]);
  const [actualImages, setActualImages] = useState<BaselineImage[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("testingpanel");
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [theme, setTheme] = useState<Theme>("dark");

  /* Removed hardcoded buildVersions */
  const sensitivityOptions = ["1x", "2x", "3x", "4x", "5x"];

  // Use the passed project prop, but ensure we have fallback defaults if needed (though prop is required)
  const project: Project = projectProp || {
    id: projectId,
    platform: projectName,
    platformType: platformType,
    status: "running",
    iconBg: "bg-transparent",
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "baseline" | "actual"
  ) => {
    const files = event.target.files;
    if (!files) return;

    if (type === "baseline") {
      setLoadingActivity("image");
      try {
        await Promise.all(Array.from(files).map(async (file) => {
          try {
            // 1. Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(file);
            console.log(`Uploaded ${file.name} to Cloudinary: ${imageUrl}`);

            // 2. Create/Update screen in Backend
            let buildId: string | undefined = undefined;
            if (typeof selectedBuild === 'string') buildId = selectedBuild;
            else if (selectedBuild?.buildId) buildId = selectedBuild.buildId;

            await apiClient.post('/figma/upload-screen', {
              projectId,
              projectType: getApiProjectType(platformType),
              screenName: file.name,
              imageUrl: imageUrl,
              buildId: buildId
            });

            console.log(`Saved screen ${file.name} to backend`);
          } catch (err) {
            console.error(`Failed to upload ${file.name}`, err);
            // Optionally alert user or show toast
          }
        }));

        // 3. Refresh list
        await fetchScreens();
        alert('Images uploaded successfully!');
      } catch (error) {
        console.error("Batch upload failed", error);
        alert("Some images failed to upload.");
      } finally {
        setLoadingActivity(null);
      }
    } else {
      // Existing logic for 'actual' images (local preview)
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
            setActualImages((prev) => [...prev, newImage]);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Helper to map UI platform type to Backend Project Type
  const getApiProjectType = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('android tv')) return 'android tv';
    if (lower.includes('roku tv')) return 'roku tv';
    if (lower.includes('mobile')) return 'mobile';
    if (lower.includes('fire tv')) return 'fire tv';
    if (lower.includes('smart tv')) return 'smart tv';
    return lower;
  };

  const [loadingActivity, setLoadingActivity] = useState<"url" | "csv" | "image" | "compare" | "screens" | null>("screens");

  const fetchScreens = async () => {
    setLoadingActivity("screens");
    try {
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);
      const response = await figmaApi.figmaControllerGetScreens(projectId, apiProjectType);
      const screens = (response.data as unknown) as any[];

      if (screens && Array.isArray(screens)) {
        const mappedImages: BaselineImage[] = screens.map(mapScreenToImage);
        setBaselineImages(mappedImages);
      }
    } catch (error) {
      console.error('Failed to fetch screens:', error);
    } finally {
      setLoadingActivity(prev => prev === 'screens' ? null : prev);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchScreens();
    }
  }, [projectId]);

  // Fetch actual build images when selectedBuild changes
  useEffect(() => {
    if (activeTab !== "testingpanel") return;

    const fetchBuildScreenshots = async () => {
      let buildId = '';
      if (typeof selectedBuild === 'string') {
        buildId = selectedBuild;
      } else if (selectedBuild && selectedBuild.buildId) {
        buildId = selectedBuild.buildId;
      }

      if (!projectId || !buildId) {
        setActualImages([]); // Clear if no build selected
        return;
      }

      try {
        // Only show overall loading for builds if needed, or maybe separate?
        // Let's use generic 'compare' or add specific 'build' if needed, but for now reuse null or separate
        // Actually, previous code set isLoading(true) here. Let's map it to 'compare' or similar to block generic UI if needed,
        // but user only asked for Uploads separation. Let's keep it null or 'compare' if controls need to lock.
        // Actually, the button says "Start Comparing". Fetching screenshots is different.
        // Let's just NOT block upload inputs during build screenshot fetch unless requested.
        // But to be safe and match `isLoading` behavior:
        // setLoadingActivity("compare"); // Or create new "fetching_build" state?
        // User asked for "uploading csv... uploading url...".
        // Let's leave this one alone or set it to 'compare' if it locks the UI.
        // The original code locked everything with `isLoading`.
        // Let's safely set it to 'compare' so it doesn't trigger upload spinners.
        setLoadingActivity("compare");
        const response = await apiClient.get('/screenshot/get-screenshots', {
          params: { projectId, buildId }
        });

        const fetchedImages: BaselineImage[] = response.data.map((s: any) => ({
          id: s.id ? s.id.toString() : Date.now().toString() + Math.random(),
          name: s.imageName,
          url: s.screenshot,
          width: 0,
          height: 0
        }));

        setActualImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch build screenshots:', error);
      } finally {
        setLoadingActivity(null);
      }
    };

    fetchBuildScreenshots();
  }, [projectId, selectedBuild, activeTab]);

  // Effect to calculate dimensions for images that don't have them
  useEffect(() => {
    actualImages.forEach((img) => {
      if ((!img.width || !img.height) && img.url) {
        const image = new Image();
        image.src = img.url;
        image.onload = () => {
          setActualImages((prevImages) =>
            prevImages.map((prevImg) =>
              prevImg.id === img.id ? { ...prevImg, width: image.width, height: image.height } : prevImg
            )
          );
        };
      }
    });
  }, [actualImages]);

  const handleRefreshOne = async (screenName: string) => {
    try {
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);
      const response = await figmaApi.figmaControllerGetScreen(projectId, apiProjectType, screenName);
      const updatedScreen = response.data as any;

      if (updatedScreen) {
        const updatedImage = mapScreenToImage(updatedScreen);
        setBaselineImages(prev => prev.map(img => img.name === screenName ? updatedImage : img));
        console.log(`Refreshed screen: ${screenName}`);
      }
    } catch (error) {
      console.error(`Failed to refresh screen ${screenName}:`, error);
      alert(`Failed to refresh screen ${screenName}`);
    }
  };

  const handleRefreshAll = async () => {
    try {
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);
      const response = await figmaApi.figmaControllerUpdateAllScreens(projectId, apiProjectType);
      const updatedScreens = (response.data as unknown) as any[];

      if (updatedScreens && Array.isArray(updatedScreens)) {
        const mappedImages: BaselineImage[] = updatedScreens.map(mapScreenToImage);
        setBaselineImages(mappedImages);
        console.log('Refreshed all screens');
      }
    } catch (error) {
      console.error('Failed to refresh all screens:', error);
      alert('Failed to refresh all screens');
    }
  };

  const [replacingImageId, setReplacingImageId] = useState<string | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceImage = (id: string) => {
    setReplacingImageId(id);
    replaceInputRef.current?.click();
  };

  const handleReplaceFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !replacingImageId) return;

    const imageToReplace = baselineImages.find(img => img.id === replacingImageId);
    if (!imageToReplace) return;

    try {
      setLoadingActivity("image");

      // 1. Delete the old image
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);

      try {
        await figmaApi.figmaControllerDeleteScreen(projectId, apiProjectType, imageToReplace.name);
        console.log(`Deleted old screen: ${imageToReplace.name}`);
      } catch (err) {
        console.warn('Failed to delete old screen (might not exist or other error), proceeding with upload...', err);
        // We proceed even if delete fails, assuming we want to overwrite or add the new one
      }

      // 2. Upload new image to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      console.log(`Uploaded new image to Cloudinary: ${imageUrl}`);

      // 3. Create new manual screen with filename as screenName
      await apiClient.post('/figma/upload-screen', {
        projectId,
        projectType: apiProjectType,
        screenName: file.name,
        imageUrl: imageUrl
      });

      console.log(`Created new screen: ${file.name}`);

      // 4. Refresh list
      await fetchScreens();
      alert('Image replaced successfully.');

    } catch (error) {
      console.error('Failed to replace image:', error);
      alert('Failed to replace image.');
    } finally {
      setLoadingActivity(null);
      setReplacingImageId(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const filterInputRef = useRef<HTMLInputElement>(null); // For future use if needed

  const handleDeleteOne = async (screenName: string) => {
    if (!confirm(`Are you sure you want to delete screen: ${screenName}?`)) return;

    try {
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);
      await figmaApi.figmaControllerDeleteScreen(projectId, apiProjectType, screenName);
      setBaselineImages(prev => prev.filter(img => img.name !== screenName));
      console.log(`Deleted screen: ${screenName}`);
    } catch (error) {
      console.error(`Failed to delete screen ${screenName}:`, error);
      alert(`Failed to delete screen ${screenName}`);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all baseline images? This cannot be undone.")) return;

    try {
      const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);
      const apiProjectType = getApiProjectType(platformType);
      await figmaApi.figmaControllerDeleteAllScreens(projectId, apiProjectType);
      setBaselineImages([]);
      console.log('Deleted all screens');
    } catch (error) {
      console.error('Failed to delete all screens:', error);
      alert('Failed to delete all screens');
    }
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      setLoadingActivity("csv");
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n');
        const screens: Array<{ Screen_name: string; screen_figma_url: string; node_id: string }> = [];

        // Skip header if it exists (basic check)
        const startIndex = rows[0].toLowerCase().includes('screen') ? 1 : 0;

        for (let i = startIndex; i < rows.length; i++) {
          const row = rows[i].trim();
          if (!row) continue;

          // Assuming CSV format: "Figma URL, Screen Name" or "Screen Name, Figma URL"
          const columns = row.split(',').map(c => c.trim());

          if (columns.length < 2) continue;

          let url = '';
          let name = '';

          if (columns[0].includes('http')) {
            url = columns[0];
            name = columns[1];
          } else if (columns[1].includes('http')) {
            url = columns[1];
            name = columns[0];
          }

          if (url && name) {
            try {
              const urlObj = new URL(url);
              let nodeId = urlObj.searchParams.get('node-id');

              if (nodeId) {
                screens.push({
                  Screen_name: name,
                  screen_figma_url: url,
                  node_id: nodeId
                });
              } else {
                console.warn(`Skipping row, no node-id found in URL: ${url}`);
              }
            } catch (err) {
              console.error('Invalid URL:', url);
            }
          }
        }

        if (screens.length > 0) {
          const figmaApi = new FigmaApi(undefined, API_BASE_URL, apiClient);

          let buildId: string | undefined = undefined;
          if (typeof selectedBuild === 'string') buildId = selectedBuild;
          else if (selectedBuild?.buildId) buildId = selectedBuild.buildId;

          await figmaApi.figmaControllerCreate({
            project_id: projectId,
            figma_data: screens,
            build_id: buildId
          });
          await fetchScreens();
          alert('Images imported successfully from CSV.');
        } else {
          alert('No valid screens found in CSV.');
        }
      } catch (error) {
        console.error('Failed to upload screens:', error);
        alert('Failed to upload screens from CSV.');
      } finally {
        setLoadingActivity(null);
      }
    };
    reader.readAsText(file);

    // Reset input value
    event.target.value = "";
  };

  const handleUrlSubmit = async () => {
    if (!baselineUrl.trim()) return;

    // Basic Figma URL validation
    if (!baselineUrl.includes('figma.com') || !baselineUrl.includes('node-id')) {
      alert("Invalid Figma URL. Please ensure it contains 'node-id' to point to a specific frame.");
      return;
    }

    setLoadingActivity("url");
    try {
      // Determine screen name suffix from URL if possible
      let screenNameSuffix = "";
      try {
        const urlObj = new URL(baselineUrl);
        const nodeId = urlObj.searchParams.get('node-id');
        if (nodeId) {
          screenNameSuffix = ` ${nodeId}`;
        }
      } catch (e) { }

      const screenName = `Screen${screenNameSuffix}`;

      let buildId: string | undefined = undefined;
      if (typeof selectedBuild === 'string') buildId = selectedBuild;
      else if (selectedBuild?.buildId) buildId = selectedBuild.buildId;

      // 1. Extract AND Save via backend in one go
      const response = await apiClient.post('/figma/extract-image', {
        url: baselineUrl,
        projectId,
        projectType: getApiProjectType(platformType),
        screenName: screenName,
        buildId: buildId
      });

      const { imageUrl, savedScreen } = response.data;

      if (!imageUrl) {
        throw new Error("Failed to extract image");
      }

      console.log(`Added Figma screen: ${screenName} -> ${imageUrl}`);

      // 2. Refresh list and clear input
      await fetchScreens();
      setBaselineUrl("");
      alert("Figma screen added successfully!");

    } catch (error: any) {
      console.error("Failed to add Figma screen:", error);
      const msg = error.response?.data?.message || "Failed to add Figma screen. Check console.";
      alert(msg);
    } finally {
      setLoadingActivity(null);
    }
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
    console.log("Setting selectedTestId:", testId);
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
        testName={testCase?.name || selectedTestId || "Detail Screen"}
        projectId={projectId}
        projectName={projectName || project.platform}
        platformType={getApiProjectType(platformType)}
        onBack={handleBackToResults}
        buildVersion={typeof selectedBuild === 'string' ? selectedBuild : selectedBuild?.buildId || "v12.224"}
        buildVersions={buildVersions}
        onBuildChange={onBuildChange}
        theme={theme}
        onThemeChange={setTheme}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}

      />
    );
  }

  const handleStartComparison = async () => {
    console.log("Start Comparison clicked. Actual Images:", actualImages.length);
    if (actualImages.length === 0) {
      alert("Please upload at least one actual build image to compare.");
      return;
    }

    setShowComparisonToast(true);
    // if (onStartComparison) onStartComparison(); // Optional: keep if parent needs to know

    setLoadingActivity("compare");
    try {
      const screenshotsPayload = await Promise.all(actualImages.map(async (img) => {
        let imageUrl = img.url;

        // If the URL is a blob or data URL (local), upload to Cloudinary
        if (imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], img.name, { type: blob.type });
            imageUrl = await uploadToCloudinary(file);
            console.log(`Uploaded ${img.name} to Cloudinary: ${imageUrl}`);
          } catch (uploadError) {
            console.error(`Failed to upload ${img.name} to Cloudinary:`, uploadError);
            // Fallback? Or throw? Throwing stops the comparison which is probably correct.
            throw new Error(`Failed to upload image ${img.name}`);
          }
        }

        return {
          image: imageUrl,
          imageName: img.name
        };
      }));

      // Use selectedBuild id if available, otherwise undefined (backend creates new one)
      // If selectedBuild is just a string (mock), ignore it? Or pass it?
      // The prop `selectedBuild` might be an object or string. logic in ResultTab handled both.
      // Let's assume for now if it has .buildId use it.
      let buildIdParam = undefined;
      if (selectedBuild && typeof selectedBuild === 'object' && selectedBuild.buildId) {
        buildIdParam = selectedBuild.buildId;
      }

      // Prepare query params
      const queryParams = new URLSearchParams({
        projectId,
        projectType: getApiProjectType(platformType),
        // Send sensitivity as is or parsed? User requested "pass sensitivity in payload". 
        // Backend `compare.controller.ts` line 27: `queryDto.sensitivity ? parseInt(queryDto.sensitivity) : undefined`.
        // parseInt("3x") returns 3. So passing "3x" string is fine.
        sensitivity: sensitivity.replace('x', ''),
        minScore: minScore ? minScore.toString() : '93',
      });
      if (buildIdParam) {
        queryParams.append('buildId', buildIdParam);
      }

      await apiClient.post(`/compare/run?${queryParams.toString()}`, {
        screenshots: screenshotsPayload
      });

      alert("Comparison completed successfully!");
      setActiveTab("result");
      // Optionally refresh builds list if a callback exists
      // onBuildRefresh?.(); 
    } catch (error) {
      console.error("Comparison failed:", error);
      alert("Comparison failed. Check console for details.");
    } finally {
      setLoadingActivity(null);
    }
  };

  return (
    <div className="bg-black flex flex-col gap-[2px] min-h-screen w-full">
      <ProjectHeader
        project={project}
        onBack={onBack || (() => { })}
        theme={theme}
        onThemeChange={setTheme}
        isNotificationOpen={isNotificationOpen}
        onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}

        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        navigationItems={navigationItems}
      />

      {/* Conditional Content based on activeTab */}
      {activeTab === "result" ? (
        <div className="overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
            <ResultTab
              projectId={projectId}
              projectName={projectName}
              projectType={getApiProjectType(platformType)}
              buildVersion={typeof selectedBuild === 'string' ? selectedBuild : (selectedBuild?.buildName || selectedBuild?.buildId)}
              selectedBuild={selectedBuild}
              buildVersions={buildVersions}
              onBuildChange={onBuildChange}
              onViewTest={handleViewTest}
            />
          </div>
        </div>
      ) : activeTab === "testingpanel" ? (
        <>
          {/* Controls Bar */}
          <div className="dark">
            {/* ... ControlBar ... */}
            <ControlBar
              searchQuery={searchQuery} // Figma view has filtering but maybe not exposed in UI previously? Ah wait, it didn't have search input visible in the screenshot code analysis, let me double check. Actually the screenshot analysis on line 41 shows `const [searchQuery, setSearchQuery] = useState("");` and line 197 uses it. BUT the inline JSX I'm replacing (lines 345-498) DOES NOT have a search input. It seems AndroidTVDetailFigma only had the right side controls. I will pass NO search props if it wasn't there, OR add it if requested.
              // Wait, looking at the previous analysis of AndroidTVDetailFigma lines 345-498...
              // It STARTS with `<div className="w-full"> <div className="flex items-center justify-end..."`.
              // "justify-end" implies no left content.
              // So for this file, I will NOT pass searchQuery props (or pass null/undefined), effectively hiding the search bar on the left, matching previous UI.

              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
              sensitivity={sensitivity}
              onSensitivityChange={setSensitivity}
              minScore={minScore}
              onMinScoreChange={setMinScore}
              onStartComparison={handleStartComparison}
              selectedBuild={selectedBuild}
              onBuildChange={onBuildChange}
              buildVersions={buildVersions}
              isLoading={loadingActivity === "compare"}
            />
          </div>

          {/* Main Content - Two Panels */}
          <div className="flex px-[32px] pb-[25px] overflow-hidden gap-[32px]" style={{ height: 'calc(97vh - 180px)' }}>
            <div className="flex" >
              {/* Left Panel - Baselining Images */}
            <div className="w-[384px]  border border-black flex flex-col shrink-0 overflow-hidden"style={{background:'#151515',border:'1px solid #333333',  borderRadius:'12px 0px 0px 12px'}}>
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
                loadingActivity={loadingActivity}
                onSelectImage={setSelectedCardId}
                onRefreshAll={handleRefreshAll}
                onRemoveAll={handleDeleteAll}
                onRemoveImage={(id) => {
                  const img = baselineImages.find(i => i.id === id);
                  if (img) handleDeleteOne(img.name);
                }}
                onRefreshImage={(id) => {
                  const img = baselineImages.find(i => i.id === id);
                  if (img) handleRefreshOne(img.name);
                }}
                onReplaceImage={handleReplaceImage}
              />
              {/* Hidden input for replace */}
              <input
                type="file"
                ref={replaceInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleReplaceFileChange}
              />
            </div>

            {/* Right Panel - Actual Build Images */}
            <div className="flex-1  border border-black p-[20px] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"style={{background: '#1A1A1A',border:'1px solid #333333', borderRadius:'0px 12px 12px 0px' }}>
              <div className="flex justify-between mb-[20px]">
                <p className="text-[#929292] text-[12px] font-medium uppercase">
                  Actual Build images
                </p>
                <button
                  onClick={handleBrowseFolder}
                  className="flex items-center gap-[11px] text-[14px] text-white bg-white/10 px-[16px] py-[10px] rounded-[8px] hover:bg-white/20 transition-colors"
                >
                  <Folder className="w-[16px] h-[16px]" />
                  <span>Browse Folder</span>
                </button>
              </div>

              {loadingActivity === "compare" ? (
                <div className="flex-1 flex items-center justify-center">
                  <img src={LoaderGif} alt="Loading..." style={{ height: "10rem" }} />
                </div>
              ) : actualImages.length === 0 ? (
                <EmptyState
                  icon={Folder}
                  description={
                    <>
                      Waiting for image to receive
                      <br />
                      from Android build
                    </>
                  }
                  action={
                    <button
                      onClick={handleBrowseFolder}
                      className="flex items-center gap-[11px] text-[18px] text-white hover:opacity-80 transition-opacity"
                    >
                      <Folder className="w-[18px] h-[18px]" />
                    </button>
                  }
                />
              ) : (
                <>

                  {/* Display Actual Images in Grid */}
                  <ImageGrid className="grid-cols-3 gap-[15px]">
                    {actualImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <ImageCard
                          id={image.id}
                          name={image.name}
                          url={image.url}
                          width={image.width}
                          height={image.height}
                          isSelected={selectedCardId === image.id}
                          onSelect={setSelectedCardId}
                          className="bg-[rgba(255,255,255,0.05)]"
                        />
                        <button
                          onClick={() => handleDeleteImage(image.id, "actual")}
                          className="absolute top-[5px] right-[5px] bg-red-500 text-white p-[6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                        >
                          <X className="w-[12px] h-[12px]" />
                        </button>
                      </div>
                    ))}
                  </ImageGrid>
                </>
              )}
            </div>
            </div>
          </div>
        </>
      ) : activeTab === "activity" ? (
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/20" style={{ height: 'calc(100vh - 100px)' }}>
          <ActivityTab />
        </div>
      ) : activeTab === "settings" ? (
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/20" style={{ height: 'calc(100vh - 100px)' }}>
          <SettingsTab />
        </div>
      ) : (
        <div className="px-[32px] py-[24px] text-white">
          <p className="text-white/50 text-center">
            Content for {activeTab} tab coming soon...
          </p>
        </div>
      )}
      {/* Test Comparison Toast */}
      {showComparisonToast && (
        <TestComparisonToast
          onClose={() => setShowComparisonToast(false)}
          onViewReport={() => {
            console.log("View full report clicked (local)");
            setShowComparisonToast(false);
            setActiveTab("result");
          }}
        />
      )}
    </div>
  );
}
