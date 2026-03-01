
import React, { useState, useRef, useEffect } from 'react';
import {
    Plus,
    FileCode,
    Save
} from 'lucide-react';
import autoSvg from '../../assets/AUTO.svg';
import StepRow, { Step } from './StepRow';
import { generateFullFile } from '../../utils/javaGenerator';

interface AutomationStepsProps {
    projectId: string;
    selectedScreenName?: string;
    steps: Step[];
    onStepsChange: (steps: Step[]) => void;
}

const AutomationSteps: React.FC<AutomationStepsProps> = ({
    projectId,
    selectedScreenName = "Homescreen",
    steps,
    onStepsChange
}) => {
    // Drag and Drop State
    const [draggedStepId, setDraggedStepId] = useState<string | null>(null);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    // Auto-scroll ref
    const stepsEndRef = useRef<HTMLDivElement>(null);
    const prevStepsLength = useRef(steps.length);

    useEffect(() => {
        if (steps.length > prevStepsLength.current) {
            stepsEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        prevStepsLength.current = steps.length;
    }, [steps.length]);

    const handleAddFirstStep = () => {
        onStepsChange([
            {
                id: '1',
                type: 'Wait',
                action: 'visibilityOfElementLocated',
                value: 'UI Selector',
                locatorType: 'UI Automator',
                isExpanded: true
            }
        ]);
    };


    const handleUpdateStep = (id: string, updates: Partial<Step>) => {
        onStepsChange(steps.map(step =>
            step.id === id ? { ...step, ...updates } : step
        ));
    };

    const handleDeleteStep = (id: string) => {
        onStepsChange(steps.filter(step => step.id !== id));
    };

    const handleDuplicateStep = (id: string) => {
        const index = steps.findIndex(s => s.id === id);
        if (index === -1) return;

        const stepToDuplicate = steps[index];
        const newStep = {
            ...stepToDuplicate,
            id: Math.random().toString(36).substr(2, 9)
        };

        const newSteps = [...steps];
        newSteps.splice(index + 1, 0, newStep);
        onStepsChange(newSteps);
    };

    const handleToggleExpand = (id: string) => {
        onStepsChange(steps.map(step =>
            step.id === id ? { ...step, isExpanded: !step.isExpanded } : step
        ));
    };


    // ... (drag handlers)

    // ... (render)


    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        setDraggedStepId(steps[position].id);
        // Set drag ghost image effect if needed, but default is usually fine
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;

        // Optional: Reorder on hover (smooth but tricky without library)
        // For now, let's just highlight or wait for drop
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const startPos = dragItem.current;
        const endPos = dragOverItem.current;

        if (startPos !== null && endPos !== null && startPos !== endPos) {
            const newSteps = [...steps];
            const draggedItemContent = newSteps[startPos];
            newSteps.splice(startPos, 1);
            newSteps.splice(endPos, 0, draggedItemContent);
            onStepsChange(newSteps);
        }

        dragItem.current = null;
        dragOverItem.current = null;
        setDraggedStepId(null);
    };

    if (steps.length === 0) {
        return (
            <div className="flex-1 flex flex-col pt-10 px-6">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-[20px] font-semibold text-white uppercase tracking-tight">STEPS</h2>
                    <span className="text-[12px] text-gray-500 font-medium">0 steps</span>
                </div>
                <p className="text-[14px] text-gray-500 mb-20" style={{ color: "#9AA3B0" }}>
                    Configure the interaction for <span className="text-white font-bold">"{selectedScreenName}"</span> screenshot.
                </p>

                <div className="flex-1 gap-3 flex flex-col items-center justify-center -mt-20 opacity-80">
                    <img src={autoSvg} alt="Auto" className=" h-auto" style={{ width: "282px" }} />
                    <p style={{
                        color: "rgba(255, 255, 255, 0.60)",
                        textAlign: "center",
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        fontFamily: "DM Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal"
                    }}>
                        Add steps manually or paste code on the right.
                    </p>
                    <button
                        onClick={handleAddFirstStep}
                        className=" text-[14px] font-bold underline hover:opacity-80 transition-opacity" style={{ color: "#d1d1d1" }}
                    >
                        Add First Step
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="pt-10 px-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-[20px] font-semibold text-white uppercase tracking-tight">STEPS</h2>
                    <span className="text-[12px] text-gray-500 font-medium">{steps.length} steps</span>
                </div>
                <p className="text-[14px] text-gray-500 mb-8">
                    Configure the interaction for <span className="text-gray-300 font-bold">"{selectedScreenName}"</span> screenshot.
                </p>

                <div className="flex flex-col gap-3">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()} // Essential to allow drop
                            className={`transition-opacity duration-200 ${draggedStepId === step.id ? 'opacity-50' : 'opacity-100'}`}
                        >
                            <StepRow
                                step={step}
                                index={index}
                                selectedScreenName={selectedScreenName}
                                onUpdate={handleUpdateStep}
                                onDelete={handleDeleteStep}
                                onDuplicate={handleDuplicateStep}
                                onToggleExpand={handleToggleExpand}
                            />
                        </div>
                    ))}
                    <div ref={stepsEndRef} />
                </div>
            </div>

            {/* Bottom Actions Bar Removed - Moved to Parent */}
        </div>
    );
};

export default AutomationSteps;
