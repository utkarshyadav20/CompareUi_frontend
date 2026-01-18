import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Theme, Project } from "./types";
import svgPaths from "./imports/svg-kgk8e7ds24";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailWrapper } from "./pages/ProjectDetailWrapper";
import { ProjectApi } from "./api/generated";
import apiClient from "./api/client";
import { mapBackendProjectToFrontend, BackendProjectDto, getProjectUrl } from "./utils/projectUtils";

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  // Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectApi = new ProjectApi(undefined, undefined, apiClient);
        const response = await projectApi.projectControllerFindAll();
        // The API returns void/unknown in the generated code because of missing response types in Swagger?
        // But typically axios response.data contains the body. 
        // Let's assume response.data is the array of ProjectDto.
        // We might need to cast or inspect response if generation was imperfect.
        const backendProjects = response.data as unknown as BackendProjectDto[];

        if (Array.isArray(backendProjects)) {
          const mappedProjects = backendProjects.map(mapBackendProjectToFrontend);
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (
    newProject: Omit<Project, "id" | "timestamp">
  ) => {
    const projectId = Date.now().toString();
    const timestamp = "Just now";

    // Optimistic update
    const project: Project = {
      ...newProject,
      id: projectId,
      timestamp,
    };
    setProjects([project, ...projects]);

    try {
      const projectApi = new ProjectApi(undefined, undefined, apiClient);
      await projectApi.projectControllerCreate({
        projectId: projectId,
        projectName: newProject.platform,
        projectType: newProject.type.toLowerCase(),
        buildName: newProject.buildName,
      });

      console.log("Project created successfully on backend");
      // Navigate to the new project
      navigate(getProjectUrl(project));

    } catch (error) {
      console.error("Error creating project:", error);
      // Revert optimistic update on failure
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      alert("Failed to create project on backend. Please try again.");
    }
  };



  const handleDeleteProject = async (projectId: string) => {
    // Optimistic update
    setProjects((prev) => prev.filter((p) => p.id !== projectId));

    try {
      // Use direct axios call since the generated SDK method might be missing
      await apiClient.delete(`/project/${projectId}`);
      console.log("Project deleted successfully on backend");
    } catch (error) {
      console.error("Failed to delete project:", error);
      // Revert optimistic update? Complicated since we don't have the full object easily here.
      // Ideally we should refresh or handle error better.
      alert("Failed to delete project on backend. Please try refreshing.");
    }
  };

  const projectWrapperProps = {
    projects,
    theme,
    onThemeChange: setTheme,
    isLoading,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            projects={projects}
            theme={theme}
            onThemeChange={setTheme}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
            isLoading={isLoading}
          />
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
      <Route
        path="/project/ftv/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
      <Route
        path="/project/stv/:pid"
        element={<ProjectDetailWrapper {...projectWrapperProps} />}
      />
    </Routes>
  );
}
