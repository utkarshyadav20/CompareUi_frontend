import {
  ArrowRight,
  Link as LinkIcon,
  MoreVertical,
  RefreshCw,
  Trash2,
  Upload,
  Loader2,
  Code,
  Search,
  List,
  GripVertical,
} from "lucide-react";
import React, { useState } from "react";

export interface BaselineImage {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

interface BaselineImageInputProps {
  images: BaselineImage[];
  hasImages: boolean;
  selectedImageId: string | null;
  baselineUrl: string;
  onBaselineUrlChange: (url: string) => void;
  onUrlSubmit: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectImage: (id: string) => void;
  onRefreshAll: () => void;
  onRemoveAll: () => void;
  onRemoveImage: (id: string) => void;
  onRefreshImage?: (id: string) => void;
  onReplaceImage?: (id: string) => void;
  onReorder?: (newImages: BaselineImage[]) => void;
  loadingActivity?: string | null;
  isAutomationMode?: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

// Helper component for image dimensions
function ImageDimensions({ src, className }: { src: string; className?: string }) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [src]);

  if (!dimensions) return null;

  return (
    <span className={className}>
      {dimensions.width}x{dimensions.height}
    </span>
  );
}

export function BaselineImageInput({
  images,
  hasImages,
  selectedImageId,
  baselineUrl,
  onBaselineUrlChange,
  onUrlSubmit,
  onFileUpload,
  onCsvUpload,
  onSelectImage,
  onRefreshAll,
  onRemoveAll,
  onRemoveImage,
  onRefreshImage,
  onReplaceImage,
  onReorder,
  loadingActivity = null,
  isAutomationMode = false,
  searchQuery,
  onSearchQueryChange,
}: BaselineImageInputProps) {
  const [openImageMenuId, setOpenImageMenuId] = useState<string | null>(null);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    onReorder?.(newImages);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Helper handling for file inputs to reset value after selection allowing same file to be selected again
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    handler(e);
    e.target.value = "";
  };

  // Effect to load image dimensions when selected (for header)
  React.useEffect(() => {
    const selectedImage = images.find(img => img.id === selectedImageId);
    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = selectedImage.url;
    } else {
      setImageDimensions(null);
    }
  }, [selectedImageId, images]);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-4">
      {/* Header with title and action buttons */}
      <div className="flex items-center justify-between shrink-0 pb-3 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="text-[12px] font-medium uppercase" style={{ color: '#929292' }}>
            Baseline Images
          </h3>
          {imageDimensions && (
            <span className="text-[10px] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded text-gray-500 font-mono">
              {imageDimensions.width}x{imageDimensions.height}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Upload Toggle Button - Only visible when hasImages is true */}
          {hasImages && (
            <div className="relative group/upload">
              <button
                onClick={() => setIsUploadVisible(!isUploadVisible)}
                className={`flex items-center justify-center hover:opacity-70 transition-opacity ${isUploadVisible ? "text-blue-500" : "text-black dark:text-white"
                  }`}
              >
                <div className="p-1 rounded bg-black/5 dark:bg-white/5">
                  <Upload className="w-[18px] h-[18px]" />
                </div>
              </button>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 bg-black dark:bg-[#2a2a2a] text-white text-xs rounded opacity-0 group-hover/upload:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[999]">
                {isUploadVisible ? "Hide Upload" : "Upload New"}
              </div>
            </div>
          )}

          {/* Refresh All Button with Tooltip */}
          <div className="relative group/refresh">
            <button
              onClick={onRefreshAll}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <RefreshCw className="w-[18px] h-[18px] text-black dark:text-white" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 bg-black dark:bg-[#2a2a2a] text-white text-xs rounded opacity-0 group-hover/refresh:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[999]">
              Refresh All
            </div>
          </div>

          {/* Remove All Button with Tooltip */}
          <div className="relative group/remove">
            <button
              onClick={onRemoveAll}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Trash2 className="w-[18px] h-[18px] text-[#EF4444]" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-2 bg-black dark:bg-[#2a2a2a] text-white text-xs rounded opacity-0 group-hover/remove:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[999]">
              Remove All
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom">
        {(!hasImages || isUploadVisible) && (
          <div className="space-y-5 mb-5">
            {/* 1. URL Input */}
            <div className="border border-black/20 dark:border-white/20 rounded-lg p-5 flex flex-col items-center gap-5 shrink-0">
              <div className="text-center">
                <LinkIcon className="w-5 h-5 text-black dark:text-white mx-auto mb-2" />
                <p className="text-black dark:text-white text-sm">
                  Enter Figma screen url
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={baselineUrl}
                  onChange={(e) => onBaselineUrlChange(e.target.value)}
                  placeholder="Enter URL here"
                  className="flex-1 bg-white dark:bg-white/5 border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none text-sm"
                />
                <button
                  className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 shrink-0 flex items-center justify-center min-w-[44px]"
                  onClick={onUrlSubmit}
                  disabled={loadingActivity === "url"}
                >
                  {loadingActivity === "url" ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 2. CSV Upload */}
            <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 md:p-10 flex flex-col items-center gap-3 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0">
              {loadingActivity === "csv" ? (
                <Loader2 className="w-5 h-5 text-black dark:text-white animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-black dark:text-white" />
              )}
              <p className="text-black dark:text-white text-sm text-center">
                {loadingActivity === "csv" ? "Uploading..." : "Click here to upload CSV File with multiple screen link"}
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileChange(e, onCsvUpload)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loadingActivity === "csv"}
              />
            </div>

            {/* 3. Image Upload */}
            <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 md:p-10 flex flex-col items-center gap-3 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0">
              {loadingActivity === "image" ? (
                <Loader2 className="w-5 h-5 text-black dark:text-white animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-black dark:text-white" />
              )}
              <p className="text-black dark:text-white text-sm text-center">
                {loadingActivity === "image" ? "Uploading..." : "Upload image"}
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, onFileUpload)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loadingActivity === "image"}
              />
            </div>
          </div>
        )}

        {/* Filter and View Toggle */}
        {hasImages && (
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="flex-1 flex-row relative bg-[#1A1A1A] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 " style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",

            }}>
              <Search className=" w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Filter Screen..."
                className="w-full "
              />
            </div>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className={`p-2 rounded-lg border border-white/5 transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Image List */}
        {hasImages && (
          <div className="mt-5 space-y-3 pr-2">
            {images.map((image, index) => (
              viewMode === 'grid' ? (
                <div
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelectImage(image.id)}
                  className={`group rounded-[8px] shrink-0 relative border-[0.5px] cursor-pointer transition-all ${selectedImageId === image.id
                    ? "bg-white/15 border-white/50"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                    } ${draggedIndex === index ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col gap-1 p-[6px]">
                    {/* Header with filename and 3-dot menu */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-black dark:text-white text-[12px] font-bold truncate">
                          {image.name}
                        </p>
                        <ImageDimensions
                          src={image.url}
                          className="text-[10px] text-black/20 dark:text-white/20 "
                        />
                      </div>

                      {/* 3-Dot Menu - Shown on hover */}
                      <div className="relative hidden group-hover:block ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenImageMenuId(
                              openImageMenuId === image.id ? null : image.id
                            );
                          }}
                          className="w-4 h-4 bg-black/15 dark:bg-white/15 flex items-center justify-center rounded-[3px] hover:bg-black/25 dark:hover:bg-white/25 transition-colors"
                        >
                          <MoreVertical className="w-3 h-3 text-black dark:text-white" />
                        </button>

                        {/* Dropdown Menu */}
                        {openImageMenuId === image.id && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setOpenImageMenuId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-[160px] bg-white dark:bg-[#191919] border border-black/20 dark:border-white/30 rounded-md shadow-lg z-40 overflow-hidden">
                              <div className="p-1">
                                <button
                                  onClick={() => {
                                    onRefreshImage?.(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-black dark:text-white text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Refresh image</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onReplaceImage?.(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-black dark:text-white text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Replace image</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onRemoveImage(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-red-500 text-xs hover:bg-red-500/20 transition-colors rounded bg-red-500/10 dark:bg-[#2d1414]"
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

                    {/* Image Container */}
                    <div className="w-full rounded-[3px] overflow-hidden relative">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-auto"
                      />
                      {isAutomationMode && selectedImageId === image.id && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelectImage(image.id)}
                  className={`flex items-center gap-3 p-3 cursor-pointer border transition-colors
${selectedImageId === image.id
                      ? 'bg-[#27272A] border-[#ffffff20]'
                      : 'bg-transparent border-transparent hover:bg-white/50'
                    } ${draggedIndex === index ? 'opacity-80' : ''}`}
                  style={{
                    borderRadius: '10px',
                    backgroundColor: selectedImageId === image.id ? '#27272A' : 'transparent',
                    borderColor: selectedImageId === image.id ? '#4B5563' : 'transparent',
                    opacity: draggedIndex === index ? 0.8 : 1,
                    border: selectedImageId === image.id ? '1px solid #4B5563' : 'transparent',
                  }}
                >
                  <GripVertical className="w-4 h-4 text-gray-600 flex-shrink-0 cursor-grab active:cursor-grabbing" />
                  <span className={`text-[14px] font-medium truncate ${selectedImageId === image.id ? 'text-white' : 'text-gray-400'}`}>
                    {image.name.replace(/\.[^/.]+$/, "")}
                  </span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
