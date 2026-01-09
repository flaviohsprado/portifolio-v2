import { Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DesktopFolderProps {
   name: string;
   icon?: React.ReactNode;
   onDoubleClick: () => void;
}

export function DesktopFolder({ name, icon, onDoubleClick }: DesktopFolderProps) {
   const [isSelected, setIsSelected] = useState(false);
   const [lastClickTime, setLastClickTime] = useState(0);
   const folderRef = useRef<HTMLButtonElement>(null);

   const handleClick = () => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastClickTime;

      if (timeDiff < 300) {
         // Double click detected
         onDoubleClick();
         setIsSelected(false);
      } else {
         // Single click
         setIsSelected(true);
      }

      setLastClickTime(currentTime);
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         onDoubleClick();
      }
   };

   // Click outside to deselect
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (folderRef.current && !folderRef.current.contains(event.target as Node)) {
            setIsSelected(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <button
         ref={folderRef}
         type="button"
         tabIndex={0}
         aria-label={`${name} folder`}
         className={`
            flex flex-col items-center justify-center gap-2 p-3 rounded-none
            cursor-pointer transition-all duration-150 w-24 group
            ${isSelected ? "bg-primary/20 backdrop-blur-sm" : "hover:bg-white/10 hover:backdrop-blur-sm"}
         `}
         onClick={handleClick}
         onKeyDown={handleKeyDown}
      >
         <div className="relative">
            <div
               className={`
               text-4xl transition-transform duration-150
            `}
            >
               {icon || <Folder className="h-12 w-12 text-yellow-400 drop-shadow-lg fill-foreground" />}
            </div>
         </div>
         <span
            className={`
            text-xs font-medium text-center leading-tight px-2 py-1 rounded-none
            line-clamp-2 max-w-full break-words
         `}
         >
            {name}
         </span>
      </button>
   );
}
