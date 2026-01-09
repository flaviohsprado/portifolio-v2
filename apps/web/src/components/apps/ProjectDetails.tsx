import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Code, GitBranch, Star, Users } from "lucide-react";

interface ProjectDetailsAppProps {
   projectId: string;
}

export function ProjectDetailsApp({ projectId }: ProjectDetailsAppProps) {
   // This would typically fetch project data based on projectId
   // For now, we'll use mock data
   const project = {
      id: projectId,
      name: "Sample Project",
      description: "A sample project for demonstration purposes",
      language: "TypeScript",
      stars: 42,
      forks: 8,
      lastUpdated: "2024-01-15",
      contributors: 5,
   };

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold">{project.name}</h1>
               <p className="text-gray-400">{project.description}</p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Star
               </Button>
               <Button variant="outline" size="sm">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Fork
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Language</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Code className="w-4 h-4" />
                     <span>{project.language}</span>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Stars</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Star className="w-4 h-4" />
                     <span>{project.stars}</span>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Contributors</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Users className="w-4 h-4" />
                     <span>{project.contributors}</span>
                  </div>
               </CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {project.lastUpdated}</span>
               </div>

               <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span>Forks: {project.forks}</span>
               </div>

               <div className="flex gap-2">
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
