import { memo } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setBaseSelected } from "../../../../../../Redux/baseSlice";
import { setCurrentTraitVariant } from "../../../../../../Redux/traitsSlice";
import { IRenderedTraitVariant } from "../../../../../../types/traits";
import { TraitCanvas } from "../../../../TraitCanvas";
import { StyledButton, TraitVariantContainer } from "./styledComponents";

interface IProps {
    traitVariant: IRenderedTraitVariant;
    active: boolean;
}

export const TraitVariant: React.FC<IProps> = memo(({ traitVariant: { name, value, flattenedRenderStack }, active = false }) => {
    // console.log('rendering trait variant', name, value, imgData)
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setCurrentTraitVariant(value));
        dispatch(setBaseSelected(false));
    };

    return (
        <StyledButton onClick={onClick}>
            <TraitVariantContainer sx={{ border: active ? 'solid 2px cyan' : 'solid 2px transparent' }}>
                <TraitCanvas name={name} points={flattenedRenderStack} />
            </TraitVariantContainer>
        </StyledButton>
    )
});