
import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Copy, ChevronDown, ChevronUp, Minus } from 'lucide-react';
import { AUTOMATION_CONFIG } from './AutomationConfig';

export interface Step {
    id: string;
    type: string;
    action: string;
    value: string;
    locatorType?: string;
    isExpanded?: boolean;
}

interface StepRowProps {
    step: Step;
    index: number;
    onUpdate: (id: string, updates: Partial<Step>) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onToggleExpand: (id: string) => void;
    dragHandleProps?: any;
}

const StepRow: React.FC<StepRowProps> = ({
    step,
    index,
    onUpdate,
    onDelete,
    onDuplicate,
    onToggleExpand,
    dragHandleProps
}) => {
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showActionDropdown, setShowActionDropdown] = useState(false);
    const [showLocatorDropdown, setShowLocatorDropdown] = useState(false);
    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const actionDropdownRef = useRef<HTMLDivElement>(null);
    const locatorDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
                setShowTypeDropdown(false);
            }
            if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target as Node)) {
                setShowActionDropdown(false);
            }
            if (locatorDropdownRef.current && !locatorDropdownRef.current.contains(event.target as Node)) {
                setShowLocatorDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTypeSelect = (value: string) => {
        // Reset action when type changes
        const availableActions = AUTOMATION_CONFIG.subtypes[value as keyof typeof AUTOMATION_CONFIG.subtypes] || [];
        const defaultAction = availableActions.length > 0 ? availableActions[0].value : '';

        onUpdate(step.id, {
            type: value,
            action: defaultAction,
            locatorType: value === 'Wait' ? (AUTOMATION_CONFIG.locatorTypes?.[0]?.value || '') : undefined
        });
        setShowTypeDropdown(false);
    };

    const handleActionSelect = (value: string) => {
        onUpdate(step.id, { action: value });
        setShowActionDropdown(false);
    };

    const handleLocatorSelect = (value: string) => {
        onUpdate(step.id, { locatorType: value, isExpanded: true });
        setShowLocatorDropdown(false);
    };

    const getActionLabel = (value: string) => {
        const availableActions = AUTOMATION_CONFIG.subtypes[step.type as keyof typeof AUTOMATION_CONFIG.subtypes] || [];
        const action = availableActions.find(a => a.value === value);
        return action ? action.label : value;
    };

    const getTypeLabel = (value: string) => {
        const type = AUTOMATION_CONFIG.stepTypes.find(t => t.value === value);
        return type ? type.label : value;
    }

    const getLocatorLabel = (value?: string) => {
        const locator = AUTOMATION_CONFIG.locatorTypes?.find(l => l.value === value);
        return locator ? locator.label : value || 'Select Locator';
    }

    const showLocator = step.type === 'Wait';
    const locatorOptions = AUTOMATION_CONFIG.locatorTypes || [];

    return (
        <div className="flex flex-col gap-0 relative">
            <div
                className=" z-10 flex items-center gap-3  border border-white/5 rounded-[10px] p-3 hover:border-white/10 transition-colors group relative"
                style={{ borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.10)', backgroundColor: 'rgba(0, 0, 0, 0.20)' }}

            >
                {/* Drag Handle */}
                <div
                    className="cursor-grab active:cursor-grabbing text-gray-600 px-1 hover:text-gray-400"
                    {...dragHandleProps}
                >
                    <GripVertical size={16} />
                </div>

                {/* Main Content */}
                <div className="flex items-center gap-3 flex-1 overflow-visible">
                    {/* Type Dropdown */}
                    <div className="relative shrink-0" ref={typeDropdownRef}>
                        <button
                            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                            className="w-[140px] flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-[14px] text-gray-300 transition-colors border border-transparent focus:border-white/20 shrink-0"
                        >
                            <span className="truncate mr-2">{getTypeLabel(step.type)}</span>
                            <ChevronDown size={14} className="text-gray-500 shrink-0" />
                        </button>

                        {showTypeDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-[140px] bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                                {AUTOMATION_CONFIG.stepTypes.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleTypeSelect(option.value)}
                                        className="w-full text-left px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Dropdown */}
                    <div className="relative shrink-0" ref={actionDropdownRef}>
                        <button
                            onClick={() => setShowActionDropdown(!showActionDropdown)}
                            className="w-[220px] flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-[14px] text-gray-300 transition-colors border border-transparent focus:border-white/20 shrink-0"
                        >
                            <span className="truncate mr-2 block text-left">{getActionLabel(step.action)}</span>
                            <ChevronDown size={14} className="text-gray-500 shrink-0" />
                        </button>

                        {showActionDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-[220px] bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                                {(AUTOMATION_CONFIG.subtypes[step.type as keyof typeof AUTOMATION_CONFIG.subtypes] || []).map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleActionSelect(option.value)}
                                        className="w-full text-left px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <span className="truncate">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Locator Dropdown (Third) - Only for Wait */}
                    {showLocator && (
                        <div className="relative shrink-0" ref={locatorDropdownRef}>
                            <button
                                onClick={() => setShowLocatorDropdown(!showLocatorDropdown)}
                                className="w-[140px] flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-[14px] text-gray-300 transition-colors border border-transparent focus:border-white/20 shrink-0"
                            >
                                <span className="truncate mr-2 block text-left">{getLocatorLabel(step.locatorType)}</span>
                                <ChevronDown size={14} className="text-gray-500 shrink-0" />
                            </button>

                            {showLocatorDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-[140px] bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                                    {locatorOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleLocatorSelect(option.value)}
                                            className="w-full text-left px-3 py-2 text-[13px] text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <span className="truncate">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Conditional Input Fields based on Step Type */}
                    {step.type === 'Capture' && (
                        <input
                            type="text"
                            value={step.value}
                            onChange={(e) => onUpdate(step.id, { value: e.target.value })}
                            placeholder="Image Name"
                            className="bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-[14px] text-gray-300 transition-colors border border-transparent focus:border-white/20 focus:outline-none w-[200px]"
                        />
                    )}

                    {step.type === 'Step' && (
                        <input
                            type="number"
                            value={step.value}
                            onChange={(e) => onUpdate(step.id, { value: e.target.value })}
                            placeholder="No of steps"
                            className="bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-[14px] text-gray-300 transition-colors border border-transparent focus:border-white/20 focus:outline-none w-[120px]"
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Toggle Expand (Up/Down Arrow) */}
                    {step.type === 'Wait' && (
                        <button
                            onClick={() => onToggleExpand(step.id)}
                            className={`p-2 text-gray-500 hover:text-white transition-colors rounded-md hover:bg-white/5 ${step.isExpanded ? 'bg-white/5 text-white' : ''}`}
                        >
                            {step.isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    )}

                    {/* Remove Step (-) */}
                    <button
                        onClick={() => onDelete(step.id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-md hover:bg-white/5"
                    >
                        <Minus size={16} />
                    </button>

                    {/* Duplicate Step (Copy) */}
                    <button
                        onClick={() => onDuplicate(step.id)}
                        className="p-2 text-gray-500 hover:text-blue-400 transition-colors rounded-md hover:bg-white/5"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>
            {/* Expanded UI Selector Section with Smooth Transition - Only for Wait */}
            {step.type === 'Wait' && (
                <div
                    className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-in-out ${step.isExpanded ? 'grid-rows-[1fr] opacity-100 pt-2' : 'grid-rows-[0fr] opacity-0 pt-0'
                        }`}
                >
                    <div className="overflow-hidden">
                        <div className="flex flex-col relative">
                            <div
                                className="bg-[#111] rounded-[10px]"
                                style={{
                                    display: 'flex',
                                    padding: '16px 50px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    alignSelf: 'stretch',
                                    marginLeft: '50px', // Offset for the line
                                    marginTop: '10px'
                                }}
                            >
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider" style={{ color: "#A3A3A3" }}># {getLocatorLabel(step.locatorType) || "Selector"}</span>
                                    </div>
                                    <textarea
                                        value={step.value}
                                        onChange={(e) => onUpdate(step.id, { value: e.target.value })}
                                        placeholder="Paste ID or Selector here..."
                                        className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-[13px] text-gray-400 w-full min-h-[80px] focus:outline-none focus:border-white/20 resize-y"
                                        style={{ borderRadius: '8px', border: '1px solid #3F3F3F' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default StepRow;
