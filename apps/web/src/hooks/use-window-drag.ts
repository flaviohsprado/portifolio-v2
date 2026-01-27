import type { WindowInstance } from "@portifolio-v2/config";
import { useEffect, useState } from "react";
import { useWindowManager } from "./use-window-manager";

export function useWindowDrag(window: WindowInstance) {
	const { updateWindowPosition, maximizeWindow } = useWindowManager();
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	const startDrag = (e: React.MouseEvent) => {
		// Se clicar com botão direito ou em controles, ignora
		if (e.button !== 0) return;
		if ((e.target as HTMLElement).closest("button")) return;

		e.preventDefault();

		let startX = e.clientX;
		let startY = e.clientY;
		let initialWindowX = window.position.x;
		let initialWindowY = window.position.y;

		// LÓGICA DE "SNAP FROM MAXIMIZE"
		if (window.isMaximized) {
			// 1. Calcula a posição relativa do mouse na tela (0% a 100%)
			const screenPercentage = e.clientX / globalThis.innerWidth;

			// 2. Restaura a janela (isso atualiza o state, mas precisamos calcular a nova pos manual agora)
			maximizeWindow(window.id);

			// 3. Define a nova largura (pegamos do originalSize ou um fallback)
			const newWidth = window.originalSize?.width || 900;

			// 4. Reposiciona a janela para que o mouse continue na mesma % da barra de título
			initialWindowX = e.clientX - newWidth * screenPercentage;
			initialWindowY = 0; // Cola no topo inicialmente para não pular

			// Atualiza imediatamente
			updateWindowPosition(window.id, { x: initialWindowX, y: initialWindowY });
		}

		setIsDragging(true);
		setDragOffset({
			x: startX - initialWindowX,
			y: startY - initialWindowY,
		});
	};

	useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (e: MouseEvent) => {
			updateWindowPosition(window.id, {
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y,
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragOffset, window.id, updateWindowPosition]);

	return { startDrag, isDragging };
}
