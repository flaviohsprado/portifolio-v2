import { Button } from "@/components/ui/button";
import { ACCENT_COLORS } from "@/lib/constants";
import { Check } from "lucide-react";

interface PersonalizationColorsProps {
    accentColor: string;
    setAccentColor: (color: string) => void;
}

export function PersonalizationColors({ accentColor, setAccentColor }: PersonalizationColorsProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-light mb-6">Colors</h1>

            <div className="space-y-4">
                <label className="text-sm">Choose your accent color</label>
                <div className="flex flex-wrap gap-3">
                    {ACCENT_COLORS.map((color, i) => (
                        <button
                            type="button"
                            key={i}
                            onClick={() => setAccentColor(color)}
                            className={`size-10 ${color} border-2 transition-all flex items-center justify-center hover:scale-110 ${accentColor === color ? "border-white" : "border-transparent"}`}
                        >
                            {accentColor === color && <Check className="size-5 text-white drop-shadow-md" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-[#1f1f1f] p-4 border border-[#333]">
                <h3 className="mb-2 font-medium">Preview</h3>
                <div className="flex gap-2">
                    <Button className={`${accentColor} hover:brightness-110 border-none`}>Primary Button</Button>
                    <div className={`px-3 py-2 ${accentColor} bg-opacity-20 text-white border border-white/10 rounded`}>
                        Accent UI Element
                    </div>
                </div>
            </div>
        </div>
    )
}