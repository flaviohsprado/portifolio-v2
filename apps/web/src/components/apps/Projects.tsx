import { VSCodeIcon } from "@/components/ui/windows/vscode";
import { useWindowManager } from "@/hooks/use-window-manager";
import { createVSCodeWindow } from "@/lib/window-helpers";
import { useTRPC } from "@/utils/trpc";
import type { Project } from "@portifolio-v2/config";
import { useQuery } from "@tanstack/react-query";
import { FileCode2, Folder, Loader2 } from "lucide-react";
import type React from "react";

export function ProjectsApp() {
   const trpc = useTRPC();
   const { data: projects = [], isLoading } = useQuery(trpc.project.get.queryOptions());
   const { openWindow } = useWindowManager();

   const handleProjectClick = (project: Project) => {
      openWindow(
         createVSCodeWindow(
            `project-${project.id}`,
            <VSCodeIcon className="size-6" />,
            project,
            { x: 100, y: 100 },
            { width: 1200, height: 800 },
         ),
      );
   };

   const handleProjectKeyDown = (e: React.KeyboardEvent, project: Project) => {
      if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         handleProjectClick(project);
      }
   };

   if (isLoading) {
      return (
         <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </div>
      );
   }

   if (!projects || projects.length === 0) {
      return (
         <div className="flex flex-col h-full items-center justify-center gap-4 text-muted-foreground">
            <Folder className="h-16 w-16" />
            <div className="text-center">
               <h3 className="text-lg font-semibold mb-1">No projects yet</h3>
               <p className="text-sm">Create your first project to get started</p>
            </div>
         </div>
      );
   }

   return (
      <div className="h-full overflow-auto">
         <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
               {projects.map((project: Project) => (
                  <button
                     key={project.id}
                     type="button"
                     tabIndex={0}
                     aria-label={`Open ${project.name}`}
                     className="flex flex-col items-center gap-2 p-3 rounded-none hover:bg-secondary/50 transition-colors cursor-pointer group"
                     onClick={() => handleProjectClick(project)}
                     onKeyDown={(e) => handleProjectKeyDown(e, project)}
                  >
                     <div className="relative">
                        <FileCode2 className="h-12 w-12 text-blue-500 drop-shadow-md transition-transform" />
                        <div className="absolute -bottom-1 -right-1 bg-background border border-border rounded-sm px-1">
                           <span className="text-[8px] font-bold text-muted-foreground">EXE</span>
                        </div>
                     </div>
                     <span className="text-xs font-medium text-center line-clamp-2 w-full break-words">
                        {project.name}.exe
                     </span>
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
}
