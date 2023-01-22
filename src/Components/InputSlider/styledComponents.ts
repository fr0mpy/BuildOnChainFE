import { styled } from '@mui/material/styles';

import MuiInput from '@mui/material/Input';
import { Typography } from '@mui/material';

export const StyledInput = styled(MuiInput)`
  width: 64px;
`;

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.white.main
}))