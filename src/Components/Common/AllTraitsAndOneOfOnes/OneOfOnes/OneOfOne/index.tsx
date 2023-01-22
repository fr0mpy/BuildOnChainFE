import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { IDrawingPoints } from "../../../../../enums/canvas";
import { setBaseSelected } from "../../../../../Redux/baseSlice";
import { setCurrentTraitVariant } from "../../../../../Redux/traitsSlice";
import { TraitCanvas } from "../../../TraitCanvas"
import { OneOfOneContainer, StyledButton } from "./styledComponents"

interface IProps {
    name: string;
    value: string;
    points: Array<IDrawingPoints>;
    active: boolean;
}

export const OneOfOne: React.FC<IProps> = ({ name, value, points, active = false }) => {
    const dispatch = useDispatch();

    const onClick = () => {
        // TODO: maybe only setCurrent is Base isn't selected
        dispatch(setBaseSelected(false));
        dispatch(setCurrentTraitVariant(value));
    };

    // TODO: remove inline styling
    return (
        <StyledButton onClick={onClick}>
            <OneOfOneContainer sx={{ border: active ? 'solid 2px cyan' : 'solid 2px transparent' }}>
                <TraitCanvas name={name} points={points} />
            </OneOfOneContainer>
        </StyledButton>
    )
}