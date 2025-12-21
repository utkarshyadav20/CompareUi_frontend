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
import { Theme, Project } from "../../types";

interface ProjectHeaderProps {
  project?: Project;
  title?: string;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
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
  theme,
  onThemeChange,
  isNotificationOpen,
  onNotificationToggle,
  isProfileMenuOpen,
  onProfileMenuToggle,
  activeTab,
  onTabChange,
  navigationItems,
  hideNavigation = false,
}: ProjectHeaderProps) {
  return (
    <header className="relative z-50 bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {title ? (
            <h1 className="text-black dark:text-white text-[20px] font-bold">
              {title}
            </h1>
          ) : project ? (
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
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={onNotificationToggle}
            className="w-[46px] h-[46px] bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
          </button>

          <div className="relative">
            <button
              onClick={onProfileMenuToggle}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="text-right">
                <div className="text-black dark:text-white">Abhijeet Punia</div>
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
                  onClick={onProfileMenuToggle}
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

      {!hideNavigation && navigationItems && (
        <nav className="px-8 border-b border-black/20 dark:border-white/20 flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                onTabChange?.(item.label.toLowerCase().replace(" ", ""))
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
      )}
    </header>
  );
}
