import isEqual from "lodash.isequal";
import { useDispatch } from "react-redux";
import shallowEqual from "react-redux/es/utils/shallowEqual";
import { updateTraitVariantRarity } from "../Redux/traitsSlice";
import { useAppSelector } from "../Redux/store";
import { pushToCurrentStrokeStack } from "../Redux/pointsStackSlice";
import { IDrawingPoints } from "../enums/canvas";
import { useCurrentTrait } from "./traits";

export const useTraitVariants = () => {
    const currentTrait = useCurrentTrait();

    const traits = useAppSelector(({ traitReducer: { traits } }) => traits, shallowEqual);
    return traits?.[currentTrait]?.variants;
};

export const useCurrentTraitVariant = () => useAppSelector(({ traitReducer: { currentTraitVariant } }) => currentTraitVariant, shallowEqual);

export const useDefaultTraitVariant = (currentTraitVariant: string) => {
    const defaultTraitVariant = useAppSelector(({ traitReducer: { traits } }) => {
        const variant = Object.keys(traits[currentTraitVariant]?.variants ?? {})[0];

        return variant
    }, isEqual);

    return defaultTraitVariant
};

export const useCurrentTraitVariantName = () => {
    const traits = useTraitVariants()
    const currentTrait = useCurrentTraitVariant();

    return traits?.[currentTrait]?.name;
};

export const useAllTraitVariantKeys = () => Object.keys(useTraitVariants() ?? {});

export const useNextTraitVariant = () => {
    const keys = useAllTraitVariantKeys();
    const current = useCurrentTraitVariant();
    const nextIndex = keys.indexOf(current) + 1;

    return keys[nextIndex];
};

export const usePreviousTraitVariant = () => {
    const keys = useAllTraitVariantKeys();
    const current = useCurrentTraitVariant();
    const previousIndex = keys.indexOf(current) - 1;

    return keys[previousIndex];
};

export const useAllTraitVariantNames = () => useAppSelector(({ traitReducer: { traits, currentTrait } }) => Object.keys(traits?.[currentTrait]?.variants ?? []).map(k => traits?.[currentTrait]?.variants?.[k]?.name ?? ''), shallowEqual);

export const useTraitVariantRarity = () => {
    const dispatch = useDispatch();

    const getRarity = useAppSelector(({ traitReducer: { traits, currentTrait, currentTraitVariant } }) => traits?.[currentTrait]?.variants?.[currentTraitVariant]?.rarity);
    const setRarity = (r: number) => dispatch(updateTraitVariantRarity(r));

    return [getRarity, setRarity] as const;
};

export const useCurrentStrokeStack = () => {
    const dispatch = useDispatch();

    const get = useAppSelector(({ pointsStackReducer: { currentStrokeStack } }) => currentStrokeStack);
    const set = (currentStroke: IDrawingPoints) => dispatch(pushToCurrentStrokeStack(currentStroke));

    return [get, set] as const;
}
