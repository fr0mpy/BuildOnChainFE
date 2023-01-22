import { IconButton } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1, 'auto', 0, 'auto'),

    [theme.breakpoints.up('xs')]: {
        // width: 336
    },

    [theme.breakpoints.up('lg')]: {
        // width: 288
    }
}));


export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    height: 44,
    width: 44,
    minWidth: 44,
    margin: theme.spacing(.5, .5, 0, 0)
}));