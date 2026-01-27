import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SystemState {
	wallpaper: string;
	theme: "dark" | "light";
	accentColor: string;
	setWallpaper: (url: string) => void;
	setTheme: (theme: "dark" | "light") => void;
	setAccentColor: (color: string) => void;
}

export const useSystemStore = create<SystemState>()(
	persist(
		(set) => ({
			wallpaper: "/images/win10-wallpaper.jpg",
			theme: "dark",
			accentColor: "bg-[#0078d7]",
			setWallpaper: (url) => set({ wallpaper: url }),
			setTheme: (theme) => set({ theme }),
			setAccentColor: (color) => set({ accentColor: color }),
		}),
		{
			name: "system-preferences",
		},
	),
);
