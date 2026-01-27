interface SettingsTileProps {
    icon: React.ReactNode;
    label: string;
    desc: string;
    onClick: () => void;
}

export function SettingsTile({ icon, label, desc, onClick }: SettingsTileProps) {
    return (
        <button type="button" onClick={onClick} className="flex items-start gap-3 p-4 hover:bg-[#1f1f1f] hover:outline hover:outline-1 hover:outline-[#333] transition-colors text-left group">
            <div className="text-white/80 group-hover:text-white mt-1 [&>svg]:size-6">{icon}</div>
            <div>
                <div className="text-sm font-medium mb-0.5">{label}</div>
                <div className="text-xs text-gray-400 leading-tight">{desc}</div>
            </div>
        </button>
    )
}