import isEqual from "lodash.isequal";
import { useDispatch } from "react-redux";
import shallowEqual from "react-redux/es/utils/shallowEqual";
import { BaseLayerPosition } from "../enums/base";
import { TraitTypes } from "../enums/traits";
import { updateTraitRarity } from "../Redux/traitsSlice";
import { useAppSelector } from "../Redux/store";
import { pushToCurrentStrokeStack } from "../Redux/pointsStackSlice";
import { IDrawingPoints } from "../enums/canvas";
import { useDefaultTraitVariant } from "./traitVariants";
import { useDefaultOneOfOne } from "./oneOfOnes";
import { useBaseLayerPoints, useBasePosition, useBaseSelected } from "./base";

export const useTraits = () => useAppSelector(({ traitReducer: { traits } }) => traits, shallowEqual);

export function useCurrentTrait() {
    return useAppSelector(({ traitReducer: { currentTrait } }) => currentTrait, shallowEqual);
}

export const useCurrentTraitType = () => {
    const currentTrait = useCurrentTrait();
    const baseSelected = useBaseSelected();

    if (baseSelected) return TraitTypes.Base;
    if (currentTrait === 'All') return TraitTypes.OneOfOne;

    return TraitTypes.Variant;
};

export const useDefaultTrait = () => {
    const defaultTrait = useAppSelector(({ traitReducer: { traits } }) => {
        const [first] = Object.keys(traits);

        return first;
    }, isEqual);

    return defaultTrait;
};

export const useDefaultTraits = () => {
    const defaultTrait = useDefaultTrait();
    const defaultTraitVariant = useDefaultTraitVariant(defaultTrait);
    const defaultOneOfOne = useDefaultOneOfOne();

    return [defaultTrait, defaultTraitVariant, defaultOneOfOne]
}

export const useRenderStack = () => {
    return useAppSelector(({ traitReducer: { traits, oneOfOnes, currentTrait, currentTraitVariant }, baseReducer: { base } }) => {
        return traits?.[currentTrait]?.variants?.[currentTraitVariant]?.renderStack
            ?? oneOfOnes?.[currentTraitVariant]?.renderStack
            ?? base.renderStack
            ?? []
    }, isEqual);
};

export const useTraitPoints = () => {
    return useAppSelector(({ traitReducer: { traits, oneOfOnes, currentTrait, currentTraitVariant } }) => {
        return (traits?.[currentTrait]?.variants?.[currentTraitVariant]?.renderStack
            ?? oneOfOnes?.[currentTraitVariant]?.renderStack
            ?? []
        ).reduce((o, c) => [...o, ...c], []);

    }, isEqual);

};

export const useDrawingPoints = () => {
    const traitPoints = useTraitPoints();
    const basePoints = useBaseLayerPoints();
    const [basePosition] = useBasePosition();
    const currentTraitType = useCurrentTraitType();

    switch (basePosition) {
        case BaseLayerPosition.Before:
            return [...basePoints, ...traitPoints];
        case BaseLayerPosition.After:
            return [...traitPoints, ...basePoints]
        case BaseLayerPosition.Hidden:
        default:
            return currentTraitType === TraitTypes.Base ? basePoints : traitPoints;
    }
}

export const useCurrentTraitName = () => {
    const traits = useTraits();
    const currentTrait = useCurrentTrait();

    return traits?.[currentTrait]?.name;
};

export const useAllTraitNames = () => {
    const traits = useTraits();
    const allTraitNames = Object.entries(traits).map(([_k, { name }]) => name);

    return allTraitNames;
};

export const useAllTraitKeys = () => Object.keys(useTraits());

export const usePreviousTrait = () => {
    const currentTrait = useCurrentTrait();
    const traitKeys = useAllTraitKeys();
    const previousIndex = traitKeys.indexOf(currentTrait) - 1;

    return traitKeys[previousIndex];
};

export const useNextTrait = () => {
    const keys = useAllTraitKeys();
    const current = useCurrentTrait();
    const nextIndex = keys.indexOf(current) + 1;

    return keys[nextIndex];
};

export const useTraitRarity = () => {
    const dispatch = useDispatch();
    const getRarity = useAppSelector(({ traitReducer: { traits, currentTrait } }) => traits[currentTrait].rarity);
    const setRarity = (r: number) => dispatch(updateTraitRarity(r));

    return [getRarity, setRarity] as const;
};

export const useCurrentStrokeStack = () => {
    const dispatch = useDispatch();
    const get = useAppSelector(({ pointsStackReducer: { currentStrokeStack } }) => currentStrokeStack);
    const set = (currentStroke: IDrawingPoints) => dispatch(pushToCurrentStrokeStack(currentStroke));

    return [get, set] as const;
}

