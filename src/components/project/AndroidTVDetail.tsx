import { useState } from "react";
import {
  Image,
  RefreshCw,
  Trash2,
  Folder,
  MoreVertical,
  Upload,
} from "lucide-react";
import {
  BaselineImage,
  BaselineImageInput,
} from "../common/BaselineImageInput";

interface AndroidTVDetailProps {
  projectId: string;
  platformType: string; // 'Emulator' or 'Physical Device'
  onStartComparison?: () => void;
}

interface ImageData {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export function AndroidTVDetail({
  projectId,
  platformType,
  onStartComparison,
}: AndroidTVDetailProps) {
  const [baselineUrl, setBaselineUrl] = useState("");
  const [baselineImages, setBaselineImages] = useState<BaselineImage[]>([]);
  const [actualImages, setActualImages] = useState<ImageData[]>([]);
  const [folderPath, setFolderPath] = useState("");
  const [openImageMenuId, setOpenImageMenuId] = useState<string | null>(null);
  const [selectedBaselineId, setSelectedBaselineId] = useState<string | null>(
    null
  );
  const [selectedActualId, setSelectedActualId] = useState<string | null>(null);
  const [comparisonStarted, setComparisonStarted] = useState(false);

  // Helper handling for file inputs to reset value after selection allowing same file to be selected again
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handler: (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "baseline" | "actual"
    ) => void,
    type: "baseline" | "actual"
  ) => {
    handler(e, type);
    e.target.value = "";
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "baseline" | "actual"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imagePromises = Array.from(files).map((file) => {
      return new Promise<ImageData>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new globalThis.Image();
          img.onload = () => {
            resolve({
              id: `${Date.now()}-${file.name}`,
              name: file.name,
              url: e.target?.result as string,
              width: img.width,
              height: img.height,
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((images) => {
      if (type === "baseline") {
        setBaselineImages((prev) => [...prev, ...images]);
        if (images.length > 0 && !selectedBaselineId) {
          setSelectedBaselineId(images[0].id);
        }
      } else {
        setActualImages((prev) => [...prev, ...images]);
        if (images.length > 0 && !selectedActualId) {
          setSelectedActualId(images[0].id);
        }
      }
    });
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // CSV upload logic would go here
    console.log("CSV file uploaded:", file.name);
  };

  const handleUrlSubmit = () => {
    if (!baselineUrl.trim()) return;
    // Simulate adding images from Figma URL
    const mockImage: BaselineImage = {
      id: Date.now().toString(),
      name: "Homescreen.png",
      url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      width: 1920,
      height: 1080,
    };
    setBaselineImages((prev) => [...prev, mockImage]);
    setSelectedBaselineId(mockImage.id);
    console.log("Submitting Figma URL:", baselineUrl);
  };

  const handleBrowseFolder = () => {
    // Note: Real folder browsing requires File System Access API
    // This is a simulation showing the concept
    alert(
      "Note: Real folder browsing requires File System Access API which has limited browser support. In production, you would use a backend service or Electron app to access file system."
    );

    // Simulate folder selection with mock images
    const mockImages: ImageData[] = [
      {
        id: `${Date.now()}-1`,
        name: "Homescreen.png",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        width: 1920,
        height: 1080,
      },
      {
        id: `${Date.now()}-2`,
        name: "Homescreen live rail first card.png",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        width: 1920,
        height: 1080,
      },
      {
        id: `${Date.now()}-3`,
        name: "Settings screen.png",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        width: 1920,
        height: 1080,
      },
    ];
    setActualImages(mockImages);
    if (mockImages.length > 0) {
      setSelectedActualId(mockImages[0].id);
    }
  };

  const handleRefresh = (type: "baseline" | "actual") => {
    console.log(`Refreshing ${type} images`);
    // Refresh logic here
  };

  const handleClearAll = (type: "baseline" | "actual") => {
    if (type === "baseline") {
      setBaselineImages([]);
      setSelectedBaselineId(null);
    } else {
      setActualImages([]);
      setSelectedActualId(null);
    }
    setComparisonStarted(false);
  };

  const handleRemoveImage = (id: string, type: "baseline" | "actual") => {
    if (type === "baseline") {
      setBaselineImages((prev) => prev.filter((img) => img.id !== id));
      if (selectedBaselineId === id) {
        setSelectedBaselineId(null);
      }
    } else {
      setActualImages((prev) => prev.filter((img) => img.id !== id));
      if (selectedActualId === id) {
        setSelectedActualId(null);
      }
    }
    setOpenImageMenuId(null);
  };

  const handleStartComparison = () => {
    setComparisonStarted(true);
    if (onStartComparison) {
      onStartComparison();
    }
  };

  // Check if an actual build image has a matching baseline
  const hasMatchingBaseline = (actualImageName: string) => {
    return baselineImages.some((baseline) => baseline.name === actualImageName);
  };

  const isPhysicalDevice = platformType === "Physical Device";

  return (
    <div className="px-4 md:px-8 pt-0 pb-[25px] flex flex-col md:flex-row gap-0 min-h-[calc(100vh-280px)] bg-background">
      {/* Baselining Images Panel */}
      <div className="w-full md:w-[335px] bg-muted/40 border border-border overflow-clip shrink-0">
        <div className="p-5 flex flex-col gap-5 h-full">
          <BaselineImageInput
            images={baselineImages}
            hasImages={baselineImages.length > 0}
            selectedImageId={selectedBaselineId}
            baselineUrl={baselineUrl}
            onBaselineUrlChange={setBaselineUrl}
            onUrlSubmit={handleUrlSubmit}
            onFileUpload={(e) =>
              handleFileChange(e, handleFileUpload, "baseline")
            }
            onCsvUpload={handleCsvUpload}
            onSelectImage={setSelectedBaselineId}
            onRefreshAll={() => handleRefresh("baseline")}
            onRemoveAll={() => handleClearAll("baseline")}
            onRemoveImage={(id) => handleRemoveImage(id, "baseline")}
            onRefreshImage={(id) => console.log("Refresh image", id)}
            onReplaceImage={(id) => console.log("Replace image", id)}
          />
        </div>
      </div>

      {/* Actual Build Images Panel */}
      <div className="flex-1 bg-muted/40 border border-border overflow-clip">
        <div className="p-5 flex flex-col gap-5 h-full">
          {/* Header with icons */}
          <div className="flex items-center justify-between w-full">
            <h3 className="text-foreground text-[20px]">Actual Build images</h3>
            <div className="flex items-center gap-0">
              <button
                onClick={() => handleRefresh("actual")}
                className="w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity"
                title="Refresh images"
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleClearAll("actual")}
                className="w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity ml-1"
                title="Clear all images"
              >
                <Trash2 className="w-4 h-4 text-red-500/50" />
              </button>
            </div>
          </div>

          {/* Content */}
          {actualImages.length > 0 ? (
            <div className="flex flex-col gap-5 h-full overflow-hidden">
              {/* Folder path input - Only for Physical Device */}
              {isPhysicalDevice && (
                <div className="flex gap-2.5 w-full">
                  <input
                    type="text"
                    value={folderPath}
                    onChange={(e) => setFolderPath(e.target.value)}
                    placeholder="C:\Users\abhijeetp.QUICKPLAY\Downloads\OTT final logos\OTT 3x1"
                    className="flex-1 bg-transparent border border-muted-foreground/30 rounded-lg px-5 py-3 text-foreground placeholder:text-muted-foreground outline-none text-[16px]"
                  />
                  <button
                    onClick={handleBrowseFolder}
                    className="bg-foreground text-background px-4 py-3 rounded-lg hover:opacity-90 transition-opacity shrink-0 flex items-center gap-2 text-sm font-semibold"
                  >
                    <Folder className="w-[14px] h-[14px]" />
                    Browse Folder
                  </button>
                </div>
              )}

              {/* Image grid */}
              <div className="flex-1 overflow-y-auto scrollbar-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {actualImages.map((image) => {
                    const hasBaseline = hasMatchingBaseline(image.name);
                    const showWarning = comparisonStarted && !hasBaseline;

                    return (
                      <div
                        key={image.id}
                        onClick={() => setSelectedActualId(image.id)}
                        className={`bg-muted border rounded-lg p-1.5 cursor-pointer hover:bg-muted/80 transition-colors relative ${
                          selectedActualId === image.id
                            ? "border-primary"
                            : showWarning
                            ? "border-red-500"
                            : "border-border"
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {/* Image Info */}
                          <div className="flex items-center justify-between text-xs px-1 group">
                            <p className="text-foreground overflow-ellipsis overflow-hidden max-w-[190px] font-bold">
                              {image.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="text-muted-foreground group-hover:hidden">
                                {image.width}x{image.height}
                              </p>
                              {/* 3-dot menu */}
                              <div className="relative hidden group-hover:block">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenImageMenuId(
                                      openImageMenuId === image.id
                                        ? null
                                        : image.id
                                    );
                                  }}
                                  className="w-4 h-4 flex items-center justify-center text-foreground hover:bg-muted-foreground/20 rounded"
                                >
                                  <MoreVertical className="w-3 h-3" />
                                </button>
                                {openImageMenuId === image.id && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-30"
                                      onClick={() => setOpenImageMenuId(null)}
                                    />
                                    <div className="absolute right-0 top-full mt-1 w-[160px] bg-popover border border-border rounded-md shadow-lg z-40 overflow-hidden">
                                      <div className="p-1">
                                        <button className="w-full px-2 py-1.5 flex items-center gap-2 text-foreground text-xs hover:bg-muted transition-colors rounded">
                                          <RefreshCw className="w-3.5 h-3.5" />
                                          <span>Refresh image</span>
                                        </button>
                                        <button className="w-full px-2 py-1.5 flex items-center gap-2 text-foreground text-xs hover:bg-muted transition-colors rounded">
                                          <Upload className="w-3.5 h-3.5" />
                                          <span>Replace image</span>
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleRemoveImage(
                                              image.id,
                                              "actual"
                                            )
                                          }
                                          className="w-full px-2 py-1.5 flex items-center gap-2 text-red-500 text-xs hover:bg-red-500/20 transition-colors rounded bg-red-500/10"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                          <span>Remove screen</span>
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Image with overlay warning */}
                          <div className="rounded overflow-hidden relative">
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-auto"
                            />

                            {/* No baseline image found overlay */}
                            {showWarning && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <p className="text-red-500 text-sm font-semibold text-center px-4">
                                  No baseline image found
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 h-full">
              {/* Empty state - Clean UI for Physical Device */}
              {isPhysicalDevice ? (
                <div className="flex-1 flex flex-col">
                  {/* Browse Folder button in top-right */}
                  <div className="flex justify-end mb-auto">
                    <button
                      onClick={handleBrowseFolder}
                      className="bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-semibold"
                    >
                      <Folder className="w-[14px] h-[14px]" />
                      Browse Folder
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative border border-dashed border-border rounded-lg flex-1 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors">
                  <div className="flex flex-col items-center justify-center h-full gap-2.5 p-2.5">
                    <Image className="w-5 h-5 text-foreground" />
                    <p className="font-mono text-[14px] text-foreground text-center">
                      Upload/paste Screenshot
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, "actual")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
