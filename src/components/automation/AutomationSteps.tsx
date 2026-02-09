import React, { useState } from 'react';
import {
    GripVertical,
    Trash2,
    Copy,
    Plus,
    FileCode,
    Save,
    ChevronDown
} from 'lucide-react';
import autoSvg from '../../assets/AUTO.svg';

interface Step {
    id: string;
    type: string;
    action: string;
    value: string;
}

interface AutomationStepsProps {
    projectId: string;
    selectedScreenName?: string;
}

const AutomationSteps: React.FC<AutomationStepsProps> = ({ projectId, selectedScreenName = "Homescreen" }) => {
    const [steps, setSteps] = useState<Step[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddFirstStep = () => {
        setIsAdding(true);
        setSteps([
            { id: '1', type: 'Step', action: 'Down', value: '4x' },
            { id: '2', type: 'Step', action: 'OK', value: '1x' },
            { id: '3', type: 'Capture', action: 'Image', value: 'Homescreen' }
        ]);
    };

    const handleAddStep = () => {
        const newStep: Step = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'Step',
            action: 'Select Action',
            value: ''
        };
        setSteps([...steps, newStep]);
    };

    if (!isAdding && steps.length === 0) {
        return (
            <div className="flex-1 flex flex-col pt-10 px-6">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-[20px] font-semibold text-white uppercase tracking-tight">STEPS</h2>
                    <span className="text-[12px] text-gray-500 font-medium">0 steps</span>
                </div>
                <p className="text-[14px] text-gray-500 mb-20">
                    Configure the interaction for <span className="text-gray-300 font-bold">"{selectedScreenName}"</span> screenshot.
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
                        <div key={step.id} className="flex items-center gap-2 group">
                            <div className="flex-1 flex items-center gap-3 bg-[#1A1A1A] border border-white/5 rounded-[10px] p-2 hover:border-white/10 transition-colors">
                                <div className="cursor-grab active:cursor-grabbing text-gray-600 px-1">
                                    <GripVertical size={16} />
                                </div>

                                <div className="flex items-center gap-2 flex-1">
                                    {/* Type Dropdown */}
                                    <div className="relative min-w-[100px]">
                                        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 text-[14px] text-gray-300 cursor-pointer">
                                            {step.type}
                                            <ChevronDown size={14} className="text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Action Dropdown */}
                                    <div className="relative min-w-[100px]">
                                        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 text-[14px] text-gray-300 cursor-pointer">
                                            {step.action}
                                            <ChevronDown size={14} className="text-gray-500" />
                                        </div>
                                    </div>

                                    {/* Value Display/Input */}
                                    <div className="flex-1">
                                        <div className="bg-white/5 rounded-lg px-3 py-2 text-[14px] text-gray-300 border border-transparent focus-within:border-white/10">
                                            {step.type === 'Capture' ? (
                                                <span className="text-gray-300">{step.value}</span>
                                            ) : (
                                                <div className="relative flex items-center justify-between cursor-pointer">
                                                    {step.value}
                                                    <ChevronDown size={14} className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-auto p-4 flex items-center justify-between border-t border-white/5 bg-[#1A1A1A]">
                <div className="flex-1 max-w-[500px]">
                    <button
                        onClick={handleAddStep}
                        className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] border border-dashed border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all text-[14px] bg-white/[0.02]"
                    >
                        <Plus size={18} />
                        <span>Add Step</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white/5 text-gray-400 hover:text-white transition-all text-[13px] border border-white/10">
                        <FileCode size={16} />
                        <span>Export full java file</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 rounded-[8px] bg-[#2A2A2A] text-white hover:bg-[#333] transition-all text-[13px] border border-white/5 shadow-lg">
                        <Save size={16} />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AutomationSteps;
