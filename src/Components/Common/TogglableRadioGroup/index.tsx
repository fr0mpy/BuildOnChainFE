import { FormControl, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { CheckBoxContainer, Container, StyledCheckBox, StyledFormLabel, StyledRadioGroup } from "./styledComponents";

interface IProps {
    checkboxLabel: string;
    radioGroup: Array<{ label: string, value: string }>;
    radioDefaultValue?: string;
    radioGroupAriaLabel: string;
    onCheckBoxClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onRadioChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void
}

export const TogglableRadioGroup: React.FC<IProps> = ({ checkboxLabel, radioGroup, radioGroupAriaLabel, radioDefaultValue, onCheckBoxClick, onRadioChange }) => {
    const [toggled, setToggled] = useState<boolean>(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setToggled(!toggled);
        if (onCheckBoxClick) onCheckBoxClick(e);
    };

    const renderRadios = () => radioGroup.map(({ label, value }) => <FormControlLabel value={value} control={<Radio sx={{ color: 'white !important' }} />} label={label} key={`formControl-${label}-${value}`} />)

    return (
        <Container>
            <CheckBoxContainer>
                <StyledFormLabel>
                    {checkboxLabel}
                </StyledFormLabel>
                <StyledCheckBox
                    color="secondary"
                    onClick={handleClick}
                    checked={toggled}
                    aria-controls={'radioGroup'}
                />
            </CheckBoxContainer>
            {toggled
                ? <FormControl id={'radioGroup'}>
                    <StyledRadioGroup
                        aria-labelledby={radioGroupAriaLabel}
                        defaultValue={radioDefaultValue}
                        onChange={onRadioChange}
                    >
                        {renderRadios()}
                    </StyledRadioGroup>
                </FormControl>
                : null}
        </Container>
    )
};