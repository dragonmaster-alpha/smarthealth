import {css} from '@emotion/core';
import ServiceRecordTabs from 'main/service/ServiceRecordTabs';
import StoreProps from 'main/store/StoreProps';
import MedicationSummaryPanel from 'main/summary/medication/MedicationSummaryPanel';
import {grid} from 'main/utility/StyleUtility';
import {inject} from 'mobx-react';
import React from 'react';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';

/**
 * Display Medication latest and history with service record tab view.
 *
 * @author Thompson 12/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const divStyle = css({
    ...grid(null, 'auto 1fr')
});

@inject('appStore')
class MedicationSummaryMainPanel extends React.Component<StoreProps>
{
    public componentDidMount(): void
    {
        this.props.appStore.sessionStore.serviceRecordListStore.filterByServiceTypes([ServiceTypeEnum.Medication]);
        this.props.appStore.componentStore.serviceRecordTabStore.closeAllSummaries();
    }

    public render()
    {
        return (
            <div css={divStyle}>
                <MedicationSummaryPanel />
                <ServiceRecordTabs />
            </div>
        );
    }
}

export default MedicationSummaryMainPanel;
