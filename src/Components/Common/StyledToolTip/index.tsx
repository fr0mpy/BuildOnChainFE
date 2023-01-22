import Tooltip from "@mui/material/Tooltip/Tooltip";

type IPlacement = "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;

interface IToolTip {
    children: React.ReactElement;
    placement?: IPlacement;
    title: string;
    arrow?: boolean
}


export const StyledToolTip: React.FC<IToolTip> = ({ children, title, arrow, placement }) => {
    return (
        <Tooltip
            title={title}
            arrow={arrow}
            PopperProps={{
                sx: {
                    '& .MuiTooltip-tooltipArrow': {
                        '& :before': {
                            color: 'white'
                        }
                    },
                    "& .MuiTooltip-tooltip": {
                        backgroundColor: 'white',
                        color: 'black',
                        fontFamily: (theme) => theme.typography.body1,
                        fontSize: 14
                    }
                }
            }}
            placement={placement}
        >
            {children}
        </Tooltip>
    )
}