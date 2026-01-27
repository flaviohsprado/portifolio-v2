import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function CalendarFlyout() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Gera dias do mês
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDay = new Date().getDate();

    return (
        <div className="w-[360px] bg-[#1f1f1f]/95 backdrop-blur-xl border border-[#333] text-white shadow-2xl animate-in slide-in-from-bottom-2 duration-200 origin-bottom-right">
            {/* Header com Data Grande */}
            <div className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                <h1 className="text-4xl font-light mb-1">
                    {currentDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </h1>
                <p className="text-blue-400 text-sm hover:underline cursor-pointer">
                    {currentDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
            </div>

            {/* Navegação do Mês */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium pl-2">
                        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-none">
                            <ChevronUp className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-none">
                            <ChevronDown className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Grid do Calendário */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                    {weekDays.map(d => <div key={d} className="text-xs font-medium opacity-70">{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {blanks.map((_, i) => <div key={`blank-${i}`} />)}

                    {days.map((d) => (
                        <div
                            key={d}
                            className={`
                h-10 w-10 flex items-center justify-center border-2 border-transparent hover:border-white/40 cursor-pointer transition-all
                ${d === currentDay ? "bg-win-accent text-white font-bold" : "hover:bg-white/10"}
              `}
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </div>

            {/* Agenda Vazia (Toque final) */}
            <div className="border-t border-white/10 p-4 bg-[#1f1f1f]">
                <p className="text-xs text-white/50 mb-2">No events today</p>
                <div className="flex gap-2">
                    <input
                        placeholder="Add an event or reminder"
                        className="flex-1 bg-white/10 border-none text-xs px-2 py-1 outline-none focus:ring-1 ring-win-accent text-white placeholder-white/40"
                    />
                    <Button size="sm" variant="ghost" className="h-full rounded-none px-2 hover:bg-white/10">
                        <ChevronDown className="size-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}