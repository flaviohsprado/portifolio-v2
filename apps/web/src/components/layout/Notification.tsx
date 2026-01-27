import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Battery,
	Bluetooth,
	Chrome,
	Cloud,
	Mail,
	MapPin,
	Moon,
	Plane,
	Settings,
	ShieldAlert,
	Wifi,
	X,
} from "lucide-react";
import { useState } from "react";

interface ActionCenterProps {
	isOpen: boolean;
	onClose: () => void;
}

// MOCK DATA & EASTER EGGS
const MOCK_NOTIFICATIONS = [
	{
		id: 1,
		app: "Recruiter (LinkedIn)",
		icon: <Mail className="size-4 text-blue-400" />,
		time: "Agora",
		title: "Oferta de Emprego - Senior FullStack",
		message:
			"Olá! Vimos seu portfólio e ficamos impressionados. Gostaria de ganhar R$ 50k/mês para centralizar divs?",
	},
	{
		id: 2,
		app: "Google Chrome",
		icon: <Chrome className="size-4 text-yellow-400" />,
		time: "2 min atrás",
		title: "Alto uso de memória",
		message:
			"O Chrome está consumindo 16GB de RAM com apenas 2 abas abertas. Isso é normal, não se preocupe.",
	},
	{
		id: 3,
		app: "Windows Defender",
		icon: <ShieldAlert className="size-4 text-red-500" />,
		time: "15:30",
		title: "Ameaça Detectada",
		message:
			"O arquivo 'preguiça-de-fazer-testes.exe' foi colocado em quarentena.",
	},
	{
		id: 4,
		app: "OneDrive",
		icon: <Cloud className="size-4 text-blue-300" />,
		time: "Ontem",
		title: "Sincronização Falhou",
		message:
			"Não foi possível enviar 'node_modules' para a nuvem. O arquivo é muito pesado (∞ GB).",
	},
];

export function ActionCenter({ isOpen, onClose }: ActionCenterProps) {
	const [toggles, setToggles] = useState({
		wifi: true,
		bluetooth: true,
		location: false,
		airplane: false,
		battery: false,
		night: true,
	});

	const toggle = (key: keyof typeof toggles) => {
		setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<>
			{/* Overlay transparente para fechar ao clicar fora */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-transparent"
					onClick={onClose}
					role="presentation"
				/>
			)}

			<div
				className={`fixed top-0 right-0 h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] w-[360px] bg-win-bg-taskbar backdrop-blur-xl border-l border-win-border z-40 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Header - Manage Notifications */}
				<div className="flex justify-end p-2">
					<Button
						variant="ghost"
						size="sm"
						className="text-xs text-win-text-muted hover:text-white hover:bg-transparent"
						onClick={() => alert("Limpou tudo! (Mentira, é só mock)")}
					>
						Limpar todas
					</Button>
				</div>

				{/* Notifications Area */}
				<ScrollArea className="flex-1 px-4">
					<div className="flex flex-col gap-4 pb-4">
						{MOCK_NOTIFICATIONS.map((notif) => (
							<div
								key={notif.id}
								className="bg-win-bg-surface/50 hover:bg-win-bg-surface border border-win-border/50 hover:border-win-border rounded-sm p-3 transition-colors group cursor-default"
							>
								{/* Card Header */}
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2">
										{notif.icon}
										<span className="text-xs font-semibold text-white">
											{notif.app}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-[10px] text-win-text-muted">
											{notif.time}
										</span>
										<X className="size-3 text-transparent group-hover:text-win-text-muted hover:text-white cursor-pointer transition-colors" />
									</div>
								</div>

								{/* Content */}
								<h4 className="text-sm font-medium text-white mb-1">
									{notif.title}
								</h4>
								<p className="text-xs text-win-text-muted leading-tight">
									{notif.message}
								</p>
							</div>
						))}
					</div>
				</ScrollArea>

				{/* Quick Actions Footer (Bottom Grid) */}
				<div className="mt-auto bg-win-bg-panel/40 p-4 grid grid-cols-4 gap-2 border-t border-win-border">
					<QuickAction
						active={toggles.wifi}
						icon={<Wifi />}
						label="Wi-Fi"
						onClick={() => toggle("wifi")}
					/>
					<QuickAction
						active={toggles.bluetooth}
						icon={<Bluetooth />}
						label="Bluetooth"
						onClick={() => toggle("bluetooth")}
					/>
					<QuickAction
						active={toggles.airplane}
						icon={<Plane />}
						label="Avião"
						onClick={() => toggle("airplane")}
					/>
					<QuickAction
						active={toggles.battery}
						icon={<Battery />}
						label="Economia"
						onClick={() => toggle("battery")}
					/>
					<QuickAction
						active={toggles.location}
						icon={<MapPin />}
						label="Local"
						onClick={() => toggle("location")}
					/>
					<QuickAction
						active={toggles.night}
						icon={<Moon />}
						label="Luz Noturna"
						onClick={() => toggle("night")}
					/>
					{/* Botão para abrir Configurações (mock) */}
					<QuickAction
						active={false}
						icon={<Settings />}
						label="Todas config."
						onClick={() => {}}
					/>
				</div>
			</div>
		</>
	);
}

function QuickAction({
	active,
	icon,
	label,
	onClick,
}: {
	active: boolean;
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}) {
	return (
		<div className="flex flex-col gap-1 items-center mb-2">
			<button
				onClick={onClick}
				type="button"
				className={`size-12 flex items-center justify-center border transition-all rounded-sm ${
					active
						? "bg-win-accent border-win-accent text-white hover:brightness-110"
						: "bg-win-bg-surface border-win-border text-white hover:bg-win-hover-control"
				}`}
			>
				<div className="[&>svg]:size-5">{icon}</div>
			</button>
			<span className="text-[10px] text-white truncate w-full text-center select-none">
				{label}
			</span>
		</div>
	);
}
