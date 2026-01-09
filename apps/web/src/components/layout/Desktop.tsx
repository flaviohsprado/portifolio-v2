import { WindowsFolderIcon } from "@/components/ui/windows/folder";
import { TaskbarFolderIcon } from "@/components/ui/windows/taskbar-folder";
import { useWindowManager } from "@/hooks/use-window-manager";
import { createStandardWindow } from "@/lib/window-helpers";
import { useRef, useState } from "react";
import { ProjectsApp } from "../apps/Projects";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { DesktopFolder } from "./DesktopFolder";
import { Taskbar } from "./Taskbar";
import { WindowRenderer } from "./WindowRenderer";

export function Desktop() {
	const { windows, openWindow } = useWindowManager();
	const [isSelecting, setIsSelecting] = useState(false);
	const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
	const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({
		x: 0,
		y: 0,
	});
	const desktopRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.button === 0) {
			// Left click
			setIsSelecting(true);
			setSelectionStart({ x: e.clientX, y: e.clientY });
			setSelectionEnd({ x: e.clientX, y: e.clientY });
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isSelecting) {
			setSelectionEnd({ x: e.clientX, y: e.clientY });
		}
	};

	const handleMouseUp = () => {
		setIsSelecting(false);
	};

	const handleContextMenu = (e: React.MouseEvent) => {
		// Check if the click is on a window by checking if the target is within a window
		const target = e.target as HTMLElement;
		const isOnWindow = target.closest("[data-window-container]");

		if (isOnWindow) {
			// Prevent context menu on windows
			e.preventDefault();
			setShowContextMenu(false);
			return;
		}

		// Only show context menu on desktop background
		e.preventDefault();
		setContextMenuPosition({ x: e.clientX, y: e.clientY });
		setShowContextMenu(true);
	};

	const handleClick = () => {
		// Hide context menu when clicking anywhere
		setShowContextMenu(false);
	};

	const handleOpenProjects = () => {
		const window = createStandardWindow(
			"Projects",
			<TaskbarFolderIcon className="size-6" />,
			<ProjectsApp />,
			{ x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
			{ width: 900, height: 600 },
		);
		openWindow(window);
	};

	return (
		<div
			ref={desktopRef}
			className="h-screen w-screen overflow-hidden relative select-none"
			style={
				{
					backgroundImage: `url(${"/images/win10-wallpaper.jpg"})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				} as React.CSSProperties
			}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onContextMenu={handleContextMenu}
			onClick={handleClick}
			role="application"
			aria-label="Desktop environment"
		>
			{isSelecting && (
				<div
					className="absolute border-1 border-blue-500 bg-blue-500/20 pointer-events-none"
					style={{
						left: Math.min(selectionStart.x, selectionEnd.x),
						top: Math.min(selectionStart.y, selectionEnd.y),
						width: Math.abs(selectionEnd.x - selectionStart.x),
						height: Math.abs(selectionEnd.y - selectionStart.y),
					}}
				/>
			)}

			{/* Desktop content area */}
			<div className="h-full pb-12">
				<div className="flex flex-col gap-2">
					<DesktopFolder
						name="Projects"
						icon={<WindowsFolderIcon className="size-10" />}
						onDoubleClick={handleOpenProjects}
					/>
				</div>

				{/* Windows */}
				{windows
					.filter((window) => !window.isMinimized)
					.sort((a, b) => a.zIndex - b.zIndex)
					.map((window) => (
						<WindowRenderer key={window.id} window={window} />
					))}
			</div>

			<Taskbar />

			{showContextMenu && (
				<DesktopContextMenu
					x={contextMenuPosition.x}
					y={contextMenuPosition.y}
				/>
			)}
		</div>
	);
}
