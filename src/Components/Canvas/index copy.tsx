import { isEqual, isUndefined } from 'lodash';
import React, { useEffect } from 'react'
import { WindowListener } from '../../enums/events';
import { Tools } from '../../enums/tools';
import { getInBetweenCoordinates2, getScaledDownMouseCoordinates, getScaledToCanvasMouseCoordinates, getScaledUpMouseCoordinates, isDifferentPixel, isValidPixel } from '../../helpers/canvas';
import { getPixelHexCode } from '../../helpers/colors';
import { handleThrottledEventListener } from '../../helpers/events';
import { roundNearest } from '../../helpers/maths';
import { resolveByType } from '../../helpers/traits';
import { useCanvasHooks } from '../../hooks/canvas';
import { usePrevious } from '../../hooks/usePrevious';
import { clearBaseStacks, pushToBaseRenderStack } from '../../Redux/baseSlice';
import { emptyCurrentStrokeStack, pushToCurrentStrokeStack } from '../../Redux/pointsStackSlice';
import { clearOneOfOneStacks, clearVariantStacks, pushToOneOfOneRenderStack, pushToTraitRenderStack } from '../../Redux/traitsSlice';
import { CanvasContainer, StyledCanvas } from './styledComponents';
import uniqWith from 'lodash/uniqWith'
import { ICoordinates } from '../Common/TraitCanvas';
import { useCanvasTools } from '../../helpers/canvasTools';
export const Canvas: React.FC = () => {

    const {
        canvasDimension, setCanvasDimension, canvasRef, containerRef, dispatch, pixelScale, setPixelScale, renderStack,
        drawingPoints, currentStrokeStack, currentTraitType, currentColor, currentTool, handlePaletteUpdate,
        previousTraitVariant, currentTraitVariant, setCtx, setUsingTool, ctx, usingTool, pixelDimension, setPixelDimension
    } = useCanvasHooks();

    const previousPixelDimension = usePrevious(pixelDimension);
    const handleResize = () => getCanvasDimension();

    // const [lineStart, setLineStart] = React.useState<ICoordinates>({ x: 0, y: 0 });
    const { redrawCanvas, draw, fillRect, beginLine, drawLine, clearCanvas, fill, floodFill, pickColor, erase } = useCanvasTools(ctx, canvasRef.current);

    useEffect(() => {
        setCanvasContext();
        getCanvasDimension();
        handleThrottledEventListener(WindowListener.Add, 'resize', handleResize, 25);
        return () => handleThrottledEventListener(WindowListener.Remove, 'resize', handleResize, 25);
    }, []);

    useEffect(() => {
        if (renderStack.length && currentTraitVariant === previousTraitVariant) {
            redrawCanvas()
        } else clearCanvas();
    }, [renderStack]);

    useEffect(() => {
        redrawCanvas();
    }, [drawingPoints, canvasDimension]);

    useEffect(() => {
        if (previousPixelDimension !== pixelDimension) {
            clearCanvas();
            clearRenderStack();
            getCanvasDimension();
        }
    }, [pixelDimension]);

    // const redrawCanvas = () => {
    //     // TODO: this fires on every mouse up
    //     if (onCtx) {
    //         onCtx.clearRect(0, 0, canvasDimension * pixelScale, canvasDimension * pixelScale);
    //         drawingPoints?.forEach(c => {
    //             if (c.color === 'transparent') {
    //                 const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(c.x, c.y, pixelScale);
    //                 onCtx.clearRect(scaledUpX, scaledUpY, pixelScale, pixelScale);
    //             } else {
    //                 const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(c.x, c.y, pixelScale);
    //                 onCtx.fillStyle = c.color;
    //                 onCtx.fillRect(scaledUpX, scaledUpY, pixelScale, pixelScale);
    //             }
    //         })
    //     }
    // };

    const getCanvasDimension = () => {
        if (containerRef.current) {
            const { height, width } = containerRef.current.getBoundingClientRect();
            const dimension = height > width ? width : height;

            const canvasDimension = roundNearest(dimension, pixelDimension);

            setCanvasDimension(canvasDimension);
            setPixelScale(canvasDimension / pixelDimension);
        }
    };

    const setCanvasContext = () => {
        if (!canvasRef.current) return;

        const onCanvasCtx = canvasRef.current.getContext('2d');

        setCtx(onCanvasCtx);
    };

    const resolveToolOnMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        switch (currentTool) {
            case Tools.Draw:
                return draw(e);
            case Tools.Erase:
                return erase(e);
            case Tools.Line:
                return drawLine(e);
            default:
                return;
        }
    };

    const resolveToolOnMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        switch (currentTool) {
            case Tools.Draw:
                return draw(e);
            case Tools.Erase:
                return erase(e);
            case Tools.Fill:
                return fill(e);
            case Tools.ColorPicker:
                return pickColor(e);
            case Tools.Line:
                return beginLine(e);
            default:
                return;
        }
    };

    const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (usingTool) resolveToolOnMove(e);
    };

    const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setUsingTool(true);
        resolveToolOnMouseDown(e);
    };

    const onMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
        setUsingTool(false);

        if (currentStrokeStack.length) {
            pushToRenderStack();
        }

        dispatch(emptyCurrentStrokeStack());
    };

    const pushToRenderStack = () => {
        const dupeFreeStrokeStack = uniqWith(currentStrokeStack, isEqual);
        resolveByType(
            currentTraitType,
            () => dispatch(pushToBaseRenderStack(dupeFreeStrokeStack)),
            () => dispatch(pushToTraitRenderStack(dupeFreeStrokeStack)),
            () => dispatch(pushToOneOfOneRenderStack(dupeFreeStrokeStack))
        )
    }

    const onMouseLeave: React.MouseEventHandler<HTMLCanvasElement> = () => {
        if (usingTool) {
            setUsingTool(false);
            if (currentStrokeStack.length) {
                pushToRenderStack();
                dispatch(emptyCurrentStrokeStack());
            }
        }
    };

    const { x: previousX = 0, y: previousY = 0 } = currentStrokeStack.at(-1) ?? {}

    // const draw: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     if (ctx) {
    //         if (canvasRef.current) {
    //             const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);

    //             const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
    //             fillRect(x, y, scaledDownX, scaledDownY)
    //             if (isDifferentPixel(previousX, previousY, scaledDownX, scaledDownY)) {
    //                 if (isEmpty(currentStrokeStack)) {
    //                     fillRect(x, y, scaledDownX, scaledDownY)
    //                 } else {
    //                     const inBetweenCoordinates = uniqWith(getInBetweenCoordinates2(scaledDownX, scaledDownY, previousX, previousY).reverse(), isEqual);

    //                     inBetweenCoordinates.map(({ x, y }) => {
    //                         const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(x, y, pixelScale)
    //                         fillRect(scaledUpX, scaledUpY, x, y); ctx.fillStyle = currentColor;
    //                     })
    //                 }
    //             }
    //         }
    //     }
    // }

    // const beginLine: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
    //     const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);

    //     setLineStart({ x, y });
    //     fillRect(x, y, scaledDownX, scaledDownY);
    // };

    // const drawLine: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     redrawCanvas();
    //     dispatch(emptyCurrentStrokeStack())
    //     if (ctx) {
    //         const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
    //         const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
    //         const { x: scaledDownStartX, y: scaledDownStartY } = getScaledDownMouseCoordinates(lineStart.x, lineStart.y, pixelScale);
    //         const inBetweenCoordinates = uniqWith(getInBetweenCoordinates2(scaledDownStartX, scaledDownStartY, scaledDownX, scaledDownY).reverse(), isEqual);
    //         ctx.fillRect(lineStart?.x, lineStart.y, pixelScale, pixelScale);

    //         inBetweenCoordinates.map(({ x, y }) => {
    //             const { x: scaledUpX, y: scaledUpY } = getScaledUpMouseCoordinates(x, y, pixelScale)
    //             ctx.fillStyle = currentColor;
    //             fillRect(scaledUpX, scaledUpY, x, y);
    //         })
    //     }
    // };

    // const fillRect = (x: number, y: number, scaledDownX: number, scaledDownY: number) => {
    //     if (!ctx) return;

    //     ctx.fillStyle = currentColor;
    //     ctx.fillRect(x, y, pixelScale, pixelScale);
    //     dispatch(pushToCurrentStrokeStack({ color: currentColor, x: scaledDownX, y: scaledDownY }));
    // }

    // const erase: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     if (ctx) {
    //         if (canvasRef.current) {
    //             const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
    //             const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
    //             const { x: previousX, y: previousY } = currentStrokeStack.at(-1) ?? {}

    //             if (previousX !== scaledDownX || previousY !== scaledDownY) {
    //                 ctx.clearRect(x, y, pixelScale, pixelScale);
    //                 dispatch(pushToCurrentStrokeStack({ color: 'transparent', x: scaledDownX, y: scaledDownY }));
    //             }
    //         }
    //     }
    // };

    // const fill: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     if (ctx) {
    //         if (canvasRef.current) {
    //             const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
    //             const currentPixel = getPixelHexCode(x, y, ctx)

    //             floodFill(x, y, currentPixel);
    //         }
    //     }
    // };

    // const floodFill = (x: number, y: number, targetColor: string | undefined) => {
    //     if (isUndefined(targetColor)) return;

    //     if (ctx) {
    //         const currentPixel = getPixelHexCode(x, y, ctx);

    //         if (currentPixel === targetColor && isValidPixel(x, canvasDimension) && isValidPixel(y, canvasDimension)) {
    //             ctx.fillStyle = currentColor;
    //             ctx.fillRect(x, y, pixelScale, pixelScale);
    //             const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);

    //             dispatch(pushToCurrentStrokeStack({ color: currentColor, x: scaledDownX, y: scaledDownY }));

    //             floodFill(x + pixelScale, y, currentPixel);
    //             floodFill(x - pixelScale, y, currentPixel);
    //             floodFill(x, y + pixelScale, currentPixel);
    //             floodFill(x, y - pixelScale, currentPixel);
    //         } else return;
    //     }
    // }

    // const pickColor: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
    //     if (ctx) {
    //         const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);

    //         const pixelColor = getPixelHexCode(x, y, ctx);

    //         if (pixelColor && pixelColor !== 'transparent') {
    //             handlePaletteUpdate(pixelColor);
    //         }
    //     }
    // };

    // const clearCanvas = () => ctx?.clearRect(0, 0, canvasDimension * pixelScale, canvasDimension * pixelScale);

    const clearRenderStack = () => {
        resolveByType(
            currentTraitType,
            () => dispatch(clearBaseStacks()),
            () => dispatch(clearVariantStacks()),
            () => dispatch(clearOneOfOneStacks())
        )
    };

    return (
        <CanvasContainer ref={containerRef}>
            <StyledCanvas
                ref={canvasRef}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                style={{
                    height: canvasDimension,
                    width: canvasDimension,
                    backgroundSize: `${pixelScale * 2}px ${pixelScale * 2}px`,
                    backgroundPosition: `0 0, ${pixelScale}px ${pixelScale}px`,
                }}
                height={canvasDimension}
                width={canvasDimension}
            />
        </CanvasContainer>
    );
};
