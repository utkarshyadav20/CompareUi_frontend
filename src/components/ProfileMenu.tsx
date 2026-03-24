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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const imgProfile = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcfUSvCfgqxhSfkkuwlpo-O6Cxnmd9GNikA&s";

interface ProfileMenuProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export function ProfileMenu({ theme, onThemeChange }: ProfileMenuProps) {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const username = user?.username || "Guest";
    const email = user?.email || "guest@example.com";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none">
                    <div className="text-right hidden sm:block">
                        <div className="text-black dark:text-white text-sm font-medium">
                            {username}
                        </div>
                        <div className="text-black/50 dark:text-white/50 text-[10px]">
                            {user?.role || "User"}
                        </div>
                    </div>
                    <div className="w-[47px] h-[47px] rounded-full overflow-hidden bg-[#ffcc8a] border-2 border-black/5 dark:border-white/5">
                        <img
                            src={imgProfile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[280px]" align="end" sideOffset={8}>
                <DropdownMenuLabel className="normal-case">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-black dark:text-white">{username}</p>
                        <p className="text-xs leading-none text-black/50 dark:text-white/50">{email}</p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Create Team</span>
                        <DropdownMenuShortcut>
                            <Plus className="h-4 w-4" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Command className="mr-2 h-4 w-4" />
                        <span>Command Menu</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <div className="px-3 py-2 flex items-center justify-between text-sm">
                    <span className="text-black/60 dark:text-white/60">Theme</span>
                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-md">
                        <button
                            onClick={() => onThemeChange("system")}
                            className={`p-1 rounded transition-all ${theme === "system" ? "bg-white dark:bg-black shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                        >
                            <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onThemeChange("light")}
                            className={`p-1 rounded transition-all ${theme === "light" ? "bg-white dark:bg-black shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                        >
                            <Sun className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onThemeChange("dark")}
                            className={`p-1 rounded transition-all ${theme === "dark" ? "bg-white dark:bg-black shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
                        >
                            <Moon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home Page</span>
                    <DropdownMenuShortcut>
                        <Triangle className="h-3 w-3" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={handleLogout} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                    <DropdownMenuShortcut>
                        <ArrowRight className="h-3 w-3" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <div className="p-1 px-3 py-2">
                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md hover:opacity-90 transition-opacity font-semibold text-sm">
                        Upgrade to Pro
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
