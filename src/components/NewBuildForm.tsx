import { useState } from 'react';
import { X } from 'lucide-react';
import { ProjectApi } from '../api/generated';
import apiClient from '../api/client';

interface NewBuildFormProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    onBuildCreated?: () => void;
}

export function NewBuildForm({ isOpen, onClose, projectId, onBuildCreated }: NewBuildFormProps) {
    const [buildName, setBuildName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleCreate = async () => {
        if (!buildName.trim()) return;

        setIsLoading(true);
        setStatusMessage(null);
        try {
            const projectApi = new ProjectApi(undefined, undefined, apiClient);
            await projectApi.projectControllerCreateBuild(projectId, {
                buildName: buildName
            });

            setStatusMessage({ type: 'success', text: 'Build created successfully!' });
            setBuildName('');
            if (onBuildCreated) {
                // Wait a moment so user sees the success message
                setTimeout(() => {
                    onBuildCreated();
                    onClose();
                    setStatusMessage(null);
                }, 1000);
            } else {
                setTimeout(() => {
                    onClose();
                    setStatusMessage(null);
                }, 1000);
            }
        } catch (error) {
            console.error('Failed to create build:', error);
            setStatusMessage({ type: 'error', text: 'Failed to create build. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div
                className="bg-white dark:bg-[#191919] w-[1200px] max-w-[95%] rounded-lg overflow-hidden shadow-xl animation-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-black/10 dark:border-white/10 shrink-0">
                    <h2 className="text-black dark:text-white text-base font-semibold uppercase tracking-wider">New Build</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {statusMessage?.type === 'success' ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Success!</h3>
                            <p className="text-black/60 dark:text-white/60">
                                {statusMessage.text}
                            </p>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={buildName}
                                onChange={(e) => setBuildName(e.target.value)}
                                placeholder="Build Name (e.g. v2.0)"
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white text-base placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                                autoFocus
                            />

                            {/* Error Message */}
                            {statusMessage?.type === 'error' && (
                                <div className="mt-4 p-3 rounded-lg text-sm bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                                    {statusMessage.text}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                {(!statusMessage || statusMessage.type !== 'success') && (
                    <div className="px-6 py-4 bg-black/5 dark:bg-white/5 flex justify-end gap-3 shrink-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="px-4 py-2 text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreate();
                            }}
                            disabled={!buildName.trim() || isLoading}
                            className="px-4 py-2 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-black/80 dark:hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Build'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
