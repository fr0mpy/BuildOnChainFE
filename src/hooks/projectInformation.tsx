import { shallowEqual, useDispatch } from "react-redux"
import { setCollectionDescription, setCollectionName, setCollectionSize } from "../Redux/collectionSlice";
import { useAppSelector } from "../Redux/store";

export const useCollectionName = () => {
    const dispatch = useDispatch();
    const name = useAppSelector(state => state.collectionReducer.collectionName, shallowEqual);
    const setName = (n: string) => dispatch(setCollectionName(n));

    return [name, setName] as const;
}

export const useCollectionDescription = () => {
    const dispatch = useDispatch();
    const description = useAppSelector(state => state.collectionReducer.collectionDescription, shallowEqual);
    const setDescription = (d: string) => dispatch(setCollectionDescription(d));

    return [description, setDescription] as const;
}

export const useCollectionSize = () => {
    const dispatch = useDispatch();
    const size = useAppSelector(state => state.collectionReducer.collectionSize, shallowEqual);
    const setSize = (s: number) => dispatch(setCollectionSize(s));

    return [size, setSize] as const;
}