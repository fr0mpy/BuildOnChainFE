import { PalletteButton } from "./PalletteButton";
import CachedIcon from '@mui/icons-material/Cached'
import { generateRandomColor } from "../../../helpers/colors";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import chroma from "chroma-js";
import { StyledToolTip } from "../StyledToolTip";
import { memo } from "react";
import { StyledBox, StyledIconButton } from "./styledComponents";
import { setColorPalette, setCurrentColor } from "../../../Redux/toolsSlice";
import { useColorPalette, useCurrentColorIndex } from "../../../hooks/colorPalette";

export const ColorPalette: React.FC = memo(() => {
	// console.log('rendering color palette')
	const dispatch = useDispatch();

	const currentColorIndex = useCurrentColorIndex();
	const colorPalette = useColorPalette();

	const handleSaveColors = (colors: Array<string>) => {
		const colorsData = JSON.stringify(colors);
		localStorage.setItem('colorsData', colorsData);
	}

	const randomizePalette = () => {
		const randomTertiaryColors = [...Array(6)].map(_ => generateRandomColor());
		const randomizedPalette = chroma.scale(randomTertiaryColors).colors(14);
		dispatch(setColorPalette(randomizedPalette));
		dispatch(setCurrentColor(randomizedPalette[currentColorIndex]));
		handleSaveColors(randomizedPalette);
	};

	const renderPaletteButtons = () => colorPalette.map((color: string, i: number) => {
		return <PalletteButton color={color} index={i} key={`colorButton-${color}-${i}`} />
	})

	return (
		<StyledBox>
			{renderPaletteButtons()}
			<StyledToolTip title={'Randomize'} arrow placement="bottom">
				<StyledIconButton onClick={randomizePalette}>
					<CachedIcon fontSize={'large'} sx={{ fill: 'white' }} />
				</StyledIconButton>
			</StyledToolTip>
		</StyledBox>
	)
});
