import { shallowEqual } from "react-redux";
import { TraitTypes } from "../../../enums/traits";
import { useAppSelector } from "../../../Redux/store";
import { AddTraitOptionButton } from "../../Common/Buttons/AddTraitButton"
import { Canvas } from "../../Canvas";
import { useCurrentTraitType } from "../../../hooks/traits";

export const CenterComponentResolver = () => {
    const currentTraitVariant = useAppSelector(state => Boolean(state.traitReducer.currentTraitVariant), shallowEqual);
    const type = useCurrentTraitType();

    switch (type) {
        case TraitTypes.Base:
            return <Canvas />
        case TraitTypes.Variant:
            return currentTraitVariant ? <Canvas /> : <AddTraitOptionButton traitOption={TraitTypes.Variant} />;
        case TraitTypes.OneOfOne:
            return currentTraitVariant ? <Canvas /> : <AddTraitOptionButton traitOption={TraitTypes.Variant} />;
    }
};
