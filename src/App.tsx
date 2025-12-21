import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Project } from "./types";
import svgPaths from "./imports/svg-kgk8e7ds24";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailWrapper } from "./pages/ProjectDetailWrapper";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      platform: "Project Name",
      platformType: "Android TV Emulator",
      status: "running",
      iconBg: "bg-green-500/40",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 37 37" fill="none">
          <path d={svgPaths.p824ec00} fill="white" />
        </svg>
      ),
      timestamp: "28 min ago",
      type: "Android TV",
    },
  ]);

  const handleCreateProject = (
    newProject: Omit<Project, "id" | "timestamp">
  ) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      timestamp: "Just now",
    };
    setProjects([project, ...projects]);
  };

  const projectWrapperProps = {
    projects,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage projects={projects} onCreateProject={handleCreateProject} />
        }
      />
      <Route
        path="/project/atv/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
      <Route
        path="/project/smi/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
      <Route
        path="/project/web/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
      <Route
        path="/project/mob/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
      <Route
        path="/project/rtv/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
    </Routes>
  );
}
