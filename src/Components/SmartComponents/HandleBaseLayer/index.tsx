import { BaseLayerPosition } from "../../../enums/base";
import { useBasePosition } from "../../../hooks/base";
import { TogglableRadioGroup } from "../../Common/TogglableRadioGroup"

export const HandleBaseLayer = () => {
    const [position, setPosition] = useBasePosition();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => setPosition(value as BaseLayerPosition);

    const handleClick = () => setPosition(BaseLayerPosition.Hidden);
    return (
        <TogglableRadioGroup
            checkboxLabel={'Show Base Layer?'}
            radioGroup={[{ label: 'Before', value: 'before' }, { label: 'After', value: 'after' }]}
            radioGroupAriaLabel={'Select base layer position'}
            onCheckBoxClick={handleClick}
            onRadioChange={handleChange}
            radioDefaultValue={position}
        />
    )
}