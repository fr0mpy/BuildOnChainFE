import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const NavContainer = styled(Grid)(({ theme }) => ({
	height: '100vh',
	backgroundColor: 'black',
	color: 'white',
	boxSizing: 'border-box',
	display: 'flex',
	flexFlow: 'column',
	fontFamily: 'Roboto Slab, serif',
	padding: '16px',
	transition: 'background-color .4s linear',
	zIndex: 1,
	[theme.breakpoints.up('lg')]: {
		maxWidth: 400
	}
}));

export const Text = styled(Grid)(({ theme }) => ({
	margin: theme.spacing(3, 0)
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
	flex: 1,
	height: '100%',
	overflowY: 'auto',
	padding: theme.spacing(0, 1),


	"&::-webkit-scrollbar": {
		width: 7,
	},
	"&::-webkit-scrollbar-track": {
		boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: theme.palette.primary.main,
		borderRadius: theme.spacing(1),
		outline: `1px solid ${theme.palette.primary.light}`,
		maxHeight: 40
	},
}))

export const Section = styled(Grid)(() => ({
	textAlign: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	flexFlow: 'column',
	justifyContent: 'center',
	height: 'fit-content'
}))

