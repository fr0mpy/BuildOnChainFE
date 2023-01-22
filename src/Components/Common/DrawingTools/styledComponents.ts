import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'row',
    width: '100%',
}));

export const StyledSpacer = styled('div')(() => ({
    width: '100%',
    height: 8
}));