import type { WindowInstance } from "@portifolio-v2/config";
import { useEffect, useState } from "react";
import { useWindowManager } from "./use-window-manager";

const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

export function useWindowResize(window: WindowInstance) {
	const { updateWindowRect } = useWindowManager();
	const [isResizing, setIsResizing] = useState(false);

	const [dragState, setDragState] = useState<{
		startX: number;
		startY: number;
		startRect: { x: number; y: number; width: number; height: number };
		direction: string;
	} | null>(null);

	const startResize = (direction: string, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setIsResizing(true);
		setDragState({
			startX: e.clientX,
			startY: e.clientY,
			startRect: {
				x: window.position.x,
				y: window.position.y,
				width: window.size.width,
				height: window.size.height,
			},
			direction,
		});
	};

	useEffect(() => {
		if (!isResizing || !dragState) return;

		const handleMouseMove = (e: MouseEvent) => {
			const { startX, startY, startRect, direction } = dragState;
			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			const newRect = { ...startRect };

			if (direction.includes("n")) {
				const newHeight = Math.max(MIN_HEIGHT, startRect.height - deltaY);
				if (newHeight !== MIN_HEIGHT || startRect.height > MIN_HEIGHT) {
					newRect.y = startRect.y + (startRect.height - newHeight);
					newRect.height = newHeight;
				}
			}

			if (direction.includes("s")) {
				newRect.height = Math.max(MIN_HEIGHT, startRect.height + deltaY);
			}
			if (direction.includes("w")) {
				const newWidth = Math.max(MIN_WIDTH, startRect.width - deltaX);
				if (newWidth !== MIN_WIDTH || startRect.width > MIN_WIDTH) {
					newRect.x = startRect.x + (startRect.width - newWidth);
					newRect.width = newWidth;
				}
			}

			if (direction.includes("e")) {
				newRect.width = Math.max(MIN_WIDTH, startRect.width + deltaX);
			}

			updateWindowRect(window.id, newRect);
		};

		const handleMouseUp = () => {
			setIsResizing(false);
			setDragState(null);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isResizing, dragState, window.id, updateWindowRect]);

	return { startResize, isResizing };
}
