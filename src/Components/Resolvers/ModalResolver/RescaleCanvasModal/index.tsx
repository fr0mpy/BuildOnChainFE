import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Theme, Typography } from "@mui/material";
import { Spacer } from "../../../Common/Spacer";
import { StyledButton, StyledDialog, StyledDialogContent, StyledTypography } from "./styledComponents";
import { InputSlider } from "../../../InputSlider";
import { useCanvasDimension, usePixelDimension, usePixelScale } from "../../../../hooks/canvas";
import { setModalType } from "../../../../Redux/uiSlice";
import { roundNearest } from "../../../../helpers/maths";

export enum ErrorType {
    TraitExists = 'Trait Already Exists',
    TraitInputEmpty = 'Please Enter A Trait Name'
}

export const RescaleCanvasModal: React.FC = () => {
    // console.log('rendering add trait modal')
    const [pixelDimension, setPixelDimension] = usePixelDimension();
    const [pixelScale, setPixelScale] = usePixelScale();
    const dispatch = useDispatch();
    const [updatedDimensions, setUpdatedDimensions] = useState<number>(pixelDimension);
    const [canvasDimension] = useCanvasDimension();
    const handleClose = () => dispatch(setModalType(undefined));

    const handleScaleChange = (newValue: string | number | number[]) => setUpdatedDimensions(newValue as number);

    const handleScaleUpdate = () => {
        setPixelDimension(updatedDimensions);
        setPixelScale(roundNearest(canvasDimension / updatedDimensions, pixelDimension))
        handleClose();
    };

    return (
        <>
            <StyledDialog
                onClose={handleClose}
                open
                PaperProps={{
                    sx: {
                        margin: { xs: 1, sm: 2 },
                        backgroundColor: (theme: Theme) => theme.palette.primary.light,
                        width: '100%',
                        maxWidth: 400,
                        height: 'fit-content',
                        border: (theme: Theme) => `solid 4px ${theme.palette.primary.main}`,
                        borderRadius: 1.5
                    }
                }}
            >
                <StyledDialogContent dividers >
                    <StyledTypography variant={'h3'} textAlign={'center'}>
                        Rescale canvas?
                    </StyledTypography>
                    <Spacer vertical spacing={2} />
                    <InputSlider
                        label={`current scale: ${pixelDimension}x${pixelDimension}`}
                        max={32}
                        value={updatedDimensions}
                        onChange={handleScaleChange}
                        step={2}
                    />
                    <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                        <StyledButton
                            variant={'contained'}
                            color={'secondary'}
                            disableElevation
                            onClick={handleScaleUpdate}
                        >
                            <Typography variant={'body2'}>
                                Rescale
                            </Typography>
                        </StyledButton>
                    </Grid>
                </StyledDialogContent>
            </StyledDialog>
        </>
    )
}


