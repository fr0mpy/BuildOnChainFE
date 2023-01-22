import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid/Grid';
import { Theme, useMediaQuery } from '@mui/material';

interface IDrawer {
    children: React.ReactNode;
    anchor?: 'top' | 'left' | 'bottom' | 'right';
}

export const DrawerComponent: React.FC<IDrawer> = ({ children, anchor }) => {

    // const { drawerOpen } = useAppSelector(state => {
    //     return { drawerOpen: state.rootReducer.drawerOpen }
    // });

    // const dispatch = useDispatch();
    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    // const renderOpenIcon = () => {
    //     if (isDesktop) {
    //         return <ArrowForwardIcon sx={{ color: 'white', height: 50, width: 50 }} />
    //     } else {
    //         return (
    //             <Grid container direction={'column'} alignItems={'center'} sx={{}}>
    //                 <ExpandLessIcon fontSize={'large'} sx={{ color: 'white', height: { xs: 60, sm: 70 }, width: { xs: 60, sm: 70 } }} />
    //             </Grid>
    //         )
    //     }
    // };

    const drawerContents = (children: React.ReactNode) => {
        if (isDesktop) {
            return (
                <Grid container direction={'row'} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    {children}
                    <Box sx={
                        {
                            backgroundColor: 'black',
                            height: '100%',
                            width: 60,
                            borderTopRightRadius: 12,
                            borderBottomRightRadius: 12
                        }
                    }>
                        {/* <Button onClick={() => dispatch(setDrawerOpen(false))} sx={{ height: '100%', width: 60 }}>
                            <ArrowBackwardIcon sx={{ color: 'white', height: 50, width: 50, position: 'relative', left: 8 }} />
                        </Button> */}
                    </Box >
                </Grid >
            )
        } else return (
            <Grid container sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Box sx={{ backgroundColor: 'black', height: 56, width: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                    {/* <Button onClick={() => dispatch(setDrawerOpen(false))} sx={{ height: 56, width: '100%' }}>
                        <ExpandMoreIcon sx={{ color: 'white', height: { xs: 60, sm: 70 }, width: { xs: 60, sm: 70 } }} />
                    </Button> */}
                </Box>
                {children}
            </Grid>
        )
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'black',
                    height: { xs: 56, sm: 64, md: 64 },
                    borderTopLeftRadius: { xs: 12, lg: 0 },
                    borderTopRightRadius: { xs: 12, lg: 12 },
                    borderBottomRightRadius: { lg: 12 },
                    position: { md: 'absolute' },
                    top: 0,
                    left: 0
                }}
            >
                {/* <Button onClick={() => dispatch(setDrawerOpen(true))} sx={{ height: { xs: 56, sm: 64, md: 64, lg: '100%' }, width: { xs: '100%', lg: 68 } }}>
                    {renderOpenIcon()}
                </Button> */}
            </Box>
            <Drawer
                anchor={anchor}
                // open={drawerOpen}
                // onClose={() => dispatch(setDrawerOpen(false))}
                sx={{ xs: { borderTop: 'solid 1px black' }, '& .MuiDrawer-paper': { boxShadow: 'none' } }}
            >
                {drawerContents(children)}
            </Drawer>
        </>
    );
}
