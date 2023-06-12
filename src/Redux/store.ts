import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import traitReducer from './traitsSlice';
import pointsStackReducer from './pointsStackSlice';
import toolsReducer from './toolsSlice';
import uiReducer from './uiSlice';
import canvasReducer from './canvasSlice';
import baseReducer from './baseSlice';
import collectionReducer from './collectionSlice';
import web3Reducer from './web3slice';

export const store = configureStore({
	reducer: {
		traitReducer,
		pointsStackReducer,
		toolsReducer,
		uiReducer,
		canvasReducer,
		baseReducer,
		collectionReducer,
		web3Reducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

