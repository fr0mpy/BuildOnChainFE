import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorType } from "../../../../enums/errors";
import { useErrorMessages } from "../../../../hooks/errors";
import { useNextOneOfOne } from "../../../../hooks/oneOfOnes";
import { useCurrentTraitName, useCurrentTrait, usePreviousTrait, useNextTrait, useAllTraitNames, useTraitRarity } from "../../../../hooks/traits";
import { usePreviousTraitVariant } from "../../../../hooks/traitVariants";
import { deleteTrait, setCurrentTrait, setCurrentTraitVariant, updateTraitName } from "../../../../Redux/traitsSlice";
import { TraitInformationFormGroup } from "../TraitInformationFormGroup";

export const TraitInformation = () => {
    const [traitName, setTraitName] = useState<string>('');

    const currentTraitName = useCurrentTraitName();
    const currentTrait = useCurrentTrait();
    const previousTrait = usePreviousTrait();
    const nextTrait = useNextTrait();
    const previousTraitVariant = usePreviousTraitVariant();
    const nextTraitVariant = useNextOneOfOne();
    const allTraitNames = useAllTraitNames();
    const [error, setError] = useErrorMessages();
    const [rarity, setRarity] = useTraitRarity();

    const dispatch = useDispatch();

    useEffect(() => {
        setTraitName(currentTraitName);
    }, [currentTraitName]);

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
            dispatch(updateTraitName(traitName));
        }
    };

    const handleDelete = () => {
        dispatch(setCurrentTrait(nextTrait ?? previousTrait ?? ''));
        dispatch(setCurrentTraitVariant(nextTraitVariant ?? previousTraitVariant ?? ''));
        dispatch(deleteTrait(currentTrait));
    };

    const handleSliderChange = (r: number) => dispatch(setRarity(r));

    return (
        <TraitInformationFormGroup
            formHeader="Current Trait"
            textFieldLabel="Trait Name"
            placeholderText="Enter a name for your trait"
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