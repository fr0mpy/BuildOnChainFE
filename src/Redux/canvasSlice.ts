import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IState {
    canvasDimension: number;
    pixelDimension: number;
    pixelScale: number;
}

export const initialState: IState = {
    canvasDimension: 0,
    pixelDimension: 16,
    pixelScale: 0,
}

export const canvasSlice = createSlice({
    name: 'canvas slice',
    initialState,
    reducers: {
        setCanvasDimension: (state, { payload }: PayloadAction<number>) => {
            state.canvasDimension = payload;
        },
        setPixelScale: (state, { payload }: PayloadAction<number>) => {
            state.pixelScale = payload;
        },
        setPixelDimension: (state, { payload }: PayloadAction<number>) => {
            state.pixelDimension = payload;
        },
    },
})

export const {
    setCanvasDimension,
    setPixelScale,
    setPixelDimension,
} = canvasSlice.actions;

export default canvasSlice.reducer;