import { useIsOneOfOne } from "../../../../helpers/traits"
import { useBaseSelected } from "../../../../hooks/base"
import { useCurrentTrait } from "../../../../hooks/traits"
import { useCurrentTraitVariant } from "../../../../hooks/traitVariants"
import { OneOfOneInformation } from "../OneOfOneInformation"
import { TraitInformation } from "../TraitInformation"
import { TraitVariationInformation } from "../TraitVariationInformation"

export const TraitInformationResolver = () => {
    const currentTraitVariant = useCurrentTraitVariant();
    const currentTrait = useCurrentTrait();
    const oneOfOneSelected = useIsOneOfOne();
    const baseSelected = useBaseSelected();

    if (baseSelected) return null;

    return (
        <>
            {oneOfOneSelected && currentTraitVariant ? <OneOfOneInformation /> : null}
            {currentTrait && currentTrait !== 'All' ? <TraitInformation /> : null}
            {currentTraitVariant && !oneOfOneSelected ? <TraitVariationInformation /> : null}
        </>
    )

}