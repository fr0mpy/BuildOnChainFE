
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    backgroundColor: theme.palette.white.main
}));

export const TraitCanvasEl = styled('div')(() => ({
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexFlow: 'wrap'
}));

export const TraitName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    position: 'absolute',
    textAlign: 'center',
    bottom: 0,
    backgroundColor: theme.palette.primary.light
}));