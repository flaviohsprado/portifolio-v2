import { WALLPAPERS } from "@/lib/constants";

interface PersonalizationBackgroundProps {
    wallpaper: string;
    setWallpaper: (wallpaper: string) => void;
    accentColor: string;
}

export function PersonalizationBackground({ wallpaper, setWallpaper, accentColor }: PersonalizationBackgroundProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light mb-6">Background</h1>

            <div className="mb-8">
                <div className="w-64 h-40 bg-[#1f1f1f] border-4 border-black mx-auto relative shadow-2xl flex flex-col">
                    <div
                        className="flex-1 bg-cover bg-center transition-all duration-500"
                        style={{ backgroundImage: `url(${wallpaper})` }}
                    />
                    <div className="h-4 bg-[#1f1f1f] flex items-center justify-center gap-1">
                        <div className={`size-1 rounded-full ${accentColor}`} />
                        <div className="size-1 bg-gray-600 rounded-full" />
                        <div className="size-1 bg-gray-600 rounded-full" />
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
                            className={`aspect-video bg-cover bg-center border-2 transition-all ${wallpaper === wp ? "border-white" : "border-transparent hover:border-white/50"}`}
                            style={{ backgroundImage: `url(${wp})` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}