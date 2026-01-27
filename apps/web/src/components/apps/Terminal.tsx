import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";

interface CommandHistory {
    cmd: string;
    output: React.ReactNode;
}

export function TerminalApp() {
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            cmd: "init",
            output: <span className="text-gray-400">Windows PowerShell<br />Copyright (C) Microsoft Corporation. All rights reserved.<br /><br />Type <span className="text-yellow-400">'help'</span> to see available commands.</span>
        }
    ]);
    const [currentCmd, setCurrentCmd] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll para o fundo
    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [history]);

    // Focar no input ao clicar no terminal
    const handleFocus = () => inputRef.current?.focus();

    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const cmd = currentCmd.trim().toLowerCase();
            let output: React.ReactNode = "";

            switch (cmd) {
                case "help":
                    output = (
                        <div className="grid grid-cols-[100px_1fr] gap-2 text-gray-300">
                            <span className="text-yellow-400">about</span><span>Who am I?</span>
                            <span className="text-yellow-400">skills</span><span>My technical stack</span>
                            <span className="text-yellow-400">projects</span><span>List my main projects</span>
                            <span className="text-yellow-400">contact</span><span>How to reach me</span>
                            <span className="text-yellow-400">clear</span><span>Clear the terminal</span>
                        </div>
                    );
                    break;
                case "about":
                    output = "Flávio Prado. Senior FullStack Developer focused on React, Node.js and UI/UX.";
                    break;
                case "skills":
                    output = (
                        <div className="text-green-400">
                            Frontend: React, Next.js, Tailwind, TypeScript<br />
                            Backend: Node.js, PostgreSQL, Docker, AWS
                        </div>
                    );
                    break;
                case "contact":
                    output = "Email: contato@exemplo.com | LinkedIn: /in/flavioprado";
                    break;
                case "clear":
                    setHistory([]);
                    setCurrentCmd("");
                    return;
                case "":
                    output = "";
                    break;
                default:
                    output = <span className="text-red-400">Command not found: '{cmd}'. Type 'help'.</span>;
            }

            setHistory(prev => [...prev, { cmd: currentCmd, output }]);
            setCurrentCmd("");
        }
    };

    return (
        <div
            className="h-full bg-win-bg-window text-white font-mono text-sm p-2 cursor-text flex flex-col"
            onClick={handleFocus}
        >
            <ScrollArea ref={scrollRef} className="flex-1">
                <div className="p-2 space-y-2">
                    {history.map((item, i) => (
                        <div key={i}>
                            {item.cmd !== "init" && (
                                <div className="flex gap-2">
                                    <span className="text-green-500">flaviohsprado@portifolio</span>
                                    <span className="text-gray-400">Wait-For-It</span>
                                    <span className="text-blue-400">~</span>
                                    <span>$ {item.cmd}</span>
                                </div>
                            )}
                            <div className="mb-2 leading-relaxed">{item.output}</div>
                        </div>
                    ))}

                    <div className="flex gap-2 items-center">
                        <span className="text-green-500">flaviohsprado@portifolio</span>
                        <span className="text-gray-400">Wait-For-It</span>
                        <span className="text-blue-400">~</span>
                        <span className="mr-1">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentCmd}
                            onChange={(e) => setCurrentCmd(e.target.value)}
                            onKeyDown={handleCommand}
                            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}