import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { memo } from 'react';
import AddIcon from '../../Icons/AddIcon';
import { StyledButton, StyledTypography } from './styledComponents';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: string;
    currentValue: string;
}

const TabPanel: React.FC<TabPanelProps> = memo(({ children, value, index, currentValue, ...other }) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== currentValue}
            id={`tools-tab-panel-${index}`}
            aria-labelledby={`tools-tab-${index}`}
            {...other}
        >
            {value === currentValue && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
});

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface TabsComponentProps {
    currentValue: string;
    tabs: Array<{ tabValue: string, tabLabel: string, tabItem: React.ReactNode }>;
    activeStylingEnabled: boolean;
    tabWidth?: number;
    btnCtaText?: string;
    onChange(newValue: string): void;
    btnCta?(): void;
}

export const TabsComponent: React.FC<TabsComponentProps> = memo(({ currentValue, tabs, activeStylingEnabled, tabWidth, btnCtaText, onChange, btnCta }) => {

    const handleChange = async (event: React.SyntheticEvent, newValue: string) => onChange(newValue);

    const renderTabs = () => tabs.map(({ tabLabel, tabValue }, i) =>
        <Tab
            label={tabLabel}
            {...a11yProps(i)}
            sx={{ fontSize: 14, color: 'white', padding: (theme) => theme.spacing(.5, 1.5), minHeight: 34, minWidth: tabWidth ?? 112 }}
            disableFocusRipple
            value={tabValue}
            key={`tab-${tabLabel}-${i}`}
        />
    )

    const renderTabPanels = (currentValue: string) => tabs.map(({ tabValue, tabItem }, i) => <TabPanel value={tabValue} index={i} currentValue={currentValue} key={`${tabValue}-${i}-tabPanel`}>{tabItem}</TabPanel>)

    return (
        <Box sx={{ width: '100%', backgroundColor: '#0e0e0e', color: 'white' }}>
            <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                <Tabs value={activeStylingEnabled ? currentValue : ''} onChange={handleChange} aria-label="" sx={{ minHeight: 34, height: 34, paddingBottom: .5 }}>
                    {renderTabs()}
                </Tabs>
                {btnCta
                    ? <StyledButton onClick={btnCta}>
                        <AddIcon sx={{ fill: 'white', marginRight: .5 }} />
                        <StyledTypography variant="caption">
                            {btnCtaText}
                        </StyledTypography>
                    </StyledButton>
                    : null}
            </Box>
            {renderTabPanels(currentValue)}
        </Box>
    );
});
