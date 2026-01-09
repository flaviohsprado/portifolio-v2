import { useWindowManager } from "@/hooks/use-window-manager";
import { useSession } from "@/lib/auth-client";
import { constrainToBoundaries } from "@/lib/boundary-utils";
import { useTRPC } from "@/utils/trpc";
import { ContentCodeEnum, type Project, type VSCodeWindow } from "@portifolio-v2/config";
import { useEffect, useState } from "react";
import { ActivityBar } from "./ActivityBar";
import { Editor } from "./Editor";
import { Footer } from "./Footer";
import { NavigateBar } from "./NavigateBar";
import { Sidebar } from "./Sidebar";

interface VSCodeProps {
   window: VSCodeWindow;
   onClose: () => void;
   onMinimize: () => void;
   onMaximize: () => void;
   zIndex?: number;
   project: Project;
}

export function VSCode({ window, onClose, onMinimize, onMaximize, zIndex = 30, project }: VSCodeProps) {
   const trpc = useTRPC();
   const { data: session } = useSession()

   const { updateWindowPosition } = useWindowManager();

   const [contentCode, setContentCode] = useState<ContentCodeEnum>(ContentCodeEnum.PROJECT);
   const [position, setPosition] = useState(window.position);
   const [isDragging, setIsDragging] = useState(false);
   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

   // Update local state when window state changes
   useEffect(() => {
      setPosition(window.position);
   }, [window.position]);

   // Add/remove mouse event listeners with useEffect
   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         if (!isDragging || window.isMaximized) return;

         const newPosition = {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
         };

         // Constrain position to viewport boundaries
         const constrainedPosition = constrainToBoundaries(
            newPosition,
            window.size.width,
            window.size.height,
         );

         setPosition(constrainedPosition);
         updateWindowPosition(window.id, constrainedPosition);
      };

      const handleMouseUp = () => {
         setIsDragging(false);
      };

      if (isDragging) {
         document.addEventListener("mousemove", handleMouseMove);
         document.addEventListener("mouseup", handleMouseUp);

         return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
         };
      }
   }, [
      isDragging,
      dragStart,
      window.isMaximized,
      window.size.width,
      window.size.height,
      window.id,
      updateWindowPosition,
   ]);

   return (
      <div
         className="fixed rounded-none shadow-win-lg overflow-hidden bg-[#1e1e1e]"
         data-window-container
         style={{
            left: window.isMaximized ? "0px" : `${position.x}px`,
            top: window.isMaximized ? "0px" : `${position.y}px`,
            width: window.isMaximized ? "100vw" : `${window.size.width}px`,
            height: window.isMaximized ? "100vh" : `${window.size.height}px`,
            zIndex: zIndex,
         }}
      >
         <NavigateBar
            project={project}
            isMaximized={window.isMaximized}
            setIsMaximized={() => { }}
            position={position}
            setPosition={setPosition}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            setDragStart={setDragStart}
            onMaximize={onMaximize}
            onMinimize={onMinimize}
            onClose={onClose}
         />

         <div className="flex flex-1 overflow-hidden h-[calc(100%-3.5rem)]">
            {/* Activity Bar */}
            <ActivityBar />

            {/* Sidebar */}
            <Sidebar project={project} setContentCode={setContentCode} />

            {/* Editor Area */}
            <Editor
               project={project}
               contentCode={contentCode}
            />
         </div>
         {session && <Footer user={session.user} />}
      </div>
   );
}
