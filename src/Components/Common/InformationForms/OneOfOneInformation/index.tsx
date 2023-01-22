
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorType } from "../../../../enums/errors";
import { useErrorMessages } from "../../../../hooks/errors";
import { useAllOneOfOneNames, useCurrentOneOfOneName, useNextOneOfOne, usePreviousOneOfOne } from "../../../../hooks/oneOfOnes";
import { useCurrentTraitVariant, usePreviousTraitVariant } from "../../../../hooks/traitVariants";
import { deleteOneOfOne, setCurrentTraitVariant, updateOneOfOneName } from "../../../../Redux/traitsSlice";
import { TraitInformationFormGroup } from "../TraitInformationFormGroup";

export const OneOfOneInformation = () => {
    const [oneOfOneName, setOneOfOneName] = useState<string>('');
    const currentOneOfOneName = useCurrentOneOfOneName();
    const currentOneOfOne = useCurrentTraitVariant();
    const previousTraitVariant = usePreviousOneOfOne();
    const nextTraitVariant = useNextOneOfOne();
    const allOneOfOneNames = useAllOneOfOneNames();
    const [error, setError] = useErrorMessages();

    const dispatch = useDispatch();

    useEffect(() => {
        setOneOfOneName(currentOneOfOneName);
    }, [currentOneOfOneName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);

        setOneOfOneName(e.target.value);
    };

    const handleUpdate = () => {
        if (!oneOfOneName.length) {
            return setError(ErrorType.TraitInputEmpty);
        }

        if (allOneOfOneNames.includes(oneOfOneName)) {
            return setError(ErrorType.TraitExists);
        }

        else {
            dispatch(updateOneOfOneName(oneOfOneName));
        }
    };

    const handleDelete = () => {
        dispatch(setCurrentTraitVariant(nextTraitVariant ?? previousTraitVariant ?? ''));
        dispatch(deleteOneOfOne(currentOneOfOne));
    };

    return (
        <TraitInformationFormGroup
            formHeader="Current One of One"
            textFieldLabel="One of One Name"
            placeholderText="Enter a name for your One of One"
            value={oneOfOneName}
            onChange={handleChange}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
        />
    )
};
