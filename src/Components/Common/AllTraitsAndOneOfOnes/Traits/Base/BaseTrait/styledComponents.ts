import { Box, styled } from "@mui/material";
import Button from "@mui/material/Button/Button";

export const BaseTraitContainer = styled('div')(() => ({
    // todo height to be 100%
    height: 100,
    width: 100,
    display: 'flex',
    flexFlow: 'row',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.white.main,
    padding: 4,
}));

export const MainContainer = styled(Box)(({ theme }) => ({
    width: 100,
    backgroundColor: '#0e0e0e',
    padding: theme.spacing(4.75, 1, 1, 1),
    color: theme.palette.white.main,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    borderRight: 'solid 1px rgb(108, 105, 105, .6)'
}));

export const Container = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
}));

