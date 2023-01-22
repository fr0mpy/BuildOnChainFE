import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, TextField, Theme, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Spacer } from "../../../Common/Spacer";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppSelector } from "../../../../Redux/store";
import { setModalType } from "../../../../Redux/uiSlice";

// interface IMetaData {
// 	name: string;
// 	description: string;
// 	image_data: string;
// 	attributes: string;
// }

interface ITraits {
	display_type?: string;
	trait_type?: string;
	value?: string | number;
}

enum WalletTypes {
	Own = 'own',
	Friends = 'friends'
}

export const MintModal = () => {
	const dispatch = useDispatch();

	const svgContainerRef = React.useRef<HTMLDivElement | null>(null);
	const boxRef = React.useRef<HTMLDivElement | null>(null);

	const [traits, setTraits] = React.useState<Array<ITraits>>([]);
	const [name, setName] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [numberOfTraitForms, setNumberOfTraitForms] = React.useState<number>(0);
	const [activeFormIndex, setActiveFormIndex] = React.useState<number>(0);
	const [loaded, setLoaded] = React.useState<boolean>(false);
	const [walletToMintTo, setWalletToMintTo] = React.useState<WalletTypes>(WalletTypes.Own);
	const [friendsWalletAddress, setFriendsWalletAddress] = React.useState<string>('');

	React.useEffect(() => {
		setLoaded(true);
	}, []);

	React.useEffect(() => {
		// if (SVG && svgContainerRef.current) {
		// 	const svgElement = Array.from(svgContainerRef.current.getElementsByTagName('svg'));
		// 	const canvasElement = document.getElementById('canvas');
		// 	if (canvasElement) {
		// 		const width = (canvasElement.clientWidth / 2).toString();
		// 		const height = (canvasElement.clientHeight / 2).toString();
		// 		svgElement[0].style.height = height;
		// 		svgElement[0].style.width = width;
		// 	}
		// 	svgElement[0].style.border = 'solid 4px rgb(160, 84, 129)';
		// 	svgElement[0].style.borderRadius = '4px';
		// }
	}, [loaded]);

	React.useEffect(() => {
		if (numberOfTraitForms >= 2) {
			handleBoxScroll();
		}
	}, [numberOfTraitForms]);

	const { walletAddress } = useAppSelector(state => {
		return {
			walletAddress: state.traitReducer.walletAddress,
			contractAddress: state.traitReducer.contractAddress
		}
	});

	const renderForms = () => {
		return [...Array(numberOfTraitForms)].map((_, i) => {
			return (
				<Grid
					container
					direction={'row'}
					onClick={() => setActiveFormIndex(i)}
					sx={{ position: 'relative', marginBottom: 1 }}
					key={`mintModal-form-${i}`}
				>
					<div style={{ flex: 2 }}>
						<TextField type={'text'} variant={'outlined'}
							inputProps={{
								sx: {
									"&::placeholder": {
										color: 'black'
									}
								}
							}}
							sx={{
								'& .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
								'& .MuiFormLabel-root': { color: (theme) => theme.palette.primary.dark },
								'legend': { color: (theme) => theme.palette.primary.dark },
								marginRight: (theme) => theme.spacing(1),

							}}
							value={traits[i] ? traits[i].trait_type : ''}
							label={'Trait Name'}
							placeholder={'Add Trait Name'}
							name={'trait_type'}
							onChange={(e) => handleChange(e, i)}
						/>
					</div>
					<div style={{ flex: 2 }}>
						<TextField
							type={'text'}
							variant={'outlined'}
							inputProps={{
								sx: {
									"&::placeholder": {
										color: 'black'
									}
								}
							}}
							sx={{
								'& .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
								'& .MuiFormLabel-root': { color: (theme) => theme.palette.primary.dark },
								'legend': { color: (theme) => theme.palette.primary.dark },
								marginRight: (theme) => theme.spacing(1)
							}}
							value={traits[i] ? traits[i].value : ''}
							label={'Trait Value'}
							placeholder={'Add Trait Value'}
							name={'value'}
							onChange={(e) => handleChange(e, i)}
						/>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<IconButton
							onClick={() => handleRemoveTrait(i)}
							sx={{ color: 'white', padding: (theme) => theme.spacing(1) }}
						>
							<CloseIcon />
						</IconButton>
					</div>
					<Spacer vertical spacing={1} />
				</Grid>
			)
		})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		if (traits[index]) {
			const updatedTraits = traits.map((trait, i) => {
				if (activeFormIndex === i) {
					Object.assign(trait, { [e.target.name]: e.target.value })
				}

				return trait;
			});

			setTraits(updatedTraits);
		} else {
			setTraits([...traits, { [e.target.name]: e.target.value }]);
		}
	};

	// const creationDate = () => {
	// 	return { display_type: 'date', trait_type: 'created', value: Date.now() };
	// }

	const handleRemoveTrait = (index: number): void => {
		setTraits(traits.filter((_, i) => index !== i));
		setNumberOfTraitForms(numberOfTraitForms - 1);
	}

	const handleMint = async () => {
		// console.log(SVG.length)
		// console.log(JSON.stringify(handleMetadata()));
		// const { name, description, image_data, attributes } = handleMetadata();
		// if (!(window as any).ethereum) return;

		// if (!name || !description) {
		// 	if (!name && !description) dispatch(setSnackbar({ message: 'please enter a name & description for your NFT', duration: 6000 }));
		// 	else if (!name) dispatch(setSnackbar({ message: 'please enter a name for your NFT', duration: 6000 }));
		// 	else if (!description) dispatch(setSnackbar({ message: 'please enter a description for your NFT', duration: 6000 }));

		// 	return;
		// }

		// if (walletToMintTo === WalletTypes.Friends && friendsWalletAddress.length !== 42) {
		// 	dispatch(setSnackbar({ message: 'Friends wallet address must be 42 characters in length, including the 0x prefix. Make you have not input any spaces.', duration: 6000 }));
		// }

		// const mintAddress = walletToMintTo === WalletTypes.Own ? walletAddress : friendsWalletAddress;
		// const provider = new ethers.providers.Web3Provider((window as any).ethereum);
		// const signer = await provider.getSigner();
		// const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)
		// contract.mint(mintAddress, name, description, image_data, attributes, { gasLimit: 12000000 });
	}

	// const getNumberOfTokensCreated = async () => {

	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	const numberOfTokensCreated = await contract.getNumberOfTokensCreated();
	// 	return numberOfTokensCreated;
	// }

	// const getTokenMetaData = async (id: number) => {

	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	const tokenMetadata = await contract.getTokenMetaData(id);


	// 	// return tokenMetadata;
	// }

	// const getWalletTokenBalance = async () => {

	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	const tokenBalance = await contract.getWalletTokenBalance();

	// 	return tokenBalance;
	// }

	// const getAuthContractAddress = async () => {

	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	const authContractAddress = await contract.getAuthContractAddress();

	// 	console.log(authContractAddress)
	// }

	// const setAuthContractAddress = async (address: string) => {

	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	await contract.setAuthContractAddress(address);
	// }

	// const getTokenURI = async (id: number) => {
	// 	if (!(window as any).ethereum) return;

	// 	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

	// 	const tokenURI = await contract.tokenURI(id);


	// }


	// const handleMetadata = () => {
	// 	const attributes = traits.filter(t => t.trait_type && t.value);
	// 	attributes.push(creationDate());

	// 	// return {
	// 	// 	name,
	// 	// 	description,
	// 	// 	image_data: SVG,
	// 	// 	attributes: JSON.stringify(traits),
	// 	// }
	// }

	// const SVGToBase64 = () => window.btoa(SVG);

	const handleClose = () => dispatch(setModalType(undefined));

	const handleBoxScroll = () => {
		if (!boxRef.current) return;

		boxRef.current?.scrollTo({ behavior: 'smooth', top: 100000 });
	};

	const handleAddTrait = () => {
		setNumberOfTraitForms(numberOfTraitForms + 1);
	}

	const mintButtonStyles = {
		padding: (theme: Theme) => theme.spacing(1, 3),
		minHeight: 48,
		height: 'fit-content',
		minWidth: 140,
		width: '100%',
		color: 'black',
		border: 'solid 5px black',
		borderRadius: (theme: Theme) => theme.spacing(1),
		display: 'flex',
		flexFlow: 'column'
	}

	return (
		<>
			<Dialog
				onClose={handleClose}
				open
				PaperProps={{
					sx: {
						height: '100%',
						width: '100%',
						maxHeight: '100%',
						maxWidth: '100%',
						margin: 0,
						backgroundColor: (theme) => theme.palette.primary.light,
						borderRadius: 0
					}
				}}
			>
				<DialogTitle sx={{ backgroundColor: (theme) => theme.palette.primary.dark, color: 'white', padding: 1 }}>
					<Grid container justifyContent={'flex-end'}>
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{ padding: 0 }}
						>
							<CloseIcon fontSize={'large'} sx={{ color: 'white' }} />
						</IconButton>
					</Grid>
					<Typography variant={'body2'} textAlign={'center'} sx={{ margin: (theme) => theme.spacing(0, 3), fontSize: 16 }}>
						Connected as:
					</Typography>
					<Typography variant={'body1'} textAlign={'center'} sx={{ margin: (theme) => theme.spacing(0, 3) }}>
						{`${walletAddress.slice(0, 30)}...`}
					</Typography>

				</DialogTitle>
				<DialogContent dividers sx={{ backgroundColor: (theme) => theme.palette.primary.light, display: { xs: 'block', md: 'flex' }, alignItems: 'center' }}>

					<Grid container justifyContent={'center'}>
						<div ref={svgContainerRef} />
						<Grid
							container
							direction={'column'}
							justifyContent={'center'}
							sx={{ width: 380, marginLeft: { md: 8 } }}
						>
							<Grid container justifyContent={'center'} direction={'column'} sx={{ marginTop: { xs: 2, md: 0 } }}>
								<Button onClick={handleMint} variant={'contained'} color={'secondary'} sx={mintButtonStyles}>
									<Typography variant={'body2'} >
										Mint Your Token
									</Typography>
									<Typography variant={'body1'} sx={{ fontSize: 14 }}>
										(On the Ethereum blockchain!)
									</Typography>
								</Button>
							</Grid>
							<Spacer vertical spacing={1} />
							<Typography variant={'body1'} textAlign={'center'} color={'white'}>
								Add Your Metadata Below
							</Typography>
							<ArrowDownwardIcon fontSize={'large'} sx={{ margin: (theme) => theme.spacing(0, 'auto'), color: 'white' }} />
							<Spacer vertical spacing={1} />
							<TextField
								type={'text'}
								variant={'outlined'}
								inputProps={{
									sx: {
										"&::placeholder": {
											color: 'black'
										}
									}
								}}
								sx={{
									'& .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
									'& .MuiFormLabel-root': { color: (theme) => theme.palette.primary.dark },
									'legend': { color: (theme) => theme.palette.primary.dark },
									marginRight: (theme) => theme.spacing(1)
								}}
								value={name}
								label={'Token Name'}
								placeholder={'Enter a Name For Your Token'}
								onChange={(e) => setName(e.target.value)}
							/>
							<Spacer vertical spacing={1} />
							<TextField
								type={'text'}
								variant={'outlined'}
								inputProps={{
									sx: {
										"&::placeholder": {
											color: 'black'
										},
									}
								}}
								sx={{
									'& .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
									'& .MuiFormLabel-root': { color: (theme) => theme.palette.primary.dark },
									'legend': { color: (theme) => theme.palette.primary.dark },
									marginRight: (theme) => theme.spacing(1)
								}}
								value={description}
								label={'Token Description'}
								placeholder={'Enter A Description For Your Token'}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<Spacer vertical spacing={1} />
							<Box ref={boxRef} sx={{ maxHeight: 120, overflowY: 'auto', padding: (theme: Theme) => theme.spacing(.5, 0) }}>
								{renderForms()}
							</Box>
							<Spacer vertical spacing={1} />
							{numberOfTraitForms !== 10
								? <Button variant={'contained'} disableElevation onClick={handleAddTrait} sx={{ backgroundColor: (theme) => theme.palette.primary.dark, '&:hover': { backgroundColor: (theme) => theme.palette.primary.main, color: 'black' } }}>
									<Typography variant={'body2'} color={'white'}>
										{numberOfTraitForms === 0 ? 'Add a Trait?' : 'Add Another Trait?'}
									</Typography>
								</Button>
								: null}
							<Spacer vertical spacing={2} />
							<FormControl>
								<Typography variant={'body1'} color={'white'} sx={{ fontSize: 18 }} textAlign={'center'}>
									Where are you minting to?
								</Typography>
								<RadioGroup
									aria-labelledby="radio-wallet-group-label"
									defaultValue={WalletTypes.Own}
									name="radio-wallet-group"
									onChange={(e) => setWalletToMintTo((e.target.value as WalletTypes))}
									row
									sx={{ display: 'flex', justifyContent: 'center', color: 'white' }}
								>
									<FormControlLabel
										value={WalletTypes.Own}
										control={<Radio sx={{ '.MuiSvgIcon-root': { color: (theme) => theme.palette.primary.dark } }} />}
										sx={{ '.MuiSvgIcon-root': { color: (theme) => theme.palette.primary.dark } }}
										label={<Typography variant={"caption"}>My Currently Connected Wallet</Typography>}
									/>
									<FormControlLabel
										value={WalletTypes.Friends}
										control={<Radio sx={{ '.MuiSvgIcon-root': { color: (theme) => theme.palette.primary.dark } }} />}
										sx={{ '.MuiSvgIcon-root': { color: (theme) => theme.palette.primary.dark } }}
										label={<Typography variant={"caption"}>A Friends Wallet</Typography>}
									/>
								</RadioGroup>
							</FormControl>
							<Spacer vertical spacing={1} />
							{walletToMintTo === WalletTypes.Friends ?
								<>
									<TextField
										type={'text'}
										variant={'outlined'}
										inputProps={{
											sx: {
												"&::placeholder": {
													color: 'black'
												}
											}
										}}
										sx={{
											'& .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
											'& .MuiFormLabel-root': { color: (theme) => theme.palette.primary.dark },
											'legend': { color: (theme) => theme.palette.primary.dark },
											marginRight: (theme) => theme.spacing(1)
										}}
										value={friendsWalletAddress}
										label={'Friends Wallet Address'}
										placeholder={'Enter A Friends Ethereum Wallet Address'}
										onChange={(e) => setFriendsWalletAddress(e.target.value)}
									/>
									<Spacer vertical spacing={1} />
								</>
								: null}
							<Typography textAlign={'center'} variant={'caption'} sx={{ fontSize: 12, color: 'white' }}>
								Make sure all the above is correct! Once this is minted, it's on the blockchain like this forever!
							</Typography>
							<Spacer vertical spacing={4} />
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	)
}



