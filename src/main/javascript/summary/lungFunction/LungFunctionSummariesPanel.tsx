import StoreProps from 'main/store/StoreProps';
import LungFunctionGraphSummaryEntityPanel from 'main/summary/lungFunction/LungFunctionGraphSummaryEntityPanel';
import LungFunctionObservationsSummaryEntityPanel
    from 'main/summary/lungFunction/LungFunctionObservationsSummaryEntityPanel';
import {inject, observer} from 'mobx-react';
import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react';

/**
 * Render Lung Function summaries which consist of 2 summary tabs Observations and Graph.
 *
 * @author Thompson 1/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore')
@observer
class LungFunctionSummariesPanel extends React.Component<StoreProps>
{
    public render()
    {
        return (
            <div>
                <h1>Lung Function Summary</h1>
                <TabView>
                    <TabPanel key="Observations" header="Observations">
                        <LungFunctionObservationsSummaryEntityPanel />
                    </TabPanel>
                    <TabPanel key="Graph" header="Graph">
                        <LungFunctionGraphSummaryEntityPanel />
                    </TabPanel>
                </TabView>
            </div>
        );
    }
}

export default LungFunctionSummariesPanel;
