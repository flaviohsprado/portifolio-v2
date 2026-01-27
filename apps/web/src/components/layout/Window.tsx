import { Button } from "@/components/ui/button";
import { WindowsEmptyFolderIcon } from "@/components/ui/windows/empty-folder";
import { resizeHandleClasses } from "@/lib/constants";
import type { WindowInstance } from "@portifolio-v2/config";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ChevronRight,
	Copy, // Importei para simular o ícone de "Restaurar"
	Minus,
	RotateCcw,
	Search,
	Square,
	X,
} from "lucide-react";

interface WindowProps {
	window: WindowInstance;
	isMaximized: boolean;
	position: { x: number; y: number };
	isDragging: boolean;
	handleMouseDown: (e: React.MouseEvent) => void;
	handleMinimize: () => void;
	handleMaximize: () => void;
	handleClose: () => void;
	children: React.ReactNode;
	onResizeStart: (direction: string, e: React.MouseEvent) => void;
}

export function Window({
	window,
	isMaximized,
	position,
	isDragging,
	handleMouseDown,
	handleMinimize,
	handleMaximize,
	handleClose,
	children,
	onResizeStart,
}: WindowProps) {
	return (
		<div
			className="fixed rounded-none shadow-win-lg overflow-hidden border border-gray-600/50" // Adicionei uma borda subtil para destacar do fundo
			data-window-container
			style={{
				left: 0,
				top: 0,
				transform: isMaximized ? "translate(0, 0)" : `translate(${position.x}px, ${position.y}px)`,
				width: isMaximized ? "100vw" : `${window.size.width}px`,
				height: isMaximized ? "calc(100vh - 3rem)" : `${window.size.height}px`,
				zIndex: window.zIndex,
				willChange: isDragging ? "transform" : "auto",
			}}
		>
			{/* Bordas */}
			<div onMouseDown={(e) => onResizeStart?.('n', e)} className={`absolute z-50 ${resizeHandleClasses.n} -top-1`} />
			<div onMouseDown={(e) => onResizeStart?.('s', e)} className={`absolute z-50 ${resizeHandleClasses.s} -bottom-1`} />
			<div onMouseDown={(e) => onResizeStart?.('e', e)} className={`absolute z-50 ${resizeHandleClasses.e} -right-1`} />
			<div onMouseDown={(e) => onResizeStart?.('w', e)} className={`absolute z-50 ${resizeHandleClasses.w} -left-1`} />

			{/* Cantos (Prioridade no z-index) */}
			<div onMouseDown={(e) => onResizeStart?.('ne', e)} className={`absolute z-50 ${resizeHandleClasses.ne} -top-1 -right-1`} />
			<div onMouseDown={(e) => onResizeStart?.('nw', e)} className={`absolute z-50 ${resizeHandleClasses.nw} -top-1 -left-1`} />
			<div onMouseDown={(e) => onResizeStart?.('se', e)} className={`absolute z-50 ${resizeHandleClasses.se} -bottom-1 -right-1`} />
			<div onMouseDown={(e) => onResizeStart?.('sw', e)} className={`absolute z-50 ${resizeHandleClasses.sw} -bottom-1 -left-1`} />

			{/* Title Bar */}
			<div
				role="toolbar"
				aria-label={`${window.title} window controls`}
				className={`h-8 bg-background flex items-center justify-between select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
					}`}
				onMouseDown={handleMouseDown}
				// Atalho: duplo clique na barra de título para maximizar/restaurar
				onDoubleClick={handleMaximize}
			>
				<div className="flex items-center gap-3 pl-2">
					<span className="text-lg">{window.icon}</span>
					<span className="text-xs">{window.title}</span>
				</div>
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleMinimize}
						className="h-8 w-12 rounded-none text-[#808080]! hover:bg-[#414141]! hover:text-white!"
					>
						<Minus className="size-3" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleMaximize}
						className="h-8 w-12 rounded-none text-[#808080]! hover:bg-[#414141]! hover:text-white!"
					>
						{/* Alterna o ícone visualmente */}
						{isMaximized ? (
							<Copy className="size-3 rotate-180" /> // Simula o ícone de "Restore"
						) : (
							<Square className="size-3" />
						)}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleClose}
						className="h-8 w-12 rounded-none text-[#808080]! hover:bg-red-500! hover:text-white!"
					>
						<X className="size-4" />
					</Button>
				</div>
			</div>

			{/* Window Header navigation and search bar */}
			<div className="flex items-center justify-between py-2 bg-win-bg-panel h-8 border-b border-win-border">
				<div className="flex items-center gap-2 pl-2">
					<button type="button" className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowLeft className="h-4 w-4 text-win-text-muted hover:text-white" />
					</button>
					<button type="button" className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowRight className="h-4 w-4 text-win-text-muted hover:text-white" />
					</button>
					<button type="button" className="p-1 hover:bg-win-hover-control rounded-none disabled:text-win-text-disabled">
						<ArrowUp className="h-4 w-4 text-win-text-muted hover:text-white" />
					</button>
				</div>

				<div className="flex items-center gap-2 flex-1 border border-[#333] bg-[#2d2d2d] mx-1 h-6 px-2">
					<div className="flex items-center gap-2 flex-1 overflow-hidden">
						<WindowsEmptyFolderIcon className="size-4 min-w-4" />
						<ChevronRight className="size-3 text-gray-400 min-w-3" />
						<span className="text-xs truncate">{window.title}</span>
					</div>

					<div className="flex items-center gap-2">
						<button type="button" className="p-0.5 hover:bg-[#191919] rounded">
							<RotateCcw className="h-3.5 w-3.5 text-[#808080]!" />
						</button>
					</div>
				</div>

				<div className="flex items-center gap-2 flex-1 border border-[#333] bg-[#2d2d2d] mx-1 max-w-64 h-6 px-2">
					<div className="flex items-center gap-2 flex-1 pl-1">
						<input
							type="text"
							placeholder={`Search in ${window.title}`}
							className="bg-transparent text-xs placeholder-[#808080]! outline-none w-full border-none focus:ring-0 p-0 h-full"
						/>
					</div>

					<div className="flex items-center gap-2">
						<button type="button" className="p-0.5 hover:bg-[#191919] rounded">
							<Search className="h-3.5 w-3.5 text-[#808080]!" />
						</button>
					</div>
				</div>
			</div>

			{/* Window Content */}
			{/* Ajuste de altura: 100% - (Header 2rem + Nav 2rem + Footer 1.5rem = 5.5rem) */}
			<div className="h-[calc(100%-5.5rem)] bg-[#0c0c0c] overflow-auto text-white">
				{children}
			</div>

			{/* Window Footer */}
			<div className="bg-[#333333] border-t border-[#191919] px-4 h-6 flex items-center justify-between text-xs text-[#808080]!">
				<span className="flex items-center gap-4">
					<span>8 itens</span>
					<span className="border-l border-gray-600 pl-4">1 item selected</span>
				</span>
				<div className="flex gap-2">
					{/* Ícones de visualização de lista/grid poderiam vir aqui */}
				</div>
			</div>
		</div>
	);
}