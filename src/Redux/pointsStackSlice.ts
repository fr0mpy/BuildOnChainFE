import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { IDrawingPoints } from '../enums/canvas';

export interface IState {
    currentStrokeStack: Array<IDrawingPoints>;
}

export const initialState: IState = {
    currentStrokeStack: []
}

export const pointsStackSlice = createSlice({
    name: 'points stack',
    initialState,
    reducers: {
        pushToCurrentStrokeStack: (state, { payload }: PayloadAction<IDrawingPoints>) => {
            const { currentStrokeStack } = current(state);
            state.currentStrokeStack = [...currentStrokeStack, payload]
        },
        emptyCurrentStrokeStack: (state) => {
            state.currentStrokeStack = []
        }
    },
})

export const {
    pushToCurrentStrokeStack,
    emptyCurrentStrokeStack
} = pointsStackSlice.actions;

export default pointsStackSlice.reducer;