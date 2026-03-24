import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Grid2X2,
  List,
  ChevronDown,
  Bell,
  Smartphone,
  Tv,
  Monitor,
} from "lucide-react";
import { getProjectUrl } from "../utils/projectUtils";
import { Theme, Project, ProjectType, ViewMode } from "../types";
import { Logo } from "../components/Logo";
import { ProjectCard } from "../components/ProjectCard";
import { NewProjectForm } from "../components/NewProjectForm";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import LoaderGif from "../assets/Loader.gif";
import { ProfileMenu } from "../components/ProfileMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { GravityStarsBackground } from "../components/animate-ui/components/backgrounds/gravity-stars";
import { cn } from "../components/ui/utils";

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
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const projectsHeadingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animations for static elements
    const tl = gsap.timeline();
    const targets = [headerRef.current, searchBarRef.current, projectsHeadingRef.current].filter(Boolean);
    
    if (targets.length > 0) {
      tl.from(targets, { opacity: 0, y: -10, duration: 0.8, stagger: 0.1, ease: "power2.out" });
    }
  }, { scope: containerRef });

  useGSAP(() => {
    // Space-themed staggered entrance for cards
    if (!isLoading && cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        if (cards.length > 0) {
            gsap.fromTo(cards, 
                { 
                  opacity: 0, 
                  scale: 0.85, 
                  y: 40, 
                  filter: "blur(8px)" 
                }, 
                { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  duration: 1.2, 
                  stagger: {
                    amount: 0.5,
                    grid: "auto",
                    from: "start"
                  },
                  ease: "back.out(1.4)",
                  clearProps: "all",
                  onComplete: () => {
                    // Start subtle floating animation
                    gsap.to(cards, {
                      y: "-=8",
                      duration: 3,
                      repeat: -1,
                      yoyo: true,
                      ease: "sine.inOut",
                      stagger: {
                        amount: 1,
                        from: "random"
                      }
                    });
                  }
                }
            );
        }
    }
  }, { dependencies: [isLoading], scope: containerRef });

  useGSAP(() => {
    if (activeTab && navRef.current && indicatorRef.current) {
        const activeElement = navRef.current.querySelector(
          `[data-tab="${activeTab}"]`
        ) as HTMLElement;
        if (activeElement) {
          gsap.to(indicatorRef.current, {
            x: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
            duration: 0.5,
            ease: "power3.inOut",
          });
        }
    }
  }, { dependencies: [activeTab], scope: containerRef });

  const handleTabHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (navRef.current && hoverRef.current) {
      const target = e.currentTarget;
      gsap.to(hoverRef.current, {
        x: target.offsetLeft,
        width: target.offsetWidth,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleNavLeave = () => {
    if (hoverRef.current) {
      gsap.to(hoverRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

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
    { type: "Smart TV", icon: <Tv className="w-4 h-4" /> }
  ];

  const handleAddNew = (type: ProjectType) => {
    setSelectedProjectType(type);
    setIsDropdownOpen(false);
    setIsFormOpen(true);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
      {/* Header */}
      <header ref={headerRef} className="border-b border-black/10 dark:border-white/10 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0">
        <div className="px-8 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-5">
            <button className="w-[46px] h-[46px] bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/15 transition-colors">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <div className="relative">
              <ProfileMenu theme={theme} onThemeChange={onThemeChange} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          ref={navRef}
          onMouseLeave={handleNavLeave}
          className="px-8 border-b border-black/20 dark:border-white/20 flex items-center gap-1 overflow-x-auto relative min-h-[46px] scrollbar-hide"
        >
          {/* Hover highlight background */}
          <div
            ref={hoverRef}
            className="absolute h-[32px] bg-black/5 dark:bg-white/5 rounded-md pointer-events-none opacity-0 z-0"
            style={{ width: 0 }}
          />

          {navigationItems.map((item) => {
            const tabId = item.label.toLowerCase().replace(" ", "");
            return (
              <button
                key={item.label}
                data-tab={tabId}
                onMouseEnter={handleTabHover}
                onClick={() => setActiveTab(tabId as any)}
                className={`px-5 py-2.5 transition-colors relative whitespace-nowrap z-10 ${activeTab === tabId
                    ? "text-black dark:text-white"
                    : "text-black/50 dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white z-20 pointer-events-none"
            style={{ width: 0 }}
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className={cn(
        "px-8 py-8 relative min-h-[600px]",
        "dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]"
      )}>
        <GravityStarsBackground
          starsCount={60}
          starsSize={1.2}
          starsOpacity={0.3}
          starColor={theme === 'dark' ? '#FFF' : '#333'}
          glowIntensity={5}
          movementSpeed={0.3}
          mouseInfluence={100}
          mouseGravity="attract"
          gravityStrength={40}
          starsInteraction={true}
          starsInteractionType="bounce"
          className="absolute inset-0 z-0 opacity-40"
        />

        <div className="relative z-10">
          {/* Search and Filters */}
          <div ref={searchBarRef} className="flex items-center gap-3 mb-8 relative z-30">
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

            <button className="border border-black/50 dark:border-white/50 rounded-lg px-5 py-3.5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors bg-white dark:bg-black">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="bg-[#dedede] text-black px-5 py-3 rounded-lg flex items-center gap-2.5 hover:bg-[#c9c9c9] transition-colors outline-none"
                >
                  <span className="font-semibold">Add new</span>
                  <ChevronDown className="w-[18px] h-[18px]" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[260px]" align="end" sideOffset={8}>
                {projectTypes.map(({ type, icon }) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() => handleAddNew(type)}
                    className="flex items-center gap-4 py-3 cursor-pointer"
                  >
                    <span className="text-black/60 dark:text-white/60 size-5 flex items-center justify-center shrink-0">
                      {icon}
                    </span>
                    <span className="font-medium">{type}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Projects Section */ }
          <div className="mb-6">
            <h2 ref={projectsHeadingRef} className="text-black dark:text-white text-xl mb-4">Projects</h2>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="relative size-20">
                  <div className="absolute inset-0 border-4 border-black/5 dark:border-white/5 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-black dark:border-t-white rounded-full animate-spin" style={{ animationDuration: '0.8s' }} />
                  <div className="absolute inset-4 border-2 border-black/10 dark:border-white/10 rounded-full animate-pulse" />
                </div>
                <p className="mt-8 text-black/30 dark:text-white/30 text-xs tracking-[0.3em] uppercase font-medium">Scanning Systems</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20 text-black/50 dark:text-white/50">
                <p className="text-lg">No projects found</p>
                <p className="text-sm mt-2">Click "Add new" to create your first project</p>
              </div>
            ) : (
              <div
                ref={cardsContainerRef}
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-3"
                )}
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
          <span>Delete project <strong className="text-red-500 underline">permanently</strong>?</span>
        }
        description="This action cannot be undone. All project data and visual comparisons will be lost."
        confirmText="Yes, delete it"
        variant="danger"
      />
    </div>
  );
}
