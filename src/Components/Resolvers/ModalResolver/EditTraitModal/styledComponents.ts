
import { Button, Dialog, DialogContent, TextField, TextFieldProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialog = styled(Dialog)(() => ({
    // display: 'flex',
    // flexFlow: 'column',
    // height: '100vh'
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column'
}));

export const StyledTypography = styled(Typography)(() => ({
    color: 'white'
}));

export const StyledButton = styled(Button)(() => ({
    width: 160,
    marginBottom: 1,
    borderRadius: 2,
    height: 56,
    border: 'solid 4px white'
}));

export const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
    '& input': {
        color: 'white'
    }
}));
