import React from "react";
import { createPortal } from "react-dom";
import { Trash2, AlertTriangle, Info } from "lucide-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: React.ReactNode;
    description: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
    loading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    loading = false,
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (variant) {
            case "danger":
                return <Trash2 className="w-5 h-5 text-red-600" strokeWidth={2.5} />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />;
            case "info":
                return <Info className="w-5 h-5 text-blue-500" strokeWidth={2.5} />;
        }
    };

    const getIconBg = () => {
        switch (variant) {
            case "danger":
                return "bg-red-500/20";
            case "warning":
                return "bg-yellow-500/20";
            case "info":
                return "bg-blue-500/20";
        }
    };

    const getConfirmButtonClasses = () => {
        switch (variant) {
            case "danger":
                return "bg-red-600 hover:bg-red-700";
            case "warning":
                return "bg-yellow-600 hover:bg-yellow-700";
            case "info":
                return "bg-blue-600 hover:bg-blue-700";
        }
    };

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
            {/* Backdrop Layer */}
            <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.90)' }}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative flex flex-col items-center shadow-2xl border border-white/10"
                style={{
                    backgroundColor: '#272727',
                    borderRadius: '12px',
                    width: '480px',
                    maxWidth: '100%',
                    padding: '24px',
                    gap: '24px',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Content Container */}
                <div className="flex flex-col items-center gap-4 w-full">
                    {/* Header: Icon + Title */}
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg()}`}>
                            {getIcon()}
                        </div>
                        <div className="text-center">
                            {typeof title === 'string' ? (
                                <span className="text-white text-lg font-bold">
                                    {title}
                                </span>
                            ) : (
                                <div className="text-white text-lg font-bold">
                                    {title}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-center text-zinc-400 text-sm w-full">
                        {description}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center text-white text-base font-semibold transition-all cursor-pointer ${getConfirmButtonClasses()} ${loading ? "opacity-50 !cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Processing..." : confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center text-white text-base font-semibold border border-white/20 hover:bg-white/5 transition-all cursor-pointer"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
