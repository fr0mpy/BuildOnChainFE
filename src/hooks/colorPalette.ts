import isEqual from "lodash.isequal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../Redux/store";
import { setColorPalette, setCurrentColor } from "../Redux/toolsSlice";

export const useColorPalette = () => {
    const colorPalette = useAppSelector(state => state.toolsReducer.colorPalette, isEqual);
    return colorPalette;
};

export const useCurrentColor = () => {
    const color = useAppSelector(state => state.toolsReducer.currentColor, isEqual);

    return color;
};

export const useCurrentColorIndex = () => {
    const index = useAppSelector(state => state.toolsReducer.currentColorIndex, isEqual);

    return index;
}

export const useUpdatePaletteColor = () => {
    const dispatch = useDispatch();
    const colorPalette = useColorPalette();
    const currentColorIndex = useCurrentColorIndex();

    const update = (color: string) => {
        const updatedColors = colorPalette.map((c: string, i: number) => {
            if (i === currentColorIndex) return color;

            return c;
        });

        dispatch(setColorPalette(updatedColors));
        dispatch(setCurrentColor(color));
        // handleSaveColors();
    };

    return update;
}