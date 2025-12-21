import { useState, useRef, useEffect } from "react";
import {
  RefreshCw,
  Globe,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
  Maximize,
  RotateCcw,
  ExternalLink,
  Info,
} from "lucide-react";

interface BrowserPreviewProps {
  url: string;
  onUrlChange: (url: string) => void;
  selectedBrowser?: "Chrome" | "Safari" | "Microsoft Edge" | "Firefox";
  onBrowserChange?: (
    browser: "Chrome" | "Safari" | "Microsoft Edge" | "Firefox"
  ) => void;
}

const DEVICES = [
  { name: "Responsive", width: "100%", height: "100%", icon: Monitor },
  { name: "iPhone 14 Pro", width: 393, height: 852, icon: Smartphone },
  { name: "Pixel 7", width: 412, height: 915, icon: Smartphone },
  { name: "iPad Air", width: 820, height: 1180, icon: Tablet },
  { name: "Laptop", width: 1366, height: 768, icon: Monitor },
];

export function BrowserPreview({
  url,
  onUrlChange,
  selectedBrowser = "Chrome",
  onBrowserChange,
}: BrowserPreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [scale, setScale] = useState(100);
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [isBrowserMenuOpen, setIsBrowserMenuOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [urlError, setUrlError] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic URL validation
    if (url && !url.match(/^https?:\/\/.+/)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }, [url]);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setScale(100);
    setSelectedDevice(DEVICES[0]);
  };

  const handleOpenInNewTab = () => {
    if (url && !urlError) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex-1 bg-[#09090b] rounded-[10px] p-4 pb-2 flex flex-col gap-3 border border-[#27272a] h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Address Bar Row */}
        <div className="flex items-center gap-2 h-9">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>

          {/* Browser Selection */}
          {onBrowserChange && (
            <div className="relative">
              <button
                onClick={() => setIsBrowserMenuOpen(!isBrowserMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-[#3f3f46] hover:bg-[#27272a] transition-colors"
              >
                <span className="text-white/80 text-xs font-mono">
                  {selectedBrowser}
                </span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>
              {isBrowserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsBrowserMenuOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-[140px] bg-[#18181b] border border-[#3f3f46] rounded-md shadow-xl z-40 overflow-hidden">
                    {["Chrome", "Safari", "Microsoft Edge", "Firefox"].map(
                      (b) => (
                        <button
                          key={b}
                          onClick={() => {
                            onBrowserChange(b as any);
                            setIsBrowserMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 flex items-center gap-2 text-xs hover:bg-[#27272a] transition-colors text-left ${
                            selectedBrowser === b
                              ? "text-green-400 bg-[#27272a]"
                              : "text-white/70"
                          }`}
                        >
                          {b}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* URL Input */}
          <div className="flex-1 bg-white/5 rounded border border-white/10 flex items-center gap-2 px-2.5 py-1.5 focus-within:border-white/30 transition-colors">
            <Globe className="w-3.5 h-3.5 text-white/50" />
            <input
              type="text"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRefresh()}
              placeholder="Enter website URL..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30 font-mono"
            />
          </div>

          <div className="flex items-center gap-1 h-full">
            {/* Open in New Tab Button */}
            <button
              onClick={handleOpenInNewTab}
              className="bg-[#27272a] p-2 rounded hover:bg-[#3a3a3d] transition-colors flex items-center justify-center h-full aspect-square"
              title="Open in new tab (Use if site refuses to connect)"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="bg-[#27272a] p-2 rounded hover:bg-[#3a3a3d] transition-colors flex items-center justify-center h-full aspect-square"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Tools Row (Device & Scale) */}
        <div className="flex items-center justify-between border-t border-[#27272a] pt-2">
          <div className="flex items-center gap-2">
            {/* Device Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#18181b] border border-[#3f3f46] hover:bg-[#27272a] transition-colors"
              >
                <selectedDevice.icon className="w-3.5 h-3.5 text-white/70" />
                <span className="text-white/80 text-xs font-mono">
                  {selectedDevice.name}
                </span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>
              {isDeviceMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsDeviceMenuOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-[180px] bg-[#18181b] border border-[#3f3f46] rounded-md shadow-xl z-40 overflow-hidden">
                    {DEVICES.map((device) => (
                      <button
                        key={device.name}
                        onClick={() => {
                          setSelectedDevice(device);
                          setIsDeviceMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center gap-3 text-xs hover:bg-[#27272a] transition-colors text-left ${
                          selectedDevice.name === device.name
                            ? "text-blue-400 bg-[#27272a]"
                            : "text-white/70"
                        }`}
                      >
                        <device.icon className="w-3.5 h-3.5" />
                        <span className="flex-1">{device.name}</span>
                        {typeof device.width === "number" && (
                          <span className="text-white/30 text-[10px]">
                            {device.width}x{device.height}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Scale Control */}
            <div className="flex items-center gap-2 bg-[#18181b] border border-[#3f3f46] rounded px-2 py-1">
              <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">
                Scale
              </span>
              <input
                type="range"
                min="50"
                max="150"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-20 h-1 bg-[#3f3f46] rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-white/80 text-xs font-mono w-9 text-right">
                {scale}%
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-[#27272a] rounded text-white/50 hover:text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="flex-1 bg-[#18181b]/50 rounded border border-[#3f3f46] flex items-center justify-center relative overflow-hidden mt-1">
        {/* Scrollable Area for Scaled Content - Scrollbars hidden */}
        <div className="w-full h-full overflow-auto flex items-center justify-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-100 invert-[0.05] scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {/* Transforming Container */}
          <div
            style={{
              transform: `scale(${scale / 100})`,
              transformOrigin: "center top",
              transition:
                "width 0.3s ease, height 0.3s ease, transform 0.2s ease",
              width: selectedDevice.width,
              height:
                selectedDevice.height === "100%"
                  ? "100%"
                  : selectedDevice.height,
            }}
            className={`shadow-2xl bg-white transition-all duration-300 ${
              selectedDevice.name !== "Responsive"
                ? "border-[8px] border-[#27272a] rounded-[2rem]"
                : "w-full h-full rounded-none"
            }`}
          >
            {urlError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#09090b] text-center p-4">
                <Globe className="w-12 h-12 text-yellow-500/50 mb-4" />
                <p className="text-white text-lg font-mono mb-2">Invalid URL</p>
                <p className="text-white/50 text-sm font-mono max-w-xs">
                  Please enter a valid URL starting with http:// or https://
                </p>
              </div>
            ) : url ? (
              <iframe
                key={iframeKey}
                src={url}
                className={`w-full h-full border-0 bg-white ${
                  selectedDevice.name !== "Responsive" ? "rounded-[1.5rem]" : ""
                }`}
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#09090b] text-center p-4">
                <p className="text-white text-lg font-mono mb-2">Ready</p>
                <p className="text-white/50 text-sm font-mono">
                  Enter a URL to start previewing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
