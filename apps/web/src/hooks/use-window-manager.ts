import { constrainToBoundaries } from "@/lib/boundary-utils";
import type { NewWindow, WindowInstance } from "@portifolio-v2/config";
import { create } from "zustand";

let zIndexCounter = 10;
let idCounter = 0;

type WindowManagerState = {
	windows: WindowInstance[];
	openWindow: (newWindow: NewWindow) => void;
	closeWindow: (id: string) => void;
	focusWindow: (id: string) => void;
	minimizeWindow: (id: string) => void;
	restoreWindow: (id: string) => void;
	maximizeWindow: (id: string) => void;
	updateWindowPosition: (
		id: string,
		position: { x: number; y: number },
	) => void;
	updateWindowSize: (
		id: string,
		size: { width: number; height: number },
	) => void;
	getTopWindowId: () => string | null;
	getWindowById: (id: string) => WindowInstance | undefined;
	updateWindowRect: (
		id: string,
		rect: { x: number; y: number; width: number; height: number },
	) => void;
};

export const useWindowManager = create<WindowManagerState>((set, get) => ({
	windows: [],

	openWindow: (newWindow) => {
		const newId = `window-${idCounter++}`;
		const newZIndex = zIndexCounter++;

		// Check if window already exists
		const existingWindow = get().windows.find((w) => w.id === newId);
		if (existingWindow) {
			// If window exists, just restore it
			set((state) => ({
				windows: state.windows.map((w) =>
					w.id === newId ? { ...w, isMinimized: false, zIndex: newZIndex } : w,
				),
			}));
			return;
		}

		// Ensure the new window position is within viewport boundaries
		const constrainedPosition = constrainToBoundaries(
			newWindow.position,
			newWindow.size.width,
			newWindow.size.height,
		);

		const windowInstance = {
			...newWindow,
			id: newId,
			zIndex: newZIndex,
			position: constrainedPosition,
			isMinimized: false,
			isMaximized: false,
		} as WindowInstance;

		set((state) => ({
			windows: [...state.windows, windowInstance],
		}));
	},

	closeWindow: (id) => {
		set((state) => ({
			windows: state.windows.filter((w) => w.id !== id),
		}));
	},

	focusWindow: (id) => {
		const topWindowId = get().getTopWindowId();
		if (topWindowId === id) return;

		const newZIndex = zIndexCounter++;
		set((state) => ({
			windows: state.windows.map((w) =>
				w.id === id ? { ...w, zIndex: newZIndex } : w,
			),
		}));
	},

	minimizeWindow: (id) => {
		set((state) => ({
			windows: state.windows.map((w) =>
				w.id === id ? { ...w, isMinimized: true } : w,
			),
		}));
	},

	restoreWindow: (id) => {
		set((state) => ({
			windows: state.windows.map((w) =>
				w.id === id ? { ...w, isMinimized: false } : w,
			),
		}));
	},

	maximizeWindow: (id) => {
		set((state) => ({
			windows: state.windows.map((w) => {
				if (w.id === id) {
					if (w.isMaximized) {
						// Restore to original size
						return {
							...w,
							isMaximized: false,
							position: w.originalPosition || w.position,
							size: w.originalSize || w.size,
						};
					}
					// Maximize
					return {
						...w,
						isMaximized: true,
						originalPosition: w.position,
						originalSize: w.size,
						position: { x: 0, y: 0 },
						size: { width: window.innerWidth, height: window.innerHeight - 64 },
					};
				}
				return w;
			}),
		}));
	},

	updateWindowPosition: (id, position) => {
		const window = get().getWindowById(id);
		if (!window) return;

		const constrainedPosition = constrainToBoundaries(
			position,
			window.size.width,
			window.size.height,
		);

		set((state) => ({
			windows: state.windows.map((w) =>
				w.id === id ? { ...w, position: constrainedPosition } : w,
			),
		}));
	},

	updateWindowSize: (id, size) => {
		const window = get().getWindowById(id);
		if (!window) return;

		const constrainedPosition = constrainToBoundaries(
			window.position,
			size.width,
			size.height,
		);

		set((state) => ({
			windows: state.windows.map((w) =>
				w.id === id ? { ...w, size, position: constrainedPosition } : w,
			),
		}));
	},

	getTopWindowId: () => {
		const windows = get().windows;
		if (windows.length === 0) return null;

		return windows.reduce(
			(top, w) => (w.zIndex > top.zIndex ? w : top),
			windows[0],
		).id;
	},

	getWindowById: (id) => {
		return get().windows.find((w) => w.id === id);
	},

	updateWindowRect: (id, rect) => {
		set((state) => ({
			windows: state.windows.map((w) => {
				if (w.id === id) {
					return {
						...w,
						position: { x: rect.x, y: rect.y },
						size: { width: rect.width, height: rect.height },
					};
				}
				return w;
			}),
		}));
	},
}));
