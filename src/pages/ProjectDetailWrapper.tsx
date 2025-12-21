import { useParams, useNavigate } from "react-router-dom";
import { Project } from "../types";
import { ProjectDetail } from "../components/project/ProjectDetail";

interface ProjectDetailWrapperProps {
  projects: Project[];
}

export function ProjectDetailWrapper({ projects }: ProjectDetailWrapperProps) {
  const { pid } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === pid);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="text-2xl font-bold mb-4">Project Not Found</div>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return <ProjectDetail project={project} onBack={() => navigate("/")} />;
}
