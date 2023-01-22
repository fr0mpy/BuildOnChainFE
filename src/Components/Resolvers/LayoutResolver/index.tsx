import React from "react";
import DesktopLayout from "../../Layout/DesktopLayout";

// import { useScreenSizes } from "../../../helpers/layout";


export const LayoutResolver: React.FC = () => {

	// const { sm } = useScreenSizes();

	// if (sm) {
	// 	return (
	// 		<MobileLayout />
	// 	)
	// } else {
	// 	return (
	// 		<DesktopLayout />
	// 	)
	// }
	return <DesktopLayout />
}