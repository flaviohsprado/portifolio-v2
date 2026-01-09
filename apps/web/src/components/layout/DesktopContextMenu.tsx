interface DesktopContextMenuProps {
   x: number;
   y: number;
}

export function DesktopContextMenu({ x, y }: DesktopContextMenuProps) {
   return (
      <div
         className="fixed bg-[#2b2b2b] border border-[#a0a0a0] text-white min-w-48 rounded-none shadow-lg z-50"
         style={{
            left: x,
            top: y,
         }}
      >
         {/* AMD Software */}
         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-red-600 rounded-sm flex items-center justify-center">
               <span className="text-white text-xs font-bold">A</span>
            </div>
            AMD Software: Adrenalin Edition
         </div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer">Exibir</div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer">
            Classificar por
         </div>

         <div
            className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer"
            onClick={() => window.location.reload()}
         >
            Atualizar
         </div>

         <div className="border-t border-gray-600 my-1" />

         <div
            className="text-gray-400 cursor-not-allowed text-xs px-3 py-2"
            style={{ pointerEvents: "none" }}
         >
            Colar
         </div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-linear-to-br from-red-500 via-green-500 to-blue-500 rounded-sm flex items-center justify-center">
               <span className="text-white text-xs">G</span>
            </div>
            Open Git GUI here
         </div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-linear-to-br from-red-500 via-green-500 to-blue-500 rounded-sm flex items-center justify-center">
               <span className="text-white text-xs">G</span>
            </div>
            Open Git Bash here
         </div>

         <div
            className="text-gray-400 cursor-not-allowed text-xs px-3 py-2"
            style={{ pointerEvents: "none" }}
         >
            Colar atalho
         </div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center justify-between">
            <span>Desfazer Copiar</span>
            <span className="text-gray-400 text-sm">Ctrl+Z</span>
         </div>

         <div className="border-t border-gray-600 my-1" />

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-green-600 rounded-sm flex items-center justify-center">
               <span className="text-white text-xs font-bold">N</span>
            </div>
            Painel de controle da NVIDIA
         </div>

         <div className="border-t border-gray-600 my-1" />

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer">Novo</div>

         <div className="border-t border-gray-600 my-1" />

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-[#5a5a5a] rounded-sm flex items-center justify-center">
               <span className="text-white text-xs">🖥</span>
            </div>
            Configurações de exibição
         </div>

         <div className="hover:bg-[#414141] hover:text-white text-xs px-3 py-2 cursor-pointer flex items-center">
            <div className="w-4 h-4 mr-3 bg-[#5a5a5a] rounded-sm flex items-center justify-center">
               <span className="text-white text-xs">🎨</span>
            </div>
            Personalizar
         </div>
      </div>
   );
}
