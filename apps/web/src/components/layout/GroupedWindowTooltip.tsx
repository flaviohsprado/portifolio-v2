import { useWindowManager } from "@/hooks/use-window-manager";
import type { WindowInstance } from "@portifolio-v2/config";
import { WindowPreview } from "./WindowPreview";

interface GroupedWindowTooltipProps {
   windows: WindowInstance[];
   onWindowSelect: (windowId: string) => void;
}

export function GroupedWindowTooltip({
   windows,
   onWindowSelect,
}: GroupedWindowTooltipProps) {
   const { closeWindow, focusedWindowId } = useWindowManager();

   const handleClose = (e: React.MouseEvent, windowId: string) => {
      e.stopPropagation(); // Impede que o clique feche o tooltip ou selecione a janela
      closeWindow(windowId);
   };

   return (
      <div className="flex gap-1 p-1 bg-[#101010]/95 backdrop-blur-md border border-[#333] shadow-2xl rounded-sm">
         {windows.map((window) => (
            <WindowPreview
               key={window.id}
               window={window}
               isActive={focusedWindowId === window.id}
               onSelect={onWindowSelect}
               onClose={handleClose}
            />
         ))}
      </div>
   );
}