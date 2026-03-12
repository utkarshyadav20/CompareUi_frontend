import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Theme, Project } from "./types";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailWrapper } from "./pages/ProjectDetailWrapper";
import { LoginPage } from "./pages/Auth/Login/Login";
import { SignupPage } from "./pages/Auth/Signup/Signup";
import { OtpPage } from "./pages/Auth/otp/otp";
import { ApprovePage } from "./pages/Auth/Approve/Approve";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { useAuth } from "./context/AuthContext";

import { ProjectApi } from "./api/generated";
import apiClient from "./api/client";
import { mapBackendProjectToFrontend, BackendProjectDto, getProjectUrl } from "./utils/projectUtils";
import { TestComparisonToast } from "./components/TestComparisonToast";
import { ToastOptions, showToast } from "./utils/toast";

export const AppContent = () => {
    const [theme, setTheme] = useState<Theme>("dark");
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);

    useEffect(() => {
        const handleShowToast = (e: CustomEvent<ToastOptions>) => {
            setToastOptions(e.detail);
        };
        window.addEventListener('show-toast', handleShowToast as EventListener);
        return () => window.removeEventListener('show-toast', handleShowToast as EventListener);
    }, []);

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

    // Fetch projects from backend when authenticated
    useEffect(() => {
        const fetchProjects = async () => {
            if (!isAuthenticated) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const projectApi = new ProjectApi(undefined, undefined, apiClient);
                const response = await projectApi.projectControllerFindAll();
                // The API returns void/unknown in the generated code because of missing response types in Swagger?
                // But typically axios response.data contains the body. 
                // Let's assume response.data is the array of ProjectDto.
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
    }, [isAuthenticated]);

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
                projectName: newProject.projectName,
                projectType: newProject.type.toLowerCase(),
                buildName: newProject.buildName,
            });

            // Navigate to the new project
            navigate(getProjectUrl(project));

        } catch (error) {
            console.error("Error creating project:", error);
            // Revert optimistic update on failure
            setProjects((prev) => prev.filter((p) => p.id !== projectId));
            showToast({ type: 'error', title: 'Error', message: 'Failed to create project on backend. Please try again.' });
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        // Optimistic update
        setProjects((prev) => prev.filter((p) => p.id !== projectId));

        try {
            // Use direct axios call since the generated SDK method might be missing
            await apiClient.delete(`/project/${projectId}`);
        } catch (error) {
            console.error("Failed to delete project:", error);
            // Revert optimistic update? Complicated since we don't have the full object easily here.
            // Ideally we should refresh or handle error better.
            showToast({ type: 'error', title: 'Error', message: 'Failed to delete project on backend. Please try refreshing.' });
        }
    };

    const projectWrapperProps = {
        projects,
        theme,
        onThemeChange: setTheme,
        isLoading,
    };

    return (
        <>
            <Routes>
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
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
                </Route>

                {/* Public Routes - restricted if logged in */}
                <Route element={<PublicRoute />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/signup"
                        element={<SignupPage />}
                    />
                    <Route
                        path="/otp"
                        element={<OtpPage />}
                    />
                    <Route
                        path="/approve"
                        element={<ApprovePage />}
                    />
                </Route>
            </Routes>
            {toastOptions && (
                <TestComparisonToast
                    type={toastOptions.type}
                    title={toastOptions.title}
                    message={toastOptions.message}
                    onViewReport={toastOptions.onViewReport}
                    dismissDelay={toastOptions.duration}
                    onClose={() => setToastOptions(null)}
                />
            )}
        </>
    );
}
