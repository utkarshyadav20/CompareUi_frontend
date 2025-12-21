import {
  ArrowRight,
  Link as LinkIcon,
  MoreVertical,
  RefreshCw,
  Trash2,
  Upload,
  Loader2,
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
  loadingActivity?: string | null;
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
  loadingActivity = null,
}: BaselineImageInputProps) {
  const [openImageMenuId, setOpenImageMenuId] = useState<string | null>(null);

  // Helper handling for file inputs to reset value after selection allowing same file to be selected again
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    handler(e);
    e.target.value = "";
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 p-4">
      {/* Header with title and action buttons */}
      <div className="flex items-center justify-between shrink-0 pb-3 border-b border-black/10 dark:border-white/10">
        <h3 className="text-black dark:text-white text-[20px]">
          Baselining Images
        </h3>
        <div className="flex items-center gap-3">
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
        {!hasImages ? (
          <div className="space-y-5">
            <div className="border border-black/20 dark:border-white/20 rounded-lg p-5 flex flex-col items-center gap-5">
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

            <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 md:p-16 flex flex-col items-center gap-3 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
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

            <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 flex flex-col items-center gap-3 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
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
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={baselineUrl}
                onChange={(e) => onBaselineUrlChange(e.target.value)}
                placeholder="Enter More URL here"
                className="flex-1 bg-[#1e1e1e] dark:bg-[#1e1e1e] border border-white/10 rounded-md px-3 py-2 text-white text-sm placeholder:text-white/40 outline-none focus:border-white/30"
              />
              <button
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 shrink-0 flex items-center justify-center min-w-[32px]"
                onClick={onUrlSubmit}
                disabled={loadingActivity === "url"}
              >
                {loadingActivity === "url" ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-3 pr-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => onSelectImage(image.id)}
                  className={`group rounded-[8px] shrink-0 relative border-[0.5px] cursor-pointer transition-all ${selectedImageId === image.id
                    ? "bg-white/15 border-white/50"
                    : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                >
                  <div className="flex flex-col gap-1 p-[6px]">
                    {/* Header with filename, resolution, and 3-dot menu */}
                    <div className="flex items-center justify-between w-full">
                      <p className="text-black dark:text-white text-[12px] font-bold truncate flex-1 min-w-0">
                        {image.name}
                      </p>

                      {/* Resolution - Hidden on hover */}
                      <p className="text-black/20 dark:text-white/20 text-[12px] ml-2 shrink-0 group-hover:hidden">
                        {image.width}x{image.height}
                      </p>

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
                    <div className="w-full rounded-[3px] overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Upload from Device Button */}
              <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg p-5 flex flex-col items-center gap-2 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <Upload className="w-5 h-5 text-black dark:text-white" />
                <p className="text-black dark:text-white text-sm text-center">
                  {loadingActivity === "image" ? "Uploading..." : "Upload image from Device"}
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
          </div>
        )}
      </div>
    </div>
  );
}
