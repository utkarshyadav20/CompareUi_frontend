import { X, Play } from "lucide-react";
import { useEffect } from "react";

interface TestComparisonToastProps {
  onClose: () => void;
  onViewReport?: () => void;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export function TestComparisonToast({
  onClose,
  onViewReport,
  autoDismiss = true,
  dismissDelay = 5000,
}: TestComparisonToastProps) {
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        onClose();
      }, dismissDelay);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissDelay, onClose]);

  return (
    <div className="fixed bottom-8 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-popover border border-border rounded-md shadow-lg p-3 flex gap-2 w-[320px]">
        {/* Icon */}
        <div className="shrink-0 w-8 h-8 bg-muted rounded flex items-center justify-center">
          <Play className="w-4 h-4 text-foreground fill-foreground" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-sm font-dm-sans font-bold">
              UI comparison started
            </p>
            <p className="text-muted-foreground text-xs leading-tight">
              New test generated and running in background to view click on
              below
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <button
              onClick={onViewReport}
              className="text-foreground text-xs font-dm-sans font-semibold hover:opacity-80 transition-opacity"
            >
              View full report
            </button>
            <span className="text-muted-foreground text-xs">Just Now</span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
