import type { ReactNode } from "react";
import type z from "zod";
import type { ImageItemSchema } from "./schemas";

export enum ProjectStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	ARCHIVED = "archived",
}

export type Project = {
	id: string;
	name: string;
	description: string | null;
	status: ProjectStatus;
	url: string | null;
	repositoryUrl: string | null;
	topics: string | null;
};

export enum ContentType {
	ISSUE = "issue",
	PROJECT = "project",
	USER = "user",
	AVATAR = "avatar",
}
export type ImageItem = z.infer<typeof ImageItemSchema>;

type CustomOption = {
	label: string;
	value: string;
};
export type CustomOptions = Array<CustomOption>;

export enum IssueStatus {
	PENDING = "pending",
	PROGRESS = "progress",
	DONE = "done",
	CLOSED = "closed",
}
export enum IssuePriority {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
	URGENT = "urgent",
}
export enum IssueType {
	BUG = "bug",
	FEATURE = "feature",
	ENHANCEMENT = "enhancement",
	TASK = "task",
}

export type ProjectLink = {
	id: string;
	name: string;
	href: string;
	icon: ReactNode;
};

export enum ContentCodeEnum {
	PROJECT = "project",
	ENV = "env",
	ISSUE = "issue",
}

/**
 * Base properties for any window, regardless of type.
 */
export type BaseWindow = {
	id: string;
	title: string;
	icon: ReactNode;
	zIndex: number;
	position: { x: number; y: number };
	size: { width: number; height: number };
	isMinimized: boolean;
	isMaximized: boolean;
	originalPosition?: { x: number; y: number };
	originalSize?: { width: number; height: number };
};

/**
 * Standard application window that receives children components
 */
export type StandardWindow = BaseWindow & {
	type: "window";
	component: ReactNode;
};

/**
 * VSCode window that receives a project
 */
export type VSCodeWindow = BaseWindow & {
	type: "vscode";
	project: Project;
};

/**
 * File Explorer window
 */
export type ExplorerWindow = BaseWindow & {
	type: "explorer";
	path?: string;
};

/**
 * Browser window
 */
export type BrowserWindow = BaseWindow & {
	type: "browser";
	url?: string;
};

/**
 * Settings window
 */
export type SettingsWindow = BaseWindow & {
	type: "settings";
};

/**
 * Project details window
 */
export type ProjectDetailsWindow = BaseWindow & {
	type: "project-details";
	projectId: string;
};

export type WindowInstance =
	| StandardWindow
	| VSCodeWindow
	| ExplorerWindow
	| BrowserWindow
	| SettingsWindow
	| ProjectDetailsWindow
	| ProjectsWindow
	| ProfileWindow;

/**
 * Projects window
 */
export type ProjectsWindow = BaseWindow & {
	type: "projects";
};

/**
 * Profile window
 */
export type ProfileWindow = BaseWindow & {
	type: "profile";
};

export type NewWindow =
	| Omit<StandardWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<VSCodeWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<ExplorerWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<BrowserWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<SettingsWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<ProjectDetailsWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<ProjectsWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">
	| Omit<ProfileWindow, "id" | "zIndex" | "isMinimized" | "isMaximized">;

/**
 * Window type for creating new windows
 */
export type WindowType =
	| "window"
	| "vscode"
	| "explorer"
	| "browser"
	| "settings"
	| "project-details"
	| "projects"
	| "profile";

export type SettingsPage = "home" | "system" | "personalization" | "accounts";
