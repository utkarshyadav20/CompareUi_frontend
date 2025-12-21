import { useState } from "react";
import { ChevronLeft, Copy, ChevronDown, Smartphone } from "lucide-react";
import { ProjectType, EnvironmentType, Project } from "../types";
import svgPaths from "../imports/svg-kgk8e7ds24";

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: ProjectType;
  onCreateProject: (project: Omit<Project, "id" | "timestamp">) => void;
}

export function NewProjectForm({
  isOpen,
  onClose,
  selectedType,
  onCreateProject,
}: NewProjectFormProps) {
  const [projectName, setProjectName] = useState("");
  const [environmentType, setEnvironmentType] =
    useState<EnvironmentType>("Emulator");
  const [projectId] = useState(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );
  const [buildName, setBuildName] = useState("");

  const handleCreate = () => {
    if (!projectName.trim()) return;

    const iconBgMap: Record<ProjectType, string> = {
      "Smart Image": "bg-yellow-500/40",
      Website: "bg-red-500/40",
      "Android TV": "bg-green-500/40",
      "Roku TV": "bg-purple-600/40",
      Mobile: "bg-blue-500/40",
    };

    const platformTypeMap: Record<ProjectType, string> = {
      "Smart Image": "Smart Image",
      Website: "Website",
      "Android TV": `Android TV ${environmentType}`,
      "Roku TV": "Roku TV",
      Mobile: `Mobile ${environmentType}`,
    };

    const getIcon = () => {
      if (selectedType === "Android TV" || selectedType === "Mobile") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p824ec00} fill="white" />
          </svg>
        );
      }
      if (selectedType === "Roku TV") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p3b2fd480} fill="white" />
            <path d={svgPaths.p21145800} fill="white" />
          </svg>
        );
      }
      if (selectedType === "Website") {
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

    onCreateProject({
      platform: projectName,
      platformType: platformTypeMap[selectedType],
      status: "running",
      iconBg: iconBgMap[selectedType],
      icon: getIcon(),
      type: selectedType,
      buildName: buildName.trim() || undefined,
    });

    setProjectName("");
    setBuildName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
      <div className="bg-white dark:bg-black w-full md:w-[500px] max-w-full h-full border-l border-black/20 dark:border-white/20 flex flex-col">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-black/20 dark:border-white/20 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-black dark:text-white text-lg">New Project</h2>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Project ID */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project ID
            </label>
            <div className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-black/50 dark:text-white/50 text-sm font-mono">
                {projectId}
              </span>
              <button className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project Name */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Here"
              className="w-full bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none focus:border-black/80 dark:focus:border-white/80"
            />
          </div>

          {/* Build Name */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Build Name
            </label>
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="Enter Build Name"
              className="w-full bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none focus:border-black/80 dark:focus:border-white/80"
            />
          </div>
          {/* Project Type */}
          <div>
            <label className="text-black dark:text-white block mb-2">
              Project type
            </label>
            <div className="bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-black dark:text-white">{selectedType}</span>
              <ChevronDown className="w-4 h-4 text-black dark:text-white" />
            </div>
          </div>

          {/* Environment Type */}
          {(selectedType === "Android TV" || selectedType === "Mobile") && (
            <div>
              <label className="text-black dark:text-white block mb-3">
                Environment type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="environment"
                    value="Emulator"
                    checked={environmentType === "Emulator"}
                    onChange={(e) =>
                      setEnvironmentType(e.target.value as EnvironmentType)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-black dark:text-white">Emulator</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="environment"
                    value="Physical Device"
                    checked={environmentType === "Physical Device"}
                    onChange={(e) =>
                      setEnvironmentType(e.target.value as EnvironmentType)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-black dark:text-white">
                    Physical Device
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-black/20 dark:border-white/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black rounded-lg px-4 py-3 hover:bg-black/90 dark:hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
