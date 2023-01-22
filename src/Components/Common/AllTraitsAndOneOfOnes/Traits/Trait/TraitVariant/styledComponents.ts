import IconButton from "@mui/material/IconButton/IconButton";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(.5)
}));

export const TraitVariantContainer = styled('div')(() => ({
    height: 100,
    width: 100,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'black'
}));
