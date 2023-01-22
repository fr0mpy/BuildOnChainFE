import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalType } from '../Components/Resolvers/ModalResolver';

export interface ISnackBar {
    message: string;
    duration?: number;
    action?: React.ReactNode;
}

export interface IState {
    modal?: ModalType;
    snackbar?: ISnackBar;
}

export const initialState: IState = {
    modal: undefined,
    snackbar: { message: '' }
}

export const uiSlice = createSlice({
    name: 'ui slice',
    initialState,
    reducers: {
        setModalType: (state, action: PayloadAction<ModalType | undefined>) => {
            state.modal = action.payload;
        },
        setSnackbar: (state, action: PayloadAction<ISnackBar>) => {
            state.snackbar = action.payload;
        },
    },
})

export const {
    setModalType,
    setSnackbar
} = uiSlice.actions;

export default uiSlice.reducer;