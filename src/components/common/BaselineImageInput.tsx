import {
  ArrowRight,
  Link as LinkIcon,
  MoreVertical,
  RefreshCw,
  Trash2,
  Upload,
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
      <div className="flex items-center justify-between shrink-0 pb-3 border-b border-border">
        <h3 className="text-foreground text-[20px]">Baselining Images</h3>
        <div className="flex items-center gap-3">
          {/* Refresh All Button with Tooltip */}
          <div className="relative group/refresh">
            <button
              onClick={onRefreshAll}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <RefreshCw className="w-[18px] h-[18px] text-foreground" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover/refresh:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[999] shadow-md border border-border">
              Refresh All
            </div>
          </div>

          {/* Remove All Button with Tooltip */}
          <div className="relative group/remove">
            <button
              onClick={onRemoveAll}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Trash2 className="w-[18px] h-[18px] text-destructive" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-2 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover/remove:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[999] shadow-md border border-border">
              Remove All
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom">
        {!hasImages ? (
          <div className="space-y-5">
            <div className="border border-border rounded-lg p-5 flex flex-col items-center gap-5">
              <div className="text-center">
                <LinkIcon className="w-5 h-5 text-foreground mx-auto mb-2" />
                <p className="text-foreground text-sm">
                  Enter Figma screen url
                </p>
              </div>
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={baselineUrl}
                  onChange={(e) => onBaselineUrlChange(e.target.value)}
                  placeholder="Enter URL here"
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                />
                <button
                  className="bg-primary text-primary-foreground p-3 rounded-lg hover:opacity-90 shrink-0"
                  onClick={onUrlSubmit}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative border border-dashed border-border rounded-lg p-8 md:p-16 flex flex-col items-center gap-3 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors">
              <Upload className="w-5 h-5 text-foreground" />
              <p className="text-foreground text-sm text-center">
                Click here to upload CSV File with multiple screen link
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileChange(e, onCsvUpload)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="relative border border-dashed border-border rounded-lg p-8 flex flex-col items-center gap-3 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors">
              <Upload className="w-5 h-5 text-foreground" />
              <p className="text-foreground text-sm text-center">
                Upload image
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, onFileUpload)}
                className="absolute inset-0 opacity-0 cursor-pointer"
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
                className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-ring"
              />
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 shrink-0"
                onClick={onUrlSubmit}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pr-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => onSelectImage(image.id)}
                  className={`group rounded-[8px] shrink-0 relative border-[0.5px] cursor-pointer transition-all ${
                    selectedImageId === image.id
                      ? "bg-accent border-border"
                      : "bg-muted/40 border-border/50 hover:bg-muted/60"
                  }`}
                >
                  <div className="flex flex-col gap-1 p-[6px]">
                    {/* Header with filename, resolution, and 3-dot menu */}
                    <div className="flex items-center justify-between w-full">
                      <p className="text-foreground text-[12px] font-bold truncate flex-1 min-w-0">
                        {image.name}
                      </p>

                      {/* Resolution - Hidden on hover */}
                      <p className="text-muted-foreground text-[12px] ml-2 shrink-0 group-hover:hidden">
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
                          className="w-4 h-4 bg-muted flex items-center justify-center rounded-[3px] hover:bg-muted/80 transition-colors"
                        >
                          <MoreVertical className="w-3 h-3 text-foreground" />
                        </button>

                        {/* Dropdown Menu */}
                        {openImageMenuId === image.id && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setOpenImageMenuId(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-[160px] bg-popover border border-border rounded-md shadow-lg z-40 overflow-hidden">
                              <div className="p-1">
                                <button
                                  onClick={() => {
                                    onRefreshImage?.(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-foreground text-xs hover:bg-muted transition-colors rounded"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>Refresh image</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onReplaceImage?.(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-foreground text-xs hover:bg-muted transition-colors rounded"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Replace image</span>
                                </button>
                                <button
                                  onClick={() => {
                                    onRemoveImage(image.id);
                                    setOpenImageMenuId(null);
                                  }}
                                  className="w-full px-2 py-1.5 flex items-center gap-2 text-destructive text-xs hover:bg-destructive/10 transition-colors rounded bg-background"
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
              <div className="relative border border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors">
                <Upload className="w-5 h-5 text-foreground" />
                <p className="text-foreground text-sm text-center">
                  Upload image from Device
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, onFileUpload)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
