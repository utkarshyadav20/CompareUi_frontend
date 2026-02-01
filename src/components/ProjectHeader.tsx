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
import { ProfileMenu } from "./ProfileMenu";
import { Theme, Project } from "../types";

interface ProjectHeaderProps {
  project?: Project;
  title?: string;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  isNotificationOpen: boolean;
  onNotificationToggle: () => void;
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
  activeTab,
  onTabChange,
  navigationItems,
  hideNavigation = false,
}: ProjectHeaderProps) {
  return (
    <header className="relative z-[100] bg-white dark:bg-black border-b border-black/10 dark:border-white/10" style={{ zIndex: 1001 }}>
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
            <ProfileMenu theme={theme} onThemeChange={onThemeChange} />
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
      )}
    </header>
  );
}
