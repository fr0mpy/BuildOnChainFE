import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Tools } from '../enums/tools';

export interface IState {
    currentTool: Tools;
    currentColor: string;
    colorPalette: Array<string>;
    currentColorIndex: number;
}

export const defaultColorPalette = ['black', ...Array(15).fill('white')];

export const initialState: IState = {
    currentTool: Tools.Draw,
    currentColor: '#000000',
    currentColorIndex: 0,
    colorPalette: defaultColorPalette
}

export const toolsSlice = createSlice({
    name: 'tools slice',
    initialState,
    reducers: {
        setCurrentTool: (state, { payload }: PayloadAction<Tools>) => {
            state.currentTool = payload
        },
        setCurrentColor: (state, { payload }: PayloadAction<string>) => {
            state.currentColor = payload
        },
        setCurrentColorIndex: (state, { payload }: PayloadAction<number>) => {
            state.currentColorIndex = payload
        },
        setColorPalette: (state, { payload }: PayloadAction<Array<string>>) => {
            state.colorPalette = payload
        },
    },
})

export const {
    setCurrentTool,
    setCurrentColor,
    setCurrentColorIndex,
    setColorPalette
} = toolsSlice.actions;

export default toolsSlice.reducer;