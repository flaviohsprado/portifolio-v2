interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
    return (
        <div className="mb-8 animate-in slide-in-from-bottom-2">
            <h3 className="text-base font-medium mb-4 pb-2 border-b border-white/10">{title}</h3>
            {children}
        </div>
    )
}