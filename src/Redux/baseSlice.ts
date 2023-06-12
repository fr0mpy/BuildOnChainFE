import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { BaseLayerPosition } from '../enums/base';
import { IDrawingPoints } from '../enums/canvas';
import { TraitTypes } from '../enums/traits';
import { testBaseData } from '../testData/testBaseData';
import { IBaseLayer } from '../types/traits';

export interface IState {
    base: IBaseLayer;
    baseSelected: boolean;
}

// export const initialState: IState = {
//     baseSelected: true,
//     base: {
//         name: 'Base',
//         type: TraitTypes.Base,
//         imgData: '',
//         renderStack: [],
//         undoStack: [],
//         position: BaseLayerPosition.Hidden
//     },
// }

export const initialState: IState = testBaseData;

export const baseSlice = createSlice({
    name: 'base slice',
    initialState,
    reducers: {
        pushToBaseRenderStack: (state, { payload }: PayloadAction<Array<IDrawingPoints>>) => {
            const { base } = current(state);

            state.base = {
                ...base,
                renderStack: [...base.renderStack, payload]
            };
        },
        undoBase: (state) => {
            const { base } = current(state);

            const { renderStack = [] } = base ?? {}

            if (renderStack.length) {
                const renderStackCopy = [...renderStack];
                const undoPoint = renderStackCopy.pop();

                if (undoPoint) {
                    state.base = {
                        ...base,
                        renderStack: renderStackCopy,
                        undoStack: [...base?.undoStack ?? [], undoPoint],
                    }
                }
            }
        },
        redoBase: (state) => {
            const { base } = current(state);

            const { undoStack = [] } = base ?? {}

            if (undoStack.length) {

                const undoStackCopy = [...undoStack]
                const redoPoint = undoStackCopy.pop();

                if (redoPoint) {
                    state.base = {
                        ...base,
                        renderStack: [...base?.renderStack ?? [], redoPoint],
                        undoStack: undoStackCopy,
                    }
                }
            }
        },
        setBaseSelected: (state, { payload }: PayloadAction<boolean>) => {
            state.baseSelected = payload;
        },
        setBasePosition: (state, { payload: position }: PayloadAction<BaseLayerPosition>) => {
            const { base } = current(state);

            state.base = {
                ...base,
                position
            }
        },
        clearBaseStacks: (state) => {
            const { base } = current(state);

            state.base = {
                ...base,
                renderStack: [],
                undoStack: []
            }
        },
    },
})

export const {
    setBasePosition,
    setBaseSelected,
    clearBaseStacks,
    redoBase,
    undoBase,
    pushToBaseRenderStack
} = baseSlice.actions;

export default baseSlice.reducer;