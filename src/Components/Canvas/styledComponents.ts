import styled from "@mui/material/styles/styled";

export const CanvasContainer = styled('div')(() => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
}));

export const StyledCanvas = styled('canvas')(() => ({
    background: '#dad8d8',
    backgroundImage:
        `linear-gradient(45deg, #9a9696 25%, transparent 25%, transparent 75%, #9a9696 75%, #9a9696),
     linear-gradient(45deg, #9a9696 25%, transparent 25%, transparent 75%, #9a9696 75%, #9a9696)`,
    cursor: 'crosshair',
    position: 'absolute',
}))