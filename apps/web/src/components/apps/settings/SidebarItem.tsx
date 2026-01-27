interface SidebarItemProps {
    active: boolean;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    accent: string;
}

export function SidebarItem({ active, label, icon, onClick, accent }: SidebarItemProps) {
    const activeClass = active ? "bg-[#333] text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/10";

    return (
        <button type="button" onClick={onClick} className={`flex items-center gap-3 px-3 py-2 text-sm w-full text-left relative ${activeClass}`}>
            {active && <div className={`absolute left-0 top-1 bottom-1 w-1 rounded-r-full ${accent}`} />}
            <div className="[&>svg]:size-4">{icon}</div>
            <span>{label}</span>
        </button>
    )
}