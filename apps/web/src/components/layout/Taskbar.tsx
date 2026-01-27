import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/components/ui/tooltip";
import { WindowsEdgeIcon } from "@/components/ui/windows/edge";
import { WindowsSettingsIcon } from "@/components/ui/windows/settings";
import { TaskbarFolderIcon } from "@/components/ui/windows/taskbar-folder";
import { WindowsIcon } from "@/components/ui/windows/windows-icon";
import { useWindowManager } from "@/hooks/use-window-manager";
import type { WindowInstance } from "@portifolio-v2/config";
import { ChevronUp, MessageSquare, Volume2, Wifi } from "lucide-react";
import { useMemo, useState } from "react";
import { GroupedWindowTooltip } from "./GroupedWindowTooltip";
import { ActionCenter } from "./Notification";
import { StartMenu } from "./StartMenu";
import { CalendarFlyout } from "./taskbar/CalendarFlyout";
import { NetworkFlyout, VolumeFlyout } from "./taskbar/SystemFlyouts";

interface TaskbarProps {
	onToggleActionCenter?: () => void;
}

type TrayPopup = "none" | "start" | "calendar" | "volume" | "network" | "action-center";

export function Taskbar({ onToggleActionCenter }: TaskbarProps) {
	const { windows, openWindow, focusWindow, restoreWindow } =
		useWindowManager();
	const [activePopup, setActivePopup] = useState<TrayPopup>("none");

	// Group windows by type
	const groupedWindows = useMemo(() => {
		const groups: Record<string, WindowInstance[]> = {};

		windows.forEach((window) => {
			const key = `${window.type}-${window.title}`;
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(window);
		});

		return Object.entries(groups).map(([key, windows]) => ({
			key,
			type: windows[0].type,
			title: windows[0].title,
			icon: windows[0].icon,
			windows,
			hasActiveWindow: windows.some((w) => !w.isMinimized),
			activeWindowCount: windows.filter((w) => !w.isMinimized).length,
		}));
	}, [windows]);

	const handleGroupedWindowClick = (group: (typeof groupedWindows)[0]) => {
		const activeWindows = group.windows.filter((w) => !w.isMinimized);

		if (activeWindows.length === 0) {
			// If all windows are minimized, restore the first one
			restoreWindow(group.windows[0].id);
		} else if (activeWindows.length === 1) {
			// If only one window is active, focus it
			focusWindow(activeWindows[0].id);
		} else {
			// If multiple windows are active, cycle through them
			const currentTopWindow = activeWindows.reduce(
				(top, w) => (w.zIndex > top.zIndex ? w : top),
				activeWindows[0],
			);
			const nextWindow =
				activeWindows.find((w) => w.id !== currentTopWindow.id) ||
				activeWindows[0];
			focusWindow(nextWindow.id);
		}
	};

	const handleWindowSelect = (windowId: string) => {
		const window = windows.find((w) => w.id === windowId);
		if (window) {
			if (window.isMinimized) {
				restoreWindow(windowId);
			} else {
				focusWindow(windowId);
			}
		}
	};

	const pinnedApps = [
		{
			id: "explorer",
			icon: <TaskbarFolderIcon className="size-6" />,
			label: "File Explorer",
			type: "explorer" as const,
			color: "text-blue-400",
		},
		{
			id: "browser",
			icon: <WindowsEdgeIcon className="size-6" />,
			label: "Chrome",
			type: "browser" as const,
			color: "text-blue-500",
		},
		{
			id: "settings",
			icon: <WindowsSettingsIcon className="size-6" />,
			label: "Settings",
			type: "settings" as const,
			color: "text-white",
		},
		/*{
		 id: "vscode",
		 icon: <VSCodeIcon className="size-6" />,
		 label: "VSCode",
		 type: "vscode" as const,
		 color: "text-white",
	  },*/
	];

	const handleAppClick = (app: (typeof pinnedApps)[0]) => {
		// Check if window already exists
		const existingWindow = windows.find((w) => w.title === app.label);

		if (existingWindow) {
			if (existingWindow.isMinimized) {
				restoreWindow(existingWindow.id);
			} else {
				focusWindow(existingWindow.id);
			}
			return;
		}

		// Create new window based on type
		const defaultSize = { width: 900, height: 600 };
		const defaultPosition = {
			x: 100 + windows.length * 30,
			y: 80 + windows.length * 30,
		};

		switch (app.type) {
			case "explorer":
				openWindow({
					type: "explorer",
					title: app.label,
					icon: app.icon,
					position: defaultPosition,
					size: defaultSize,
				});
				break;
			case "browser":
				openWindow({
					type: "browser",
					title: app.label,
					icon: app.icon,
					position: defaultPosition,
					size: defaultSize,
				});
				break;
			case "settings":
				openWindow({
					type: "settings",
					title: app.label,
					icon: app.icon,
					position: defaultPosition,
					size: defaultSize,
				});
				break;
			default:
				break;
		}
	};

	const togglePopup = (popup: TrayPopup) => {
		setActivePopup(current => current === popup ? "none" : popup);
	};

	return (
		<>
			<div className="fixed bottom-0 left-0 right-0 h-12 bg-background/50 glass backdrop-blur-sm border-t border-gray-700/50 z-50 flex items-center justify-between">
				<div className="flex items-center h-full">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => togglePopup("start")}
						className="h-12 w-12 rounded-none hover:bg-gray-800 transition-all group mr-1"
					>
						<WindowsIcon className="group-hover:drop-shadow-[0_0_8px_rgba(0,182,240,0.6)] transition-all duration-200" />
					</Button>

					{pinnedApps.map((app) => (
						<div key={app.id} className="relative">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => handleAppClick(app)}
								className={`h-12 w-12 rounded-none hover:bg-gray-700/50 transition-all ${app.color}`}
							>
								{app.icon}
							</Button>
						</div>
					))}

					{groupedWindows.map((group) => (
						<Tooltip key={group.key}>
							<TooltipTrigger>
								<div className="relative">
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleGroupedWindowClick(group)}
										className="h-11 w-12 rounded-none bg-gray-700/30 hover:bg-gray-700/50 transition-all"
									>
										<span className="text-lg">{group.icon}</span>
										{group.windows.length > 1 && (
											<div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
												{group.windows.length}
											</div>
										)}
									</Button>

									{/* Active indicator for open windows */}
									{group.hasActiveWindow && (
										<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-blue-400" />
									)}
								</div>
							</TooltipTrigger>
							<TooltipContent
								sideOffset={10}
								className="p-0 bg-transparent border-none shadow-none rounded-none"
							>
								<GroupedWindowTooltip
									windows={group.windows}
									onWindowSelect={handleWindowSelect}
								/>
							</TooltipContent>
						</Tooltip>
					))}
				</div>

				<div className="flex items-center h-full">
					<Button variant="ghost" size="icon" className="h-full w-8 rounded-none hover:bg-white/10">
						<ChevronUp className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost" size="icon"
						className={`h-full w-8 rounded-none hover:bg-white/10 ${activePopup === "network" ? "bg-white/10" : ""}`}
						onClick={() => togglePopup("network")}
					>
						<Wifi className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost" size="icon"
						className={`h-full w-8 rounded-none hover:bg-white/10 ${activePopup === "volume" ? "bg-white/10" : ""}`}
						onClick={() => togglePopup("volume")}
					>
						<Volume2 className="h-4 w-4" />
					</Button>

					<div className="h-full flex flex-col justify-center px-2 hover:bg-white/10 cursor-pointer text-xs text-center">
						<span>POR</span>
						<span className="text-[10px]">PTB</span>
					</div>

					<Button
						variant="ghost"
						size="sm"
						className="h-12 hover:bg-[#545454]! hover:text-white! transition-all gap-2 px-3 rounded-none"
						onClick={() => togglePopup("calendar")}
					>
						<div className="text-xs text-left flex flex-col items-center justify-center">
							<div className="font-normal leading-tight text-white">
								{new Date().toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>
							<div className="font-normal leading-tight text-white">
								{new Date().toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								})}
							</div>
						</div>
					</Button>

					<Button
						variant="ghost" size="icon"
						className="h-full w-12 rounded-none hover:bg-white/10 ml-1 border-l border-white/5 relative"
						onClick={() => togglePopup("action-center")}
					>
						<MessageSquare className="h-4 w-4" />
						<span className="absolute bottom-3 right-3 flex h-2 w-2">
							<span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
						</span>
					</Button>

					{/* Show Desktop Slice */}
					<div className="w-1.5 h-full border-l border-white/10 hover:bg-white/20 cursor-pointer" title="Show desktop" />
				</div>
			</div>

			{activePopup === "start" && (
				<StartMenu
					isOpen={activePopup === "start"}
					onClose={() => setActivePopup("none")}
					onOpenApp={() => { }}
				/>
			)}

			{activePopup === "calendar" && (
				<div className="fixed bottom-12 right-0 z-50">
					<div className="fixed inset-0 bg-transparent -z-10" onClick={() => setActivePopup("none")} />
					<CalendarFlyout />
				</div>
			)}

			{activePopup === "volume" && (
				<div className="fixed bottom-12 right-12 z-50">
					<div className="fixed inset-0 bg-transparent -z-10" onClick={() => setActivePopup("none")} />
					<VolumeFlyout />
				</div>
			)}

			{activePopup === "network" && (
				<div className="fixed bottom-12 right-24 z-50">
					<div className="fixed inset-0 bg-transparent -z-10" onClick={() => setActivePopup("none")} />
					<NetworkFlyout />
				</div>
			)}

			{activePopup === "action-center" && (
				<div className="fixed bottom-12 right-36 z-50">
					<div className="fixed inset-0 bg-transparent -z-10" onClick={() => setActivePopup("none")} />
					<ActionCenter isOpen={activePopup === "action-center"} onClose={() => setActivePopup("none")} />
				</div>
			)}
		</>
	);
}
