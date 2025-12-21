import { useState, useRef } from "react";
import { Globe, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "../ui/utils";

interface BrowserPreviewProps {
    url: string;
    onUrlChange: (url: string) => void;
    status?: "connected" | "disconnected";
    className?: string;
}

export function BrowserPreview({
    url,
    onUrlChange,
    status = "connected",
    className,
}: BrowserPreviewProps) {
    const [urlError, setUrlError] = useState(false);
    const [selectedBrowser, setSelectedBrowser] = useState("Chrome");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleUrlChange = (value: string) => {
        onUrlChange(value);
        if (value && !value.match(/^https?:\/\/.+/)) {
            setUrlError(true);
        } else {
            setUrlError(false);
        }
    };

    const browsers = ["Chrome", "Safari", "Microsoft Edge", "Firefox"];

    return (
        <div className={cn("flex-1 bg-black/5 dark:bg-white/10 rounded-lg p-5 pb-3 flex flex-col gap-5 border border-black/10 dark:border-white/10", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <h3 className="text-black dark:text-white text-[20px]">
                        Live Website Preview
                    </h3>
                    <div className="bg-[rgba(3,46,21,0.5)] flex items-center gap-2 px-2 py-1.5 rounded">
                        <div className={cn("w-2 h-2 rounded-full", status === "connected" ? "bg-green-500" : "bg-red-500")}></div>
                        <span className={cn("text-sm font-mono", status === "connected" ? "text-green-400" : "text-red-400")}>
                            Sim {status === "connected" ? "Connected" : "Disconnected"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <span className="text-black dark:text-white text-sm">Resolution :</span>
                        <button className="bg-black/10 dark:bg-white/10 flex items-center gap-2 px-2.5 py-2 rounded border border-black/10 dark:border-white/10 hover:bg-black/15 dark:hover:bg-white/15 transition-colors">
                            <RefreshCw className="w-3.5 h-3.5 text-black dark:text-white" />
                            <span className="text-black dark:text-white text-sm font-mono">Fetch</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 relative">
                        <span className="text-black dark:text-white text-sm">Browser :</span>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-2.5 py-2 rounded border border-green-500/30 hover:bg-green-500/10 transition-colors"
                        >
                            <span className="text-green-400 text-sm font-mono">{selectedBrowser}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-green-400" />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
                                <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#191919] border border-black/20 dark:border-white/30 rounded-md shadow-lg z-40 overflow-hidden">
                                    <div className="p-1">
                                        {browsers.map((browser) => (
                                            <button
                                                key={browser}
                                                onClick={() => {
                                                    setSelectedBrowser(browser);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full px-3 py-2 flex items-center gap-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded",
                                                    selectedBrowser === browser
                                                        ? "bg-black/5 dark:bg-white/5 text-green-400"
                                                        : "text-black dark:text-white"
                                                )}
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
                {/* Address Bar */}
                <div className="flex items-center gap-2 h-8">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>

                    <div className="flex-1 bg-white/5 rounded border border-white/50 flex items-center gap-2 px-2.5 py-2">
                        <Globe className="w-4 h-4 text-white/50" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleUrlChange(e.target.value)}
                            placeholder="Enter your live url here ..."
                            className="flex-1 bg-transparent text-black dark:text-white text-sm outline-none placeholder:text-black/50 dark:placeholder:text-white/50"
                        />
                    </div>

                    <button
                        onClick={() => {
                            if (url && !urlError && iframeRef.current) {
                                iframeRef.current.src = iframeRef.current.src;
                            }
                        }}
                        className="bg-[#27272a] p-2 rounded hover:bg-[#3a3a3d] transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5 text-[#9f9fa9]" />
                    </button>
                </div>

                {/* Browser Content */}
                <div className="flex-1 bg-[rgba(24,24,27,0.5)] rounded border border-[#3f3f46] flex items-center justify-center min-h-[400px] overflow-hidden relative">
                    {urlError ? (
                        <div className="text-center">
                            <Globe className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <p className="text-yellow-500 text-lg font-mono mb-2">Invalid URL</p>
                            <p className="text-[#71717b] text-sm font-mono">
                                Please enter a valid URL starting with http:// or<br />https://
                            </p>
                        </div>
                    ) : url ? (
                        <iframe
                            ref={iframeRef}
                            key={url}
                            src={url}
                            className="w-full h-full border-0"
                            title="Website Preview"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    ) : (
                        <div className="text-center">
                            <p className="text-black dark:text-white text-lg font-mono mb-2">Waiting</p>
                            <p className="text-black/50 dark:text-[#71717b] text-sm font-mono">
                                Enter website URL to preview
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
