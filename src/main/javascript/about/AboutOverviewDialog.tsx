import AboutBrowserPanel from 'main/about/AboutBrowserPanel';
import AboutPanel from 'main/about/AboutPanel';
import OKDialog from 'main/dialog/OKDialog';
import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react';

/**
 * Display a tabbed view of the system diagnostics.
 *
 * @author Thompson 27/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class AboutOverviewDialog extends React.Component
{
    public render()
    {
        return (
            <OKDialog header="About" message={
                <TabView>
                    <TabPanel header="Smart Health">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutPanel title="Smart Health" target="SmartHealth" />
                        </div>
                    </TabPanel>
                    <TabPanel header="Smart PMI">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutPanel title="Smart PMI" target="SmartPMI" />
                        </div>
                    </TabPanel>
                    <TabPanel header="Smart Auth">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutPanel title="Smart Auth" target="SmartAuth" />
                        </div>
                    </TabPanel>
                    <TabPanel header="Browser">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutBrowserPanel />
                        </div>
                    </TabPanel>
                    <TabPanel header="MIMS">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutPanel title="MIMS" target="Mims" />
                        </div>
                    </TabPanel>
                    <TabPanel header="SNOMED">
                        <div className="cp-AboutOverviewDialog-content">
                            <AboutPanel title="SNOMED" target="Snomed" />
                        </div>
                    </TabPanel>
                </TabView>
            } />
        );
    }
}

export default AboutOverviewDialog;
