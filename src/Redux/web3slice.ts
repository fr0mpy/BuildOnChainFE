import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDrawingPoints } from '../enums/canvas';
export enum ContractAddress {
    Goerli = '0xA179e8a35d0d9f8431e14599502bB9B8f2415b72',
    Ethereum = '',
    Arbitrum = '0x81a0480CF348865F85e2c0D92f63510b27a30190'
}

export interface IAppState {
    walletAddress: string;
    contractAddress: ContractAddress;
}

export const defaultColorPalette = ['#000000', ...Array(15).fill('white')];

export const initialState: IAppState = {
    walletAddress: '',
    contractAddress: ContractAddress.Goerli
}

export const web3Slice = createSlice({
    name: 'web3Slice',
    initialState,
    reducers: {
        setTraitVariant: (state, { payload }: PayloadAction<{  coordinates: Array<Array<IDrawingPoints>> }>) => {
            //
        },
    }
});


export const {
    setTraitVariant
} = web3Slice.actions;

export default web3Slice.reducer;