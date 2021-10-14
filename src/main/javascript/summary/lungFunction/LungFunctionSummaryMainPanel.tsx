import ServiceRecordList from 'main/service/ServiceRecordList';
import ServiceRecordTabs from 'main/service/ServiceRecordTabs';
import StoreProps from 'main/store/StoreProps';
import LungFunctionSummariesPanel from 'main/summary/lungFunction/LungFunctionSummariesPanel';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';

/**
 * Render list of Lung Function services of a patient and Lung Function summaries. Lung Function summaries consist of 2
 * summary tabs Observations and Graph.
 *
 * @author Thompson 24/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore', 'handlers')
@observer
class LungFunctionSummaryMainPanel extends React.Component<StoreProps>
{
    @observable
    private filter: boolean = false;

    public componentDidMount(): void
    {
        this.props.appStore.sessionStore.serviceRecordListStore.filterByServiceTypes([ServiceTypeEnum.LungFunction]);

        this.props.appStore.componentStore.serviceRecordTabStore.closeAllSummaries();
        this.props.appStore.componentStore.serviceRecordTabStore.addSummary({
            key: 'LungFunctionHistoryAndSummary',
            render: () => <LungFunctionSummariesPanel />,
            title: 'Lung Function',
            visible: true
        });
    }

    public render()
    {
        return (
            <div>
                <h1>Lung Function</h1>
                <ServiceRecordList showFilters={this.filter} />
                <ServiceRecordTabs />
            </div>
        );
    }
}

export default LungFunctionSummaryMainPanel;
