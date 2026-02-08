import React, { useState } from 'react';

interface GlobalVariablesProps {
    projectId: string;
}

const GlobalVariables: React.FC<GlobalVariablesProps> = ({ projectId }) => {
    const [variables, setVariables] = useState([
        { id: 1, name: 'ANDROID_TV_UDID', value: '' },
        { id: 2, name: 'APK Path', value: '' },
        { id: 3, name: 'Package_name', value: '' },
        { id: 4, name: 'APPIUM_URL', value: '' }
    ]);

    const handleValueChange = (id: number, newValue: string) => {
        setVariables(prev => prev.map(v => v.id === id ? { ...v, value: newValue } : v));
    };

    return (
        <div className="pt-4 font-inter "style={{padding:"0px 16px 0px 16px"}}>
            
            {/* Header */}
            <div className="mb-8">
                <p className="text-[14px]  font-['DM_Sans']" style={{color:"#A3A3A3",fontSize: "14px",fontStyle: "normal",fontWeight: 400,lineHeight: "20px"}}>
                    These are mandatory values to be set before running the execution
                </p>
            </div>

            {/* Variables */}
            <div className="flex flex-col gap-5">
                {variables.map((v) => (
                    <div key={v.id} className="flex items-end gap-3">

                        {/* Number Badge */}
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",height:"54px",paddingTop:"14px"}}>
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full 
                                        bg-white/10 text-[11px] font-semibold text-gray-500 mb-[11px]">
                            {v.id}
                        </div>
                        </div>

                        {/* Variable Name */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-[#A3A3A3] font-medium font-['DM_Sans']"style={{color:"#A3A3A3",fontSize: "12px",fontStyle: "normal",fontWeight: 500,lineHeight: "20px"}}>
                                Variables Name
                            </span>

                            <div className=" h-10 flex items-center px-4 
                                            rounded-lg bg-white/5 text-[16px]"style={{width:"220px", fontFamily: "Consolas", color:"#E5E7EB70"}}>
                                {v.name}
                            </div>
                        </div>

                        {/* Value */}
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-xs text-[#A3A3A3] font-medium font-['DM_Sans']"style={{color:"#A3A3A3",fontSize: "12px",fontStyle: "normal",fontWeight: 500,lineHeight: "20px"}}>
                                Value
                            </span>

                            <input
                                type="text"
                                value={v.value}
                                onChange={(e) => handleValueChange(v.id, e.target.value)}
                                className="
                                    h-10 px-5 rounded-lg
                                    bg-white/[0.03]
                                    border border-white/10
                                    text-white text-[13px]
                                    outline-none
                                    transition-all duration-200
                                    focus:border-white/20
                                    focus:bg-white/5
                                "
                            />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default GlobalVariables;
