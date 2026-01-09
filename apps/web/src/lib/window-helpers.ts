import type { NewWindow, Project } from "@portifolio-v2/config";

export const createStandardWindow = (
	title: string,
	icon: React.ReactNode,
	component: React.ReactNode,
	position = { x: 100, y: 100 },
	size = { width: 900, height: 600 },
): NewWindow => ({
	type: "window",
	title,
	icon,
	component,
	position,
	size,
});

export const createVSCodeWindow = (
	title: string,
	icon: React.ReactNode,
	project: Project,
	position = { x: 100, y: 100 },
	size = { width: 1200, height: 800 },
): NewWindow => ({
	type: "vscode",
	title,
	icon,
	project,
	position,
	size,
});

export const createExplorerWindow = (
	title: string,
	icon: React.ReactNode,
	path?: string,
	position = { x: 100, y: 100 },
	size = { width: 800, height: 600 },
): NewWindow => ({
	type: "explorer",
	title,
	icon,
	path,
	position,
	size,
});

export const createBrowserWindow = (
	title: string,
	icon: React.ReactNode,
	url?: string,
	position = { x: 100, y: 100 },
	size = { width: 1000, height: 700 },
): NewWindow => ({
	type: "browser",
	title,
	icon,
	url,
	position,
	size,
});

export const createSettingsWindow = (
	title: string,
	icon: React.ReactNode,
	position = { x: 100, y: 100 },
	size = { width: 800, height: 600 },
): NewWindow => ({
	type: "settings",
	title,
	icon,
	position,
	size,
});

export const createProjectDetailsWindow = (
	title: string,
	icon: React.ReactNode,
	projectId: string,
	position = { x: 100, y: 100 },
	size = { width: 900, height: 600 },
): NewWindow => ({
	type: "project-details",
	title,
	icon,
	projectId,
	position,
	size,
});
