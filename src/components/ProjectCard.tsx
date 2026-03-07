import { useState } from 'react';
import {
  CircleDashed,
  CircleCheckBig,
  CircleX,
  MoreVertical,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";

import { Project, ViewMode } from "../types";
import { NewBuildForm } from "./NewBuildForm";
import { generateAndHandleFullReport } from "../utils/projectUtils";

export interface ProjectCardProps extends Project {
  onClick: () => void;
  viewMode: ViewMode;
  onDelete?: () => void;
}

export function ProjectCard({
  id,
  projectName,
  platformType,
  status,
  iconBg,
  icon,
  passed,
  failed,
  timestamp,
  onClick,
  viewMode,
  onDelete,
  hasBuild,
  buildName,
  buildId,
}: ProjectCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewBuildOpen, setIsNewBuildOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleViewReport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id || !buildId || isGeneratingReport) return;
    try {
      setIsGeneratingReport(true);
      await generateAndHandleFullReport({ projectId: id, buildId, buildName, action: 'open' });
    } catch (error) {
      console.error("Error generating full report:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Common Menu Component
  const MenuDropdown = () => (
    <>
      <div className="fixed inset-0 z-10" onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
      }} />
      <div className="absolute right-0 top-full mt-2 min-w-[200px] bg-white dark:bg-[#191919] border border-black/10 dark:border-white/10 rounded-lg shadow-xl z-20 overflow-hidden py-1">
        <button
          className="w-full px-4 py-2.5 text-left text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
            setIsNewBuildOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Create New Build
        </button>
        <button
          className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
            onDelete?.();
          }}
        >
          <Trash2 className="w-4 h-4" />
          Delete Project
        </button>
      </div>

    </>
  );

  if (viewMode === "list") {
    return (
      <div
        className="bg-black/5 dark:bg-white/10 rounded-lg px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/10 dark:border-white/10"
        onClick={onClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`w-[37px] h-[37px] rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-black dark:text-white">{projectName}</div>
            <div className="text-black/75 dark:text-white/75 text-xs">
              {platformType}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="min-w-[120px]">
            {status === "running" && (
              <div className="flex items-center gap-2">
                <CircleDashed className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
                <div className="text-black dark:text-white text-sm">
                  <span className="font-semibold">Still </span>
                  <span className="text-black/50 dark:text-white/50">
                    Running
                  </span>
                </div>
              </div>
            )}
            {status === "completed" && hasBuild && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500/50" />
                  <span className="text-black dark:text-white text-sm">
                    {passed}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500/50" />
                  <span className="text-black dark:text-white text-sm">
                    {failed}
                  </span>
                </div>
              </div>
            )}
          </div>

          {status === "completed" && hasBuild && (
            <button
              className="bg-black/10 dark:bg-white/10 px-4 py-1.5 rounded-md text-black h-10 dark:text-white text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15 transition-colors cursor-pointer flex items-center gap-2"
              onClick={handleViewReport}
            >
              {isGeneratingReport ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "View Full Report"
              )}
            </button>
          )}

          <div className="text-black/50 dark:text-white/50 text-xs min-w-[80px]">
            {hasBuild && buildName ? `${buildName} • ` : ""}{timestamp}
          </div>

          <div className="relative">
            <button
              className="w-[34px] h-[34px] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <MoreVertical className="w-4 h-4 text-black dark:text-white" />
            </button>
            {isMenuOpen && <MenuDropdown />}
          </div>
        </div>
        <NewBuildForm
          isOpen={isNewBuildOpen}
          onClose={() => setIsNewBuildOpen(false)}
          projectId={id}
          onBuildCreated={() => setIsNewBuildOpen(false)}
        />
      </div>
    );
  }

  return (
    <div
      className="bg-black/5 dark:bg-white/10 rounded-lg px-6 py-5 flex flex-col justify-between h-[169px] cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-black/10 dark:border-white/10"
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
            <div className="text-black dark:text-white font-bold">{projectName}</div>
            <div className="text-black/75 dark:text-white/75 text-xs">
              {platformType}
            </div>
          </div>
        </div>
        <div className="relative">
          <button
            className="w-[34px] h-[34px] border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <MoreVertical className="w-4 h-4 text-black dark:text-white" />
          </button>
          {isMenuOpen && <MenuDropdown />}
        </div>
      </div>

      <div>
        {status === "running" && (
          <div className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
            <div className="text-black dark:text-white">
              <span className="font-semibold">Still </span>
              <span className="text-black/50 dark:text-white/50">Running</span>
            </div>
          </div>
        )}
        {status === "completed" && hasBuild && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-black dark:text-white text-[13px] font-bold mb-1">
                  Passed
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleCheckBig className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-black dark:text-white text-s font-semibold">{passed}</span>
                </div>
              </div>
              <div>
                <div className="text-black dark:text-white text-[13px] font-bold mb-1">
                  Failed
                </div>
                <div className="flex items-center gap-1.5">
                  <CircleX className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-black dark:text-white text-s font-semibold">{failed}</span>
                </div>
              </div>
            </div>
            <button
              className="bg-black/10 dark:bg-white/10 px-4 py-1.5 rounded-md text-black h-10 dark:text-white text-sm font-semibold hover:bg-black/15 dark:hover:bg-white/15 transition-colors cursor-pointer flex items-center gap-2"
              onClick={handleViewReport}
            >
              {isGeneratingReport ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "View Full Report"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="text-black/50 dark:text-white/50 text-xs">
        {hasBuild && buildName ? `${buildName} • ` : ""}{timestamp}
      </div>
      <NewBuildForm
        isOpen={isNewBuildOpen}
        onClose={() => setIsNewBuildOpen(false)}
        projectId={id}
        onBuildCreated={() => setIsNewBuildOpen(false)}
      />
    </div>
  );
}
