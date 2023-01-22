import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IScreenSize {
    sm: boolean;
    md: boolean;
    lg: boolean;
}

export const useScreenSizes = (): IScreenSize => ({
    lg: useMediaQuery((theme: Theme) => theme.breakpoints.up('lg')),
    md: useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg')),
    sm: useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
});