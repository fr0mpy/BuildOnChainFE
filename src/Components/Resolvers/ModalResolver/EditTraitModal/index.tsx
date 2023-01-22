import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Spacer } from "../../../Common/Spacer";
import { StyledDialog, StyledDialogContent, StyledTextField, StyledTypography } from "./styledComponents";
import { ErrorType } from "../../../../enums/errors";
import { setModalType } from "../../../../Redux/uiSlice";
import { useCurrentTrait } from "../../../../hooks/traits";

export const EditTraitModal: React.FC = () => {
    // console.log('rendering edit trait modal');
    const currentTrait = useCurrentTrait();
    const [_traitName, setTraitName] = useState<string>(currentTrait);
    const [error, setError] = useState<ErrorType | boolean>(false);

    const dispatch = useDispatch();

    const handleClose = () => dispatch(setModalType(undefined));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);

        setTraitName(e.target.value);
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
                        {`Edit ${currentTrait} Trait`}
                    </StyledTypography>
                    <Spacer vertical spacing={2} />
                    <StyledTextField type={'text'} variant={'standard'} onChange={handleChange} placeholder={'Edit Trait Name'} />
                    <Spacer vertical spacing={4} />
                    <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                        {error
                            ? <Typography variant={'body2'}>
                                {error}
                            </Typography>
                            : null}
                    </Grid>
                </StyledDialogContent>
            </StyledDialog>
        </>
    )
}


