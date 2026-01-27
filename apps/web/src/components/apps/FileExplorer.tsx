import { ScrollArea } from "@/components/ui/scroll-area";
import { WindowsEmptyFolderIcon } from "@/components/ui/windows/empty-folder";
import { type ExplorerItem, FILE_SYSTEM } from "@/lib/constants";
import {
	ArrowLeft, ArrowRight, ArrowUp, ChevronRight,
	FileText, Folder, HardDrive, LayoutGrid, List,
	Monitor, RotateCcw,
	Search, Star
} from "lucide-react";
import { useState } from "react";

// Utilitário para ícones
const getIcon = (item: ExplorerItem) => {
	if (item.type === "folder") return <Folder className="text-yellow-400 fill-yellow-400" />;
	if (item.name.endsWith(".pdf")) return <FileText className="text-red-500" />;
	return <FileText className="text-blue-400" />;
};

export function FileExplorer() {
	// Começa no "This PC" (índice 1 do array mock)
	const [currentPath, setCurrentPath] = useState<ExplorerItem[]>([FILE_SYSTEM[1]]);
	const [history, setHistory] = useState<ExplorerItem[][]>([[FILE_SYSTEM[1]]]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const currentFolder = currentPath[currentPath.length - 1];
	const items = currentFolder.children || [];

	const handleNavigate = (folder: ExplorerItem) => {
		if (folder.type !== "folder") return;

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
			handleNavigate(newPath[newPath.length - 1]); // Reutiliza lógica ou set direto
			setCurrentPath(newPath);
		}
	};

	return (
		<div className="flex flex-col h-full bg-win-bg-window text-win-text-main font-segoe select-none">
			{/* --- TOP BAR --- */}
			{/* --- TOP BAR --- */}
			<div className="flex items-center justify-between py-2 bg-win-bg-panel h-8 border-b border-win-border">
				<div className="flex items-center gap-2 pl-2">
					<button type="button" onClick={handleBack} disabled={historyIndex === 0} className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowLeft className="size-4 text-win-text-muted hover:text-white" />
					</button>
					<button type="button" disabled className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowRight className="size-4 text-win-text-muted hover:text-white" />
					</button>
					<button type="button" onClick={handleUp} disabled={currentPath.length <= 1} className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowUp className="size-4 text-win-text-muted hover:text-white" />
					</button>
				</div>

				<div className="flex items-center gap-2 flex-1 border border-[#333] bg-win-bg-input mx-1 h-6 px-2">
					<div className="flex items-center gap-2 flex-1 overflow-hidden">
						<WindowsEmptyFolderIcon className="size-4 min-w-4" />
						{currentPath.map((folder, i) => (
							<div key={folder.id} className="flex items-center">
								{i > 0 && <ChevronRight className="size-3 text-gray-400 min-w-3 mx-0.5" />}
								<span
									className="text-xs hover:bg-win-selection/20 px-1 cursor-pointer truncate"
									onClick={() => {
										// Navegar ao clicar no breadcrumb
										const newPath = currentPath.slice(0, i + 1);
										setCurrentPath(newPath);
									}}
								>
									{folder.name}
								</span>
							</div>
						))}
					</div>

					<div className="flex items-center gap-2">
						<button type="button" className="p-0.5 hover:bg-[#191919] rounded">
							<RotateCcw className="h-3.5 w-3.5 text-win-text-muted!" />
						</button>
					</div>
				</div>

				<div className="flex items-center gap-2 flex-1 border border-[#333] bg-win-bg-input mx-1 max-w-64 h-6 px-2">
					<div className="flex items-center gap-2 flex-1 pl-1">
						<input
							type="text"
							placeholder={`Search ${currentFolder.name}`}
							className="bg-transparent text-xs placeholder-win-text-muted! outline-none w-full border-none focus:ring-0 p-0 h-full"
						/>
					</div>

					<div className="flex items-center gap-2">
						<button type="button" className="p-0.5 hover:bg-[#191919] rounded">
							<Search className="h-3.5 w-3.5 text-win-text-muted!" />
						</button>
					</div>
				</div>
			</div>

			{/* --- CONTENT --- */}
			<div className="flex flex-1 overflow-hidden">
				<div className="w-48 bg-win-bg-panel border-r border-win-border flex flex-col py-2">
					<SidebarItem icon={<Star className="text-yellow-400" />} label="Quick Access" />
					<SidebarItem icon={<Monitor className="text-blue-400" />} label="This PC" active />
					<SidebarItem icon={<HardDrive className="text-gray-400" />} label="Local Disk (C:)" />
				</div>

				<ScrollArea className="flex-1 bg-win-bg-window">
					<div className="p-2">
						{/* GRID VIEW */}
						{viewMode === "grid" && (
							<div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1">
								{items.map(item => (
									<div
										key={item.id}
										onClick={() => setSelectedItems([item.id])}
										onDoubleClick={() => handleNavigate(item)}
										className={`group flex flex-col items-center p-2 border border-transparent hover:bg-win-hover-control/50 ${selectedItems.includes(item.id) ? "bg-win-selection/20 border-win-selection/40" : ""}`}
									>
										<div className="size-12 mb-1 [&>svg]:size-full">{getIcon(item)}</div>
										<span className="text-xs text-center line-clamp-2 w-full">{item.name}</span>
									</div>
								))}
							</div>
						)}

						{/* LIST VIEW */}
						{viewMode === "list" && (
							<div className="flex flex-col">
								<div className="flex text-xs text-win-text-muted px-2 py-1 border-b border-win-border mb-1">
									<span className="flex-1">Name</span>
									<span className="w-32">Date modified</span>
									<span className="w-24">Type</span>
								</div>
								{items.map(item => (
									<div
										key={item.id}
										onClick={() => setSelectedItems([item.id])}
										onDoubleClick={() => handleNavigate(item)}
										className={`flex items-center px-2 py-1 text-xs cursor-default ${selectedItems.includes(item.id) ? "bg-win-selection/20" : "hover:bg-win-hover-control/30"}`}
									>
										<div className="flex-1 flex items-center gap-2">
											<div className="size-4 [&>svg]:size-full">{getIcon(item)}</div>
											<span>{item.name}</span>
										</div>
										<span className="w-32 text-win-text-muted">{item.dateModified || "-"}</span>
										<span className="w-24 text-win-text-muted">{item.type === "folder" ? "File folder" : "File"}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</ScrollArea>
			</div>

			{/* --- FOOTER --- */}
			<div className="h-6 bg-win-bg-panel border-t border-win-border flex items-center justify-between px-2 text-xs text-win-text-muted">
				<span>{items.length} items</span>
				<div className="flex items-center gap-1 h-full">
					<button type="button" onClick={() => setViewMode("list")} className={`p-0.5 rounded hover:bg-win-hover-control ${viewMode === "list" ? "bg-win-selection/30 text-white" : ""}`}><List className="size-3.5" /></button>
					<button type="button" onClick={() => setViewMode("grid")} className={`p-0.5 rounded hover:bg-win-hover-control ${viewMode === "grid" ? "bg-win-selection/30 text-white" : ""}`}><LayoutGrid className="size-3.5" /></button>
				</div>
			</div>
		</div>
	);
}

function SidebarItem({ icon, label, active }: any) {
	return (
		<div className={`flex items-center gap-2 px-2 py-1 mx-1 rounded-sm text-xs cursor-pointer ${active ? "bg-win-hover-control text-white" : "text-win-text-main hover:bg-win-hover-control/50"}`}>
			<div className="size-4 [&>svg]:size-full">{icon}</div>
			<span>{label}</span>
		</div>
	);
}