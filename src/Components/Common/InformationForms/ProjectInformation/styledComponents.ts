
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(() => ({

}));

export const StyledTypography = styled(Typography)(() => ({
    color: 'white'
}));

export const StyledTextField = styled(TextField)(() => ({
    "& label": {
        color: 'white'
    },

    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid white',
    },
    input: {
        color: 'white'
    }

}));

export const StyledTextArea = styled(TextField)(() => ({
    "& label": {
        color: 'white'
    },

    '& .MuiOutlinedInput-notchedOutline': {
        border: '2px solid white',
    },
    textArea: {
        color: 'white'
    }
}));

export const StyledSpacer = styled('div')(({ theme }) => ({
    width: '100%',
    height: theme.spacing(1.5)
}));