export interface BoundaryConstraints {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
}

export const getViewportBoundaries = (
	elementWidth: number,
	_elementHeight: number,
): BoundaryConstraints => {
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	return {
		minX: 0,
		maxX: Math.max(0, viewportWidth - elementWidth),
		minY: 0,
		maxY: Math.max(0, viewportHeight), // Account for taskbar height
	};
};

export const constrainToBoundaries = (
	position: { x: number; y: number },
	elementWidth: number,
	elementHeight: number,
): { x: number; y: number } => {
	const boundaries = getViewportBoundaries(elementWidth, elementHeight);

	return {
		x: Math.max(boundaries.minX, Math.min(boundaries.maxX, position.x)),
		y: Math.max(boundaries.minY, Math.min(boundaries.maxY, position.y)),
	};
};

export const isWithinBoundaries = (
	position: { x: number; y: number },
	elementWidth: number,
	elementHeight: number,
): boolean => {
	const boundaries = getViewportBoundaries(elementWidth, elementHeight);

	return (
		position.x >= boundaries.minX &&
		position.x <= boundaries.maxX &&
		position.y >= boundaries.minY &&
		position.y <= boundaries.maxY
	);
};

export const getStartMenuPosition = (
	_menuWidth: number,
	menuHeight: number,
): { x: number; y: number } => {
	const viewportHeight = window.innerHeight;
	const taskbarHeight = 48; // h-12 in Tailwind = 48px

	// Position at bottom-left, flush with taskbar (no gap)
	const x = 0; // Always align to left edge
	const y = viewportHeight - menuHeight - taskbarHeight; // Position so bottom of menu touches top of taskbar

	return { x, y };
};
