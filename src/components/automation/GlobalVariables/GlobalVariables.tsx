import React, { useState } from 'react';
import { Folder } from 'lucide-react';

export interface Variable {
    id: number;
    name: string;
    value: string;
}

interface GlobalVariablesProps {
    projectId: string;
    variables: Variable[];
    onVariablesChange: (variables: Variable[]) => void;
}

const GlobalVariables: React.FC<GlobalVariablesProps> = ({ projectId, variables, onVariablesChange }) => {
    const handleValueChange = (id: number, newValue: string) => {
        onVariablesChange(variables.map(v => v.id === id ? { ...v, value: newValue } : v));
    };

    return (
        <div className="flex-1 flex flex-col h-full w-full">
            {/* Scrollable Variables List */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 custom-scrollbar">
                <div className="flex flex-col gap-6">
                    {variables.map((v) => (
                        <div key={v.id} className="flex items-center gap-4 group">



                            {/* Variable Name Container - Fixed Width */}
                            <div className="flex flex-col gap-2 w-[225px] shrink-0">
                            <span className="text-xs text-[#A3A3A3] font-medium font-['DM_Sans']" style={{ color: "#A3A3A3", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "20px" }}>
                                    Variables Name
                                </span>

                            <div className=" h-10 flex items-center px-4 
                                            rounded-lg bg-white/5 text-[16px] font-code" style={{ width: "220px", color: "#ffffffff" }}>
                                    {v.name}
                                </div>
                            </div>

                        {/* Value */}
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-xs text-[#A3A3A3] font-medium font-['DM_Sans']" style={{ color: "#A3A3A3", fontSize: "12px", fontStyle: "normal", fontWeight: 500, lineHeight: "20px" }}>
                                    Value
                                </span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={v.value}
                                        onChange={(e) => handleValueChange(v.id, e.target.value)}
                                        className="
                                            h-10 w-full px-5 rounded-lg
                                            bg-white/[0.03]
                                            border border-white/10
                                            text-white text-[13px]
                                            outline-none
                                            transition-all duration-200
                                            focus:border-white/20
                                            focus:bg-white/5
                                            pr-10
                                        "
                                        placeholder={`Enter ${v.name}...`}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlobalVariables;
