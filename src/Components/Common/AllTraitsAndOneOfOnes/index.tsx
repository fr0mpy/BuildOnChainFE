import React from "react";
import { Traits } from "./Traits";
import { TabsComponent } from "../TabPanel";
import { OneOfOnes } from "./OneOfOnes";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setCurrentTrait, setCurrentTraitVariant } from "../../../Redux/traitsSlice";
import { BaseTrait } from "./Traits/Base/BaseTrait";
import { useDefaultTraits } from "../../../hooks/traits";
import { useBaseSelected } from "../../../hooks/base";

export const AllTraitsAndOneOfOnes = () => {
    const [currentTab, setCurrentTab] = React.useState<string>('traits');
    const [defaultTrait, defaultTraitVariant, defaultOneOfOne] = useDefaultTraits();
    const dispatch = useDispatch();
    const baseSelected = useBaseSelected();

    const handleChange = (value: string) => {
        setCurrentTab(value);
        setDefaults(value);
    };

    const setDefaults = (tab: string) => {
        if (tab === 'traits') {
            dispatch(setCurrentTrait(defaultTrait));
            if (!baseSelected) {
                dispatch(setCurrentTraitVariant(defaultTraitVariant));
            }
        } else if (tab === 'oneOfOnes') {
            dispatch(setCurrentTrait('All'));
            if (!baseSelected) {
                dispatch(setCurrentTraitVariant(defaultOneOfOne));
            }
        }
    };

    const tabs = [
        {
            tabValue: 'traits',
            tabLabel: 'Traits',
            tabItem: <Traits />
        },
        {
            tabValue: 'oneOfOnes',
            tabLabel: 'One Of Ones',
            tabItem: <OneOfOnes />
        }
    ];

    return (
        <>
            <BaseTrait />
            <TabsComponent
                currentValue={currentTab}
                onChange={handleChange}
                tabs={tabs}
                activeStylingEnabled={true}
                tabWidth={240}
            />
        </>
    )
}