import { PayloadAction } from "@reduxjs/toolkit";
import { TraitTypes } from "../enums/traits";
import { useCurrentTrait } from "../hooks/traits";
import { AnyTypeGeneric } from "../types/misc";
import { ITraitVariant, ITraitVariants } from "../types/traits";

export const getPreviousTrait = (traitNames: Array<string>, currentTrait: string) => {
    const index = traitNames.indexOf(currentTrait) - 1;

    return traitNames[index];
};

export const formatTraitVariants = (traitVariants: Record<string, ITraitVariants>) => Object.entries(traitVariants ?? []).reduce((out, [key, value]) => {
    out.push({
        value: key,
        name: value.name,
        flattenedRenderStack: (value.renderStack ?? []).reduce((o, c) => [...o, ...c], [])
    });
    return out;
}, [] as Array<ITraitVariant>);

export const useIsOneOfOne = () => {
    const currentTrait = useCurrentTrait();

    return currentTrait === 'All';
}

/**
 * 
 * @param currentType current trait type
 * @param baseFn function to return if currentType === TraitTypes.Base
 * @param variantFn function to return if currentType === TraitTypes.Variant
 * @param oneOfOneFn function to return if currentType === TraitTypes.OneOfOne
 * @returns One of three passed in functions, depending on the currentType
 */

export const resolveByType = (
    currentType: TraitTypes,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    baseFn: () => PayloadAction<AnyTypeGeneric>,
    variantFn: () => PayloadAction<AnyTypeGeneric>,
    oneOfOneFn: () => PayloadAction<AnyTypeGeneric>
) => {
    switch (currentType) {
        case TraitTypes.Base:
            return baseFn();
        case TraitTypes.Variant:
            return variantFn();
        case TraitTypes.OneOfOne:
            return oneOfOneFn();
        default:
            return;
    }
}