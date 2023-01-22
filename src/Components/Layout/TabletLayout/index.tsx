
import * as React from 'react';
import Grid from "@mui/material/Grid/Grid";
import { ConnectWalletAndOpenMintingButton } from '../../Common/Buttons';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../../Redux/uiSlice';
import Typography from '@mui/material/Typography/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { ModalType } from '../../Resolvers/ModalResolver';

import IconButton from '@mui/material/IconButton/IconButton';

interface IProps {
	canvas?: React.ReactNode;
}


const TabletLayout: React.FC<IProps> = ({ canvas }) => {
	const dispatch = useDispatch();

	// const handleMint = () => {
	// };

	const openMenu = () => dispatch(setModalType(ModalType.Menu));
	return (
		<div style={{ height: '100%', color: 'white', display: 'flex', flexFlow: 'column' }}>
			<Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ backgroundColor: 'black', width: '100%', height: 96, padding: (theme) => theme.spacing(1.5) }}>
				<Grid container direction={'row'} sx={{ width: 'fit-content' }}>
					<IconButton sx={{ padding: 0, marginRight: 4 }} onClick={openMenu}>
						<MenuIcon sx={{ color: 'white', height: 46, width: 46 }} />
					</IconButton>
					<Typography variant={'h4'} textAlign={'center'} sx={{ height: 'fit-content' }}>
						PAINT ON CHAIN
					</Typography>
				</Grid>
				<ConnectWalletAndOpenMintingButton />
			</Grid>
			<Grid container direction={'row'} sx={{ height: '100%' }}>
				{canvas}
			</Grid>
		</div>
	)
}

export default TabletLayout;
