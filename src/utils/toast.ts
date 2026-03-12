import { ToastType } from '../components/TestComparisonToast';

export interface ToastOptions {
    type: ToastType;
    title: string;
    message: string;
    onViewReport?: () => void;
    duration?: number;
}

export const showToast = (options: ToastOptions) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: options }));
};
