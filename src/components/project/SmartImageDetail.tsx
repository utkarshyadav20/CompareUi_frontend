import { useState } from "react";
import { Image } from "lucide-react";
import {
  BaselineImage,
  BaselineImageInput,
} from "../common/BaselineImageInput";

interface SmartImageDetailProps {
  projectId: string;
}

export function SmartImageDetail({ projectId }: SmartImageDetailProps) {
  const [baselineUrl, setBaselineUrl] = useState("");
  const [baselineImages, setBaselineImages] = useState<BaselineImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const [actualImage, setActualImage] = useState<BaselineImage | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "baseline" | "actual"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // For baseline, handle multiple
    if (type === "baseline") {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new globalThis.Image();
          img.onload = () => {
            const newImage: BaselineImage = {
              id: Date.now().toString() + Math.random(),
              name: file.name,
              url: e.target?.result as string,
              width: img.width,
              height: img.height,
            };
            setBaselineImages((prev) => [...prev, newImage]);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    } else {
      // For actual, keep single (or could adapt, but sticking to existing logic for right panel)
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new globalThis.Image();
        img.onload = () => {
          const newImage: BaselineImage = {
            id: Date.now().toString(),
            name: file.name,
            url: e.target?.result as string,
            width: img.width,
            height: img.height,
          };
          setActualImage(newImage);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }

    // Reset
    event.target.value = "";
  };

  const handleUrlSubmit = () => {
    if (!baselineUrl.trim()) return;
    console.log("Submitting Figma URL:", baselineUrl);
    // Mock add
    const mockImage: BaselineImage = {
      id: Date.now().toString(),
      name: "Figma_Import.png",
      url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
      width: 1920,
      height: 1080,
    };
    setBaselineImages((prev) => [...prev, mockImage]);
    setBaselineUrl("");
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("CSV Upload not fully implemented in mock");
  };

  return (
    <div className="px-4 md:px-8 pt-0 pb-[25px] flex flex-col md:flex-row gap-0 min-h-[calc(100vh-280px)]">
      {/* Baselining Images Panel */}
      <div className="flex-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-black overflow-clip flex flex-col">
        {/* Using the common component which includes header and content */}
        <BaselineImageInput
          images={baselineImages}
          hasImages={baselineImages.length > 0}
          selectedImageId={selectedImageId}
          baselineUrl={baselineUrl}
          onBaselineUrlChange={setBaselineUrl}
          onUrlSubmit={handleUrlSubmit}
          onFileUpload={(e) => handleFileUpload(e, "baseline")}
          onCsvUpload={handleCsvUpload}
          onSelectImage={setSelectedImageId}
          onRefreshAll={() => console.log("Refresh All")}
          onRemoveAll={() => setBaselineImages([])}
          onRemoveImage={(id) =>
            setBaselineImages((prev) => prev.filter((img) => img.id !== id))
          }
          onRefreshImage={(id) => console.log("Refresh", id)}
          onReplaceImage={(id) => console.log("Replace", id)}
        />
      </div>

      {/* Actual Build Images Panel */}
      <div className="flex-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-black overflow-clip">
        <div className="p-5 flex flex-col gap-5 h-full">
          {/* Header */}
          <h3 className="text-black dark:text-white text-[20px]">
            Actual Build images
          </h3>

          {/* Content */}
          {actualImage ? (
            <div className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-lg p-1.5 w-full">
              <div className="flex flex-col gap-0.5">
                {/* Image Info */}
                <div className="flex items-center justify-between text-xs px-1">
                  <p className="text-black dark:text-white overflow-ellipsis overflow-hidden max-w-[190px]">
                    {actualImage.name}
                  </p>
                  <p className="text-black/20 dark:text-white/20">
                    {actualImage.width}x{actualImage.height}
                  </p>
                </div>
                {/* Image */}
                <div className="rounded overflow-hidden">
                  <img
                    src={actualImage.url}
                    alt={actualImage.name}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative border border-dashed border-black/20 dark:border-white/20 rounded-lg flex-1 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center justify-center h-full gap-2.5 p-2.5">
                <Image className="w-5 h-5 text-black dark:text-white" />
                <p className="font-mono text-[14px] text-black dark:text-white text-center">
                  Upload/paste Screenshot
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "actual")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
