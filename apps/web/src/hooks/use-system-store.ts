import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SystemState {
	wallpaper: string;
	theme: "dark" | "light";
	setWallpaper: (url: string) => void;
	setTheme: (theme: "dark" | "light") => void;
}

export const useSystemStore = create<SystemState>()(
	persist(
		(set) => ({
			wallpaper: "/images/win10-wallpaper.jpg",
			theme: "dark",
			setWallpaper: (url) => set({ wallpaper: url }),
			setTheme: (theme) => set({ theme }),
		}),
		{
			name: "system-preferences",
		},
	),
);
