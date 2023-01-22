
import * as React from 'react';
import { AllTraitsAndOneOfOnes } from '../../Common/AllTraitsAndOneOfOnes';
import { CenterComponentResolver } from '../../Resolvers/CenterComponentResolver';
import { BodyCenterContainer, BodyContainer, BodyLeftContainer, BodyRightContainer, CenterComponentContainer, FooterContainer, HeaderContainer, MainContainer } from './styledComponents';
import { ProjectInformation } from '../../Common/InformationForms/ProjectInformation';
import { TraitInformationResolver } from '../../Common/InformationForms/TraitInformationResolver';
import { ColorPalette } from '../../Common/ColorPalette';
import { ColorPicker } from '../../Common/ColorPicker';
import { DrawingTools } from '../../Common/DrawingTools';
import { Spacer } from '../../Common/Spacer';
import { HandleBaseLayer } from '../../SmartComponents/HandleBaseLayer';

const DesktopLayout: React.FC = () => {
	// console.log('rendering desktop layout')
	return (
		<MainContainer>
			<BodyLeftContainer>
				<ProjectInformation />
				<TraitInformationResolver />
			</BodyLeftContainer>
			<BodyContainer>
				<HeaderContainer>

				</HeaderContainer>
				<BodyCenterContainer>
					<CenterComponentContainer>
						<CenterComponentResolver />
					</CenterComponentContainer>
					<BodyRightContainer>
						<HandleBaseLayer />
						<Spacer vertical spacing={1} />
						<DrawingTools />
						<ColorPicker />
						<ColorPalette />
					</BodyRightContainer>
				</BodyCenterContainer>
				<FooterContainer>
					<AllTraitsAndOneOfOnes />
				</FooterContainer>
			</BodyContainer>
		</MainContainer>
	);
}

export default DesktopLayout;