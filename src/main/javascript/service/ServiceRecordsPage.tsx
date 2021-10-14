import {css} from '@emotion/core';
import {background} from 'main/application/ThemeConstants';
import PageDescription from 'main/page/PageDescription';
import ServiceRecordHistoryCollapsable from 'main/service/ServiceRecordHistoryCollapsable';
import ServiceRecordTabs from 'main/service/ServiceRecordTabs';
import StoreProps from 'main/store/StoreProps';
import {grid} from 'main/utility/StyleUtility';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

/**
 * Page to present service record history and opened service records in tabs
 *
 * TODO implement a split pane
 *
 * TODO make program icons into toggle button component and implement filtering - implement :active and :hover
 *
 * TODO program buttons to display when there is a Service in that program for the Patient.
 *
 * @author Larry 25/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export const SERVICE_RECORDS_PAGE: PageDescription = {
    hasServiceRecordList: true,
    key: 'History',
    title: 'Service Records',
    icon: 'history',
    renderPanel: () => <ServiceRecordsPage />,
    visible: ({ sessionStore }) => !!sessionStore.currentPatientID
};

const divStyle = css({
    alignItems: 'stretch',
    backgroundColor: background.main,
    ...grid(null, 'auto 1fr'),
    justifyContent: 'flex-start',
    position: 'relative',
    '>div:last-of-type': {
        marginTop: '-8px'
    }
});

@inject('appStore', 'componentStore')
@observer
class ServiceRecordsPage extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={divStyle}>
                <ServiceRecordHistoryCollapsable />
                <ServiceRecordTabs />
            </div>
        );
    }
}

export default ServiceRecordsPage;
