import { useWindowDrag } from "@/hooks/use-window-drag"; // Importe o hook novo
import { useWindowManager } from "@/hooks/use-window-manager";
import { useWindowResize } from "@/hooks/use-window-resize";

// Importe seus apps
import { FileExplorer } from "../apps/FileExplorer";
import { ProfileApp } from "../apps/Profile"; // Se já criou o profile
import { ProjectsApp } from "../apps/Projects";
import { Window } from "./Window";

export function WindowRenderer({ window }: { window: any }) {
	const {
		focusWindow,
		closeWindow,
		minimizeWindow,
		maximizeWindow
	} = useWindowManager();

	// Hooks de Lógica
	const { startResize } = useWindowResize(window);
	const { startDrag, isDragging } = useWindowDrag(window);

	// Renderiza o conteúdo baseado no tipo
	const renderContent = () => {
		switch (window.type) {
			case "explorer": return <FileExplorer />;
			case "window": return window.component; // Para janelas genéricas
			case "projects": return <ProjectsApp />;
			case "profile": return <ProfileApp />;
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