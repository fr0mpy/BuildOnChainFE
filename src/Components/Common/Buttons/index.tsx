import { Typography } from '@mui/material';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { setModalType, setSnackbar } from '../../../Redux/uiSlice';
import { useDispatch } from 'react-redux/';
import { useAppSelector } from '../../../Redux/store';
import { ModalType } from '../../Resolvers/ModalResolver';

export const StyledConnectWalletButton = styled(Button)(({ theme }) => ({
	height: 48,
	minWidth: 140,
	width: 'fit-content',
	border: 'solid 5px black',
	borderRadius: theme.spacing(1),
	[theme.breakpoints.up('sm')]: {
		height: 56,
		minWidth: 160
	}
}))

interface IConnectWalletButtonProps {
	mobileVersion?: boolean;
}

export const ConnectWalletAndOpenMintingButton: React.FC<IConnectWalletButtonProps> = () => {
	const dispatch = useDispatch();

	const { walletAddress } = useAppSelector(state => {
		return { walletAddress: state.web3Reducer.walletAddress }
	});

	const handleMint = () => {
		dispatch(setModalType(ModalType.Mint));
	};

	const connectWallet = () => {

		if ((window as any).ethereum) {

			(window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: any) => {
				const [account] = accounts;
				(window as any).userWalletAddress = account;
				// dispatch(updateWalletAddress(account))

			});
		} else {
			dispatch(setSnackbar({ message: 'No Web3 Wallet Extension Detected. Please install MetaMask', duration: 6000 }));
		}

	}
	return (
		<>
			{walletAddress.length
				? <>
					<StyledConnectWalletButton
						variant={'contained'}
						onClick={handleMint}
						disableElevation
						color={'secondary'}
					>
						<Typography variant={'body2'} color={'black'}>
							Add MetaData & Mint
						</Typography>
					</StyledConnectWalletButton>
				</>
				: <StyledConnectWalletButton
					variant={'contained'}
					onClick={connectWallet}
					disableElevation
					color={'primary'}
				>
					<Typography variant={'body2'}>
						Connect
					</Typography>
				</StyledConnectWalletButton>
			}
		</>
	)
}

export const StyledToolButton = styled(Button)(({ theme }) => ({
	height: 44,
	minWidth: 26,
	width: 'fit-content',
	border: 'solid 5px white',
	borderRadius: theme.spacing(1),
	color: 'white'
}));

interface IToolButtonProps {
	children: React.ReactNode;
	active?: boolean;
	title: string;
	onClick(): void;
}

export const ToolButton: React.FC<IToolButtonProps> = ({ children, active, title, onClick }) => {
	return (
		<StyledToolButton variant={'contained'} onClick={onClick} title={title} disableElevation sx={active ? {
			border: (theme) => `solid 5px ${theme.palette.primary.main}`,
			backgroundColor: 'white',
			'&:hover': {
				background: 'white',
			}
		} : {}}>
			{children}
		</StyledToolButton>
	)
}

export const AddColorButton = styled(Button)(({ theme }) => ({
	height: 34,
	width: 34,
	padding: 0,
	minWidth: 34,
	margin: theme.spacing(.5, .5, 0, 0)
}))

export const SideColorButton = styled(Button)(({ theme }) => ({
	height: '60%',
	width: 40,
	padding: 0,
	minWidth: 34,
	border: 'solid 5px black',
	borderRadius: theme.spacing(1)

}))