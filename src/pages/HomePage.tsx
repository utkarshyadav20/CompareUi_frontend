import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid2X2,
  List,
  ChevronDown,
  Bell,
  Home,
  Settings,
  Users,
  Command,
  Monitor,
  Sun,
  Moon,
  Triangle,
  LogOut,
  ArrowRight,
  Plus,
  Smartphone,
  Tv,
} from "lucide-react";
import { Theme, Project, ProjectType, ViewMode } from "../types";
import { Logo } from "../components/Logo";
import { ProjectCard } from "../components/ProjectCard";
import { NewProjectForm } from "../components/NewProjectForm";
import imgProfile from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";
import svgPaths from "../imports/svg-kgk8e7ds24";

interface HomePageProps {
  projects: Project[];
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onCreateProject: (project: Omit<Project, "id" | "timestamp">) => void;
}

export function HomePage({
  projects,
  theme,
  onThemeChange,
  onCreateProject,
}: HomePageProps) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectType>("Android TV");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");

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

  const filteredProjects = projects.filter(
    (project) =>
      project.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.platformType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProjectUrl = (project: Project) => {
    const typeMap: Record<ProjectType, string> = {
      "Android TV": "atv",
      "Smart Image": "smi",
      Website: "web",
      Mobile: "mob",
      "Roku TV": "rtv",
    };
    return `/project/${typeMap[project.type]}/${project.id}`;
  };

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
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-3"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                viewMode={viewMode}
                onClick={() => navigate(getProjectUrl(project))}
              />
            ))}
          </div>
        </div>
      </main>

      {/* New Project Form */}
      <NewProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedType={selectedProjectType}
        onCreateProject={onCreateProject}
      />
    </div>
  );
}
