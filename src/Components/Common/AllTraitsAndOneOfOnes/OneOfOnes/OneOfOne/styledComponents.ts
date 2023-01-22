import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton/IconButton";

export const OneOfOneContainer = styled('div')(() => ({
    // todo height to be 100%
    height: 80,
    width: 80,
    display: 'flex',
    flexFlow: 'row'
}));

export const StyledButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(.5)
}));

