export type ViewMode = "grid" | "list";
export type ProjectType =
  | "Smart Image"
  | "Website"
  | "Android TV"
  | "Roku TV"
  | "Mobile"
  | "Fire TV"
  | "Smart TV";

export type EnvironmentType = "Emulator" | "Physical Device";
export type ProjectStatus = "running" | "completed" | "failed";
export type Theme = "light" | "dark" | "system";

export interface Project {
  id: string;
  platform: string;
  platformType: string;
  status: ProjectStatus;
  iconBg: string;
  icon: React.ReactNode;
  passed?: number;
  failed?: number;
  timestamp: string;
  type: ProjectType;
  buildName?: string;
}
