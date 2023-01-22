import { ICoordinates } from "../types/canvas";
import { isUndefined } from "lodash";
export const getScaledToCanvasMouseCoordinates = (x: number, y: number, scale: number): ICoordinates => ({
    x: Math.floor((x) / scale) * scale,
    y: Math.floor((y) / scale) * scale
});

export const getScaledDownMouseCoordinates = (x: number, y: number, scale: number): ICoordinates => ({
    x: x / scale,
    y: y / scale
});

export const getScaledUpMouseCoordinates = (x: number, y: number, scale: number): ICoordinates => ({
    x: x * scale,
    y: y * scale
});

export const isValidPixel = (pixelCoordinate: number, canvasDimension: number): boolean => pixelCoordinate < canvasDimension && pixelCoordinate >= 0;

export const isDifferentPixel = (
    previousX: number,
    previousY: number,
    currentX: number,
    currentY: number
): boolean => previousX !== currentX || previousY !== currentY;

export const isAdjacentPixel = (
    previousX: number,
    previousY: number,
    currentX: number,
    currentY: number
) => {
    const left = currentX === previousX - 1;
    const right = currentX === previousX + 1
    const above = currentY === previousY - 1;
    const below = currentY === previousY + 1;

    return left || right || above || below || left && above || right && above || left && below || right && below
}

export const noPreviousPixel = (previousX: number, previousY: number) => isUndefined(previousX) || isUndefined(previousY);

export const getInBetweenCoordinates = (x11: number, y11: number, x22: number, y22: number): Array<ICoordinates> => {
    const coordinatesArray = [];

    let x1 = x11;
    let y1 = y11;
    const x2 = x22;
    const y2 = y22;

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    coordinatesArray.push({ x: x1, y: y1 });
    while (!((x1 == x2) && (y1 == y2))) {
        const e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
        coordinatesArray.push({ x: x1, y: y1 });
    }
    return coordinatesArray;
}

export const getInBetweenCoordinates2 = (x0: number, y0: number, x1: number, y1: number): Array<ICoordinates> => {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    const result = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
        result.push({ x: x0, y: y0 })
        if ((x0 === x1) && (y0 === y1)) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }

    return result;

}