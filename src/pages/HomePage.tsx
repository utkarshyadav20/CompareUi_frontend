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
import { mapBackendProjectToFrontend, BackendProjectDto, getProjectUrl } from "../utils/projectUtils";
import { Theme, Project, ProjectType, ViewMode } from "../types";
import { Logo } from "../components/Logo";
import { ProjectCard } from "../components/ProjectCard";
import { NewProjectForm } from "../components/NewProjectForm";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import imgProfile from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";
import LoaderGif from "../assets/Loader.gif";
import { ProfileMenu } from "../components/ProfileMenu";

interface HomePageProps {
  projects: Project[];
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onCreateProject: (project: Omit<Project, "id" | "timestamp">) => void;
  onDeleteProject: (projectId: string) => Promise<void>;
  isLoading?: boolean;
}

export function HomePage({
  projects,
  theme,
  onThemeChange,
  onCreateProject,
  onDeleteProject,
  isLoading = false,
}: HomePageProps) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectType>("Android TV");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

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
    { type: "Fire TV", icon: <Tv className="w-4 h-4" /> },
    { type: "Smart TV", icon: <Tv className="w-4 h-4" /> },
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



  const handleDeleteRequest = (project: Project) => {
    setProjectToDelete(project);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      await onDeleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
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
              <ProfileMenu theme={theme} onThemeChange={onThemeChange} />
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
              className={`px-5 py-2.5 transition-colors relative whitespace-nowrap ${activeTab === item.label.toLowerCase().replace(" ", "")
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
              className={`px-2.5 py-2 rounded transition-colors ${viewMode === "grid"
                ? "bg-black/10 dark:bg-white/10"
                : "hover:bg-black/10 dark:hover:bg-white/10"
                }`}
            >
              <Grid2X2 className="w-[18px] h-[18px] text-black/50 dark:text-white/50" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 py-2 rounded transition-colors ${viewMode === "list"
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
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <img src={LoaderGif} alt="Loading..." style={{ height: "10rem" }} />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-black/50 dark:text-white/50">
              <p className="text-lg">No projects found</p>
              <p className="text-sm mt-2">Click "Add new" to create your first project</p>
            </div>
          ) : (
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
                  onDelete={() => handleDeleteRequest(project)}
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
        onCreateProject={onCreateProject}
      />

      <ConfirmationModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={
          <span>Delete project <strong>permanently</strong> ?</span>
        }
        description="If you select “confirm” this project will be deleted permanently."
        confirmText="Confirm"
        variant="danger"
      />
    </div>
  );
}
