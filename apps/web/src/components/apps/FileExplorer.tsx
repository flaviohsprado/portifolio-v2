import { ScrollArea } from "@/components/ui/scroll-area";
import { type ExplorerItem, FILE_SYSTEM } from "@/lib/constants";
import {
	FileText, Folder, HardDrive,
	Monitor,
	Star
} from "lucide-react";
import { useState } from "react";

const getIcon = (item: ExplorerItem) => {
	if (item.type === "folder") return <Folder className="text-yellow-400 fill-yellow-400" />;
	if (item.name.endsWith(".pdf")) return <FileText className="text-red-500" />;
	return <FileText className="text-blue-400" />;
};

export function FileExplorer() {
	// Estado de Navegação
	const [currentPath, setCurrentPath] = useState<ExplorerItem[]>([FILE_SYSTEM[1]]); // Começa em "This PC"
	const [history, setHistory] = useState<ExplorerItem[][]>([[FILE_SYSTEM[1]]]);
	const [historyIndex, setHistoryIndex] = useState(0);

	// Estado de Visualização
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const currentFolder = currentPath[currentPath.length - 1];
	const items = currentFolder.children || [];

	// Funções de Navegação
	const handleNavigate = (folder: ExplorerItem) => {
		if (folder.type !== "folder") return; // Lógica para abrir arquivo viria aqui

		const newPath = [...currentPath, folder];
		const newHistory = history.slice(0, historyIndex + 1);
		newHistory.push(newPath);

		setHistory(newHistory);
		setHistoryIndex(newHistory.length - 1);
		setCurrentPath(newPath);
		setSelectedItems([]);
	};

	const handleBack = () => {
		if (historyIndex > 0) {
			setHistoryIndex(prev => prev - 1);
			setCurrentPath(history[historyIndex - 1]);
		}
	};

	const handleUp = () => {
		if (currentPath.length > 1) {
			const newPath = currentPath.slice(0, -1);
			// Lógica simples de "Up" (não entra no histórico da mesma forma, mas navega)
			setCurrentPath(newPath);
		}
	};

	return (
		<div className="flex flex-col h-full bg-win-bg-window text-win-text-main font-segoe select-none">
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar (Quick Access & Tree) */}
				<div className="w-48 bg-win-bg-panel border-r border-win-border flex flex-col py-2">
					<SidebarItem icon={<Star className="text-yellow-400" />} label="Quick Access" active />
					<SidebarItem icon={<Monitor className="text-blue-400" />} label="This PC" />
					<SidebarItem icon={<HardDrive className="text-gray-400" />} label="Local Disk (C:)" />
					{/* Aqui você poderia mapear recursivamente as pastas */}
				</div>

				{/* File Area */}
				<ScrollArea className="flex-1 bg-win-bg-window">
					<div className="p-2">
						{items.length === 0 && (
							<div className="text-center text-win-text-muted mt-10">This folder is empty.</div>
						)}

						{/* VIEW MODE: GRID (Ícones Grandes) */}
						{viewMode === "grid" && (
							<div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1">
								{items.map(item => (
									<div
										key={item.id}
										onClick={() => setSelectedItems([item.id])}
										onDoubleClick={() => handleNavigate(item)}
										className={`
                                            group flex flex-col items-center p-2 border border-transparent hover:bg-win-hover-control/50 hover:border-win-border/50
                                            ${selectedItems.includes(item.id) ? "bg-win-selection/20 border-win-selection/40" : ""}
                                        `}
									>
										<div className="size-12 mb-1 [&>svg]:size-full">
											{getIcon(item)}
										</div>
										<span className="text-xs text-center line-clamp-2 break-words w-full">
											{item.name}
										</span>
									</div>
								))}
							</div>
						)}

						{/* VIEW MODE: LIST (Detalhes) */}
						{viewMode === "list" && (
							<div className="flex flex-col">
								{/* Header da Tabela */}
								<div className="flex text-xs text-win-text-muted px-2 py-1 border-b border-win-border mb-1">
									<span className="flex-1">Name</span>
									<span className="w-32">Date modified</span>
									<span className="w-24">Type</span>
									<span className="w-20">Size</span>
								</div>
								{/* Linhas */}
								{items.map(item => (
									<div
										key={item.id}
										onClick={() => setSelectedItems([item.id])}
										onDoubleClick={() => handleNavigate(item)}
										className={`
                                            flex items-center px-2 py-1 text-xs cursor-default
                                            ${selectedItems.includes(item.id) ? "bg-win-selection/20" : "hover:bg-win-hover-control/30"}
                                        `}
									>
										<div className="flex-1 flex items-center gap-2">
											<div className="size-4 [&>svg]:size-full">{getIcon(item)}</div>
											<span>{item.name}</span>
										</div>
										<span className="w-32 text-win-text-muted">{item.dateModified || "-"}</span>
										<span className="w-24 text-win-text-muted">{item.type === "folder" ? "File folder" : "File"}</span>
										<span className="w-20 text-win-text-muted">{item.size || "-"}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}

interface SidebarItemProps {
	icon: React.ReactNode;
	label: string;
	active?: boolean;
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
	return (
		<div className={`
            flex items-center gap-2 px-2 py-1 mx-1 rounded-sm text-xs cursor-pointer
            ${active ? "bg-win-hover-control text-white" : "text-win-text-main hover:bg-win-hover-control/50"}
        `}>
			<div className="size-4 [&>svg]:size-full">{icon}</div>
			<span>{label}</span>
		</div>
	);
}