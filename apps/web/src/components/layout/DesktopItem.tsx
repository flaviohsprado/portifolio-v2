import { cn } from "@/lib/utils";
import { useRef } from "react";

interface DesktopItemProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onSelect: (id: string, multi: boolean) => void;
    onDoubleClick: () => void;
}

export function DesktopItem({
    id,
    label,
    icon,
    isSelected,
    onSelect,
    onDoubleClick,
}: DesktopItemProps) {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "group flex flex-col items-center justify-start gap-1 p-2 w-[86px] border border-transparent transition-all focus:outline-none",
                isSelected
                    ? "bg-win-selection/40 border-win-selection/50"
                    : "hover:bg-white/10 hover:border-white/20"
            )}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(id, e.ctrlKey || e.metaKey);
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                onDoubleClick();
            }}
        >
            <div className={cn(
                "size-12 flex items-center justify-center transition-all",
                isSelected && "opacity-80"
            )}>
                {icon}
            </div>

            <span className={cn(
                "text-xs text-center text-white text-shadow-sm line-clamp-2 break-words w-full",
                isSelected ? "line-clamp-none px-1" : ""
            )}
                style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}
            >
                {label}
            </span>
        </button>
    );
}