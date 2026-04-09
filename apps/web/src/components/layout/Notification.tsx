import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
	Battery,
	Bluetooth,
	Mail,
	MapPin,
	Moon,
	Plane,
	Settings,
	ShieldAlert,
	Wifi,
	X
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ActionCenterProps {
	isOpen: boolean;
	onClose: () => void;
}

// Mock Data
const MOCK_NOTIFICATIONS = [
	{
		id: 1,
		app: "Mail",
		icon: <Mail className="size-4 text-blue-400" />,
		time: "10:42",
		title: "Weekly Project Update",
		message: "The team has made significant progress on the frontend migration...",
	},
	{
		id: 2,
		app: "Windows Security",
		icon: <ShieldAlert className="size-4 text-white" />,
		time: "Yesterday",
		title: "Scan completed",
		message: "No threats were found on your device.",
	},
	{
		id: 3,
		app: "Spotify",
		icon: <div className="bg-green-500 rounded-full size-4" />,
		time: "Yesterday",
		title: "New Release",
		message: "Check out the new album from your favorite artist.",
	},
];

export function ActionCenter({ isOpen, onClose }: ActionCenterProps) {
	const [expanded, setExpanded] = useState(false);
	const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
	const ref = useRef<HTMLDivElement>(null);

	// Fechar ao clicar fora
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node) && isOpen) {
				onClose();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, onClose]);

	// Atualizar estado de notificações se fechar e reabrir (opcional, aqui mantemos o estado)

	const clearAll = () => setNotifs([]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop Invisível */}
					<div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />

					<motion.div
						ref={ref}
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
						className="fixed top-0 right-0 h-[calc(100vh-3rem)] w-[360px] bg-win-bg-panel/95 backdrop-blur-3xl border-l border-win-border z-50 shadow-2xl flex flex-col font-segoe select-none"
					>
						{/* Header */}
						<div className="flex justify-end p-4 pb-2 shrink-0">
							<button
								type="button"
								className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wide font-medium disabled:opacity-30 disabled:hover:text-white/60"
								onClick={clearAll}
								disabled={notifs.length === 0}
							>
								Clear all
							</button>
						</div>

						{/* Notifications Area */}
						<ScrollArea className="flex-1 px-4 overflow-hidden">
							<AnimatePresence mode="popLayout">
								{notifs.length === 0 ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="flex flex-col items-center justify-center h-64 text-white/50"
									>
										<span className="text-sm">No new notifications</span>
									</motion.div>
								) : (
									<div className="flex flex-col gap-2 pb-4">
										{notifs.map((notif) => (
											<NotificationItem
												key={notif.id}
												notif={notif}
												onClose={() => setNotifs(curr => curr.filter(n => n.id !== notif.id))}
											/>
										))}
									</div>
								)}
							</AnimatePresence>
						</ScrollArea>

						{/* Quick Actions Area */}
						<div className="mt-auto shrink-0 bg-win-bg-panel bg-opacity-50">
							<motion.div
								layout
								className="grid grid-cols-4 gap-0.5 p-0.5 border-t border-win-border"
							>
								{/* Sempre visíveis */}
								<QuickActionTile icon={<Wifi />} label="Network" active />
								<QuickActionTile icon={<Settings />} label="All settings" />
								<QuickActionTile icon={<Plane />} label="Airplane mode" />
								<QuickActionTile icon={<MapPin />} label="Location" />

								{/* Expansíveis */}
								<AnimatePresence>
									{expanded && (
										<>
											<QuickActionTile icon={<Bluetooth />} label="Bluetooth" active isExtra />
											<QuickActionTile icon={<Moon />} label="Night light" isExtra />
											<QuickActionTile icon={<Battery />} label="Battery saver" isExtra />
											<QuickActionTile icon={<ShieldAlert />} label="Security" isExtra />
											<QuickActionTile icon={<div className="font-bold">VPN</div>} label="VPN" isExtra />
											<QuickActionTile icon={<div className="font-bold">P</div>} label="Project" isExtra />
											<QuickActionTile icon={<div className="font-bold">C</div>} label="Connect" isExtra />
											<QuickActionTile icon={<div className="font-bold">S</div>} label="Screen snip" isExtra />
										</>
									)}
								</AnimatePresence>
							</motion.div>

							<div
								className="p-4 text-xs text-gray-400 hover:text-white cursor-pointer flex items-center gap-2 justify-start"
								onClick={() => setExpanded(!expanded)}
							>
								{expanded ? <p>Collapse</p> : <p>Expand</p>}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

interface Notification {
	id: number;
	app: string;
	icon: React.ReactNode;
	time: string;
	title: string;
	message: string;
}

function NotificationItem({ notif, onClose }: { notif: Notification; onClose: () => void }) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
			transition={{ duration: 0.2 }}
		>
			<div className="group bg-win-bg-surface/80 hover:bg-win-bg-hover p-3 rounded-md border border-win-border hover:border-win-border-highlight transition-all relative shadow-sm hover:shadow-md">
				{/* Header */}
				<div className="flex items-center gap-2 mb-2">
					{notif.icon}
					<span className="text-xs font-semibold text-white uppercase tracking-wide opacity-90">{notif.app}</span>
					<span className="text-xs text-white/40 ml-auto">{notif.time}</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onClose();
						}}
						className="p-1 hover:bg-win-hover-control rounded text-white/60 hover:text-white transition-colors"
					>
						<X className="size-3" />
					</button>
				</div>

				{/* Body */}
				<div className="pl-0">
					<h4 className="text-sm font-semibold text-white mb-0.5">{notif.title}</h4>
					<p className="text-sm text-gray-300 leading-normal line-clamp-2">{notif.message}</p>
				</div>
			</div>
		</motion.div>
	);
}

function QuickActionTile({ icon, label, active, isExtra }: { icon: React.ReactNode, label: string, active?: boolean, isExtra?: boolean }) {
	return (
		<motion.button
			layout
			initial={isExtra ? { opacity: 0, scale: 0.9 } : undefined}
			animate={isExtra ? { opacity: 1, scale: 1 } : undefined}
			exit={isExtra ? { opacity: 0, scale: 0.9, transition: { duration: 0.1 } } : undefined}
			type="button"
			className={cn(
				"h-16 flex flex-col items-end justify-between p-2 pb-1 transition-colors relative overflow-hidden group",
				active
					? "bg-win-accent hover:bg-win-accent/90 text-white"
					: "bg-win-bg-surface hover:bg-win-hover-control text-white"
			)}
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 w-full">
				<div className="[&>svg]:size-5">{icon}</div>
			</div>
			<span className="text-[11px] font-normal leading-tight w-full text-center z-10 mt-auto">{label}</span>
		</motion.button>
	)
}
