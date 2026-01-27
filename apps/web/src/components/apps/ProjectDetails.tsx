import Loader from "@/components/loader"; // Assumindo que tem um loader
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/utils/trpc"; // Importe o tRPC
import { useQuery } from "@tanstack/react-query";
import { Code, ExternalLink, Star } from "lucide-react";

interface ProjectDetailsAppProps {
   projectId: string;
}

export function ProjectDetailsApp({ projectId }: ProjectDetailsAppProps) {
   const trpc = useTRPC();

   // Busca o projeto específico (assumindo que existe um endpoint getById ou filtramos do get all)
   // Se o teu backend não tiver getById, podemos buscar todos e filtrar:
   const { data: projects, isLoading } = useQuery(trpc.project.get.queryOptions());

   const project = projects?.find(p => p.id === projectId);

   if (isLoading) return <div className="h-full flex items-center justify-center"><Loader /></div>;
   if (!project) return <div className="p-6 text-white">Project not found.</div>;

   return (
      <div className="p-6 space-y-6 text-white h-full overflow-y-auto bg-[#1e1e1e]">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold">{project.name}</h1>
               <p className="text-gray-400 mt-1">{project.description || "No description provided."}</p>
            </div>
            <div className="flex gap-2">
               {/* Se tiveres URL no objeto do projeto, usa aqui */}
               <Button variant="outline" size="sm" className="bg-transparent text-white border-white/20 hover:bg-white/10">
                  <Star className="w-4 h-4 mr-2" />
                  Star
               </Button>
               <Button variant="outline" size="sm" className="bg-transparent text-white border-white/20 hover:bg-white/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard title="Language" icon={<Code className="w-4 h-4 text-blue-400" />} value="TypeScript" />
            <StatsCard title="Stars" icon={<Star className="w-4 h-4 text-yellow-400" />} value="12" />
         </div>

         {/* Conteúdo adicional... */}
         <Card className="bg-[#252526] border-white/10 text-white">
            <CardHeader>
               <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 hover:bg-blue-900/70">React</Badge>
                  <Badge variant="secondary" className="bg-yellow-900/50 text-yellow-200 hover:bg-yellow-900/70">TypeScript</Badge>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-200 hover:bg-green-900/70">Tailwind</Badge>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

function StatsCard({ title, icon, value }: any) {
   return (
      <Card className="bg-[#252526] border-white/10 text-white">
         <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="flex items-center gap-2 text-lg font-semibold">
               {icon}
               <span>{value}</span>
            </div>
         </CardContent>
      </Card>
   )
}