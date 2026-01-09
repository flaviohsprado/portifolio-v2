import { Button } from "@/components/ui/button";
import { AlertCircle, FileCode, GitBranch, Search } from "lucide-react";

export function ActivityBar() {
   return (
      <div className="flex w-12 flex-col items-center gap-4 border-r border-[#2d2d30] bg-[#333333] py-4">
         <Button variant="ghost" size="icon" className="rounded p-2 hover:bg-[#2d2d30]">
            <FileCode className="h-5 w-5" />
         </Button>
         <Button variant="ghost" size="icon" className="rounded p-2 hover:bg-[#2d2d30]">
            <Search className="h-5 w-5" />
         </Button>
         <Button variant="ghost" size="icon" className="rounded p-2 hover:bg-[#2d2d30]">
            <GitBranch className="h-5 w-5" />
         </Button>
         <Button variant="ghost" size="icon" className="rounded p-2 hover:bg-[#2d2d30]">
            <AlertCircle className="h-5 w-5" />
         </Button>
         <div className="relative">
            <Button variant="ghost" size="icon" className="rounded p-2 hover:bg-[#2d2d30]">
               <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-label="Activity Bar"
                  role="img"
               >
                  <title>Activity Bar</title>
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
               </svg>
            </Button>
            <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-blue-500" />
         </div>
      </div>
   );
}
