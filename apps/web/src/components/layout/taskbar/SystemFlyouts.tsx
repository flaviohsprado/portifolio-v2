import { Button } from "@/components/ui/button";
import { Globe, Lock, Signal, Volume2, Wifi } from "lucide-react";
import { useState } from "react";

// --- VOLUME FLYOUT ---
export function VolumeFlyout() {
    const [volume, setVolume] = useState(80);

    return (
        <div className="w-80 bg-[#1f1f1f]/95 backdrop-blur-xl border border-[#333] p-4 pb-6 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
            <div className="mb-4 text-white text-lg font-light text-center">
                Speakers (Realtek High Definition Audio)
            </div>

            <div className="flex items-center gap-4 px-2">
                <Volume2 className="text-white size-6" />
                <div className="flex-1 h-1 bg-gray-600 relative group cursor-pointer">
                    {/* Slider Track Visual */}
                    <div
                        className="absolute left-0 top-0 h-full bg-win-accent group-hover:bg-blue-400 transition-colors"
                        style={{ width: `${volume}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 h-5 w-2 bg-white scale-0 group-hover:scale-100 transition-transform shadow-md"
                        style={{ left: `${volume}%` }}
                    />

                    {/* Input real invisível para acessibilidade/funcionamento */}
                    <input
                        type="range"
                        min="0" max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                </div>
                <span className="text-white text-lg font-light w-8 text-right">{volume}</span>
            </div>
        </div>
    );
}

// --- NETWORK FLYOUT ---
export function NetworkFlyout() {
    return (
        <div className="w-[360px] bg-[#1f1f1f]/95 backdrop-blur-xl border border-[#333] shadow-2xl animate-in slide-in-from-bottom-2 duration-200 text-white flex flex-col max-h-[500px]">
            <div className="p-4 bg-[#1f1f1f] border-b border-white/5 shadow-sm z-10">
                <h2 className="text-lg font-semibold">Networks</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-1">
                <NetworkItem name="Home-5G" connected secure signal={4} />
                <NetworkItem name="Office-Wifi" secure signal={3} />
                <NetworkItem name="Free_Airport_Wifi" signal={2} />
            </div>

            <div className="p-0 grid grid-cols-3 bg-[#191919] border-t border-white/10">
                <TileButton label="Wi-Fi" active icon={<Wifi />} />
                <TileButton label="Airplane mode" icon={<Globe />} />
                <TileButton label="Mobile hotspot" icon={<Signal />} />
            </div>

            <div className="p-3 bg-[#191919] flex items-center justify-between text-xs hover:bg-white/5 cursor-pointer transition-colors">
                <span>Network & Internet settings</span>
                <span className="text-blue-400">Change settings</span>
            </div>
        </div>
    );
}

// Sub-componentes
function NetworkItem({ name, connected, secure, signal }: any) {
    return (
        <div className={`p-3 pl-4 hover:bg-white/10 cursor-pointer flex flex-col gap-1 border-l-4 border-transparent ${connected ? "bg-white/5 border-win-accent" : ""}`}>
            <div className="flex items-center gap-3">
                <Wifi className="size-5 text-white/80" />
                <span className="font-medium text-sm flex-1">{name}</span>
                {secure && <Lock className="size-3 text-white/50" />}
            </div>
            {connected && (
                <div className="pl-8 text-xs text-white/60">
                    Connected, secured
                    <div className="mt-2">
                        <Button size="sm" variant="secondary" className="h-7 text-xs rounded-none bg-gray-600 text-white hover:bg-gray-500">Properties</Button>
                        <Button size="sm" variant="secondary" className="h-7 text-xs rounded-none bg-gray-600 text-white hover:bg-gray-500 ml-2">Disconnect</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

function TileButton({ label, icon, active }: any) {
    return (
        <div className="h-20 flex flex-col items-center justify-center gap-1 hover:bg-white/10 cursor-pointer border border-transparent hover:border-white/20">
            <div className={`h-10 w-10 flex items-center justify-center border transition-colors ${active ? "bg-win-accent border-win-accent" : "bg-[#333] border-[#555]"}`}>
                <div className="[&>svg]:size-5">{icon}</div>
            </div>
            <span className="text-[10px]">{label}</span>
        </div>
    )
}