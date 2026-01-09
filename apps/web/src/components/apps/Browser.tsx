import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Home, Lock, RotateCw, Star } from "lucide-react";

export function BrowserApp() {
   return (
      <div className="flex flex-col h-full">
         {/* Browser Controls */}
         <div className="flex items-center gap-2 p-3 border-b border-border bg-background/50">
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <ArrowRight className="h-4 w-4" />
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <RotateCw className="h-4 w-4" />
               </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <Home className="h-4 w-4" />
               </Button>
            </div>

            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border">
               <Lock className="h-4 w-4 text-green-600" />
               <Input
                  value="windows11-mvp.demo"
                  className="border-0 bg-transparent text-sm p-0 h-auto focus-visible:ring-0"
                  readOnly
               />
               <Star className="h-4 w-4 text-muted-foreground" />
            </div>
         </div>

         {/* Browser Content */}
         <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
               <div className="mb-8 text-center">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                     Windows 11 MVP Experience
                  </h1>
                  <p className="text-lg text-muted-foreground">
                     Explore the modern, secure, and flexible PC experience
                  </p>
               </div>

               <div className="grid gap-6">
                  <Card title="🎨 Modern UI">
                     <p className="text-sm text-muted-foreground">
                        Centered Start Menu and taskbar with rounded corners, creating a clean and
                        contemporary look.
                     </p>
                  </Card>

                  <Card title="📐 Window Management">
                     <p className="text-sm text-muted-foreground">
                        Snap layouts and groups make multitasking effortless. Drag windows to arrange them
                        quickly.
                     </p>
                  </Card>

                  <Card title="🔒 Performance & Security">
                     <p className="text-sm text-muted-foreground">
                        Enhanced security features with hardware-level protection and improved performance.
                     </p>
                  </Card>

                  <Card title="🚀 Next Iterations">
                     <p className="text-sm text-muted-foreground">
                        Future updates will bring Widgets, AI features (Copilot), gaming optimizations, and
                        enhanced mobile integration.
                     </p>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
   <div className="p-6 rounded-xl border border-border bg-card hover:shadow-win-md transition-shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
   </div>
);
