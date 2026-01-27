import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSystemStore } from "@/hooks/use-system-store";
import type { SettingsPage } from "@portifolio-v2/config";
import {
	AppWindow,
	ArrowLeft,
	Info,
	Monitor,
	MonitorUp,
	PaintBucket, Search, Smartphone, User, Wifi
} from "lucide-react";
import { useState } from "react";
import { PersonalizationBackground } from "./settings/background";
import { PersonalizationColors } from "./settings/colors";
import { Profile } from "./settings/profile";
import { SidebarItem } from "./settings/SidebarItem";
import { SettingsTile } from "./settings/Tile";

export function SettingsApp() {
	const [currentPage, setCurrentPage] = useState<SettingsPage>("home");
	const [activeSubPage, setActiveSubPage] = useState("about");
	const [searchQuery, setSearchQuery] = useState("");

	const { wallpaper, setWallpaper, accentColor, setAccentColor } = useSystemStore();

	const navigateTo = (page: SettingsPage, subPage = "about") => {
		setCurrentPage(page);
		setActiveSubPage(subPage);
	};

	const tiles = [
		{ icon: <LaptopIcon />, label: "System", desc: "Display, sound, about", onClick: () => navigateTo("system", "about") },
		{ icon: <PaintBucket />, label: "Personalization", desc: "Background, colors", onClick: () => navigateTo("personalization", "background") },
		{ icon: <User />, label: "Accounts", desc: "Your info, email", onClick: () => navigateTo("accounts", "info") },
		{ icon: <MonitorUp />, label: "Update & Security", desc: "Windows Update", onClick: () => { } },
		{ icon: <Monitor />, label: "Devices", desc: "Bluetooth, printers", onClick: () => { } },
		{ icon: <Smartphone />, label: "Phone", desc: "Link your Android, iPhone", onClick: () => { } },
		{ icon: <Wifi />, label: "Network & Internet", desc: "Wi-Fi, airplane mode", onClick: () => { } },
		{ icon: <AppWindow />, label: "Apps", desc: "Uninstall, defaults", onClick: () => { } },
	];

	const filteredTiles = tiles.filter(tile =>
		tile.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
		tile.desc.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col h-full bg-[#101010] text-white font-segoe overflow-hidden">
			<div className="h-10 flex items-center drag-handle bg-[#1f1f1f]/50">
				{currentPage !== "home" && (
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10 mr-2 hover:bg-white/10"
						onClick={() => setCurrentPage("home")}
					>
						<ArrowLeft className="size-4" />
					</Button>
				)}
			</div>

			{currentPage === "home" && (
				<div className="flex-1 flex flex-col items-center pt-8 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
					<h1 className="text-2xl font-light mb-8">Windows Settings</h1>

					<div className="relative w-96 mb-12">
						<input
							type="text"
							placeholder="Find a setting"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full bg-white text-black px-4 py-2 pl-10 border-2 border-transparent focus:border-black outline-none"
						/>
						<Search className="absolute left-3 top-3 text-gray-500 size-5" />
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-12 max-w-5xl pb-10">
						{filteredTiles.map((tile, i) => (
							<SettingsTile
								key={i}
								icon={tile.icon}
								label={tile.label}
								desc={tile.desc}
								onClick={tile.onClick}
							/>
						))}
					</div>
				</div>
			)}

			{currentPage !== "home" && (
				<div className="flex flex-1 overflow-hidden animate-in slide-in-from-right-4 duration-300">

					<div className="w-64 bg-[#1f1f1f] flex flex-col pt-4 pb-2 px-2 gap-1 overflow-y-auto shrink-0">
						<div className="mb-4 px-2">
							<h2 className="text-sm font-semibold text-white/90 mb-1 capitalize">{currentPage}</h2>
							<div className={`h-0.5 w-8 ${accentColor}`} />
						</div>

						{currentPage === "system" && (
							<>
								<SidebarItem active={activeSubPage === "display"} label="Display" icon={<Monitor />} onClick={() => setActiveSubPage("display")} accent={accentColor} />
								<SidebarItem active={activeSubPage === "about"} label="About" icon={<Info />} onClick={() => setActiveSubPage("about")} accent={accentColor} />
							</>
						)}

						{currentPage === "personalization" && (
							<>
								<SidebarItem active={activeSubPage === "background"} label="Background" icon={<Monitor />} onClick={() => setActiveSubPage("background")} accent={accentColor} />
								<SidebarItem active={activeSubPage === "colors"} label="Colors" icon={<PaintBucket />} onClick={() => setActiveSubPage("colors")} accent={accentColor} />
							</>
						)}

						{currentPage === "accounts" && (
							<SidebarItem active={activeSubPage === "info"} label="Your info" icon={<User />} onClick={() => setActiveSubPage("info")} accent={accentColor} />
						)}
					</div>

					<ScrollArea className="flex-1 bg-[#101010] p-8">
						<div className="max-w-3xl pb-10">
							{currentPage === "system" && activeSubPage === "about" && (
								<Profile accentColor={accentColor} />
							)}

							{currentPage === "personalization" && activeSubPage === "background" && (
								<PersonalizationBackground wallpaper={wallpaper} setWallpaper={setWallpaper} accentColor={accentColor} />
							)}

							{currentPage === "personalization" && activeSubPage === "colors" && (
								<PersonalizationColors accentColor={accentColor} setAccentColor={setAccentColor} />
							)}
						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
}

function LaptopIcon() { return <Monitor /> }