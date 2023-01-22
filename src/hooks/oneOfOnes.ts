import isEqual from "lodash.isequal";
import shallowEqual from "react-redux/es/utils/shallowEqual";
import { useAppSelector } from "../Redux/store";
import { useCurrentTraitVariant } from "./traitVariants";

export const useOneOfOnes = () => useAppSelector(({ traitReducer: { oneOfOnes } }) => oneOfOnes, shallowEqual);

export const useDefaultOneOfOne = () => useAppSelector(({ traitReducer: { oneOfOnes } }) => Object.keys(oneOfOnes)[0], isEqual);

export const useCurrentOneOfOneName = () => {
    const oneOfOnes = useOneOfOnes();
    const currentOneOfOne = useCurrentTraitVariant();

    return oneOfOnes?.[currentOneOfOne]?.name;
};

export const useAllOneOfOneKeys = () => {
    const oneOfOnes = useOneOfOnes();

    return Object.keys(oneOfOnes)
}

export const usePreviousOneOfOne = () => {
    const keys = useAllOneOfOneKeys();
    const current = useCurrentTraitVariant();
    const previousIndex = keys.indexOf(current) - 1;

    return keys[previousIndex];
};

export const useNextOneOfOne = () => {
    const keys = useAllOneOfOneKeys();
    const current = useCurrentTraitVariant();
    const nextIndex = keys.indexOf(current) + 1;

    return keys[nextIndex];
};

export const useAllOneOfOneNames = () => {
    const names = useAppSelector(({ traitReducer: { oneOfOnes } }) => Object.keys(oneOfOnes ?? []).map(k => oneOfOnes[k]?.name ?? ''), shallowEqual);

    return names;
};
