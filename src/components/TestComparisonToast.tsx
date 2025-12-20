import { X, Play } from 'lucide-react';
import { useEffect } from 'react';

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
  dismissDelay = 5000 
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
      <div className="bg-[#3e3e3e] dark:bg-[#3e3e3e] border border-white/30 rounded-md shadow-[0px_4px_20px_0px_rgba(0,0,0,0.5)] p-3 flex gap-2 w-[320px]">
        {/* Icon */}
        <div className="shrink-0 w-8 h-8 bg-white/10 rounded flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-[#f6f6f6] text-sm font-dm-sans font-bold">
              UI comparison started
            </p>
            <p className="text-[rgba(246,246,246,0.5)] text-xs leading-tight">
              New test generated and running in background to view click on below
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <button 
              onClick={onViewReport}
              className="text-[#f6f6f6] text-xs font-dm-sans font-semibold hover:text-white transition-colors"
            >
              View full report
            </button>
            <span className="text-white/50 text-xs">Just Now</span>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={onClose}
          className="shrink-0 text-[rgba(246,246,246,0.5)] hover:text-[#f6f6f6] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
