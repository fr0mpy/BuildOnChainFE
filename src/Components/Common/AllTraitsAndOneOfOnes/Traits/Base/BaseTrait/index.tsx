import Tab from "@mui/material/Tab/Tab";
import { memo } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useBaseDrawingPoints, useBaseSelected } from "../../../../../../hooks/base";
import { setBaseSelected } from "../../../../../../Redux/baseSlice";
import { setCurrentTraitVariant } from "../../../../../../Redux/traitsSlice";
import { TraitCanvas } from "../../../../TraitCanvas";
import { BaseTraitContainer, Container, MainContainer, StyledButton } from "./styledComponents";

export const BaseTrait: React.FC = memo(() => {
    // console.log('rendering base trait');
    const baseSelected = useBaseSelected();
    const points = useBaseDrawingPoints();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setBaseSelected(true));
        dispatch(setCurrentTraitVariant(''));
    };

    return (
        <MainContainer>
            <StyledButton onClick={onClick}>
                <Container>
                    <Tab label={"Base"} sx={{ minHeight: 34, padding: '4px 12px', marginBottom: .5, opacity: 1 }} disableFocusRipple />
                    <BaseTraitContainer sx={{ border: baseSelected ? 'solid 2px cyan' : 'solid 2px transparent' }}>
                        <TraitCanvas points={points} />
                    </BaseTraitContainer>
                </Container>
            </StyledButton>
        </MainContainer>
    )
});