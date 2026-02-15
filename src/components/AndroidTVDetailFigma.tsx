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
    ChevronLeft,
    Download,
    Trash2,
    RefreshCw,
    Maximize2,
    Plus,
    FileCode,
    Save,
    Terminal
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
import AutomationSteps from "./automation/AutomationSteps";
import { Step } from "./automation/StepRow";
import GlobalVariables, { Variable } from "./automation/GlobalVariables/GlobalVariables";
import { generateFullFile, generateRunnerFile, generateCompareAppFile } from '../utils/javaGenerator';

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
    const [allSteps, setAllSteps] = useState<Record<string, Step[]>>({});

    // Global Variables State with Defaults
    const [serverVariables, setServerVariables] = useState<Variable[]>([
        { id: 1, name: 'ANDROID_TV_UDID', value: '' },
        { id: 2, name: 'APK_PATH', value: '' },
        { id: 3, name: 'PACKAGE_NAME', value: '' },
        { id: 4, name: 'APPIUM_URL', value: '' },
        { id: 5, name: 'SS_CAPTURE_FOLDER', value: '' },
        { id: 6, name: 'ADB_PATH', value: '' },
        { id: 7, name: 'APPIUM_JS_PATH', value: '' }
    ]);

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
    const [activeView, setActiveView] = useState<'screenshots' | 'automation' | 'variables'>('screenshots');

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

    // Derived build ID for dependencies
    const currentBuildId = typeof selectedBuild === 'string' ? selectedBuild : selectedBuild?.buildId;

    // State for fetched screen order
    const [fetchedScreenOrder, setFetchedScreenOrder] = useState<string[]>([]);

    // Fetch automation code when build changes
    useEffect(() => {
        const fetchAutomation = async () => {
            if (!projectId || !currentBuildId) return;

            try {
                const response = await apiClient.get('/automation/fetch', {
                    params: { projectId, buildId: currentBuildId }
                });
                const { automationCode, variables, screenOrder } = response.data;
                if (automationCode) {
                    setAllSteps(automationCode);
                }
                if (variables) {
                    setServerVariables(prev => prev.map(v => ({
                        ...v,
                        value: variables[v.name] || v.value
                    })));
                }
                if (screenOrder && Array.isArray(screenOrder)) {
                    setFetchedScreenOrder(screenOrder);
                }
            } catch (error) {
                console.log('No automation code found or failed to fetch', error);
            }
        };
        fetchAutomation();
    }, [projectId, currentBuildId]);

    // Sync baselineImages order with automationCode keys order (persists reorder on refresh)
    useEffect(() => {
        // Only run if both data sources are available
        if (baselineImages.length === 0 || fetchedScreenOrder.length === 0) return;

        // Create a map for order index specific to screenOrder
        const orderMap = new Map(fetchedScreenOrder.map((name, index) => [name, index]));

        // Check if the current baselineImages are already in the order defined by automationCode
        // We only care about the relative order of images that EXIST in automationCode.
        // Images NOT in automationCode will be at the end, in their current relative order.

        const sortedImages = [...baselineImages].sort((a, b) => {
            const indexA = orderMap.has(a.name) ? orderMap.get(a.name)! : Number.MAX_SAFE_INTEGER;
            const indexB = orderMap.has(b.name) ? orderMap.get(b.name)! : Number.MAX_SAFE_INTEGER;

            // If both are not in automation code (MAX_SAFE_INTEGER), keep original relative order
            // JavaScript sort is stable for equal values, so returning 0 keeps them.
            return indexA - indexB;
        });

        // Create semantic string to compare order
        const currentOrderStr = baselineImages.map(img => img.name).join('|');
        const newOrderStr = sortedImages.map(img => img.name).join('|');

        if (currentOrderStr !== newOrderStr) {
            console.log("Restoring screen order from automation code...");
            setBaselineImages(sortedImages);
        }
    }, [allSteps, baselineImages.length]); // Depend on length to avoid loop on object reference change, but re-run if list changes

    const handleSaveAutomation = async () => {
        let buildId: string | undefined = undefined;
        if (typeof selectedBuild === 'string') buildId = selectedBuild;
        else if (selectedBuild?.buildId) buildId = selectedBuild.buildId;

        if (!projectId || !buildId) {
            alert("Project ID or Build ID missing");
            return;
        }

        // Convert variables array to object { Name: Value }
        const variablesObj = serverVariables.reduce((acc, curr) => ({
            ...acc,
            [curr.name]: curr.value
        }), {});

        // Filter AND Order allSteps based on baselineImages
        const filteredAutomationCode: Record<string, Step[]> = {};
        baselineImages.forEach(img => {
            if (allSteps[img.name]) {
                filteredAutomationCode[img.name] = allSteps[img.name];
            }
        });

        console.log('Saving automation with steps:', filteredAutomationCode);

        try {
            await apiClient.post('/automation/save', {
                projectId,
                buildId,
                automationCode: filteredAutomationCode, // Send filtered structure
                variables: variablesObj,
                screenOrder: baselineImages.map(img => img.name)
            });
            alert("Automation saved successfully!");
        } catch (error) {
            console.error("Failed to save automation:", error);
            alert("Failed to save automation.");
        }
    };

    const handleAddStep = () => {
        // Find current screen name
        const selectedImage = baselineImages.find(img => img.id === selectedCardId);
        const screenName = selectedImage ? selectedImage.name : "Homescreen"; // Fallback

        // Get current steps for this screen or empty array
        const currentSteps = allSteps[screenName] || [];

        const newStep: Step = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'Wait',
            action: 'visibilityOfElementLocated',
            value: '',
            locatorType: 'UI Automator'
        };

        const updatedSteps = [...currentSteps, newStep];

        // Update allSteps state
        setAllSteps(prev => ({
            ...prev,
            [screenName]: updatedSteps
        }));
    };

    const handleExportJava = async () => {
        // Save first
        try {
            await handleSaveAutomation();
        } catch (error) {
            console.error("Failed to save before export:", error);
        }

        // Convert allSteps record to PageFlow dictionary, preserving order from baselineImages
        const pages = baselineImages
            .filter(img => allSteps[img.name]) // Only include screens with steps
            .map(img => ({
                name: img.name,
                steps: allSteps[img.name]
            }));

        const javaCode = generateFullFile(pages);
        const blob = new Blob([javaCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GrayTVAutomation.java';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleRunAutomation = async () => {
        try {
            await handleSaveAutomation(); // Save changes first

            // Convert to format needed for file generation, preserving order
            const pages = baselineImages
                .filter(img => allSteps[img.name])
                .map(img => ({
                    name: img.name,
                    steps: allSteps[img.name]
                }));

            const fullCode = generateFullFile(pages);
            const runnerCode = generateRunnerFile(pages);
            const compareAppCode = generateCompareAppFile(pages);

            const filePath = '../src/test/java/com/framework/flows/GrayTVAutomation.java';
            const runnerPath = '../src/test/java/Runner/AndroidTVOnlyRunner.java';
            const compareAppPath = '../src/test/java/Runner/CompareApp.java';

            // 1. Prepare Config from Global Variables
            const getValue = (key: string) => serverVariables.find(v => v.name === key)?.value || "";

            // Helper to get filename from path (handles both / and \)
            const extractFilename = (pathStr: string) => pathStr.split(/[/\\]/).pop() || "";

            const apkPath = getValue('APK_PATH');
            const apkFilename = extractFilename(apkPath);

            // Map to container paths based on universal config
            const containerApkPath = apkPath ? `/app/input/${apkFilename}` : "";
            const containerOutputPath = "/app/output";

            const configData = {
                ANDROID_TV_UDID: getValue('ANDROID_TV_UDID'),
                APK_PATH: containerApkPath,
                PACKAGE_NAME: getValue('PACKAGE_NAME'),
                APPIUM_URL: getValue('APPIUM_URL'),
                SS_CAPTURE_FOLDER: containerOutputPath,
                ADB_PATH: getValue('ADB_PATH'),
                APPIUM_JS_PATH: getValue('APPIUM_JS_PATH')
            };

            const configPath = '../src/test/resources/config.json';

            // 2. Save Files
            const saveFile = async (path: string, content: string) => {
                const response = await fetch('http://localhost:4000/api/save-file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filePath: path, content })
                });
                if (!response.ok) throw new Error(await response.text());
            };

            await saveFile(configPath, JSON.stringify(configData, null, 4));
            await saveFile(filePath, fullCode);
            await saveFile(runnerPath, runnerCode);
            await saveFile(compareAppPath, compareAppCode);


            // 2. Trigger Run
            const runResponse = await fetch('http://localhost:4000/api/run-tv-automation', {
                method: 'POST'
            });
            if (!runResponse.ok) throw new Error(await runResponse.text());

            alert('🚀 Automation run triggered successfully!');

        } catch (error: any) {
            console.error('Failed to run automation:', error);
            alert(`❌ Error running automation: ${error.message || error}`);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchScreens();
        }
    }, [projectId]);

    useEffect(() => {
        if (!selectedCardId && baselineImages.length > 0) {
            setSelectedCardId(baselineImages[0].id);
        }
    }, [selectedCardId, baselineImages]);

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

    const [baselineSearchQuery, setBaselineSearchQuery] = useState("");

    // Filter baseline images based on search query
    const filteredBaselineImages = baselineImages.filter((img) =>
        img.name.toLowerCase().includes(baselineSearchQuery.toLowerCase())
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
                        <div className="flex" style={{ width: '100%' }}>
                            {/* Left Panel - Baselining Images */}
                            <div className="w-[384px]  border border-black flex flex-col shrink-0 overflow-hidden" style={{ background: '#151515', border: '1px solid #333333', borderRadius: '12px 0px 0px 12px' }}>
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
                                    onReorder={setBaselineImages}
                                    isAutomationMode={activeView === 'automation'}
                                    searchQuery={baselineSearchQuery}
                                    onSearchQueryChange={setBaselineSearchQuery}
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
                            <div className="flex-1  border border-black  flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent" style={{ background: '#1A1A1A', border: '1px solid #333333', borderRadius: '0px 12px 12px 0px' }}>
                                <div className="flex justify-between mb-[16px]">
                                    <div className="flex flex-col gap-4 w-full" style={{ padding: '16px 16px 0px 16px', borderBottom: '1px solid #ffffff20' }}>
                                        <p className="text-[12px] font-medium uppercase" style={{ color: '#929292' }}>
                                            Actual images
                                        </p>
                                        <div className="flex gap-6 border-b border-white/10 w-full relative">
                                            <button
                                                onClick={() => setActiveView('screenshots')}
                                                className={`text-[14px] font-medium pb-2 transition-colors relative cursor-pointer`}
                                                style={{
                                                    borderBottom: activeView === 'screenshots' ? '2px solid white' : '2px solid transparent',
                                                    marginBottom: '-1px',
                                                    color: activeView === 'screenshots' ? 'white' : 'rgba(255, 255, 255, 0.4)'
                                                }}
                                            >
                                                Screenshots
                                            </button>
                                            <button
                                                onClick={() => setActiveView('automation')}
                                                className={`text-[14px] font-medium pb-2 transition-colors relative cursor-pointer`}
                                                style={{
                                                    borderBottom: activeView === 'automation' ? '2px solid white' : '2px solid transparent',
                                                    marginBottom: '-1px',
                                                    color: activeView === 'automation' ? 'white' : 'rgba(255, 255, 255, 0.4)'
                                                }}
                                            >
                                                Automation steps
                                            </button>
                                            <button
                                                onClick={() => setActiveView('variables')}
                                                className={`text-[14px] font-medium pb-2 transition-colors relative cursor-pointer`}
                                                style={{
                                                    borderBottom: activeView === 'variables' ? '2px solid white' : '2px solid transparent',
                                                    marginBottom: '-1px',
                                                    color: activeView === 'variables' ? 'white' : 'rgba(255, 255, 255, 0.4)'
                                                }}
                                            >
                                                Global Variables
                                            </button>
                                        </div>
                                    </div>
                                    {/* {activeView === 'screenshots' && (
                    <button
                      onClick={handleBrowseFolder}
                      className="flex items-center gap-[11px] text-[14px] text-white bg-white/10 px-[16px] py-[10px] rounded-[8px] hover:bg-white/20 transition-colors"
                    >
                      <Folder className="w-[16px] h-[16px]" />
                      <span>Browse Folder</span>
                    </button>
                  )} */}
                                </div>

                                {loadingActivity === "compare" ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <img src={LoaderGif} alt="Loading..." style={{ height: "10rem" }} />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                                        <div className="flex-1 overflow-hidden relative flex flex-col">
                                            {activeView === 'screenshots' ? (
                                                // ... (Screenshots logic remains same, but need to inline it or ensure it fits)
                                                // Since I am replacing a huge chunk, I should probably keep the screenshots logic intact or just wrap it.
                                                // The existing code has a lot of logic for screenshots.
                                                // I'll try to use the existing logic by nesting.
                                                actualImages.length === 0 ? (
                                                    // ... Drag drop area
                                                    <div className="flex-1 flex items-center justify-center p-4">
                                                        <div
                                                            onDragOver={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                const files = e.dataTransfer.files;
                                                                if (files && files.length > 0) {
                                                                    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
                                                                    if (imageFiles.length > 0) {
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
                                                                    }
                                                                }
                                                            }}
                                                            className="w-full max-w-[600px] border-2 border-dashed border-white/10 rounded-[12px] flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/[0.04] hover:border-white/20 group cursor-pointer"
                                                            style={{ height: "12rem", background: "rgba(255, 255, 255, 0.02)" }}
                                                            onClick={handleBrowseFolder}
                                                        >
                                                            <p className="text-gray-600 font-medium text-center">
                                                                Drag & drop your Screenshot folder here or{" "}<br />
                                                                <span className="underline hover:text-white transition-colors" style={{ color: "#6C6C6C" }}>
                                                                    browse
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <ImageGrid className="grid-cols-3 gap-[15px]" >
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
                                                )
                                            ) : activeView === 'automation' ? (
                                                <AutomationSteps
                                                    projectId={projectId}
                                                    selectedScreenName={baselineImages.find(img => img.id === selectedCardId)?.name}
                                                    steps={allSteps[baselineImages.find(img => img.id === selectedCardId)?.name || ""] || []}
                                                    onStepsChange={(newSteps) => {
                                                        const name = baselineImages.find(img => img.id === selectedCardId)?.name;
                                                        if (name) {
                                                            setAllSteps(prev => ({ ...prev, [name]: newSteps }));
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <GlobalVariables
                                                    projectId={projectId}
                                                    variables={serverVariables}
                                                    onVariablesChange={setServerVariables}
                                                />
                                            )}
                                        </div>

                                        {/* Sticky Footer for Automation and Global Variables */}
                                        {(activeView === 'automation' || activeView === 'variables') && (
                                            <div className="mt-auto p-4 flex items-center justify-between border-t border-white/5 bg-[#1A1A1A] z-10 shrink-0">
                                                <div className="flex-1 max-w-[500px]">
                                                    {/* Only show Add Step if in Automation Steps tab */}
                                                    {activeView === 'automation' && (
                                                        <button
                                                            onClick={handleAddStep}
                                                            className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] border border-dashed border-white/10 text-gray-500 hover:text-gray-300 hover:border-white transition-all text-[14px] bg-white/[0.02] cursor-pointer"
                                                        >
                                                            <Plus size={18} />
                                                            <span>Add Step</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-3 ml-4">
                                                    <button
                                                        onClick={handleRunAutomation}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-[8px]  bg-white/5 text-gray-400 hover:bg-emerald-500 transition-all text-[13px] border border-emerald-500 hover:border-white shadow-lg shadow-emerald-900/20 cursor-pointer"
                                                    >
                                                        <Terminal size={16} />
                                                        <span>Run Automation</span>
                                                    </button>
                                                    <button
                                                        onClick={handleExportJava}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white/5 text-gray-400 hover:text-white transition-all text-[13px] border border-white/10 hover:border-white cursor-pointer"
                                                    >
                                                        <FileCode size={16} />
                                                        <span>Export full java file</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleSaveAutomation()}
                                                        className="flex items-center gap-2 px-6 py-2 rounded-[8px] bg-[#2A2A2A] text-white hover:bg-[#333] transition-all text-[13px] border border-white/5 hover:border-white shadow-lg cursor-pointer">
                                                        <Save size={16} />
                                                        <span>Save</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
