import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { testCollectionData } from '../testData/testCollectionData';

export interface ISnackBar {
    message: string;
    duration?: number;
    action?: React.ReactNode;
}

export interface IState {
    collectionName: string;
    collectionDescription: string;
    collectionSize: number;
}

// export const initialState: IState = {
//     collectionName: '',
//     collectionDescription: '',
//     collectionSize: 1000,
// }

export const initialState: IState = testCollectionData

export const collectionSlice = createSlice({
    name: 'collection slice',
    initialState,
    reducers: {
        setCollectionName: (state, action: PayloadAction<string>) => {
            state.collectionName = action.payload;
        },
        setCollectionDescription: (state, action: PayloadAction<string>) => {
            state.collectionDescription = action.payload;
        },
        setCollectionSize: (state, action: PayloadAction<number>) => {
            state.collectionSize = action.payload;
        },
    },
})

export const {
    setCollectionName,
    setCollectionDescription,
    setCollectionSize
} = collectionSlice.actions;

export default collectionSlice.reducer;