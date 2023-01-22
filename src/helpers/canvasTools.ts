import { useCanvasDimension, usePixelScale } from "../hooks/canvas";
import { getInBetweenCoordinates2, getScaledDownMouseCoordinates, getScaledToCanvasMouseCoordinates, getScaledUpMouseCoordinates, isDifferentPixel, isValidPixel } from "./canvas";
import isEmpty from 'lodash/isEmpty';
import uniqWith from 'lodash/uniqWith'
import { useCurrentColor, useUpdatePaletteColor } from "../hooks/colorPalette";
import isEqual from "lodash/isEqual";
import isUndefined from "lodash/isUndefined";
import { useDispatch } from "react-redux";
import { ICoordinates } from "../types/canvas";
import React from "react";
import { emptyCurrentStrokeStack } from "../Redux/pointsStackSlice";
import { getPixelHexCode } from "./colors";
import { useCurrentStrokeStack, useDrawingPoints } from "../hooks/traits";

export const useCanvasTools = (ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null) => {
    const dispatch = useDispatch();
    const [pixelScale] = usePixelScale();
    const [canvasDimension] = useCanvasDimension();
    const drawingPoints = useDrawingPoints();
    const [currentStrokeStack, pushToCurrentStrokeStack] = useCurrentStrokeStack();
    const currentColor = useCurrentColor();
    const [lineStart, setLineStart] = React.useState<ICoordinates>({ x: 0, y: 0 });
    const handlePaletteUpdate = useUpdatePaletteColor();
    const { x: previousX = 0, y: previousY = 0 } = currentStrokeStack.at(-1) ?? {}


    const redrawCanvas = () => {
        if (ctx) {
            ctx.clearRect(0, 0, canvasDimension * pixelScale, canvasDimension * pixelScale);
            drawingPoints?.forEach(c => {
                if (c.color === 'transparent') {
                    const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(c.x, c.y, pixelScale);
                    ctx.clearRect(scaledUpX, scaledUpY, pixelScale, pixelScale);
                } else {
                    const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(c.x, c.y, pixelScale);
                    ctx.fillStyle = c.color;
                    ctx.fillRect(scaledUpX, scaledUpY, pixelScale, pixelScale);
                }
            })
        }
    };

    const draw: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        if (ctx) {
            if (canvas) {
                const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);

                const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
                fillRect(x, y, scaledDownX, scaledDownY)
                if (isDifferentPixel(previousX, previousY, scaledDownX, scaledDownY)) {
                    if (isEmpty(currentStrokeStack)) {
                        fillRect(x, y, scaledDownX, scaledDownY)
                    } else {
                        const inBetweenCoordinates = uniqWith(getInBetweenCoordinates2(scaledDownX, scaledDownY, previousX, previousY).reverse(), isEqual);

                        inBetweenCoordinates.map(({ x, y }) => {
                            const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(x, y, pixelScale)
                            fillRect(scaledUpX, scaledUpY, x, y); ctx.fillStyle = currentColor;
                        })
                    }
                }
            }
        }
    }

    const fillRect = (x: number, y: number, scaledDownX: number, scaledDownY: number) => {
        if (!ctx) return;

        ctx.fillStyle = currentColor;
        ctx.fillRect(x, y, pixelScale, pixelScale);
        pushToCurrentStrokeStack({ color: currentColor, x: scaledDownX, y: scaledDownY });
    };

    const beginLine: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
        const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);

        setLineStart({ x, y });
        fillRect(x, y, scaledDownX, scaledDownY);
    };

    const drawLine: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        redrawCanvas();
        dispatch(emptyCurrentStrokeStack())
        if (ctx) {
            const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
            const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
            const { x: scaledDownStartX, y: scaledDownStartY } = getScaledDownMouseCoordinates(lineStart.x, lineStart.y, pixelScale);
            const inBetweenCoordinates = uniqWith(getInBetweenCoordinates2(scaledDownStartX, scaledDownStartY, scaledDownX, scaledDownY).reverse(), isEqual);
            ctx.fillRect(lineStart?.x, lineStart.y, pixelScale, pixelScale);

            inBetweenCoordinates.map(({ x, y }) => {
                const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(x, y, pixelScale)
                ctx.fillStyle = currentColor;
                fillRect(scaledUpX, scaledUpY, x, y);
            })
        }
    };

    const fill: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        if (ctx) {
            if (canvas) {
                const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
                const currentPixel = getPixelHexCode(x, y, ctx)

                floodFill(x, y, currentPixel);
            }
        }
    };

    const floodFill = (x: number, y: number, targetColor: string | undefined) => {
        if (isUndefined(targetColor)) return;

        if (ctx) {
            const currentPixel = getPixelHexCode(x, y, ctx);

            if (currentPixel === targetColor && isValidPixel(x, canvasDimension) && isValidPixel(y, canvasDimension)) {
                ctx.fillStyle = currentColor;
                ctx.fillRect(x, y, pixelScale, pixelScale);
                const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);

                dispatch(pushToCurrentStrokeStack({ color: currentColor, x: scaledDownX, y: scaledDownY }));

                floodFill(x + pixelScale, y, currentPixel);
                floodFill(x - pixelScale, y, currentPixel);
                floodFill(x, y + pixelScale, currentPixel);
                floodFill(x, y - pixelScale, currentPixel);
            } else return;
        }
    }

    const pickColor: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        if (ctx) {
            const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);

            const pixelColor = getPixelHexCode(x, y, ctx);

            if (pixelColor && pixelColor !== 'transparent') {
                handlePaletteUpdate(pixelColor);
            }
        }
    };

    const erase: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        if (ctx) {
            if (canvas) {
                const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
                const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
                const { x: previousX, y: previousY } = currentStrokeStack.at(-1) ?? {}

                if (previousX !== scaledDownX || previousY !== scaledDownY) {
                    ctx.clearRect(x, y, pixelScale, pixelScale);
                    dispatch(pushToCurrentStrokeStack({ color: 'transparent', x: scaledDownX, y: scaledDownY }));
                }
            }
        }
    };

    const clearCanvas = () => ctx?.clearRect(0, 0, canvasDimension * pixelScale, canvasDimension * pixelScale);

    return { redrawCanvas, draw, fillRect, beginLine, drawLine, fill, floodFill, pickColor, clearCanvas, erase };
}