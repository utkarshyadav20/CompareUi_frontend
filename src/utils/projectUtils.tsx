import { Project, ProjectType, ProjectStatus } from "../types";
import { Smartphone } from "lucide-react";
import svgPaths from "../imports/svg-kgk8e7ds24";
import { pdf } from '@react-pdf/renderer';
import { FullReportDocument } from '../components/common/report/fullReport/FullReportDocument';
import apiClient from '../api/client';

import fireTvIcon from "../assets/firetv logo.svg";
import smartTvIcon from "../assets/smart-tv-icon.jpg";

// Define the shape of the project object as it comes from the backend
export interface BackendProjectDto {
    projectId: string;
    projectName: string;
    projectType: string;
    latestbuildTStats?: {
        buildId?: string;
        buildName?: string;
        passCount?: number;
        failCount?: number;
        comparisonRunning?: boolean;
        lastCompared?: string;
    };
}

export const getTimeAgo = (dateInput?: string | Date): string => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    const now = new Date();
    const difMs = now.getTime() - date.getTime();
    if (difMs < 60000) return "Just now";
    const difMin = Math.floor(difMs / 60000);
    if (difMin < 60) return `${difMin} min ago`;
    const difHour = Math.floor(difMin / 60);
    if (difHour < 24) return `${difHour} hour${difHour > 1 ? 's' : ''} ago`;
    const difDay = Math.floor(difHour / 24);
    if (difDay < 30) return `${difDay} day${difDay > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
};

export const getIcon = (projectType: ProjectType) => {
    if (projectType === "Fire TV") {
        return <img src={fireTvIcon} alt="Fire TV" className="object-contain" style={{ width: "30px", height: "30px" }} />;
    }
    if (projectType === "Smart TV") {
        return <img src={smartTvIcon} alt="Smart TV" className="w-5 h-5 object-contain rounded-[2px]" />;
    }
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
    "Fire TV": "bg-orange-500/40",
    "Smart TV": "bg-indigo-500/40",
};

// Helper: Title case conversion (e.g. "smart image" -> "Smart Image")
const toTitleCase = (str: string): ProjectType => {
    const map: Record<string, ProjectType> = {
        "smart image": "Smart Image",
        "website": "Website",
        "android tv": "Android TV",
        "roku tv": "Roku TV",
        "mobile": "Mobile",
        "fire tv": "Fire TV",
        "smart tv": "Smart TV",
    };
    return map[str.toLowerCase()] || "Smart Image"; // Default fallback
};

export const mapBackendProjectToFrontend = (dto: BackendProjectDto): Project => {
    const frontendType = toTitleCase(dto.projectType);

    const stats = dto.latestbuildTStats;
    let status: ProjectStatus = "idle";

    if (stats?.comparisonRunning) {
        status = "running";
    } else if (stats?.lastCompared) {
        status = "completed";
    }

    return {
        id: dto.projectId,
        projectName: dto.projectName,
        // Backend doesn't store explicit "Emulator" vs "Physical Device" yet, so we generalize
        platformType: frontendType,
        status,
        iconBg: iconBgMap[frontendType],
        icon: getIcon(frontendType),
        timestamp: getTimeAgo(stats?.lastCompared),
        type: frontendType,
        buildName: stats?.buildName,
        passed: stats?.passCount ?? 0,
        failed: stats?.failCount ?? 0,
        hasBuild: !!stats?.buildId,
        buildId: stats?.buildId,
    };
};

export const getProjectUrl = (project: { type: ProjectType; id: string }) => {
    const typeMap: Record<ProjectType, string> = {
        "Android TV": "atv",
        "Smart Image": "smi",
        Website: "web",
        Mobile: "mob",
        "Roku TV": "rtv",
        "Fire TV": "ftv",
        "Smart TV": "stv",
    };
    return `/project/${typeMap[project.type]}/${project.id}`;
};

export interface GenerateReportOptions {
    projectId: string;
    buildId: string;
    buildName?: string;
    action: 'open' | 'download';
}

export const generateAndHandleFullReport = async ({
    projectId,
    buildId,
    buildName,
    action,
}: GenerateReportOptions) => {
    if (!projectId || !buildId) {
        console.error("Missing project or build ID for report");
        return;
    }

    const response = await apiClient.get('/result/build-report', {
        params: { projectId, buildId }
    });

    const reportData = response.data;

    // Filter rows to only include 'pass' and 'fail'
    if (reportData && Array.isArray(reportData.rows)) {
        reportData.rows = reportData.rows.filter((row: any) => {
            const status = (row.resultStatus ?? '').toString().toLowerCase();
            return status === 'pass' || status === 'fail' || status === '1' || status === '0';
        });
    }

    const blob = await pdf(<FullReportDocument data={reportData} />).toBlob();
    const url = URL.createObjectURL(blob);

    if (action === 'open') {
        window.open(url, '_blank');
    } else if (action === 'download') {
        const link = document.createElement('a');
        link.href = url;
        link.download = `Full_Report_${buildName || buildId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

