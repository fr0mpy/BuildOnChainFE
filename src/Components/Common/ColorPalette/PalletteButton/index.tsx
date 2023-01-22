import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { memo } from "react";
import { setCurrentColor, setCurrentColorIndex } from "../../../../Redux/toolsSlice";
import { StyledButton } from "./styledComponents";
import { useCurrentColorIndex } from "../../../../hooks/colorPalette";

interface IProps {
    color: string;
    index: number
}

export const PalletteButton: React.FC<IProps> = memo(({ color, index }) => {
    // console.log('rendering pallet button')
    const dispatch = useDispatch();
    const currentColorIndex = useCurrentColorIndex();

    const active = index === currentColorIndex;

    const onClick = () => {
        dispatch(setCurrentColorIndex(index));
        dispatch(setCurrentColor(color));
    };

    return (
        <StyledButton
            sx={{
                backgroundColor: color,
                border: (theme) => active ? `solid 2.5px black` : `solid 2.5px ${theme.palette.white.main}`,
                '&:hover': {
                    backgroundColor: color
                }
            }}
            onClick={onClick}>
        </StyledButton>
    )
});