import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import shallowEqual from "react-redux/es/utils/shallowEqual";
import { resolveByType } from "../helpers/traits";
import { clearBaseStacks, pushToBaseRenderStack } from "../Redux/baseSlice";
import { setCanvasDimension, setPixelDimension, setPixelScale } from "../Redux/canvasSlice";
import { useAppSelector } from "../Redux/store";
import { clearOneOfOneStacks, clearVariantStacks, pushToOneOfOneRenderStack, pushToTraitRenderStack } from "../Redux/traitsSlice";
import { useCurrentTool } from "./tools";
import { usePrevious } from "./usePrevious";
import uniqWith from 'lodash/uniqWith'
import { useCurrentColor, useUpdatePaletteColor } from "../hooks/colorPalette";
import isEqual from "lodash/isEqual";
import { useCurrentTraitType, useDrawingPoints, useRenderStack } from "./traits";
import { useCurrentTraitVariant } from "./traitVariants";

export const usePixelScale = () => {
    const dispatch = useDispatch();
    const get = useAppSelector((state) => state.canvasReducer.pixelScale);

    // useEffect(() => {
    //     if (initialScale) set(initialScale);
    // }, []);

    const set = (updatedScale: number) => dispatch(setPixelScale(updatedScale));

    return [get, set] as const
};

export const useCanvasDimension = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (initialBaseDimension) set(initialBaseDimension);
    // }), [];

    const get = useAppSelector((state) => state.canvasReducer.canvasDimension);
    const set = (updatedBaseDimension: number) => dispatch(setCanvasDimension(updatedBaseDimension))

    return [get, set] as const;
};

export const usePixelDimension = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (initialPixelDimension) setPixelDimension(initialPixelDimension);
    // }, []);

    const get = useAppSelector((state) => state.canvasReducer.pixelDimension);
    const set = (updatedPixelDimension: number) => dispatch(setPixelDimension(updatedPixelDimension))

    return [get, set] as const;
};

export const useCanvasHooks = () => {

    const [canvasDimension, setCanvasDimension] = useCanvasDimension();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [pixelScale, setPixelScale] = usePixelScale();
    const renderStack = useRenderStack();
    const drawingPoints = useDrawingPoints();
    const currentStrokeStack = useAppSelector(state => state.pointsStackReducer.currentStrokeStack);
    const currentTraitType = useCurrentTraitType();
    const currentTraitVariant = useCurrentTraitVariant();
    const previousTraitVariant = usePrevious(currentTraitVariant);
    const currentTool = useCurrentTool();
    const currentColor = useCurrentColor();
    const handlePaletteUpdate = useUpdatePaletteColor();
    const [usingTool, setUsingTool] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [pixelDimension, setPixelDimension] = usePixelDimension();
    const previousPixelDimension = usePrevious(pixelDimension);

    const pushToRenderStack = () => {
        const dupeFreeStrokeStack = uniqWith(currentStrokeStack, isEqual);
        resolveByType(
            currentTraitType,
            () => dispatch(pushToBaseRenderStack(dupeFreeStrokeStack)),
            () => dispatch(pushToTraitRenderStack(dupeFreeStrokeStack)),
            () => dispatch(pushToOneOfOneRenderStack(dupeFreeStrokeStack))
        )
    };

    const clearRenderStack = () => {
        resolveByType(
            currentTraitType,
            () => dispatch(clearBaseStacks()),
            () => dispatch(clearVariantStacks()),
            () => dispatch(clearOneOfOneStacks())
        )
    };

    return {
        canvasDimension,
        canvasRef,
        containerRef,
        pixelScale,
        renderStack,
        drawingPoints,
        currentStrokeStack,
        currentTraitType,
        previousTraitVariant,
        currentColor,
        currentTraitVariant,
        currentTool,
        usingTool,
        ctx,
        pixelDimension,
        previousPixelDimension,
        dispatch,
        setPixelScale,
        handlePaletteUpdate,
        setUsingTool,
        setCtx,
        setPixelDimension,
        setCanvasDimension,
        pushToRenderStack,
        clearRenderStack
    };
}

export const useLastCoordinates = () => {
    const currentStrokeStack = useAppSelector((state) => state.pointsStackReducer.currentStrokeStack, shallowEqual);

    return currentStrokeStack[currentStrokeStack.length - 1] ?? { x: 0, y: 0, color: '' };
}

