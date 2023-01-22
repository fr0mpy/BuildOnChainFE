import { memo } from "react";
import { TraitTypes } from "../../../../../enums/traits";
import { useBaseSelected } from "../../../../../hooks/base";
import { useCurrentTraitName } from "../../../../../hooks/traits";
import { useCurrentTraitVariant } from "../../../../../hooks/traitVariants";
import { ITraitVariant } from "../../../../../types/traits";
import { AddTraitOptionButton } from "../../../Buttons/AddTraitButton";
import { TraitVariantsContainer } from "./styledComponents";
import { TraitVariant } from "./TraitVariant";

interface IProps {
    type: TraitTypes;
    traitVariants?: Array<ITraitVariant>;
    imgData?: string;
}

export const Trait: React.FC<IProps> = memo(({ traitVariants = [] }) => {
    // console.log('rendering trait ', traitVariants);

    const currentTraitName = useCurrentTraitName();
    const currentTraitVariant = useCurrentTraitVariant();
    const baseSelected = useBaseSelected();

    const renderTraitVariants = () => {
        return (
            <>
                {traitVariants.map((traitVariant) => {
                    return <TraitVariant
                        traitVariant={traitVariant}
                        active={!baseSelected && traitVariant.value === currentTraitVariant}
                        key={`${traitVariant.name}_${traitVariant.value}`}
                    />
                })}
                <AddTraitOptionButton text={`Add ${currentTraitName} type`} traitOption={TraitTypes.Variant} />
            </>
        );
    }

    return (
        <TraitVariantsContainer>
            {renderTraitVariants()}
        </TraitVariantsContainer>
    )
});
