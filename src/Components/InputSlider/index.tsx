import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { StyledInput, StyledTypography } from './styledComponents';

interface IProps {
    label: string;
    max: number;
    value: number;
    step?: number;
    onChange(newValue: number | Array<number> | string): void;
}

export const InputSlider: React.FC<IProps> = ({ label, max, value, step = 1, onChange }) => {

    const handleSliderChange = (event: Event, newValue: number | Array<number>) => {
        onChange(newValue)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        onChange(event.target.value === '' ? '' : Number(event.target.value))
    };

    const handleBlur = () => {
        if (value < 0) {
            onChange(0)
        } else if (value > max) {
            onChange(max);
        }
    };

    return (
        <Box sx={{ width: 250 }}>
            <StyledTypography variant={"body1"}>
                {label}
            </StyledTypography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={2}
                        max={max}
                        step={step}
                    />
                </Grid>
                <Grid item>
                    <StyledInput
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step,
                            min: 2,
                            max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}