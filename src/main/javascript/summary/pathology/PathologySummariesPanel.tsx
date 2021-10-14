import StoreProps from 'main/store/StoreProps';
import PathologySummaryFilteredTable from 'main/summary/pathology/PathologySummaryFilteredTable';
import PathologySummaryPanel from 'main/summary/pathology/PathologySummaryPanel';
import {observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import FilteredPathologyType from 'smarthealth-javascript/FilteredPathologyType';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';

/**
 * Render pathology summaries which consist of 3 summary tabs Pathology, Renal pathology and Pathology Renal Transplant.
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1744
 *
 * Viewing of Renal pathology and Pathology Renal Transplant tabs are controlled by the View Permissions and if it
 * the summary contains data to be displayed.
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3390
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3467
 *
 * @author Thompson 1/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface TabPanelContent
{
    name: string;
    summaryPanel: React.ReactNode;
    visible: boolean;
}

interface PathologySummariesPanelProps extends StoreProps
{
    data: PathologySummaryData;
}

@inject('entityCache', 'handlers', 'sessionStore')
@observer
class PathologySummariesPanel extends React.Component<PathologySummariesPanelProps>
{
    @observable
    private renalTabVisibility: boolean = this.props.sessionStore.hasClinicalPermission(
        ClinicalPermission.ViewPathologySummary);

    @observable
    private renalTransplantTabVisibility: boolean = this.props.sessionStore.hasClinicalPermission(
        ClinicalPermission.ViewRenalTransplantPathologySummary);

    public async componentDidMount()
    {
        const results = await Promise.all([
            this.props.handlers.pathologyHandler.getPathologyFilteredBy(FilteredPathologyType.Renal),
            this.props.handlers.pathologyHandler.getPathologyFilteredBy(FilteredPathologyType.RenalTransplant)
        ]);
        runInAction(() =>
        {
            this.renalTabVisibility = results[0].results.length > 0;
            this.renalTransplantTabVisibility = results[1].results.length > 0;
        });
    }

    public render()
    {
        const tabs: TabPanelContent[] = [];
        tabs.push({
            name: 'Pathology',
            visible: this.props.sessionStore.hasClinicalPermission(ClinicalPermission.ViewPathologySummary),
            summaryPanel: <PathologySummaryPanel data={this.props.data} />
        });
        tabs.push({
            name: 'Renal Pathology',
            visible: this.renalTabVisibility,
            summaryPanel: <PathologySummaryFilteredTable filterType={FilteredPathologyType.Renal} />
        });
        tabs.push({
            name: 'Renal Transplant Pathology',
            visible: this.renalTransplantTabVisibility,
            summaryPanel: <PathologySummaryFilteredTable filterType={FilteredPathologyType.RenalTransplant} />
        });

        return (
            <div>
                <h1>Pathology Summary</h1>
                <TabView renderActiveOnly={false}>
                    {tabs.filter(tab => tab.visible)
                        .map(tab => this.renderTabPanel(tab))}
                </TabView>
            </div>
        );
    }

    private renderTabPanel(tab: TabPanelContent)
    {
        return (
            <TabPanel key={tab.name} header={tab.name}>
                <h2>{tab.name}</h2>
                {tab.summaryPanel}
            </TabPanel>
        );
    }
}

export default PathologySummariesPanel;
