import { useState } from "react";
import { Image } from "lucide-react";
import { BaselineImage, BaselineImageInput } from "./ui/BaselineImageInput";
import { ImageCard } from "./common/ImageCard";
import { EmptyState } from "./common/EmptyState";
import { ImageGridPanel } from "./common/ImageGridPanel";

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
        <div className="p-5 h-full">
          <ImageGridPanel title="Actual Build images">
            {actualImage ? (
              <ImageCard
                id={actualImage.id}
                name={actualImage.name}
                url={actualImage.url}
                width={actualImage.width}
                height={actualImage.height}
                className="w-full h-auto cursor-default hover:bg-white/5 border-white/20"
              />
            ) : (
              <EmptyState
                icon={Image}
                description="Upload/paste Screenshot"
                variant="dashed"
                fileInputProps={{
                  accept: "image/*",
                  onChange: (e) => handleFileUpload(e, "actual"),
                }}
              />
            )}
          </ImageGridPanel>
        </div>
      </div>
    </div>
  );
}
