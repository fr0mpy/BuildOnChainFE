import { Button, Typography, styled } from "@mui/material";

export const StyledButton = styled(Button)(() => ({
    padding: 4
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.white.main
}));