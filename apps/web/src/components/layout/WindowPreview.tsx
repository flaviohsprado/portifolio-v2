import { Button } from "@/components/ui/button";
import type { WindowInstance } from "@portifolio-v2/config";
import { X } from "lucide-react";

interface WindowPreviewProps {
   window: WindowInstance;
   isActive: boolean;
   onSelect: (windowId: string) => void;
   onClose: (e: React.MouseEvent, windowId: string) => void;
}

export function WindowPreview({
   window,
   isActive,
   onSelect,
   onClose,
}: WindowPreviewProps) {
   return (
      <div
         className={`group relative flex flex-col w-48 bg-[#1f1f1f] border border-[#333] hover:bg-[#2b2b2b] hover:border-[#444] transition-all cursor-pointer shadow-xl ${isActive ? "bg-[#2b2b2b] border-[#444]" : ""
            }`}
         onClick={() => onSelect(window.id)}
         role="button"
         tabIndex={0}
         onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
               onSelect(window.id);
            }
         }}
      >
         {/* Header: Icon + Title + Close Button */}
         <div className="flex items-center justify-between px-2 py-1 h-8 bg-black/20">
            <div className="flex items-center gap-2 overflow-hidden">
               <span className="flex-shrink-0 text-xs">{window.icon}</span>
               <span className="text-[10px] text-white truncate font-segoe">
                  {window.title}
               </span>
            </div>

            <Button
               variant="ghost"
               size="icon"
               className="h-5 w-5 rounded-none hover:bg-red-600 hover:text-white text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
               onClick={(e) => onClose(e, window.id)}
            >
               <X className="h-3 w-3" />
            </Button>
         </div>

         {/* Thumbnail Body (Simulated) */}
         <div className="h-28 relative bg-[#101010] flex items-center justify-center overflow-hidden">
            {/* Aqui simulamos o conteúdo da janela. 
            Num cenário real complexo, poderíamos usar html2canvas, 
            mas um ícone grande opaco funciona muito bem esteticamente. */}
            <div className="opacity-20 transform scale-150 grayscale group-hover:grayscale-0 transition-all duration-300">
               {/* Renderiza o ícone novamente mas bem grande */}
               <div className="[&>svg]:size-16">{window.icon}</div>
            </div>

            {/* Indicador de janela ativa (opcional, visual do Windows 10 não tem isso forte no preview, mas ajuda na web) */}
            {isActive && (
               <div className="absolute inset-0 border-2 border-blue-500/30 pointer-events-none" />
            )}
         </div>
      </div>
   );
}