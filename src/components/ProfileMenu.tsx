import { useState } from "react";
import {
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
import { Theme } from "../types";
import { useAuth } from "../context/AuthContext";


const imgProfile = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcfUSvCfgqxhSfkkuwlpo-O6Cxnmd9GNikA&s";

interface ProfileMenuProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export function ProfileMenu({ theme, onThemeChange }: ProfileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const username = user?.username || "Guest";
    const email = user?.email || "guest@example.com"; // Assuming email is added to User type

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                <div className="text-right">
                    <div className="text-black dark:text-white text-sm font-medium">
                        {username}
                    </div>
                    <div className="text-black/50 dark:text-white/50 text-[10px]">
                        {/* You might want a role or company name here if available */}
                        {user?.role || "User"}
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

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-[280px] bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 rounded-lg shadow-lg overflow-hidden z-20">
                        <div className="px-4 py-4 border-b border-black/10 dark:border-white/10">
                            <div className="text-black dark:text-white font-semibold">
                                {username}
                            </div>
                            <div className="text-black/50 dark:text-white/50 text-sm">
                                {email}
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
                                        className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${theme === "system"
                                            ? "bg-black/10 dark:bg-white/10"
                                            : ""
                                            }`}
                                    >
                                        <Monitor className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => onThemeChange("light")}
                                        className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${theme === "light"
                                            ? "bg-black/10 dark:bg-white/10"
                                            : ""
                                            }`}
                                    >
                                        <Sun className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => onThemeChange("dark")}
                                        className={`p-1 rounded hover:bg-black/20 dark:hover:bg-white/20 ${theme === "dark"
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

                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 flex items-center justify-between text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-left"
                            >
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
    );
}
