import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid2X2,
  List,
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
} from "lucide-react";
import { Theme, Project, ProjectType, ViewMode } from "../types";
import { Logo } from "../components/common/Logo";
import { ProjectCard } from "../components/project/ProjectCard";
import { NewProjectForm } from "../components/project/NewProjectForm";
import { useTheme } from "../components/theme-provider";

const imgProfile =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop";

interface HomePageProps {
  projects: Project[];
  onCreateProject: (project: Omit<Project, "id" | "timestamp">) => void;
}

export function HomePage({ projects, onCreateProject }: HomePageProps) {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Default type, can be changed in the form
  const [selectedProjectType] = useState<ProjectType>("Android TV");
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="px-8 py-4 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-[46px] h-[46px] bg-muted border border-border rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Bell className="w-[18px] h-[18px]" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <div className="text-foreground">Abhijeet Punia</div>
                  <div className="text-muted-foreground text-[10px]">
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
                  <div className="absolute right-0 top-full mt-2 w-[280px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-20">
                    <div className="px-4 py-4 border-b border-border">
                      <div className="text-foreground font-semibold">
                        abhijeetpunia0111
                      </div>
                      <div className="text-muted-foreground text-sm">
                        abhijeetpunia01@gmail.com
                      </div>
                    </div>

                    <div className="py-1">
                      <button className="w-full px-4 py-3 flex items-center gap-3 text-foreground hover:bg-accent transition-colors text-left">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center gap-3 text-foreground hover:bg-accent transition-colors text-left">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-foreground hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4" />
                          <span>Create Team</span>
                        </div>
                        <Plus className="w-4 h-4" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-foreground hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Command className="w-4 h-4" />
                          <span>Command Menu</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">
                            Ctrl
                          </kbd>
                          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">
                            K
                          </kbd>
                        </div>
                      </button>

                      <div className="w-full px-4 py-3 flex items-center justify-between text-foreground">
                        <div className="flex items-center gap-3">
                          <span>Theme</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setTheme("system")}
                            className={`p-1 rounded hover:bg-accent ${
                              theme === "system" ? "bg-muted" : ""
                            }`}
                          >
                            <Monitor className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setTheme("light")}
                            className={`p-1 rounded hover:bg-accent ${
                              theme === "light" ? "bg-muted" : ""
                            }`}
                          >
                            <Sun className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setTheme("dark")}
                            className={`p-1 rounded hover:bg-accent ${
                              theme === "dark" ? "bg-muted" : ""
                            }`}
                          >
                            <Moon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-foreground hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Home className="w-4 h-4" />
                          <span>Home Page</span>
                        </div>
                        <Triangle className="w-3 h-3" />
                      </button>

                      <button className="w-full px-4 py-3 flex items-center justify-between text-foreground hover:bg-accent transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </div>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3 border-t border-border">
                      <button className="w-full bg-foreground text-background py-2.5 rounded-lg hover:opacity-90 transition-opacity font-semibold">
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
        <nav className="px-8 border-b border-border flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                setActiveTab(item.label.toLowerCase().replace(" ", "") as any)
              }
              className={`px-5 py-2.5 transition-colors relative whitespace-nowrap ${
                activeTab === item.label.toLowerCase().replace(" ", "")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {activeTab === item.label.toLowerCase().replace(" ", "") && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Search and Filters */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 border border-input rounded-lg px-5 py-3.5 flex items-center gap-2.5 text-muted-foreground bg-background">
            <Search className="w-[18px] h-[18px]" />
            <input
              type="text"
              placeholder="Search Projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <button className="border border-input rounded-lg px-5 py-3.5 flex items-center justify-center hover:bg-accent transition-colors">
            <Filter className="w-[18px] h-[18px] text-muted-foreground" />
          </button>

          <div className="border border-input rounded-lg p-1.5 flex items-center bg-background">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-2 rounded transition-colors ${
                viewMode === "grid" ? "bg-muted" : "hover:bg-accent"
              }`}
            >
              <Grid2X2 className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 py-2 rounded transition-colors ${
                viewMode === "list" ? "bg-muted" : "hover:bg-accent"
              }`}
            >
              <List className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-lg flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <span className="font-semibold">Add new</span>
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-foreground text-xl mb-4">Projects</h2>
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
