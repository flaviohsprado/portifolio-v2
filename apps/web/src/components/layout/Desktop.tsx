import { WindowsFolderIcon } from "@/components/ui/windows/folder";
import { TaskbarFolderIcon } from "@/components/ui/windows/taskbar-folder";
import { useWindowManager } from "@/hooks/use-window-manager";
import { createStandardWindow } from "@/lib/window-helpers";
import { Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ProjectsApp } from "../apps/Projects";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { DesktopItem } from "./DesktopItem";
import { Taskbar } from "./Taskbar";
import { WindowRenderer } from "./WindowRenderer";

const INITIAL_DESKTOP_ITEMS = [
	{ id: "recycle", label: "Lixeira", icon: <Trash2 className="size-8 text-white" />, type: "system" },
	{ id: "projects", label: "Projetos", icon: <WindowsFolderIcon className="size-10" />, type: "folder", appId: "projects" },
	{ id: "certs", label: "Certificados", icon: <WindowsFolderIcon className="size-10 text-yellow-300" />, type: "folder", appId: "certs" },
];

export function Desktop() {
	const { windows, openWindow } = useWindowManager();

	const [isSelecting, setIsSelecting] = useState(false);
	const [selectionBox, setSelectionBox] = useState<{ start: { x: number, y: number }, end: { x: number, y: number } } | null>(null);
	const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

	const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

	const desktopRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.target !== desktopRef.current && e.target !== e.currentTarget) return;
		if (e.button !== 0) return;

		setSelectedItemIds([]);
		setContextMenu(null);

		setSelectionBox({
			start: { x: e.clientX, y: e.clientY },
			end: { x: e.clientX, y: e.clientY }
		});
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!selectionBox) return;

		const currentX = e.clientX;
		const currentY = e.clientY;

		const dist = Math.hypot(currentX - selectionBox.start.x, currentY - selectionBox.start.y);

		if (!isSelecting && dist > 10) {
			setIsSelecting(true);
		}

		if (isSelecting || dist > 10) {
			setSelectionBox(prev => prev ? ({ ...prev, end: { x: currentX, y: currentY } }) : null);
		}
	};

	const handleMouseUp = () => {
		setIsSelecting(false);
		setSelectionBox(null);
	};

	const handleOpenItem = (item: typeof INITIAL_DESKTOP_ITEMS[0]) => {
		let window = null;

		if (item.id === "projects") {

			window = createStandardWindow(
				"Projects",
				<TaskbarFolderIcon className="size-6" />,
				<ProjectsApp />,
				{ x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
				{ width: 900, height: 600 },
			);
		}

		if (window) {
			openWindow(window);
		}
	};

	return (
		<div
			ref={desktopRef}
			className="h-screen w-screen overflow-hidden relative select-none bg-cover bg-center"
			style={{ backgroundImage: `url('/images/win10-wallpaper.jpg')` }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onContextMenu={(e) => {
				e.preventDefault();
				setContextMenu({ x: e.clientX, y: e.clientY });
			}}
			onClick={() => setContextMenu(null)}
		>
			<div className="absolute top-0 left-0 bottom-12 p-2 flex flex-col flex-wrap gap-2 content-start h-full w-full z-0 pointer-events-none">
				<div className="flex flex-col gap-2 pointer-events-auto">
					{INITIAL_DESKTOP_ITEMS.map(item => (
						<DesktopItem
							key={item.id}
							id={item.id}
							label={item.label}
							icon={item.icon}
							isSelected={selectedItemIds.includes(item.id)}
							onSelect={(id, multi) => setSelectedItemIds(multi ? [...selectedItemIds, id] : [id])}
							onDoubleClick={() => handleOpenItem(item)}
						/>
					))}
				</div>
			</div>

			{isSelecting && selectionBox && (
				<div
					className="absolute border-2 border-win-selection bg-win-selection/50 pointer-events-none z-50"
					style={{
						left: Math.min(selectionBox.start.x, selectionBox.end.x),
						top: Math.min(selectionBox.start.y, selectionBox.end.y),
						width: Math.abs(selectionBox.end.x - selectionBox.start.x),
						height: Math.abs(selectionBox.end.y - selectionBox.start.y),
					}}
				/>
			)}

			<AnimatePresence>
				{windows.map((window) => (
					<WindowRenderer key={window.id} window={window} />
				))}
			</AnimatePresence>

			<Taskbar />

			{contextMenu && <DesktopContextMenu x={contextMenu.x} y={contextMenu.y} />}
		</div>
	);
}
