import ServiceRecordList from 'main/service/ServiceRecordList';
import ServiceRecordTabs from 'main/service/ServiceRecordTabs';
import StoreProps from 'main/store/StoreProps';
import PathologySummariesEntityPanel from 'main/summary/pathology/PathologySummariesEntityPanel';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';

/**
 * Render list of pathology services of a patient and pathology summaries. pathology summaries consist of 3 summary tabs
 * pathology, Renal pathology and pathology Renal Transplant.
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3187
 *
 * @author Thompson 24/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore')
@observer
class PathologyHistoryAndSummary extends React.Component<StoreProps>
{
    @observable
    private filter: boolean = false;

    public componentDidMount()
    {
        this.props.appStore.sessionStore.serviceRecordListStore.filterByServiceTypes([ServiceTypeEnum.Pathology]);
        this.props.appStore.componentStore.serviceRecordTabStore.closeAllSummaries();
        this.props.appStore.componentStore.serviceRecordTabStore.addSummary({
            key: 'PathologyHistoryAndSummary',
            render: () => <PathologySummariesEntityPanel />,
            title: 'Pathology Summary',
            visible: true
        });
    }

    public render()
    {
        // TODO do filter for all pathology services
        return (
            <div>
                <h1>Pathology</h1>
                <ServiceRecordList showFilters={this.filter} />
                <ServiceRecordTabs />
            </div>
        );
    }
}

export default PathologyHistoryAndSummary;
