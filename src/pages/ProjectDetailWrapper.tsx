import { useParams, useNavigate } from "react-router-dom";
import { Project, Theme } from "../types";
import { ProjectDetail } from "../components/ProjectDetail";
import LoaderGif from "../assets/Loader.gif";

interface ProjectDetailWrapperProps {
  projects: Project[];
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  isLoading?: boolean;
}

export function ProjectDetailWrapper({
  projects,
  theme,
  onThemeChange,
  isLoading = false,
}: ProjectDetailWrapperProps) {
  const { pid } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === pid);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <img src={LoaderGif} alt="Loading..." style={{ height: "10rem" }} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="text-2xl font-bold mb-4">Project Not Found</div>
        <button
          onClick={() => navigate("/")}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <ProjectDetail
      project={project}
      onBack={() => navigate("/")}
      theme={theme}
      onThemeChange={onThemeChange}
    />
  );
}
