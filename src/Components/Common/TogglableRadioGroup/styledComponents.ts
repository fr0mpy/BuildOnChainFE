import { Checkbox, FormLabel, RadioGroup } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { styled } from "@mui/system";

export const Container = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'column'
}));

export const CheckBoxContainer = styled(Box)(() => ({
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    color: theme.palette.white.main,
    marginRight: 8
}));

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
    color: theme.palette.white.main,
    display: 'flex',
    flexFlow: 'row'
}));

export const StyledCheckBox = styled(Checkbox)(() => ({
    padding: 0
}));