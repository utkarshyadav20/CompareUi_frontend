import { X, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'neutral';

export interface TestComparisonToastProps {
  type?: ToastType;
  title: string;
  message: string;
  onClose: () => void;
  onViewReport?: () => void;
  autoDismiss?: boolean;
  dismissDelay?: number;
}

export function TestComparisonToast({
  type = 'neutral',
  title,
  message,
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

  // Determine styles and icons based on type
  const isSuccess = type === 'success';
  const isError = type === 'error';

  const borderColor = isSuccess ? 'border-green-500/50' :
    isError ? 'border-red-500/50' :
      'border-white/30';

  const iconBg = isSuccess ? 'bg-green-500/20' :
    isError ? 'bg-red-500/20' :
      'bg-white/10';

  return createPortal(
    <>
      <style>
        {`
          @keyframes toastSlideUp {
            0% {
              opacity: 0;
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .toast-slide-up {
            animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <div
        className="fixed bottom-8 right-6 toast-slide-up pointer-events-auto"
        style={{ zIndex: 2147483647 }}
      >
        <div className={`bg-[#3e3e3e] dark:bg-[#3e3e3e] border ${borderColor} rounded-md shadow-[0px_4px_20px_0px_rgba(0,0,0,0.5)] p-3 flex gap-2 w-[320px]`}>
          {/* Icon */}
          <div className={`shrink-0 w-8 h-8 ${iconBg} rounded flex items-center justify-center`}>
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-green-400" />}
            {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
            {!isSuccess && !isError && <Play className="w-4 h-4 text-white fill-white" />}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-[#f6f6f6] text-sm font-dm-sans font-bold">
                {title}
              </p>
              <p className="text-[rgba(246,246,246,0.5)] text-xs leading-tight">
                {message}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
              {onViewReport ? (
                <button
                  onClick={onViewReport}
                  className="text-[#f6f6f6] text-xs font-dm-sans font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  View full report
                </button>
              ) : (
                <div /> // Spacer
              )}
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
    </>,
    document.body
  );
}
