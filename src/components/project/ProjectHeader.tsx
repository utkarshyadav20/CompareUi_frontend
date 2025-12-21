import {
  ChevronLeft,
  Bell,
  Home,
  Settings,
  Users,
  Plus,
  Command,
  Monitor,
  Sun,
  Moon,
  Triangle,
  LogOut,
  ArrowRight,
} from "lucide-react";
const imgProfile =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop";
import { Project } from "../../types";
import { useTheme } from "../theme-provider";

interface ProjectHeaderProps {
  project?: Project;
  title?: string;
  onBack: () => void;
  isNotificationOpen: boolean;
  onNotificationToggle: () => void;
  isProfileMenuOpen: boolean;
  onProfileMenuToggle: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  navigationItems?: { label: string; active: boolean }[];
  hideNavigation?: boolean;
}

export function ProjectHeader({
  project,
  title,
  onBack,
  isNotificationOpen,
  onNotificationToggle,
  isProfileMenuOpen,
  onProfileMenuToggle,
  activeTab,
  onTabChange,
  navigationItems,
  hideNavigation = false,
}: ProjectHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative z-50 bg-inherit border-b border-border">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {title ? (
            <h1 className="text-foreground text-[20px] font-bold">{title}</h1>
          ) : project ? (
            <div className="flex items-center gap-3">
              <div
                className={`w-[37px] h-[37px] rounded-lg ${project.iconBg} flex items-center justify-center`}
              >
                {project.icon}
              </div>
              <div>
                <div className="text-foreground">{project.platform}</div>
                <div className="text-muted-foreground text-xs">
                  {project.platformType}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={onNotificationToggle}
            className="w-[46px] h-[46px] bg-muted border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
          </button>

          <div className="relative">
            <button
              onClick={onProfileMenuToggle}
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
                  onClick={onProfileMenuToggle}
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

      {!hideNavigation && navigationItems && (
        <nav className="px-8 border-b border-border flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                onTabChange?.(item.label.toLowerCase().replace(" ", ""))
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
      )}
    </header>
  );
}
