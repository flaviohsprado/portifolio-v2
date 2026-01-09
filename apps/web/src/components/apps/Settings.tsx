import { Input } from "@/components/ui/input";
import { WindowsSettingsIcon } from "@/components/ui/windows/settings";
import { WindowsUpdateIcon } from "@/components/ui/windows/update";
import { Globe, Palette, Search, Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";

export function SettingsApp() {
   const [isLoading, setIsLoading] = useState(true);
   const [isVisible, setIsVisible] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      const loadingTimer = setTimeout(() => {
         setIsLoading(false);
         // Start the fade-in animation after loading
         setTimeout(() => setIsVisible(true), 50);
      }, 300);

      return () => clearTimeout(loadingTimer);
   }, []);

   const categories = [
      { name: "Personalização", icon: Palette, description: "Tela de Fundo, tela de bloqueio, cores" },
      { name: "Contas", icon: User, description: "Suas contas, email, sincronização, trabalho, família" },
      //{ name: "Sistema", icon: Monitor, description: "Tela, som, notificações, energia" },
      //{ name: "Dispositivos", icon: Wifi, description: "Bluetooth, impressoras, mouse" },
      //{ name: "Dispositivos móveis", icon: Smartphone, description: "Vincular seu Android, iPhone" },
      //{ name: "Rede e Internet", icon: Globe, description: "Wi-Fi, modo avião, VPN" },
      //{ name: "Aplicativos", icon: HardDrive, description: "Desinstalar, padrões" },
      ///{ name: "Hora e Idioma", icon: Clock, description: "Fala, região, data" },
      //{ name: "Jogos", icon: Gamepad2, description: "Xbox Game Bar, capturas, Modo de Jogo" },
      //{ name: "Facilidade de Acesso", icon: Accessibility, description: "Narrador, lupa, alto contraste" },
      //{ name: "Pesquisar", icon: FileSearch, description: "Localizar meus arquivos, permissões" },
      //{ name: "Privacidade", icon: Lock, description: "Localização, câmera, microfone" },
      //{ name: "Atualização e Segurança", icon: Shield, description: "Windows Update, recuperação, backup" },
   ];

   if (isLoading) {
      return (
         <div className="h-full w-full bg-blue-600 flex items-center justify-center animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4">
               <WindowsSettingsIcon className="h-16 w-16 text-white animate-pulse" />
            </div>
         </div>
      );
   }

   return (
      <div
         className={`h-full w-full bg-black text-white overflow-auto transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
      >
         {/* Header */}
         <div>
            {/* User Profile Section */}
            <div className="bg-[#171717] flex flex-row justify-between items-center gap-4 py-8">
               <div
                  className={`w-full flex items-center justify-center gap-4 col-span-1 mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                     }`}
               >
                  <div className="w-16 h-16 rounded-full bg-[#6e6e64] flex items-center justify-center">
                     <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-semibold">Flavio Prado</h2>
                     <p className="text-gray-300 text-sm">flavio.pprado4@gmail.com</p>
                     <a
                        href="https://account.microsoft.com/account/manage-account"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm hover:text-blue-300"
                     >
                        Minha conta WeaversHub
                     </a>
                  </div>
               </div>{" "}
               <div
                  className={`w-full flex items-baseline justify-center gap-8 col-span-1 mb-8 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                     }`}
               >
                  <div className="space-y-2 max-w-30 max-h-35">
                     <WindowsUpdateIcon className="h-8 w-8 text-white" />
                     <div>
                        <div className="text-sm">Windows Update</div>
                        <div className="text-xs text-gray-400">Última verificação: há 3 horas</div>
                     </div>
                  </div>

                  <div className="space-y-2 max-w-30">
                     <Trophy className="h-8 w-8 text-white" />
                     <div>
                        <div className="text-sm">Rewards</div>
                        <div className="text-xs text-gray-400">342 pontos</div>
                     </div>
                  </div>

                  <div className="space-y-2 max-w-30">
                     <Globe className="h-8 w-8 text-white" />
                     <div>
                        <div className="text-sm">Navegação na Web</div>
                        <div className="text-xs text-gray-400">Restauração recomendada</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Search Bar */}
            <div className="bg-black flex flex-col items-center gap-4 justify-center pt-8">
               <div
                  className={`relative mb-8 min-w-lg transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                     }`}
               >
                  <Input
                     placeholder="Localizar uma configuração"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-10 border-2 border-[#6e6e64] text-black placeholder-gray-400 rounded-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
               </div>
            </div>

            {/* Settings Categories Grid */}
            <div
               className={`bg-black grid grid-cols-5 max-w-7xl mx-auto place-items-center gap-6 p-4 py-8 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
            >
               {categories.map((category) => (
                  <div
                     key={category.name}
                     className="flex items-center justify-start gap-4 rounded-none w-65 hover:bg-primary/20 hover:border-primary backdrop-blur-sm p-4 cursor-pointer"
                  >
                     <category.icon className="h-8 w-8 text-blue-600" />
                     <div>
                        <div className="text-sm">{category.name}</div>
                        <div className="text-xs text-gray-400">{category.description}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
