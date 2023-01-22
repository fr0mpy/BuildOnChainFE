import { InputSlider } from "../../../InputSlider";
import { StyledBox, StyledButton, StyledSpacer, StyledTextField, StyledTypography } from "./styledComponents";

interface IProps {
    formHeader: string;
    textFieldLabel: string;
    placeholderText: string;
    value: string;
    sliderLabel?: string;
    sliderValue?: number;
    sliderMax?: number;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleUpdate(): void;
    handleDelete(): void;
    onSliderChange?(newValue: string | number | number[]): void;
}

export const TraitInformationFormGroup: React.FC<IProps> = ({
    formHeader,
    textFieldLabel,
    placeholderText,
    value,
    sliderLabel = '',
    sliderValue = 0,
    sliderMax = 0,
    onChange,
    handleUpdate,
    handleDelete,
    onSliderChange
}) => {

    return (
        <StyledBox>
            <StyledTypography variant="h5">
                {formHeader}
            </StyledTypography>
            <StyledSpacer />
            <StyledTextField
                color="secondary"
                type="text"
                variant="outlined"
                label={textFieldLabel}
                placeholder={placeholderText}
                autoComplete="off"
                value={value}
                onChange={onChange}
            />
            <StyledSpacer />
            {onSliderChange
                ? <InputSlider label={sliderLabel} max={sliderMax} value={sliderValue} onChange={onSliderChange} />
                : null
            }            <StyledBox>
                <StyledButton variant="text" color="secondary" onClick={handleUpdate}>
                    Update
                </StyledButton>
                <StyledButton variant="text" color="secondary" onClick={handleDelete}>
                    Delete
                </StyledButton>
            </StyledBox>
            <StyledSpacer />
            <StyledSpacer />
        </StyledBox>
    )
};