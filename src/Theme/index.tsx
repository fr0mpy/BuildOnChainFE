import createTheme from "@mui/material/styles/createTheme";

import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
	interface PaletteOptions {
		white: {
			main: string;
		}
	}

	interface Palette {
		white: PaletteColor;
	}
}

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					display: 'none'
				},

			}
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		mode: 'dark',
		primary: {
			main: '#e9967a'
		},
		secondary: {
			main: '#3effdb'
		},
		warning: {
			main: '#FFFF00'
		},
		white: {
			main: 'white'
		}
	},
	typography: {
		fontFamily: ['Anton, sans-serif', 'Roboto Slab, serif'].join(','),
		body1: {
			fontFamily: 'Roboto Slab, serif',
			fontWeight: 900
		},
		body2: {
			fontFamily: 'Archivo Black, sans-serif',
			fontWeight: 900,
			fontSize: 18
		},
		caption: {
			fontFamily: 'Roboto Slab, serif',
			fontWeight: 500,
			fontSize: 14
		},
		subtitle1: {
			fontFamily: 'Archivo Black, sans-serif',
			fontWeight: 500,
			fontSize: 14
		},
		h4: {
			fontFamily: 'Archivo Black, sans-serif',
			fontWeight: 900,
			fontSize: 38
		},
		h3: {
			fontFamily: 'Archivo Black, sans-serif',
			fontWeight: 900,
			fontSize: 26
		}
	}
});