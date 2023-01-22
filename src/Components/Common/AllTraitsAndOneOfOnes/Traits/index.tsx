import { TabsComponent } from "../../TabPanel"
import { Trait } from "./Trait";
import { memo } from "react";
import { ITraitTab } from "../../../../types/traits";
import { useDispatch } from "react-redux";
import { setCurrentTrait, setCurrentTraitVariant } from "../../../../Redux/traitsSlice";
import { ModalType } from "../../../Resolvers/ModalResolver";
import { formatTraitVariants } from "../../../../helpers/traits";
import { setModalType } from "../../../../Redux/uiSlice";
import { useCurrentTrait, useTraits } from "../../../../hooks/traits";
import { useBaseSelected } from "../../../../hooks/base";

export const Traits: React.FC = memo(() => {

    const storedTraits = useTraits();
    const currentTrait = useCurrentTrait();
    const dispatch = useDispatch();
    const baseSelected = useBaseSelected();

    const handleChange = (newValue: string) => {
        dispatch(setCurrentTrait(newValue));
        if (!baseSelected) {
            const defaultTraitVariant = Object.keys(storedTraits[newValue].variants ?? {})[0];
            dispatch(setCurrentTraitVariant(defaultTraitVariant));
        }
    };

    const handleAddTrait = () => dispatch(setModalType(ModalType.AddTrait));

    const traitTabs = Object.entries(storedTraits).reduce((out, [key, values]) => {
        out.push({ ...values, value: key })
        return out;
    }, [] as Array<ITraitTab>)
        .map(trait => ({
            tabLabel: trait.name,
            tabValue: trait.value,
            tabItem: <Trait type={trait.type} traitVariants={formatTraitVariants(trait.variants ?? {})} />
        }));

    return (
        <TabsComponent
            tabs={traitTabs}
            currentValue={currentTrait}
            activeStylingEnabled={true}
            onChange={handleChange}
            btnCtaText={'Add Trait'}
            btnCta={handleAddTrait}
        />
    );
});
