import { useWindowManager } from "@/hooks/use-window-manager";
import { useWindowResize } from "@/hooks/use-window-resize";
import { constrainToBoundaries } from "@/lib/boundary-utils";
import type { WindowInstance } from "@portifolio-v2/config";
import { useEffect, useState } from "react";
import { BrowserApp } from "../apps/Browser";
import { FileExplorer } from "../apps/FileExplorer";
import { ProjectDetailsApp } from "../apps/ProjectDetails";
import { SettingsApp } from "../apps/Settings";
import { VSCode } from "../apps/vscode";
import { Window } from "./Window";

interface WindowRendererProps {
	window: WindowInstance;
}

export function WindowRenderer({ window }: WindowRendererProps) {
	const {
		closeWindow,
		minimizeWindow,
		maximizeWindow,
		focusWindow,
		updateWindowPosition,
	} = useWindowManager();
	const { startResize, isResizing } = useWindowResize(window);

	const [position, setPosition] = useState(window.position);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [isMaximized, setIsMaximized] = useState(window.isMaximized);
	const [originalPosition, setOriginalPosition] = useState(window.position);

	// Update local state when window state changes
	useEffect(() => {
		setPosition(window.position);
		setIsMaximized(window.isMaximized);
	}, [window.position, window.isMaximized]);

	const handleMouseDown = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("button")) return;

		// Focus the window when clicked
		focusWindow(window.id);

		// If window is maximized and user starts dragging, unmaximize first
		if (isMaximized) {
			setIsMaximized(false);
			setPosition(originalPosition);
			return;
		}

		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	// Add/remove mouse event listeners with useEffect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging || isMaximized) return;

			const newPosition = {
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			};

			// Constrain position to viewport boundaries
			const constrainedPosition = constrainToBoundaries(
				newPosition,
				window.size.width,
				window.size.height,
			);

			setPosition(constrainedPosition);
			updateWindowPosition(window.id, constrainedPosition);
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [
		isDragging,
		dragStart,
		isMaximized,
		window.size.width,
		window.size.height,
		window.id,
		updateWindowPosition,
	]);

	const handleMaximize = () => {
		if (isMaximized) {
			setIsMaximized(false);
			setPosition(originalPosition);
		} else {
			setOriginalPosition(position);
			setIsMaximized(true);
			setPosition({ x: 0, y: 0 });
		}
		maximizeWindow(window.id);
	};

	const handleClose = () => {
		closeWindow(window.id);
	};

	const handleMinimize = () => {
		minimizeWindow(window.id);
	};

	const renderWindowContent = () => {
		switch (window.type) {
			case "vscode":
				return (
					<VSCode
						window={window}
						onClose={handleClose}
						onMinimize={handleMinimize}
						onMaximize={handleMaximize}
						zIndex={window.zIndex}
						project={window.project}
					/>
				);
			case "explorer":
				return <FileExplorer />;
			case "browser":
				return <BrowserApp />;
			case "settings":
				return <SettingsApp />;
			case "project-details":
				return <ProjectDetailsApp projectId={window.projectId} />;
			case "window":
			default:
				return window.component;
		}
	};

	if (window.type === "vscode") {
		return renderWindowContent();
	}

	return (
		<Window
			window={window}
			isMaximized={isMaximized}
			position={position}
			isDragging={isDragging}
			handleMouseDown={handleMouseDown}
			handleMinimize={handleMinimize}
			handleMaximize={handleMaximize}
			handleClose={handleClose}
			onResizeStart={startResize}
		>
			{renderWindowContent()}
		</Window>
	);
}
