import { useState, useEffect } from "react";
import { Copy, Smartphone } from "lucide-react";
import { ProjectType, EnvironmentType, Project } from "../../types";
import svgPaths from "../../imports/svg-kgk8e7ds24";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../../components/ui/sheet";

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
  const [currentType, setCurrentType] = useState<ProjectType>(selectedType);
  const [projectId] = useState(
    () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentType(selectedType);
    }
  }, [isOpen, selectedType]);

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
      if (currentType === "Android TV" || currentType === "Mobile") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p824ec00} fill="white" />
          </svg>
        );
      }
      if (currentType === "Roku TV") {
        return (
          <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
            <path d={svgPaths.p3b2fd480} fill="white" />
            <path d={svgPaths.p21145800} fill="white" />
          </svg>
        );
      }
      if (currentType === "Website") {
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
      platformType: platformTypeMap[currentType],
      status: "running",
      iconBg: iconBgMap[currentType],
      icon: getIcon(),
      type: currentType,
    });

    setProjectName("");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-full p-4">
        <SheetHeader className="p-0">
          <SheetTitle className="p-0">Create New Project</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 pb-6 pt-4">
          {/* Project ID */}
          <div>
            <label className="text-foreground block mb-2">Project ID</label>
            <div className="bg-muted border border-border rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-mono">
                {projectId}
              </span>
              <button className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project Name */}
          <div>
            <label className="text-foreground block mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Here"
              className="w-full bg-background border border-input rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="text-foreground block mb-2">Project type</label>
            <Select
              value={currentType}
              onValueChange={(value) => setCurrentType(value as ProjectType)}
            >
              <SelectTrigger className="w-full h-auto bg-background border border-input rounded-lg p-4 text-foreground hover:bg-accent/50">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Smart Image">Smart Image</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Android TV">Android TV</SelectItem>
                <SelectItem value="Roku TV">Roku TV</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Environment Type */}
          {(currentType === "Android TV" || currentType === "Mobile") && (
            <div>
              <label className="text-foreground block mb-3">
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
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-foreground">Emulator</span>
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
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-foreground">Physical Device</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="flex-row gap-3 sm:justify-start">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-input rounded-lg px-4 py-3 text-foreground hover:bg-accent transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="flex-1 bg-primary text-primary-foreground rounded-lg px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
