import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSystemStore } from "@/hooks/use-system-store";
import {
	AppWindow,
	ArrowLeft,
	Clock, Gamepad2,
	Info, Laptop, Lock, Monitor,
	MonitorUp,
	PaintBucket, Search, Smartphone, User, Wifi
} from "lucide-react";
import { useState } from "react";

const RESUME_DATA = {
	name: "Flávio Prado",
	role: "Senior FullStack Developer",
	specs: {
		processor: "Intel(R) Brain Core(TM) i9-9900K CPU @ 100% Focus",
		ram: "32.0 GB (Knowledge Base)",
		id: "00330-80000-00000-AA535",
		type: "64-bit Operating System, x64-based processor",
	},
	experience: [
		{ company: "Tech Corp", role: "Senior Dev", period: "2022 - Present" },
		{ company: "StartUp Inc", role: "Frontend Lead", period: "2020 - 2022" },
	]
};

const WALLPAPERS = [
	"/images/win10-wallpaper.jpg",
	"/images/win11-wallpaper.jpg",
	"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80",
	"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
	"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
];

type SettingsPage = "home" | "system" | "personalization";

export function SettingsApp() {
	const [currentPage, setCurrentPage] = useState<SettingsPage>("home");
	const [activeSubPage, setActiveSubPage] = useState("about"); // Padrão para System

	// Hook do Store Global
	const { wallpaper, setWallpaper } = useSystemStore();

	const navigateTo = (page: SettingsPage, subPage = "about") => {
		setCurrentPage(page);
		setActiveSubPage(subPage);
	};

	return (
		<div className="flex flex-col h-full bg-[#101010] text-white font-segoe overflow-hidden">
			<div className="h-10 w-10 flex items-center drag-handle">
				{currentPage !== "home" && (
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10 hover:bg-white/10"
						onClick={() => setCurrentPage("home")}
					>
						<ArrowLeft className="size-4" />
					</Button>
				)}
			</div>

			{currentPage === "home" && (
				<div className="flex-1 flex flex-col items-center pt-8 animate-in fade-in zoom-in-95 duration-300">
					<h1 className="text-2xl font-light mb-8">Windows Settings</h1>

					<div className="relative w-96 mb-12">
						<input
							type="text"
							placeholder="Find a setting"
							className="w-full bg-white text-black px-4 py-2 pl-10 border-2 border-transparent focus:border-black outline-none"
						/>
						<Search className="absolute left-3 top-3 text-gray-500 size-5" />
					</div>

					<div className="grid grid-cols-4 gap-4 px-12 max-w-5xl">
						<SettingsTile
							icon={<Laptop />} label="System" desc="Display, sound, notifications, power"
							onClick={() => navigateTo("system", "about")}
						/>
						<SettingsTile
							icon={<Monitor />} label="Devices" desc="Bluetooth, printers, mouse"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<Smartphone />} label="Phone" desc="Link your Android, iPhone"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<Wifi />} label="Network & Internet" desc="Wi-Fi, airplane mode, VPN"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<PaintBucket />} label="Personalization" desc="Background, lock screen, colors"
							onClick={() => navigateTo("personalization", "background")}
						/>
						<SettingsTile
							icon={<AppWindow />} label="Apps" desc="Uninstall, defaults, optional features"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<User />} label="Accounts" desc="Your accounts, email, sync, work, family"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<Clock />} label="Time & Language" desc="Speech, region, date"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<Gamepad2 />} label="Gaming" desc="Xbox Game Bar, captures, Game Mode"
							onClick={() => { }}
						/>
						<SettingsTile
							icon={<MonitorUp />} label="Update & Security" desc="Windows Update, recovery, backup"
							onClick={() => { }}
						/>
					</div>
				</div>
			)}

			{/* --- INTERNAL PAGES (Layout Sidebar + Content) --- */}
			{currentPage !== "home" && (
				<div className="flex flex-1 overflow-hidden animate-in slide-in-from-right-4 duration-300">

					{/* SIDEBAR */}
					<div className="w-64 bg-[#1f1f1f] flex flex-col pt-4 pb-2 px-2 gap-1 overflow-y-auto">
						<div className="mb-4 px-2">
							<h2 className="text-sm font-semibold text-white/90 mb-1 capitalize">{currentPage}</h2>
							<div className="h-0.5 w-8 bg-white/20" />
						</div>

						{currentPage === "system" && (
							<>
								<SidebarItem active={activeSubPage === "display"} label="Display" icon={<Monitor />} onClick={() => setActiveSubPage("display")} />
								<SidebarItem active={activeSubPage === "sound"} label="Sound" icon={<User />} onClick={() => setActiveSubPage("sound")} />
								<SidebarItem active={activeSubPage === "about"} label="About" icon={<Info />} onClick={() => setActiveSubPage("about")} />
							</>
						)}

						{currentPage === "personalization" && (
							<>
								<SidebarItem active={activeSubPage === "background"} label="Background" icon={<Monitor />} onClick={() => setActiveSubPage("background")} />
								<SidebarItem active={activeSubPage === "colors"} label="Colors" icon={<PaintBucket />} onClick={() => setActiveSubPage("colors")} />
								<SidebarItem active={activeSubPage === "lockscreen"} label="Lock Screen" icon={<Lock />} onClick={() => setActiveSubPage("lockscreen")} />
							</>
						)}
					</div>

					{/* CONTENT AREA */}
					<ScrollArea className="flex-1 bg-[#101010] p-8">
						<div className="max-w-3xl">

							{/* === SYSTEM > ABOUT (Resume) === */}
							{currentPage === "system" && activeSubPage === "about" && (
								<div className="space-y-6">
									<h1 className="text-3xl font-light mb-6">About</h1>

									<div className="flex gap-4 items-center mb-8">
										<div className="size-20 bg-win-accent flex items-center justify-center">
											<Monitor className="size-10 text-white" />
										</div>
										<div>
											<h2 className="text-lg font-semibold">{RESUME_DATA.name}</h2>
											<p className="text-sm text-gray-400">{RESUME_DATA.role}</p>
										</div>
									</div>

									<Section title="Device specifications">
										<div className="bg-[#1f1f1f] p-4 rounded-sm border border-[#333] space-y-2 text-sm">
											<SpecRow label="Device name" value="PORTIFOLIO-PC" />
											<SpecRow label="Processor" value={RESUME_DATA.specs.processor} />
											<SpecRow label="Installed RAM" value={RESUME_DATA.specs.ram} />
											<SpecRow label="Device ID" value={RESUME_DATA.specs.id} />
											<SpecRow label="System type" value={RESUME_DATA.specs.type} />
										</div>
									</Section>

									<Section title="Windows specifications">
										<div className="bg-[#1f1f1f] p-4 rounded-sm border border-[#333] space-y-2 text-sm">
											<SpecRow label="Edition" value="Windows 10 Pro" />
											<SpecRow label="Version" value="22H2" />
											<SpecRow label="Experience" value="Windows Feature Experience Pack" />
										</div>
									</Section>
								</div>
							)}

							{/* === PERSONALIZATION > BACKGROUND === */}
							{currentPage === "personalization" && activeSubPage === "background" && (
								<div className="space-y-6">
									<h1 className="text-3xl font-light mb-6">Background</h1>

									{/* Preview Monitor */}
									<div className="mb-8">
										<div className="w-64 h-40 bg-[#1f1f1f] border-4 border-black mx-auto relative shadow-2xl flex flex-col">
											<div
												className="flex-1 bg-cover bg-center transition-all duration-500"
												style={{ backgroundImage: `url(${wallpaper})` }}
											/>
											<div className="h-4 bg-[#1f1f1f] flex items-center justify-center gap-1">
												<div className="size-1 bg-blue-500 rounded-full" />
											</div>
										</div>
										<p className="text-center text-sm mt-2 text-gray-400">Preview</p>
									</div>

									<div className="space-y-4">
										<label className="text-sm">Choose your picture</label>
										<div className="grid grid-cols-5 gap-2">
											{WALLPAPERS.map((wp, i) => (
												<button
													type="button"
													key={i}
													onClick={() => setWallpaper(wp)}
													className={`aspect-video bg-cover bg-center border-2 transition-all ${wallpaper === wp ? "border-win-accent scale-105" : "border-transparent hover:border-white/50"}`}
													style={{ backgroundImage: `url(${wp})` }}
												/>
											))}
										</div>
										<Button variant="secondary" className="w-full mt-2 bg-[#333] text-white hover:bg-[#444]">
											Browse
										</Button>
									</div>
								</div>
							)}

						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
}

interface SettingsTileProps {
	icon: React.ReactNode;
	label: string;
	desc: string;
	onClick: () => void;
}

function SettingsTile({ icon, label, desc, onClick }: SettingsTileProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-start gap-3 p-4 hover:bg-[#1f1f1f] hover:outline-[#333] transition-colors text-left group"
		>
			<div className="text-white/80 mt-1 [&>svg]:size-6">{icon}</div>
			<div>
				<div className="text-sm font-medium mb-0.5">{label}</div>
				<div className="text-xs text-gray-400 leading-tight">{desc}</div>
			</div>
		</button>
	)
}

interface SidebarItemProps {
	active: boolean;
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
}

function SidebarItem({ active, label, icon, onClick }: SidebarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`
                flex items-center gap-3 px-3 py-2 text-sm w-full text-left relative
                ${active ? "bg-[#333] text-white" : "text-white/70 hover:text-white hover:bg-white/10"}
            `}
		>
			{active && <div className="absolute left-0 top-1 bottom-1 w-1 bg-win-accent rounded-r-full" />}
			<div className="[&>svg]:size-4">{icon}</div>
			<span>{label}</span>
		</button>
	)
}

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
	return (
		<div className="mb-6">
			<h3 className="text-sm font-medium mb-2">{title}</h3>
			{children}
		</div>
	)
}

interface SpecRowProps {
	label: string;
	value: string;
}

function SpecRow({ label, value }: SpecRowProps) {
	return (
		<div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-[#333] last:border-0">
			<span className="text-gray-400">{label}</span>
			<span className="text-white select-all">{value}</span>
		</div>
	)
}