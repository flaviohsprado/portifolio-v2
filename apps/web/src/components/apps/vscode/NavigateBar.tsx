import { Button } from "@/components/ui/button";
import { VSCodeIcon } from "@/components/ui/windows/vscode";
import type { Project } from "@portifolio-v2/config";
import { ArrowLeft, ArrowRight, Minus, MoreHorizontal, Search, Settings, Square, X } from "lucide-react";
import { useState } from "react";

interface NavigateBarProps {
   project: Project;
   isMaximized: boolean;
   setIsMaximized: (isMaximized: boolean) => void;
   position: { x: number; y: number };
   setPosition: (position: { x: number; y: number }) => void;
   isDragging: boolean;
   setIsDragging: (isDragging: boolean) => void;
   setDragStart: (dragStart: { x: number; y: number }) => void;
   onMaximize: () => void;
   onMinimize: () => void;
   onClose: () => void;
}

export function NavigateBar({
   project,
   isMaximized,
   setIsMaximized,
   position,
   setPosition,
   isDragging,
   setIsDragging,
   setDragStart,
   onMaximize,
   onMinimize,
   onClose,
}: NavigateBarProps) {
   const [originalPosition, setOriginalPosition] = useState(position);

   const handleMouseDown = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;

      // If window is maximized and user starts dragging, unmaximize first
      if (isMaximized) {
         setIsMaximized(false);
         setPosition(originalPosition);
         return;
      }

      setIsDragging(true);
      setDragStart({
         x: e.clientX - position.x,
         y: e.clientY - position.y,
      });
   };

   const handleMaximize = () => {
      if (isMaximized) {
         // Restore to original size and position
         setIsMaximized(false);
         setPosition(originalPosition);
      } else {
         // Save current position before maximizing
         setOriginalPosition(position);
         // Maximize to full screen
         setIsMaximized(true);
         setPosition({ x: 0, y: 0 });
      }
      onMaximize();
   };

   return (
      <div
         role="toolbar"
         aria-label={"VSCode window controls"}
         className={`grid grid-cols-3 place-items-baseline h-8 bg-background ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
         onMouseDown={handleMouseDown}
      >
         <div className="col-span-1 w-full flex items-center gap-4 justify-start">
            <div className="flex items-center gap-1 pl-2">
               <VSCodeIcon className="size-4" />
            </div>
            <div className="flex gap-4 max-w-54 text-xs text-[#cccccc] overflow-hidden">
               <span>File</span>
               <span>Edit</span>
               <span>Selection</span>
               <span>View</span>
               <span>Go</span>
               <span>Run</span>
               <span>Terminal</span>
               <span>Help</span>
            </div>
         </div>

         <div className="col-span-1 flex items-center gap-2 justify-center w-full">
            <Button
               variant="ghost"
               size="icon"
               className="w-8 h-8 rounded p-1 hover:bg-[#2e2e2e]! hover:text-white!"
            >
               <ArrowLeft className="h-3 w-3" />
            </Button>
            <Button
               variant="ghost"
               size="icon"
               className="w-8 h-8 rounded p-1 hover:bg-[#2e2e2e]! hover:text-white!"
            >
               <ArrowRight className="h-3 w-3" />
            </Button>
            <div className="flex h-6 items-center gap-2 rounded bg-[#3c3c3c] px-2 w-full justify-center border-1">
               <Search className="h-3 w-3 text-[#858585] rotate-y-180" />
               <span className="text-[#858585] text-xs">{project.name}</span>
            </div>
            <div className="flex items-center gap-1">
               <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded p-1 hover:bg-[#2e2e2e]! hover:text-white!"
               >
                  <MoreHorizontal className="size-4" />
               </Button>
               <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded p-1 hover:bg-[#2e2e2e]! hover:text-white!"
               >
                  <Settings className="size-4" />
               </Button>
            </div>
         </div>

         <div className="col-span-1 w-full flex items-center justify-end">
            <Button
               variant="ghost"
               size="icon"
               onClick={onMinimize}
               className="h-8 w-12 rounded-none text-[#808080]! hover:bg-[#414141]! hover:text-white!"
            >
               <Minus className="size-3" />
            </Button>
            <Button
               variant="ghost"
               size="icon"
               onClick={handleMaximize}
               className="h-8 w-12 rounded-none text-[#808080]! hover:bg-[#414141]! hover:text-white!"
            >
               <Square className="size-3" />
            </Button>
            <Button
               variant="ghost"
               size="icon"
               onClick={onClose}
               className="h-8 w-12 rounded-none text-[#808080]! hover:bg-red-500! hover:text-white!"
            >
               <X className="size-4" />
            </Button>
         </div>
      </div>
   );
}
