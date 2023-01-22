
import { styled } from '@mui/material/styles';

export const MainContainer = styled('div')(() => ({
    display: 'flex',
    flexFlow: 'row',
    height: '100vh'
}));

export const HeaderContainer = styled('div')(() => ({
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: '#0e0e0e'
}));

export const BodyContainer = styled('div')(() => ({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    flex: 1,
}));

export const BodyLeftContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: '#0e0e0e',
    width: 240,
    padding: theme.spacing(3)
}));

export const BodyCenterContainer = styled('div')(() => ({
    display: 'flex',
    flexFlow: 'row',
    backgroundColor: '#0e0e0e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
}));

export const BodyRightContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#0e0e0e',
    width: 320,
    padding: theme.spacing(3),
    height: '100%',
    boxSizing: 'border-box'
}));

export const FooterContainer = styled('div')(() => ({
    display: 'flex',
    flexFlow: 'row',
    height: 190,
    backgroundColor: 'purple'
}));

export const CenterComponentContainer = styled('div')(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#262626',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    padding: '8px 0',
    boxSizing: 'border-box'
}));

