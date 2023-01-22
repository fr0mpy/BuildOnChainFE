import React from 'react';
import { HexColorPicker } from "react-colorful";
import { Grid } from '@mui/material';
import { useCurrentColor, useUpdatePaletteColor } from '../../../hooks/colorPalette';

export const ColorPicker: React.FC = () => {
	const currentColor = useCurrentColor();
	const handleColorUpdate = useUpdatePaletteColor();

	const throttleColorUpdate = (color: string) => {
		handleColorUpdate(color)
	};

	// const handleSaveColors = () => {
	// 	const colorsData = JSON.stringify(colorPalette);
	// 	localStorage.setItem('colorsData', colorsData);
	// }

	return (
		<Grid container direction={'row'} justifyContent={"center"}>
			<HexColorPicker
				color={currentColor}
				onChange={throttleColorUpdate}
				style={{
					height: '160px',
					width: '100%',
					maxWidth: '300px',
					borderRadius: '12px',
					boxSizing: 'border-box',
					cursor: 'pointer'
				}} />
		</Grid>
	)
}
