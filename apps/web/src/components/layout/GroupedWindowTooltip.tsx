import { useWindowManager } from "@/hooks/use-window-manager";
import type { WindowInstance } from "@portifolio-v2/config";
import { WindowPreview } from "./WindowPreview";

interface GroupedWindowTooltipProps {
   windows: WindowInstance[];
   onWindowSelect: (windowId: string) => void;
}

export const GroupedWindowTooltip = ({ windows, onWindowSelect }: GroupedWindowTooltipProps) => {
   const { getTopWindowId } = useWindowManager();

   const topWindowId = getTopWindowId();

   const handleWindowClick = (windowId: string) => {
      onWindowSelect(windowId);
   };

   if (windows.length === 1) {
      const window = windows[0];
      return (
         <div className="p-2">
            <div className="text-sm text-gray-300 mb-2">{window.title}</div>
            <WindowPreview
               window={window}
               isActive={window.id === topWindowId}
               onClick={() => handleWindowClick(window.id)}
            />
         </div>
      );
   }

   return (
      <div className="p-3 max-w-md">
         <div className="text-sm text-gray-300 mb-3">
            {windows.length} {windows[0].title} windows
         </div>
         <div className="grid grid-cols-2 gap-2">
            {windows.map((window) => (
               <div key={window.id} className="relative">
                  <WindowPreview
                     window={window}
                     isActive={window.id === topWindowId}
                     onClick={() => handleWindowClick(window.id)}
                  />
                  {window.isMinimized && (
                     <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  )}
               </div>
            ))}
         </div>
         {windows.length > 4 && (
            <div className="text-xs text-gray-400 mt-2 text-center">+{windows.length - 4} more windows</div>
         )}
      </div>
   );
};
