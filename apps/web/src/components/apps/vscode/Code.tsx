import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/utils/trpc";
import type { Project, ProjectStatus } from "@portifolio-v2/config";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, FileCode, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CodeEditorProps {
   project: Project;
}

export function CodeEditor({ project }: CodeEditorProps) {
   return (
      <>
         <div className="flex h-9 items-center border-b border-[#2d2d30] bg-[#2d2d2e]">
            <div className="flex h-full items-center gap-1 border-r border-[#2d2d30] bg-[#1e1e1e] px-3">
               <FileCode className="h-4 w-4 text-blue-400" />
               <span className="text-xs text-[#cccccc]">index.tsx</span>
               <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 w-5 h-5 rounded p-1 hover:bg-[#2e2e2e]! hover:text-white!"
               >
                  <X className="h-3 w-3" />
               </Button>
            </div>
         </div>

         {/* Breadcrumb */}
         <div className="flex h-7 items-center gap-1 border-b border-[#2d2d30] bg-[#1e1e1e] px-4 text-xs text-[#858585]">
            <span>src</span>
            <ChevronRight className="h-3 w-3" />
            <FileCode className="h-3 w-3 text-blue-400" />
            <span className="text-[#cccccc]">index.tsx</span>
         </div>

         {/* Code Editor */}
         <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto">
               <div className="flex">
                  {/* Line Numbers */}
                  <div className="select-none bg-[#1e1e1e] px-4 py-2 text-right text-[#858585]">
                     {Array.from({ length: 33 }, (_, i) => (
                        <div key={`line-${i}`} className="leading-6">
                           {i + 1}
                        </div>
                     ))}
                  </div>

                  {/* Code Content */}
                  <ScrollArea className="flex-1 h-full overflow-y-auto">
                     <div className="flex-1 bg-[#1e1e1e] py-2 pr-4 font-mono text-sm leading-6">
                        <div>
                           <span className="text-[#c586c0]">import</span>{" "}
                           <span className="text-[#4fc1ff]">{"{"}</span>{" "}
                           <span className="text-[#9cdcfe]">WeaversHub</span>{" "}
                           <span className="text-[#4fc1ff]">{"}"}</span>{" "}
                           <span className="text-[#c586c0]">from</span>{" "}
                           <span className="text-[#ce9178]">"codeweavers"</span>
                           <span className="text-[#cccccc]">;</span>
                        </div>
                        <div className="h-6" />
                        <ProjectInterface />
                        <div className="h-6" />
                        <ProjectInformation project={project} />
                     </div>
                  </ScrollArea>
               </div>
            </div>
         </div>
      </>
   );
}

function ProjectInterface() {
   return (
      <>
         <div>
            <span className="text-[#569cd6]">interface</span>{" "}
            <span className="text-[#4ec9b0]">ProjectProps</span> <span className="text-[#4fc1ff]">{"{"}</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">name</span>
            <span className="text-[#cccccc]">:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">description</span>
            <span className="text-[#cccccc]">:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">status</span>
            <span className="text-[#cccccc]">?:</span> <span className="text-[#ce9178]">"active"</span>
            <span className="text-[#cccccc]">|</span> <span className="text-[#ce9178]">"inactive"</span>
            <span className="text-[#cccccc]">|</span> <span className="text-[#ce9178]">"archived"</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">url</span>
            <span className="text-[#cccccc]">?:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">repositoryUrl</span>
            <span className="text-[#cccccc]">?:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">databaseUrl</span>
            <span className="text-[#cccccc]">?:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div className="pl-4">
            <span className="text-[#9cdcfe]">topics</span>
            <span className="text-[#cccccc]">?:</span> <span className="text-[#4ec9b0]">string</span>
            <span className="text-[#cccccc]">;</span>
         </div>
         <div>
            <span className="text-[#4fc1ff]">{"}"}</span>
         </div>
      </>
   );
}

function ProjectInformation({ project }: { project: Project }) {
   const trpc = useTRPC();
   const { mutate: updateProject } = useMutation(trpc.project.update.mutationOptions());

   return (
      <div>
         <span className="text-[#c586c0]">export</span> <span className="text-[#569cd6]">function</span>{" "}
         <span className="text-[#dcdcaa]">{project.name}</span>
         <span className="text-[#dcdcaa]">
            {"("} {")"} {"{"}
         </span>
         <div className="pl-4 text-[#c586c0]">
            return {"{"}
            <InputStructure
               value={project.name}
               label="name"
               onUpdate={(value) => updateProject({ id: project.id, data: { name: value ?? "" } })}
            />
            <InputStructure
               value={project.description ?? ""}
               label="description"
               onUpdate={(value) => updateProject({ id: project.id, data: { description: value ?? "" } })}
            />
            <InputStructure
               value={project.status}
               label="status"
               onUpdate={(value) =>
                  updateProject({ id: project.id, data: { status: value as ProjectStatus } })
               }
            />
            <InputStructure
               value={project.url ?? ""}
               label="url"
               onUpdate={(value) => updateProject({ id: project.id, data: { url: value ?? "" } })}
            />
            <InputStructure
               value={project.repositoryUrl ?? ""}
               label="repositoryUrl"
               onUpdate={(value) => updateProject({ id: project.id, data: { repositoryUrl: value ?? "" } })}
            />
            <InputStructure
               value={""}
               label="databaseUrl"
               onUpdate={(value) => updateProject({ id: project.id, data: { databaseUrl: value ?? "" } })}
            />
            <InputStructure
               value={project.topics ?? ""}
               label="topics"
               onUpdate={(value) => updateProject({ id: project.id, data: { topics: value ?? "" } })}
            />
            {"}"}
         </div>
         <div className="text-[#dcdcaa]">{"}"}</div>
      </div>
   );
}

function InputStructure({
   value,
   label,
   multiline,
   onUpdate,
}: {
   value: string;
   label: string;
   multiline?: boolean;
   onUpdate: (value: string) => void;
}) {
   const [inputValue, setInputValue] = useState(value);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         onUpdate(inputValue);
      }, 500);

      return () => clearTimeout(timeoutId);
   }, [inputValue, onUpdate]);

   return (
      <div className="pl-4">
         <div className="flex items-center">
            <span className="text-[#9cdcfe]">{label}</span>
            <span className="text-[#cccccc] pr-1">:</span>
            <span className="text-[#ce9178]">"</span>
            {multiline ? (
               <Textarea
                  value={inputValue}
                  className="text-[#ce9178] h-4 max-w-2xl! bg-transparent! border-none p-0 py-0 px-0 text-sm focus:outline-none! focus:ring-0! focus:border-none focus:shadow-none min-w-0 w-auto resize-none overflow-wrap-anywhere break-words! whitespace-pre-wrap"
                  onChange={(e) => {
                     setInputValue(e.target.value);
                  }}
               />
            ) : (
               <Input
                  type="text"
                  value={inputValue}
                  className="text-[#ce9178] h-4 max-w-2xl! bg-transparent! border-none p-0 py-0 px-0 text-sm focus:outline-none! focus:ring-0! focus:border-none focus:shadow-none min-w-0 w-auto resize-none overflow-wrap-anywhere break-words! whitespace-pre-wrap"
                  style={{
                     width: `${Math.max(inputValue.length * 0.6, 1)}rem`,
                     minWidth: "1rem",
                     maxWidth: "100%",
                  }}
                  onChange={(e) => {
                     setInputValue(e.target.value);
                  }}
               />
            )}
            <span className="text-[#ce9178]">"</span>
            <span className="text-[#cccccc]">;</span>
         </div>
      </div>
   );
}
