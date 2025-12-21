import { Project, ProjectType } from "../types";
import { Smartphone } from "lucide-react";
import svgPaths from "../imports/svg-kgk8e7ds24";

// Define the shape of the project object as it comes from the backend
export interface BackendProjectDto {
    projectId: string;
    projectName: string;
    projectType: string;
    buildName?: string;
    // created_at? - if your backend returns this
}

export const getIcon = (projectType: ProjectType) => {
    if (projectType === "Android TV" || projectType === "Mobile") {
        return (
            <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
                <path d={svgPaths.p824ec00} fill="white" />
            </svg>
        );
    }
    if (projectType === "Roku TV") {
        return (
            <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
                <path d={svgPaths.p3b2fd480} fill="white" />
                <path d={svgPaths.p21145800} fill="white" />
            </svg>
        );
    }
    if (projectType === "Website") {
        return (
            <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
                <path
                    d={svgPaths.p28bc3a00}
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
    return <Smartphone className="w-5 h-5 text-white" />;
};

const iconBgMap: Record<ProjectType, string> = {
    "Smart Image": "bg-yellow-500/40",
    Website: "bg-red-500/40",
    "Android TV": "bg-green-500/40",
    "Roku TV": "bg-purple-600/40",
    Mobile: "bg-blue-500/40",
};

// Helper: Title case conversion (e.g. "smart image" -> "Smart Image")
const toTitleCase = (str: string): ProjectType => {
    const map: Record<string, ProjectType> = {
        "smart image": "Smart Image",
        "website": "Website",
        "android tv": "Android TV",
        "roku tv": "Roku TV",
        "mobile": "Mobile",
    };
    return map[str.toLowerCase()] || "Smart Image"; // Default fallback
};

export const mapBackendProjectToFrontend = (dto: BackendProjectDto): Project => {
    const frontendType = toTitleCase(dto.projectType);

    return {
        id: dto.projectId,
        platform: dto.projectName,
        // Backend doesn't store explicit "Emulator" vs "Physical Device" yet, so we generalize
        platformType: frontendType,
        status: "running", // Default status as backend doesn't seem to have status yet
        iconBg: iconBgMap[frontendType],
        icon: getIcon(frontendType),
        timestamp: "Just now", // Backend DTO doesn't include timestamp in the interface yet
        type: frontendType,
        buildName: dto.buildName,
    };
};
