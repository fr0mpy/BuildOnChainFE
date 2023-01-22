import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(() => ({
    height: 44,
    width: 44,
    minWidth: 44,
    padding: 0,
    // border: currentColorIndex === index ? '4px solid cyan' : '2px solid white',
    borderRadius: '4px',
    margin: '4px 4px 0 0',
    cursor: 'pointer',
    boxSizing: 'border-box'
}))