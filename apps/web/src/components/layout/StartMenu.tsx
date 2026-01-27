import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WindowsStoreIcon } from "@/components/ui/windows/store";
import { signOut } from "@/lib/auth-client";
import { getStartMenuPosition } from "@/lib/boundary-utils";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	Calculator,
	Camera,
	Chrome,
	Menu,
	Power,
	Settings,
	User
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectDetailsApp } from "../apps/ProjectDetails";

interface StartMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenApp: (
		id: string,
		title: string,
		icon: React.ReactNode,
		component: React.ReactNode,
	) => void;
}

export function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
	const trpc = useTRPC();
	const navigate = useNavigate();
	const { data: projects = [] } = useQuery(trpc.project.get.queryOptions());
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const menuWidth = 640;
	const menuHeight = 500;

	useEffect(() => {
		if (isOpen) {
			const newPosition = getStartMenuPosition(menuWidth, menuHeight);
			setPosition(newPosition);
		}
	}, [isOpen]);

	const handleSignOut = () => {
		signOut();
		navigate({ to: "/" });
	};

	const systemApps = [
		{ id: "calc", name: "Calculator", icon: <Calculator className="size-4" />, component: <div>Calculator App</div> },
		{ id: "camera", name: "Camera", icon: <Camera className="size-4" />, component: <div>Camera App</div> },
		{ id: "edge", name: "Microsoft Edge", icon: <Chrome className="size-4 text-blue-400" />, component: <div>Edge Browser</div> },
		{ id: "settings", name: "Settings", icon: <Settings className="size-4" />, component: <div>Settings App</div> },
	];

	const allApps = [
		...systemApps,
		...projects.map((p) => ({
			id: p.id,
			name: p.name,
			icon: <div className="bg-win-accent size-4 rounded-sm" />,
			component: <ProjectDetailsApp projectId={p.id} />,
		})),
	].sort((a, b) => a.name.localeCompare(b.name));

	const groupedApps = allApps.reduce((acc, app) => {
		const letter = app.name[0].toUpperCase();
		if (!acc[letter]) acc[letter] = [];
		acc[letter].push(app);
		return acc;
	}, {} as Record<string, typeof allApps>);

	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-transparent"
				onClick={onClose}
				onContextMenu={(e) => { e.preventDefault(); onClose(); }}
			/>

			<div
				className="fixed z-50 flex bg-[#1f1f1f]/95 backdrop-blur-xl shadow-2xl border border-[#333] text-white overflow-hidden transition-all duration-200 origin-bottom-left animate-in fade-in slide-in-from-bottom-10"
				style={{
					left: position.x,
					top: position.y,
					width: menuWidth,
					height: menuHeight,
				}}
			>
				<div className="w-12 flex flex-col justify-between items-center py-2 bg-[#1f1f1f]">
					<div className="flex flex-col gap-1 w-full relative group">
						<SidebarBtn icon={<Menu />} label="Expand" />
					</div>
					<div className="flex flex-col gap-1 w-full pb-2">
						<SidebarBtn icon={<User />} label="Profile" />
						<SidebarBtn icon={<Settings />} label="Settings" onClick={() => onOpenApp("settings", "Settings", <Settings />, <div>Configurações</div>)} />
						<SidebarBtn icon={<Power />} label="Power" onClick={handleSignOut} />
					</div>
				</div>

				<div className="w-64 flex flex-col h-full bg-[#1f1f1f]/50 border-r border-[#333]">
					<ScrollArea className="flex-1 pr-2 pt-2 scrollbar-thin">
						<div className="px-4 pb-4">
							<div className="mb-4">
								<h3 className="text-xs font-medium text-white/50 mb-2 pl-2">Recently added</h3>
								{projects.slice(0, 1).map(p => (
									<AppListItem
										key={p.id}
										name={p.name}
										icon={<div className="bg-win-accent size-5 flex items-center justify-center text-[10px] font-bold rounded-sm">P</div>}
										onClick={() => {
											onOpenApp(p.id, p.name, <Settings />, <ProjectDetailsApp projectId={p.id} />);
											onClose();
										}}
									/>
								))}
							</div>

							{Object.entries(groupedApps).map(([letter, apps]) => (
								<div key={letter} className="mb-4">
									<div className="sticky top-0 bg-[#1f1f1f] z-10 w-8 h-8 flex items-center justify-center text-xs font-bold text-white/70 hover:bg-win-selection/50 cursor-pointer border border-transparent hover:border-white/20 ml-2 mb-1">
										{letter}
									</div>
									{apps.map((app) => (
										<AppListItem
											key={app.id}
											name={app.name}
											icon={app.icon}
											onClick={() => {
												onOpenApp(app.id, app.name, app.icon, app.component);
												onClose();
											}}
										/>
									))}
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<div className="flex-1 bg-transparent p-4 pl-6 overflow-hidden flex flex-col">
					<ScrollArea className="h-full">
						<div className="mb-8">
							<TileGroupHeader title="Play and Explore" />
							<div className="grid grid-cols-6 gap-1 auto-rows-[4.5rem]">
								<LiveTile
									cols={4} rows={2}
									color="bg-[#005a9e]"
									icon={<WindowsStoreIcon className="size-8 text-white" />}
									label="Microsoft Store"
									content={<div className="text-[10px] mt-2 opacity-80">Discover new apps</div>}
									onClick={() => onOpenApp("store", "Microsoft Store", <WindowsStoreIcon />, <div>Loja Mock</div>)}
								/>
							</div>
						</div>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}

function SidebarBtn({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={onClick}
			className="w-12 h-12 text-white/80 hover:bg-white/10 hover:text-white rounded-none transition-colors"
			title={label}
		>
			<div className="[&>svg]:size-5">{icon}</div>
		</Button>
	);
}

function AppListItem({ name, icon, onClick }: { name: string, icon: React.ReactNode, onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center gap-3 w-full p-2 hover:bg-white/10 transition-colors text-left group"
		>
			<div className="flex items-center justify-center w-8 h-8 text-white/80 group-hover:text-white">
				{icon}
			</div>
			<span className="text-sm font-light text-white/90 truncate">{name}</span>
		</button>
	);
}

function TileGroupHeader({ title }: { title: string }) {
	return (
		<div className="group flex items-center justify-between h-8 mb-1 cursor-pointer hover:bg-transparent">
			<span className="text-xs font-semibold text-white/80 pl-1">{title}</span>
			<div className="h-[1px] bg-white/20 flex-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
		</div>
	);
}

interface LiveTileProps {
	cols: number;
	rows: number;
	color: string;
	label: string;
	icon?: React.ReactNode;
	content?: React.ReactNode;
	onClick?: () => void;
}

function LiveTile({ cols, rows, color, icon, label, content, onClick }: LiveTileProps) {
	const colSpan = cols === 2 ? "col-span-2" : cols === 4 ? "col-span-4" : "col-span-2";
	const rowSpan = rows === 2 ? "row-span-2" : "row-span-1";

	return (
		<div
			onClick={onClick}
			className={`${colSpan} ${rowSpan} ${color} relative p-2 flex flex-col justify-between cursor-pointer outline outline-2 outline-transparent hover:outline-white/50 transition-all duration-300 group select-none overflow-hidden`}
		>
			<div className="flex-1 flex items-center justify-center flex-col">
				{content ? content : <div className="text-white/90">{icon}</div>}
			</div>

			<div className="flex items-center justify-between w-full">
				<span className="text-[10px] font-medium text-white/90 truncate">{label}</span>
				{content && <div className="opacity-0 group-hover:opacity-100 transition-opacity scale-75">{icon}</div>}
			</div>
		</div>
	);
}
