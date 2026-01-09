import type { WindowInstance } from "@portifolio-v2/config";
import { useState } from "react";

interface WindowPreviewProps {
   window: WindowInstance;
   isActive?: boolean;
   onClick?: () => void;
}

function WindowPreviewLayout({ children }: { children: React.ReactNode }) {
   return <div className="w-full h-full bg-gray-900 text-white p-2 rounded-none border-none">{children}</div>;
}

export const WindowPreview = ({ window, isActive, onClick }: WindowPreviewProps) => {
   const [isHovered, setIsHovered] = useState(false);

   const renderWindowContent = () => {
      switch (window.type) {
         case "vscode":
            return (
               <WindowPreviewLayout>
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full" />
                     <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                     <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-xs font-mono">
                     <div className="text-blue-400">{`// ${window.project?.name || "Project"}`}</div>
                     <div className="text-gray-400">{"// VSCode Editor"}</div>
                  </div>
               </WindowPreviewLayout>
            );
         case "explorer":
            return (
               <div className="w-full h-full bg-gray-800 text-white p-2">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs">📁</span>
                     </div>
                     <span className="text-xs">File Explorer</span>
                  </div>
                  <div className="text-xs text-gray-300">
                     <div>📄 Documents</div>
                     <div>📄 Downloads</div>
                     <div>📄 Pictures</div>
                  </div>
               </div>
            );
         case "browser":
            return (
               <div className="w-full h-full bg-white text-black p-2">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs">🌐</span>
                     </div>
                     <span className="text-xs">Browser</span>
                  </div>
                  <div className="text-xs text-gray-600">
                     <div>🔗 weavershub.com</div>
                     <div>🔗 google.com</div>
                  </div>
               </div>
            );
         case "settings":
            return (
               <div className="w-full h-full bg-gray-900 text-white p-2">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center">
                        <span className="text-xs">⚙️</span>
                     </div>
                     <span className="text-xs">Settings</span>
                  </div>
                  <div className="text-xs text-gray-300">
                     <div>🔧 System</div>
                     <div>🔧 Privacy</div>
                     <div>🔧 Display</div>
                  </div>
               </div>
            );
         case "project-details":
            return (
               <div className="w-full h-full bg-gray-900 text-white p-2">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-xs">📋</span>
                     </div>
                     <span className="text-xs">Project Details</span>
                  </div>
                  <div className="text-xs text-gray-300">
                     <div>📊 Project Info</div>
                     <div>📊 Statistics</div>
                  </div>
               </div>
            );
         default:
            return (
               <div className="w-full h-full bg-gray-800 text-white p-2 flex items-center justify-center">
                  <span className="text-xs">Window Preview</span>
               </div>
            );
      }
   };

   return (
      <div
         className={`w-48 h-32 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive
            ? "border-blue-400 shadow-lg shadow-blue-400/20"
            : "border-gray-600 hover:border-gray-400"
            } ${isHovered ? "scale-105" : "scale-100"}`}
         onClick={onClick}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {renderWindowContent()}
      </div>
   );
};
