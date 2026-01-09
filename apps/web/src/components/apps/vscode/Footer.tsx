import type { User } from "better-auth";
import { AlertCircle, CheckCircle, GitBranch } from "lucide-react";

interface FooterProps {
   user: User | null;
}

export function Footer({ user }: FooterProps) {
   return (
      <div className="flex h-6 items-center justify-between border-t border-[#2d2d30] bg-[#007acc] px-2 text-xs text-white">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
               <GitBranch className="h-3 w-3" />
               <span>main</span>
            </div>
            <div className="flex items-center gap-1">
               <AlertCircle className="h-3 w-3" />
               <span>0</span>
               <CheckCircle className="h-3 w-3" />
               <span>0</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span>You, last week</span>
            <span>{user?.name ?? user?.email} (Today)</span>
            <span>Ln 15, Col 22</span>
            <span>Spaces: 3</span>
            <span>UTF-8</span>
            <span>LF</span>
            <span>TypeScript JSX</span>
            <span>Finish Setup</span>
            <div className="flex items-center gap-1">
               <AlertCircle className="h-3 w-3" />
               <span>2.13</span>
            </div>
         </div>
      </div>
   );
}
