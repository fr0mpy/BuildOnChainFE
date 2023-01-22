import { isUndefined } from "lodash";

export const componentToHex = (c: string) => {
	const hex = parseInt(c, 16);

	return hex.toString().length === 1 ? "0" + hex : hex;
};

function rgbToHex(r: number, g: number, b: number) {
	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export const getPixelHexCode = (currentX: number, currentY: number, context: CanvasRenderingContext2D): string | undefined => {
	if (!context) return '';

	const { data } = context.getImageData(currentX, currentY, 1, 1);

	if (isUndefined(data)) return;

	const [r, g, b, a] = Array.from(data);

	if (!a) return 'transparent';

	const hex = rgbToHex(r, g, b);

	return hex;
};

export const generateRandomColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
