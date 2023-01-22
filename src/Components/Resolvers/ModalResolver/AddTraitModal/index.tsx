import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import { setCurrentTrait, setCurrentTraitVariant, setNewOneOfOne, setNewTrait, setNewTraitVariant } from "../../../../Redux/traitsSlice";
import { Spacer } from "../../../Common/Spacer";
import { StyledButton, StyledDialog, StyledDialogContent, StyledTextField, StyledTypography } from "./styledComponents";
import { TraitOptions } from "../../../../enums/traits";
import { generateGUID } from "../../../../helpers/strings";
import { setModalType } from "../../../../Redux/uiSlice";
import { useAllOneOfOneNames } from "../../../../hooks/oneOfOnes";
import { useAllTraitNames, useCurrentTraitName } from "../../../../hooks/traits";
import { useAllTraitVariantNames } from "../../../../hooks/traitVariants";
import { useBaseSelected } from "../../../../hooks/base";

export enum ErrorType {
    TraitExists = 'Trait Already Exists',
    TraitInputEmpty = 'Please Enter A Trait Name'
}

interface ITraitType {
    traitType: TraitOptions
}

export const AddTraitModal: React.FC<ITraitType> = ({ traitType }) => {
    // console.log('rendering add trait modal')
    const [traitName, setTraitName] = useState<string>('');
    const [error, setError] = useState<ErrorType | boolean>(false);

    const traitNames = useAllTraitNames();
    const currentTraitName = useCurrentTraitName();
    const traitVariantNames = useAllTraitVariantNames();
    const oneOfOnesNames = useAllOneOfOneNames();
    const baseSelected = useBaseSelected();

    const dispatch = useDispatch();

    const handleClose = () => dispatch(setModalType(undefined));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);

        setTraitName(e.target.value);
    };

    const resolveTraitOptionNames = () => {
        switch (traitType) {
            case TraitOptions.Trait:
                return traitNames;
            case TraitOptions.TraitVariant:
                return traitVariantNames
            case TraitOptions.OneOfOne:
                return oneOfOnesNames;
            default:
                return [];
        }
    };

    const handleNewTraitOption = () => {
        if (!traitName.length) {
            return setError(ErrorType.TraitInputEmpty);
        }

        if (resolveTraitOptionNames().includes(traitName)) {
            return setError(ErrorType.TraitExists);
        }

        else {
            const key = generateGUID();

            switch (traitType) {
                case TraitOptions.Trait:
                    dispatch(setCurrentTrait(key));
                    dispatch(setNewTrait({ name: traitName, id: key }));
                    break;
                case TraitOptions.TraitVariant:
                    if (!baseSelected) dispatch(setCurrentTraitVariant(key));
                    dispatch(setNewTraitVariant({ name: traitName, id: key }));
                    break;
                case TraitOptions.OneOfOne:
                    if (!baseSelected) dispatch(setCurrentTraitVariant(key));
                    dispatch(setNewOneOfOne({ name: traitName, id: key }));
                    break;
            }

            handleClose();
        }
    };

    const text = () => {
        switch (traitType) {
            case TraitOptions.Trait:
                return 'Add new Trait';
            case TraitOptions.TraitVariant:
                return `Add New Type of ${currentTraitName}`;
            case TraitOptions.OneOfOne:
                return 'Add New One of One'
        }
    };

    const placeholder = () => {
        switch (traitType) {
            case TraitOptions.Trait:
                return 'Add a name for this Trait';
            case TraitOptions.TraitVariant:
                return `Add a name for this type of ${currentTraitName}`;
            case TraitOptions.OneOfOne:
                return 'Add a name for this One of One'
        }
    };

    const cta = () => {
        switch (traitType) {
            case TraitOptions.Trait:
                return 'Add new Trait';
            case TraitOptions.TraitVariant:
                return `Add new type of ${currentTraitName}`;
            case TraitOptions.OneOfOne:
                return 'Add new One of One'
        }
    };

    return (
        <>
            <StyledDialog
                onClose={handleClose}
                open
                PaperProps={{
                    sx: {
                        margin: { xs: 1, sm: 2 },
                        backgroundColor: (theme) => theme.palette.primary.light,
                        width: '100%',
                        maxWidth: 400,
                        height: 'fit-content',
                        border: (theme) => `solid 4px ${theme.palette.primary.main}`,
                        borderRadius: 1.5
                    }
                }}
            >
                <StyledDialogContent dividers >
                    <StyledTypography variant={'h3'} textAlign={'center'}>
                        {text()}
                    </StyledTypography>
                    <Spacer vertical spacing={2} />
                    <StyledTextField type={'text'} variant={'standard'} onChange={handleChange} placeholder={placeholder()} />
                    <Spacer vertical spacing={4} />
                    <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                        {error
                            ? <Typography variant={'body2'}>
                                {error}
                            </Typography>
                            : null}
                        <StyledButton
                            variant={'contained'}
                            color={'secondary'}
                            disableElevation
                            onClick={handleNewTraitOption}
                        >
                            <Typography variant={'body2'}>
                                {cta()}
                            </Typography>
                        </StyledButton>
                    </Grid>
                </StyledDialogContent>
            </StyledDialog>
        </>
    )
}


