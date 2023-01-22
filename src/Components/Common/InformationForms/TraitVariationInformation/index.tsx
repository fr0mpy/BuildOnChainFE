import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useErrorMessages } from "../../../../hooks/errors";
import { useCurrentTraitName } from "../../../../hooks/traits";
import { useCurrentTraitVariantName, useCurrentTraitVariant, usePreviousTraitVariant, useNextTraitVariant, useAllTraitVariantNames, useTraitVariantRarity } from "../../../../hooks/traitVariants";
import { deleteTraitVariant, setCurrentTraitVariant, updateTraitVariantName } from "../../../../Redux/traitsSlice";
import { ErrorType } from "../../../Resolvers/ModalResolver/AddTraitModal";
import { TraitInformationFormGroup } from "../TraitInformationFormGroup";

/* TODO: THINGS TO TEST 
Add New Trait
Remove Trait
Update Trait
Do all three on each canvas index 
with both default app state values and manually input

Add New Trait Variant
Remove Trait Variant
Update Trait Variant
Do all three on each canvas index 
with both default app state values and manually input

Add New One of One
Remove One of One
Update One of One
Do all three on each canvas index 
with both default app state values and manually input
*/

/**
 * 
 * TODO: UP NEXT -
 * base trait
 * base trait editing
 * base trait reset
 * base trait 
 */
export const TraitVariationInformation = () => {
    const [traitName, setTraitName] = useState<string>('');
    const currentTraitName = useCurrentTraitName() ?? '';
    const currentTraitVariantName = useCurrentTraitVariantName() ?? '';
    const currentTraitVariant = useCurrentTraitVariant();
    const previousTraitVariant = usePreviousTraitVariant();
    const nextTraitVariant = useNextTraitVariant();
    const allTraitNames = useAllTraitVariantNames();
    const [error, setError] = useErrorMessages();
    const [rarity, setRarity] = useTraitVariantRarity();

    const dispatch = useDispatch();

    useEffect(() => {
        setTraitName(currentTraitVariantName);
    }, [currentTraitVariantName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);

        setTraitName(e.target.value);
    };

    const handleUpdate = () => {
        if (!traitName.length) {
            return setError(ErrorType.TraitInputEmpty);
        }

        if (allTraitNames.includes(traitName)) {
            return setError(ErrorType.TraitExists);
        }

        else {
            dispatch(updateTraitVariantName(traitName));
        }
    };

    const handleDelete = () => {
        // console.log(nextTraitVariant, previousTraitVariant)
        dispatch(setCurrentTraitVariant(nextTraitVariant ?? previousTraitVariant ?? ''));
        dispatch(deleteTraitVariant(currentTraitVariant));
    };

    const handleSliderChange = (r: number) => dispatch(setRarity(r));

    return (
        <TraitInformationFormGroup
            formHeader={`Current ${currentTraitName} Variant`}
            textFieldLabel={`${currentTraitName} Variant Name`}
            placeholderText={`Enter a name for your ${currentTraitName} variant`}
            value={traitName}
            onChange={handleChange}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            sliderLabel={'Rarity %'}
            sliderValue={rarity}
            sliderMax={100}
            onSliderChange={handleSliderChange}
        />
    )
}