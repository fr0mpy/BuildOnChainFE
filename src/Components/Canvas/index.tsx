import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { WindowListener } from '../../enums/events';
import { Tools } from '../../enums/tools';
import { handleThrottledEventListener } from '../../helpers/events';
import { roundNearest } from '../../helpers/maths';
import { useCanvasHooks } from '../../hooks/canvas';
import { emptyCurrentStrokeStack, pushToCurrentStrokeStack } from '../../Redux/pointsStackSlice';
import { CanvasContainer, StyledCanvas } from './styledComponents';
import { useCanvasTools } from '../../helpers/canvasTools';
import { useAppSelector } from '../../Redux/store';
import { setPixelScale } from '../../Redux/canvasSlice';
import isUndefined from 'lodash/isUndefined';
import { getScaledToCanvasMouseCoordinates, getScaledDownMouseCoordinates, isNotValidPixel } from '../../helpers/canvas';
import { getPixelHexCode } from '../../helpers/colors';
import { IDrawingPoints } from '../../enums/canvas';
export const Canvas: React.FC = () => {

    const {
        canvasDimension, canvasRef, containerRef, renderStack, drawingPoints, currentStrokeStack, currentTool,
        previousTraitVariant, currentTraitVariant, ctx, usingTool, previousPixelDimension, dispatch,
        pushToRenderStack, clearRenderStack, setCanvasDimension, setCtx, setUsingTool, currentColor
    } = useCanvasHooks();

    const { redrawCanvas, draw, beginLine, drawLine, clearCanvas, pickColor, erase } = useCanvasTools(ctx, canvasRef.current);
    const pixelScale = useAppSelector(state => state.canvasReducer.pixelScale);
    const pixelDimension = useAppSelector(state => state.canvasReducer.pixelDimension);

    useLayoutEffect(() => {
        getCanvasDimension();
        setCanvasContext();
    }, []);

    useEffect(() => {
        handleThrottledEventListener(WindowListener.Add, 'resize', handleResize, 25);
        return () => handleThrottledEventListener(WindowListener.Remove, 'resize', handleResize, 25);

    }, [canvasDimension]);

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

    const handleResize = () => getCanvasDimension();

    const getCanvasDimension = () => {
        if (containerRef.current) {
            const { height, width } = containerRef.current.getBoundingClientRect();
            const dimension = height > width ? width : height;

            const canvasDimension = roundNearest(dimension, pixelDimension);
            setCanvasDimension(canvasDimension);
            dispatch(setPixelScale(canvasDimension / pixelDimension));
        }
    };

    const setCanvasContext = () => {
        if (!canvasRef.current) return;

        const onCanvasCtx = canvasRef.current.getContext('2d');

        setCtx(onCanvasCtx);
    };

    const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (usingTool) resolveToolOnMove(e);
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

    const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setUsingTool(true);
        resolveToolOnMouseDown(e);
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

    const onMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
        setUsingTool(false);

        if (currentStrokeStack.length) {
            pushToRenderStack();
        }

        if (floodPointsArr.current.length) {
            pushToRenderStack(floodPointsArr.current);
            floodPointsArr.current = [];
        }

        dispatch(emptyCurrentStrokeStack());
    };

    const onMouseLeave: React.MouseEventHandler<HTMLCanvasElement> = () => {
        if (usingTool) {
            setUsingTool(false);
            if (currentStrokeStack.length) {
                pushToRenderStack();
                dispatch(emptyCurrentStrokeStack());
            }
        }
    };

    const fill: React.MouseEventHandler<HTMLCanvasElement> = ({ nativeEvent: { offsetX, offsetY } }) => {
        if (ctx) {
            if (canvasRef.current) {
                const { x, y } = getScaledToCanvasMouseCoordinates(offsetX, offsetY, pixelScale);
                const currentPixel = getPixelHexCode(x, y, ctx)

                floodFill(x, y, currentPixel);
            }
        }
    };

    const floodPointsArr = useRef<Array<IDrawingPoints>>([]);

    const floodFill = (x: number, y: number, targetColor: string | undefined) => {
        if (
            isUndefined(targetColor)
            || x < 0 || x > (canvasDimension - pixelScale)
            || y < 0 || y > (canvasDimension - pixelScale)
        ) return;
        else if (ctx) {

            const currentPixelColor = getPixelHexCode(x, y, ctx);
            const { x: scaledDownX, y: scaledDownY } = getScaledDownMouseCoordinates(x, y, pixelScale);
            // console.log(scaledDownX, scaledDownY)
            if (currentPixelColor === targetColor) {
                ctx.fillStyle = currentColor;

                ctx.fillRect(x, y, pixelScale, pixelScale);
                floodPointsArr.current = [...floodPointsArr.current, { color: currentColor, x: scaledDownX, y: scaledDownY }]
                floodFill(x + pixelScale, y, currentPixelColor);
                floodFill(x - pixelScale, y, currentPixelColor);
                floodFill(x, y + pixelScale, currentPixelColor);
                floodFill(x, y - pixelScale, currentPixelColor);
                // console.log(fillArr);
            } else return;
        }
    }

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
