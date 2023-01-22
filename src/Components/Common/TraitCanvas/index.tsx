
import React, { memo, useEffect, useRef, useState } from 'react'
import { IDrawingPoints } from '../../../enums/canvas';
import { roundDownToNearest, roundNearest, roundUpToNearest } from '../../../helpers/maths';
import { usePixelDimension } from '../../../hooks/canvas';
import { StyledContainer, TraitName } from './styledComponents';

interface IProps {
    name?: string;
    points: Array<IDrawingPoints>;
}

export interface ICoordinates {
    x: number;
    y: number
}

export const TraitCanvas: React.FC<IProps> = memo(({ name = '', points }) => {
    const [onCtx, setOnCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [pixelScale, _setPixelScale] = useState<number>(0);
    const [pixelDimension] = usePixelDimension();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [traitCanvasHeight, setTraitCanvasHeight] = React.useState<number>(100);

    useEffect(() => {
        setCanvasContext();
    }, []);

    useEffect(() => {
        _setPixelScale(traitCanvasHeight / pixelDimension);
    }, [pixelDimension, traitCanvasHeight]);

    useEffect(() => {
        redrawCanvas();
    }, [points, onCtx]);

    useEffect(() => {
        setTraitCanvasHeight(getHeight());
    })

    const getHeight = () => {
        const height = roundDownToNearest(100, pixelDimension)

        return height;
    }

    const redrawCanvas = () => {
        if (onCtx) {
            onCtx.imageSmoothingEnabled = false;
            onCtx.clearRect(0, 0, traitCanvasHeight, traitCanvasHeight);
            points?.forEach(p => {
                if (p.color === 'transparent') {
                    onCtx.clearRect(
                        pixelScale * p.x,
                        pixelScale * p.y,
                        pixelScale,
                        pixelScale
                    );
                } else {
                    onCtx.fillStyle = p.color;
                    onCtx.fillRect(
                        pixelScale * p.x,
                        pixelScale * p.y,
                        pixelScale,
                        pixelScale
                    );
                }
            })
        }
    };

    const setCanvasContext = () => {
        if (!canvasRef.current) return;
        const onCanvasCtx = canvasRef.current.getContext('2d');

        setOnCtx(onCanvasCtx);
    };

    return (
        <StyledContainer style={{ height: traitCanvasHeight, width: traitCanvasHeight }} ref={containerRef}>
            <canvas
                ref={canvasRef}
                style={{
                    height: `${traitCanvasHeight}px`,
                    width: `${traitCanvasHeight}px`,
                    backgroundImage:
                        `linear-gradient(45deg, #9a9696 25%, transparent 25%, transparent 75%, #9a9696 75%, #9a9696),
                  linear-gradient(45deg, #9a9696 25%, transparent 25%, transparent 75%, #9a9696 75%, #9a9696)`,
                    backgroundSize: `${pixelScale * 2}px ${pixelScale * 2}px`,
                    backgroundPosition: `0 0, ${pixelScale}px ${pixelScale}px`,
                }}
                height={traitCanvasHeight}
                width={traitCanvasHeight}
            />
            <TraitName variant={'body1'} sx={{ width: traitCanvasHeight }}>
                {name}
            </TraitName>
        </StyledContainer>
    );
});


