import { shallowEqual, useDispatch } from "react-redux";
import { BaseLayerPosition } from "../enums/base";
import { setBasePosition } from "../Redux/baseSlice";
import { useAppSelector } from "../Redux/store";
import isEqual from "lodash.isequal";

export const useBaseDrawingPoints = () => useAppSelector((state) => state.baseReducer.base.renderStack.reduce((o, c) => [...o, ...c], []), shallowEqual);

export const useBaseSelected = () => useAppSelector((state) => state.baseReducer.baseSelected);

export const useBasePosition = () => {
    const dispatch = useDispatch();

    const getPosition = useAppSelector((state) => state.baseReducer.base.position);
    const setPosition = (p: BaseLayerPosition) => dispatch(setBasePosition(p));

    return [getPosition, setPosition] as const;
};

export const useBaseLayerPoints = () => useAppSelector((state) => (state.baseReducer.base.renderStack ?? []).reduce((o, c) => [...o, ...c], []), isEqual);


