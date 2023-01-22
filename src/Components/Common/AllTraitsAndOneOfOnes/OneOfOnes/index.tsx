import isEqual from "lodash.isequal";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { TraitTypes } from "../../../../enums/traits";
import { setBaseSelected } from "../../../../Redux/baseSlice";
import { setCurrentTrait } from "../../../../Redux/traitsSlice";
import { useAppSelector } from "../../../../Redux/store";
import { IOneOfOneTab } from "../../../../types/traits";
import { AddTraitOptionButton } from "../../Buttons/AddTraitButton";
import { TabsComponent } from "../../TabPanel";
import { OneOfOne } from "./OneOfOne";
import { useCurrentTrait } from "../../../../hooks/traits";
import { useCurrentTraitVariant } from "../../../../hooks/traitVariants";

export const OneOfOnes: React.FC = memo(() => {

    const storedOneOfOnes = useAppSelector(state => state.traitReducer.oneOfOnes, isEqual)
    const currentTrait = useCurrentTrait();
    const currentTraitVariant = useCurrentTraitVariant();

    const dispatch = useDispatch();

    const handleChange = (newValue: string) => {
        dispatch(setCurrentTrait(newValue));
        dispatch(setBaseSelected(false));
    };

    const oneOfOneTabs = Object.entries(storedOneOfOnes).reduce((out, [key, values]) => {
        out.push({ ...values, value: key })
        return out;
    }, [] as Array<IOneOfOneTab>);

    const tab = [{
        tabLabel: 'All',
        tabValue: 'All',
        tabItem:
            <div style={{
                height: 100,
                display: 'flex',
                flexFlow: 'row'
            }}>
                {
                    oneOfOneTabs.map(o => <OneOfOne
                        name={o.name}
                        value={o.value}
                        points={o.renderStack.reduce((o, c) => [...o, ...c], [])}
                        active={o.value === currentTraitVariant}
                        key={`oneOfOne-${o.name}`}
                    />)
                }
                <AddTraitOptionButton traitOption={TraitTypes.OneOfOne} />
            </div>
    }];

    return (
        <TabsComponent
            tabs={tab}
            currentValue={currentTrait}
            onChange={handleChange}
            activeStylingEnabled={true}
        />
    );
});
