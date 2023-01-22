
import * as React from 'react';

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from './Theme'
import { LayoutResolver } from "./Components/Resolvers/LayoutResolver";
import { ModalResolver } from './Components/Resolvers/ModalResolver';
import { CustomSnackbar } from './Components/Common/CustomSnackbar';

function App() {

	// const dispatch = useDispatch();

	// const renderWelcomeModal = () => {
	// 	setTimeout(() => {
	// 		dispatch(setModalType(ModalType.Welcome))
	// 	}, 1500)
	// }

	// React.useEffect(() => {
	// 	const welcomeModalDismissed = localStorage.getItem('welcomeModalDismissed');

	// 	if (!welcomeModalDismissed) {
	// 		renderWelcomeModal();
	// 	}
	// }, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CustomSnackbar />
				<LayoutResolver />
				<ModalResolver />
			</ThemeProvider>
		</>
	);
}

export default App;
