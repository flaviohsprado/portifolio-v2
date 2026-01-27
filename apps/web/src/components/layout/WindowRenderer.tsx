import { useWindowDrag } from "@/hooks/use-window-drag"; // Importe o hook novo
import { useWindowManager } from "@/hooks/use-window-manager";
import { useWindowResize } from "@/hooks/use-window-resize";
import type { WindowInstance } from "@portifolio-v2/config";
import { BrowserApp } from "../apps/Browser";
// Importe seus apps
import { FileExplorer } from "../apps/FileExplorer";
import { ProjectsApp } from "../apps/Projects";
import { SettingsApp } from "../apps/Settings";
import { TerminalApp } from "../apps/Terminal";
import { Window } from "./Window";

interface WindowRendererProps {
	window: WindowInstance;
}

export function WindowRenderer({ window }: WindowRendererProps) {
	const {
		focusWindow,
		closeWindow,
		minimizeWindow,
		maximizeWindow
	} = useWindowManager();

	const { startResize } = useWindowResize(window);
	const { startDrag, isDragging } = useWindowDrag(window);

	const renderContent = () => {
		switch (window.type) {
			case "explorer": return <FileExplorer />;
			case "window": return window.component;
			case "projects": return <ProjectsApp />;
			case "browser": return <BrowserApp />;
			case "settings": return <SettingsApp />;
			case "terminal": return <TerminalApp />;
			default: return <div className="p-4 text-white">App not found: {window.type}</div>;
		}
	};

	return (
		<Window
			window={window}
			isMaximized={window.isMaximized}
			position={window.position}
			isDragging={isDragging}
			handleMouseDown={(e) => {
				if ((e.target as HTMLElement).closest("button")) return;
				focusWindow(window.id);
				startDrag(e);
			}}
			handleClose={() => closeWindow(window.id)}
			handleMinimize={() => {
				console.log("Minimizing", window.id); // Debug
				minimizeWindow(window.id);
			}}
			handleMaximize={() => maximizeWindow(window.id)}
			onResizeStart={startResize}
		>
			{renderContent()}
		</Window>
	);
}