import {
  CircleDashed,
  CircleCheckBig,
  CircleX,
  MoreVertical,
} from "lucide-react";
import { Project, ViewMode } from "../../types";

export interface ProjectCardProps extends Project {
  onClick: () => void;
  viewMode: ViewMode;
}

export function ProjectCard({
  platform,
  platformType,
  status,
  iconBg,
  icon,
  passed,
  failed,
  timestamp,
  onClick,
  viewMode,
}: ProjectCardProps) {
  if (viewMode === "list") {
    return (
      <div
        className="bg-card rounded-lg px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-accent transition-colors border border-border"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`w-[37px] h-[37px] rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-foreground">{platform}</div>
            <div className="text-muted-foreground text-xs">{platformType}</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="min-w-[120px]">
            {status === "running" && (
              <div className="flex items-center gap-2">
                <CircleDashed className="w-3.5 h-3.5 text-muted-foreground" />
                <div className="text-foreground text-sm">
                  <span className="font-semibold">Still </span>
                  <span className="text-muted-foreground">Running</span>
                </div>
              </div>
            )}
            {status === "completed" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500/50" />
                  <span className="text-foreground text-sm">{passed}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500/50" />
                  <span className="text-foreground text-sm">{failed}</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-muted-foreground text-xs min-w-[80px]">
            {timestamp}
          </div>

          <button
            className="w-[34px] h-[34px] border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card rounded-lg px-6 py-5 flex flex-col justify-between h-[169px] cursor-pointer hover:bg-accent transition-colors border border-border"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-[37px] h-[37px] rounded-lg ${iconBg} flex items-center justify-center`}
          >
            {icon}
          </div>
          <div>
            <div className="text-foreground">{platform}</div>
            <div className="text-muted-foreground text-xs">{platformType}</div>
          </div>
        </div>
        <button
          className="w-[34px] h-[34px] border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <div>
        {status === "running" && (
          <div className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="text-foreground">
              <span className="font-semibold">Still </span>
              <span className="text-muted-foreground">Running</span>
            </div>
          </div>
        )}
        {status === "completed" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-foreground text-sm mb-1">Passed</div>
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500/50" />
                  <span className="text-foreground">{passed}</span>
                </div>
              </div>
              <div>
                <div className="text-foreground text-sm mb-1">Failed</div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500/50" />
                  <span className="text-foreground">{failed}</span>
                </div>
              </div>
            </div>
            <button
              className="bg-muted px-5 py-1.5 rounded-lg text-foreground text-sm hover:bg-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Full Report
            </button>
          </div>
        )}
      </div>

      <div className="text-muted-foreground text-xs">{timestamp}</div>
    </div>
  );
}
