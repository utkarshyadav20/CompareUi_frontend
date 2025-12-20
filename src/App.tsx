import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid2X2,
  List,
  ChevronDown,
  Bell,
  CircleDashed,
  CircleCheckBig,
  CircleX,
  MoreVertical,
  Smartphone,
  Monitor,
  Tv,
  Copy,
  ChevronLeft,
  ArrowRight,
  RefreshCw,
  Upload,
  Link as LinkIcon,
  X,
  Settings,
  Users,
  Command,
  Home,
  LogOut,
  Plus,
  Sun,
  Moon,
  Triangle,
  AlertTriangle,
  Archive,
  ArchiveX,
  Trash2,
  Globe,
} from "lucide-react";
import svgPaths from "./imports/svg-kgk8e7ds24";
import imgProfile from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";
import { NotificationPanel } from "./components/NotificationPanel";
import { SettingsPage } from "./components/SettingsPage";
import { SupportPage } from "./components/SupportPage";
import { IntegrationPage } from "./components/IntegrationPage";
import { SmartImageDetail } from "./components/SmartImageDetail";
import { AndroidTVDetail } from "./components/AndroidTVDetail";
import { AndroidTVDetailFigma } from "./components/AndroidTVDetailFigma";
import { TestComparisonToast } from "./components/TestComparisonToast";
import { BaselineImageInput } from "./components/ui/BaselineImageInput";

// Types
type ViewMode = "grid" | "list";
type ProjectType =
  | "Smart Image"
  | "Website"
  | "Android TV"
  | "Roku TV"
  | "Mobile";
type EnvironmentType = "Emulator" | "Physical Device";
type ProjectStatus = "running" | "completed" | "failed";
type Theme = "light" | "dark" | "system";

interface Project {
  id: string;
  platform: string;
  platformType: string;
  status: ProjectStatus;
  iconBg: string;
  icon: React.ReactNode;
  passed?: number;
  failed?: number;
  timestamp: string;
  type: ProjectType;
}

function Logo() {
  return (
    <div className="h-[47px] w-[112.686px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 113 47"
      >
        <g>
          <path d={svgPaths.p3a1f4a00} fill="black" />
          <g>
            <path d={svgPaths.p3d98aa80} fill="white" />
            <path d={svgPaths.p37ac7e00} fill="white" />
            <path d={svgPaths.p6af73f0} fill="white" />
            <path d={svgPaths.p1da5ff00} fill="white" />
            <g>
              <path d={svgPaths.p246f4800} fill="white" />
              <path d={svgPaths.p10bcdb00} fill="white" />
              <path d={svgPaths.p2816c400} fill="white" />
            </g>
            <path d={svgPaths.p15b64700} fill="white" />
            <path d={svgPaths.p2aa6d780} fill="white" />
            <path d={svgPaths.p1e09d980} fill="white" />
            <path d={svgPaths.p3d68bc00} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface ProjectCardProps extends Project {
  onClick: () => void;
  viewMode: ViewMode;
}

function ProjectCard({
  platform,
  platformType,
  status,
  iconBg,
  icon,
  passed,
  failed,
  timestamp,
  onClick,
  viewMode,
}: ProjectCardProps) {
  if (viewMode === "list") {
    return (
      <div
        className="bg-black/5 dark:bg-white/10 rounded-lg px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/10 dark:border-white/10"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`w-[37px] h-[37px] rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-black dark:text-white">{platform}</div>
            <div className="text-black/75 dark:text-white/75 text-xs">
              {platformType}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="min-w-[120px]">
            {status === "running" && (
              <div className="flex items-center gap-2">
                <CircleDashed className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
                <div className="text-black dark:text-white text-sm">
                  <span className="font-semibold">Still </span>
                  <span className="text-black/50 dark:text-white/50">
                    Running
                  </span>
                </div>
              </div>
            )}
            {status === "completed" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500/50" />
                  <span className="text-black dark:text-white text-sm">
                    {passed}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500/50" />
                  <span className="text-black dark:text-white text-sm">
                    {failed}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="text-black/50 dark:text-white/50 text-xs min-w-[80px]">
            {timestamp}
          </div>

          <button
            className="w-[34px] h-[34px] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4 text-black dark:text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-black/5 dark:bg-white/10 rounded-lg px-6 py-5 flex flex-col justify-between h-[169px] cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/10 dark:border-white/10"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-[37px] h-[37px] rounded-lg ${iconBg} flex items-center justify-center`}
          >
            {icon}
          </div>
          <div>
            <div className="text-black dark:text-white">{platform}</div>
            <div className="text-black/75 dark:text-white/75 text-xs">
              {platformType}
            </div>
          </div>
        </div>
        <button
          className="w-[34px] h-[34px] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4 text-black dark:text-white" />
        </button>
      </div>

      <div>
        {status === "running" && (
          <div className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
            <div className="text-black dark:text-white">
              <span className="font-semibold">Still </span>
              <span className="text-black/50 dark:text-white/50">Running</span>
            </div>
          </div>
        )}
        {status === "completed" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-black dark:text-white text-sm mb-1">
                  Passed
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500/50" />
                  <span className="text-black dark:text-white">{passed}</span>
                </div>
              </div>
              <div>
                <div className="text-black dark:text-white text-sm mb-1">
                  Failed
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500/50" />
                  <span className="text-black dark:text-white">{failed}</span>
                </div>
              </div>
            </div>
            <button
              className="bg-black/10 dark:bg-white/10 px-5 py-1.5 rounded-lg text-black dark:text-white text-sm hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Full Report
            </button>
          </div>
        )}
      </div>

      <div className="text-black/50 dark:text-white/50 text-xs">
        {timestamp}
      </div>
    </div>
  );
}

// New Project Form Component
interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: ProjectType;
  onCreateProject: (project: Omit<Project, "id" | "timestamp">) => void;
}

function NewProjectForm({
  isOpen,
  onClose,
  selectedType,
  onCreateProject,
}: NewProjectFormProps) {
  const [projectName, setProjectName] = useState("");
  const [environmentType, setEnvironmentType] =
    useState<EnvironmentType>("Emulator");
  const [projectId] = useState(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );

  const handleCreate = () => {
    if (!projectName.trim()) return;

    const iconBgMap: Record<ProjectType, string> = {
      "Smart Image": "bg-yellow-500/40",
      Website: "bg-red-500/40",
      "Android TV": "bg-green-500/40",
      "Roku TV": "bg-purple-600/40",
      Mobile: "bg-blue-500/40",
    };

    const platformTypeMap: Record<ProjectType, string> = {
      "Smart Image": "Smart Image",
      Website: "Website",
      "Android TV": `Android TV ${environmentType}`,
      "Roku TV": "Roku TV",
      Mobile: `Mobile ${environmentType}`,
    };

    const getIcon = () => {
      if (selectedType === "Android TV" || selectedType === "Mobile") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p824ec00} fill="white" />
          </svg>
        );
      }
      if (selectedType === "Roku TV") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p3b2fd480} fill="white" />
            <path d={svgPaths.p21145800} fill="white" />
          </svg>
        );
      }
      if (selectedType === "Website") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path
              d={svgPaths.p28bc3a00}
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      return <Smartphone className="w-5 h-5 text-white" />;
    };

    onCreateProject({
      platform: projectName,
      platformType: platformTypeMap[selectedType],
      status: "running",
      iconBg: iconBgMap[selectedType],
      icon: getIcon(),
      type: selectedType,
    });

    setProjectName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
      <div className="bg-white dark:bg-black w-full md:w-[500px] max-w-full h-full border-l border-black/20 dark:border-white/20 flex flex-col">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-black/20 dark:border-white/20 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-black dark:text-white text-lg">New Project</h2>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Project ID */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project ID
            </label>
            <div className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-black/50 dark:text-white/50 text-sm font-mono">
                {projectId}
              </span>
              <button className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project Name */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Here"
              className="w-full bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none focus:border-black/80 dark:focus:border-white/80"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project type
            </label>
            <div className="bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-black dark:text-white">{selectedType}</span>
              <ChevronDown className="w-4 h-4 text-black dark:text-white" />
            </div>
          </div>

          {/* Environment Type */}
          {(selectedType === "Android TV" || selectedType === "Mobile") && (
            <div>
              <label className="text-black dark:text-white block mb-3">
                Environment type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="environment"
                    value="Emulator"
                    checked={environmentType === "Emulator"}
                    onChange={(e) =>
                      setEnvironmentType(e.target.value as EnvironmentType)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-black dark:text-white">Emulator</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="environment"
                    value="Physical Device"
                    checked={environmentType === "Physical Device"}
                    onChange={(e) =>
                      setEnvironmentType(e.target.value as EnvironmentType)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-black dark:text-white">
                    Physical Device
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-black/20 dark:border-white/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black rounded-lg px-4 py-3 hover:bg-black/90 dark:hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

// Project Detail Page Component
interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

function ProjectDetail({
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

  // Dynamic navigation based on project type
  const navigationItems =
    project.type === "Smart Image"
      ? [
          { label: "Testing Panel", active: true },
          { label: "Activity", active: false },
          { label: "Result", active: false },
          { label: "DB connection", active: false },
          { label: "Integration", active: false },
          { label: "Support", active: false },
          { label: "Settings", active: false },
        ]
      : [
          { label: "Overview", active: true },
          { label: "Deployments", active: false },
          { label: "Activity", active: false },
          { label: "Usage", active: false },
          { label: "DB connection", active: false },
          { label: "AI Gateways", active: false },
          { label: "Integration", active: false },
          { label: "Support", active: false },
          { label: "Settings", active: false },
        ];

  // Filter images based on search query
  const filteredImages = uploadedImages.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={onBack}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div
                className={`w-[37px] h-[37px] rounded-lg ${project.iconBg} flex items-center justify-center`}
              >
                {project.icon}
              </div>
              <div>
                <div className="text-black dark:text-white">
                  {project.platform}
                </div>
                <div className="text-black/70 dark:text-white/70 text-xs">
                  {project.platformType}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-[46px] h-[46px] bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <div className="text-black dark:text-white">
                    Abhijeet Punia
                  </div>
                  <div className="text-black/50 dark:text-white/50 text-[10px]">
                    Qucikplay
                  </div>
                </div>
                <div className="w-[47px] h-[47px] rounded-full overflow-hidden bg-[#ffcc8a]">
                  <img
                    src={imgProfile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-[280px] bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 rounded-lg shadow-lg overflow-hidden z-20">
                    <div className="px-4 py-4 border-b border-black/10 dark:border-white/10">
                      <div className="text-black dark:text-white font-semibold">
                        abhijeetpunia0111
                      </div>
                      <div className="text-black/50 dark:text-white/50 text-sm">
                        abhijeetpunia01@gmail.com
                      </div>
                    </div>

                    <div className="py-1">
                      <button className="w-full px-4 py-3 flex items-center gap-3 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center gap-3 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>Create Team</span>
                        </div>
                        <Plus className="w-4 h-4" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Command className="w-4 h-4" />
                          <span>Command Menu</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 text-xs bg-black/10 dark:bg-white/10 rounded">
                            Ctrl
                          </kbd>
                          <kbd className="px-1.5 py-0.5 text-xs bg-black/10 dark:bg-white/10 rounded">
                            K
                          </kbd>
                        </div>
                      </button>

                      <div className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white">
                        <div className="flex items-center gap-3">
                          <span>Theme</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onThemeChange("system")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "system"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Monitor className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onThemeChange("light")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "light"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Sun className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onThemeChange("dark")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "dark"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Moon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Home className="w-4 h-4" />
                          <span>Home Page</span>
                        </div>
                        <Triangle className="w-3 h-3" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </div>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3 border-t border-black/10 dark:border-white/10">
                      <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-8 border-b border-black/20 dark:border-white/20 flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                setActiveTab(item.label.toLowerCase().replace(" ", "") as any)
              }
              className={`px-5 py-2.5 transition-colors relative whitespace-nowrap ${
                activeTab === item.label.toLowerCase().replace(" ", "")
                  ? "text-black dark:text-white"
                  : "text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
              }`}
            >
              {item.label}
              {activeTab === item.label.toLowerCase().replace(" ", "") && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Controls Bar - Show only on overview/testingpanel tab */}
      {(activeTab === "overview" || activeTab === "testingpanel") && (
        <div className="px-4 md:px-8 py-3 bg-white dark:bg-black border-b border-black/10 dark:border-white/10 overflow-x-auto">
          <div className="flex items-center gap-3 md:gap-6 min-w-max">
            <div className="w-full md:w-[380px] max-w-[380px] border border-black/50 dark:border-white/50 rounded-lg px-3 md:px-5 py-2.5 flex items-center gap-2.5 text-black/50 dark:text-white/50">
              <Search className="w-[18px] h-[18px]" />
              <input
                type="text"
                placeholder="Search Baseline images"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-black dark:text-white text-sm font-semibold">
                Method :
              </span>
              <div className="flex gap-1">
                {(["Pixelmatch", "Noise"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`px-2.5 py-2 rounded text-sm font-mono transition-colors ${
                      selectedMethod === method
                        ? "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white"
                        : "border border-green-500/30 text-green-400"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-black dark:text-white text-sm font-semibold">
                AI agent :
              </span>
              <div className="flex gap-1">
                {(["Yes", "No"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setAiAgent(option)}
                    className={`px-2.5 py-2 rounded text-sm font-mono transition-colors ${
                      aiAgent === option
                        ? "border border-green-500/30 text-green-400"
                        : "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-black dark:text-white text-sm font-semibold">
                Threshold :
              </span>
              <div className="flex gap-1">
                {["1x", "2x", "3x", "4x", "5x"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setThreshold(t)}
                    className={`px-2.5 py-2 rounded text-sm w-[38px] font-mono transition-colors ${
                      threshold === t
                        ? "border border-green-500/30 text-green-400"
                        : "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowComparisonToast(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors text-sm font-semibold"
            >
              Start Comparing UI
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Conditional rendering based on activeTab */}
      {(activeTab === "overview" || activeTab === "testingpanel") &&
      project.type === "Smart Image" ? (
        <SmartImageDetail projectId={project.id} />
      ) : (activeTab === "overview" || activeTab === "testingpanel") &&
        (project.type === "Android TV" ||
          project.type === "Mobile" ||
          project.type === "Roku TV") ? (
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

      {activeTab === "settings" && (
        <SettingsPage
          projectName={project.platform}
          projectType={project.platformType}
        />
      )}
      {activeTab === "support" && <SupportPage />}
      {activeTab === "integration" && <IntegrationPage />}
      {(activeTab === "activity" ||
        activeTab === "result" ||
        activeTab === "dbconnection") && (
        <div className="px-4 md:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-black dark:text-white text-2xl mb-4">
              Coming Soon
            </h2>
            <p className="text-black/50 dark:text-white/50">
              This feature is currently under development.
            </p>
          </div>
        </div>
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
          }}
        />
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectType>("Android TV");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      platform: "Project Name",
      platformType: "Android TV Emulator",
      status: "running",
      iconBg: "bg-green-500/40",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
          <path d={svgPaths.p824ec00} fill="white" />
        </svg>
      ),
      timestamp: "28 min ago",
      type: "Android TV",
    },
  ]);

  const navigationItems = [
    { label: "Overview", active: true },
    { label: "Deployments", active: false },
    { label: "Activity", active: false },
    { label: "Usage", active: false },
    { label: "DB connection", active: false },
    { label: "AI Gateways", active: false },
    { label: "Integration", active: false },
    { label: "Support", active: false },
    { label: "Settings", active: false },
  ];

  const projectTypes: { type: ProjectType; icon: React.ReactNode }[] = [
    { type: "Smart Image", icon: <Smartphone className="w-4 h-4" /> },
    { type: "Website", icon: <Monitor className="w-4 h-4" /> },
    { type: "Android TV", icon: <Tv className="w-4 h-4" /> },
    { type: "Roku TV", icon: <Tv className="w-4 h-4" /> },
    { type: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
  ];

  const handleAddNew = (type: ProjectType) => {
    setSelectedProjectType(type);
    setIsDropdownOpen(false);
    setIsFormOpen(true);
  };

  const handleCreateProject = (
    newProject: Omit<Project, "id" | "timestamp">
  ) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      timestamp: "Just now",
    };
    setProjects([project, ...projects]);
    setSelectedProject(project);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.platformType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        theme={theme}
        onThemeChange={setTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="px-8 py-4 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-[46px] h-[46px] bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <div className="text-black dark:text-white">
                    Abhijeet Punia
                  </div>
                  <div className="text-black/50 dark:text-white/50 text-[10px]">
                    Qucikplay
                  </div>
                </div>
                <div className="w-[47px] h-[47px] rounded-full overflow-hidden bg-[#ffcc8a]">
                  <img
                    src={imgProfile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-[280px] bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 rounded-lg shadow-lg overflow-hidden z-20">
                    <div className="px-4 py-4 border-b border-black/10 dark:border-white/10">
                      <div className="text-black dark:text-white font-semibold">
                        abhijeetpunia0111
                      </div>
                      <div className="text-black/50 dark:text-white/50 text-sm">
                        abhijeetpunia01@gmail.com
                      </div>
                    </div>

                    <div className="py-1">
                      <button className="w-full px-4 py-3 flex items-center gap-3 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center gap-3 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>Create Team</span>
                        </div>
                        <Plus className="w-4 h-4" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Command className="w-4 h-4" />
                          <span>Command Menu</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 text-xs bg-black/10 dark:bg-white/10 rounded">
                            Ctrl
                          </kbd>
                          <kbd className="px-1.5 py-0.5 text-xs bg-black/10 dark:bg-white/10 rounded">
                            K
                          </kbd>
                        </div>
                      </button>

                      <div className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white">
                        <div className="flex items-center gap-3">
                          <span>Theme</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setTheme("system")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "system"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Monitor className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setTheme("light")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "light"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Sun className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setTheme("dark")}
                            className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${
                              theme === "dark"
                                ? "bg-black/10 dark:bg-white/10"
                                : ""
                            }`}
                          >
                            <Moon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Home className="w-4 h-4" />
                          <span>Home Page</span>
                        </div>
                        <Triangle className="w-3 h-3" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </div>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3 border-t border-black/10 dark:border-white/10">
                      <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-8 border-b border-black/20 dark:border-white/20 flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                setActiveTab(item.label.toLowerCase().replace(" ", "") as any)
              }
              className={`px-5 py-2.5 transition-colors relative whitespace-nowrap ${
                activeTab === item.label.toLowerCase().replace(" ", "")
                  ? "text-black dark:text-white"
                  : "text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
              }`}
            >
              {item.label}
              {activeTab === item.label.toLowerCase().replace(" ", "") && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Search and Filters */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 border border-black/50 dark:border-white/50 rounded-lg px-5 py-3.5 flex items-center gap-2.5 text-black/50 dark:text-white/50 bg-white dark:bg-black">
            <Search className="w-[18px] h-[18px]" />
            <input
              type="text"
              placeholder="Search Projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
            />
          </div>

          <button className="border border-black/50 dark:border-white/50 rounded-lg px-5 py-3.5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Filter className="w-[18px] h-[18px] text-black/50 dark:text-white/50" />
          </button>

          <div className="border border-black/50 dark:border-white/50 rounded-lg p-1.5 flex items-center bg-white dark:bg-black">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-black/10 dark:bg-white/10"
                  : "hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              <Grid2X2 className="w-[18px] h-[18px] text-black/50 dark:text-white/50" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 py-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-black/10 dark:bg-white/10"
                  : "hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              <List className="w-[18px] h-[18px] text-black/50 dark:text-white/50" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#dedede] text-black px-5 py-3 rounded-lg flex items-center gap-2.5 hover:bg-black/20 dark:hover:bg-white transition-colors"
            >
              <span className="font-semibold">Add new</span>
              <ChevronDown className="w-[18px] h-[18px]" />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 rounded-lg shadow-lg overflow-hidden z-20">
                  {projectTypes.map(({ type, icon }) => (
                    <button
                      key={type}
                      onClick={() => handleAddNew(type)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      {icon}
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-black dark:text-white text-xl mb-4">Projects</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  viewMode={viewMode}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  viewMode={viewMode}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* New Project Form */}
      <NewProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedType={selectedProjectType}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
