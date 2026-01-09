import type { Project } from "@portifolio-v2/config";
import { ContentCodeEnum } from "@portifolio-v2/config";
import {
   ChevronDown,
   ChevronRight,
   FileCode,
   Folder,
   FolderOpen,
   MoreHorizontal,
   SlidersVerticalIcon,
} from "lucide-react";

interface SidebarProps {
   project: Project;
   setContentCode: (contentCode: ContentCodeEnum) => void;
}

export function Sidebar({ project, setContentCode }: SidebarProps) {
   return (
      <div className="flex w-64 flex-col border-r border-[#2d2d30] bg-[#252526]">
         <div className="flex h-9 items-center justify-between px-4 text-xs uppercase tracking-wide text-[#cccccc]">
            <span>Explorer</span>
            <MoreHorizontal className="h-4 w-4" />
         </div>
         <div className="flex-1 overflow-y-auto px-2">
            <FileTree name={project.name} isExpanded={true} onToggle={() => { }} level={0}>
               <FileTree name="vscode" isExpanded={true} onToggle={() => { }} level={1} isFolder />
               <FileTree name="dist" isExpanded={true} onToggle={() => { }} level={1} isFolder />
               <FileTree name="node_modules" isExpanded={true} onToggle={() => { }} level={1} isFolder />
               <FileTree name="public" isExpanded={true} onToggle={() => { }} level={1} isFolder />
               <FileTree name="src" isExpanded={true} onToggle={() => { }} level={1} isFolder>
                  <FileItem
                     name="index.tsx"
                     level={2}
                     onClick={() => setContentCode(ContentCodeEnum.PROJECT)}
                  />
                  <FileItem
                     name="issues.tsx"
                     level={2}
                     onClick={() => setContentCode(ContentCodeEnum.ISSUE)}
                  />
               </FileTree>
               <FileItem name=".env" level={1} onClick={() => setContentCode(ContentCodeEnum.ENV)} />
               <FileItem name=".gitignore" level={1} />
               <FileItem name="biome.json" level={1} />
               <FileItem name="package.json" level={1} />
               <FileItem name="pnpm-lock.yaml" level={1} isModified />
               <FileItem name="postcss.config.mjs" level={1} isModified />
               <FileItem name="README.md" level={1} />
               <FileItem name="tsconfig.json" level={1} />
               <FileItem name="vite.config.ts" level={1} />
            </FileTree>
         </div>
         <div className="border-t border-[#2d2d30] p-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[#cccccc]">
               <span>Outline</span>
            </div>
         </div>
         <div className="border-t border-[#2d2d30] p-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[#cccccc]">
               <span>Timeline</span>
            </div>
         </div>
      </div>
   );
}

function FileTree({
   name,
   isExpanded,
   onToggle,
   level,
   children,
   isFolder = true,
}: {
   name: string;
   isExpanded: boolean;
   onToggle: () => void;
   level: number;
   children?: React.ReactNode;
   isFolder?: boolean;
}) {
   return (
      <div>
         <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center gap-1 py-0.5 hover:bg-[#2a2d2e]"
            style={{ paddingLeft: `${level * 12 + 4}px` }}
         >
            {isExpanded ? (
               <ChevronDown className="h-3 w-3 flex-shrink-0" />
            ) : (
               <ChevronRight className="h-3 w-3 flex-shrink-0" />
            )}
            {isExpanded ? (
               <FolderOpen className="h-4 w-4 flex-shrink-0 text-[#dcb67a]" />
            ) : (
               <Folder className="h-4 w-4 flex-shrink-0 text-[#dcb67a]" />
            )}
            <span className="truncate text-xs text-[#cccccc]">{name}</span>
         </button>
         {isExpanded && children}
      </div>
   );
}

function FileItem({
   name,
   level,
   isActive = false,
   isModified = false,
   onClick,
}: {
   name: string;
   level: number;
   isActive?: boolean;
   isModified?: boolean;
   onClick?: () => void;
}) {
   const getFileIcon = (fileName: string) => {
      if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
         return <FileCode className="h-4 w-4 flex-shrink-0 text-blue-400" />;
      }
      if (fileName.endsWith(".json")) {
         return <FileCode className="h-4 w-4 flex-shrink-0 text-yellow-400" />;
      }
      if (fileName.endsWith(".css")) {
         return <FileCode className="h-4 w-4 flex-shrink-0 text-purple-400" />;
      }
      if (fileName.endsWith(".md")) {
         return <FileCode className="h-4 w-4 flex-shrink-0 text-blue-300" />;
      }
      if (fileName.endsWith(".yaml") || fileName.endsWith(".yml")) {
         return <FileCode className="h-4 w-4 flex-shrink-0 text-pink-400" />;
      }
      if (fileName.endsWith(".env")) {
         return <SlidersVerticalIcon className="h-4 w-4 flex-shrink-0 text-yellow-400" />;
      }
      return <FileCode className="h-4 w-4 flex-shrink-0 text-gray-400" />;
   };

   return (
      <div
         className={`flex items-center gap-1 py-0.5 ${isActive ? "bg-[#37373d]" : "hover:bg-[#2a2d2e]"}`}
         style={{ paddingLeft: `${level * 12 + 20}px` }}
         onClick={onClick}
      >
         {getFileIcon(name)}
         <span className="truncate text-xs text-[#cccccc]">{name}</span>
         {isModified && <span className="ml-auto mr-2 text-xs text-[#cccccc]">M</span>}
      </div>
   );
}
