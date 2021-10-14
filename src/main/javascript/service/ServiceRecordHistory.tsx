import {background, colour, font} from 'main/application/ThemeConstants';
import ServiceRecordHistoryToolbar from 'main/service/ServiceRecordHistoryToolbar';
import ServiceRecordList from 'main/service/ServiceRecordList';
import StoreProps from 'main/store/StoreProps';
import {border, grid} from 'main/utility/StyleUtility';
import {inject} from 'mobx-react';
import * as React from 'react';

/**
 * Display the list of service records for the patient.
 *
 * TODO this is just glue code until we rewrite ServiceRecordList
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore', 'componentStore')
class ServiceRecordHistory extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return (
            <div style={{ borderBottom: border(colour.border) }}>
                <div style={{ ...grid('1fr auto'), padding: '4px', backgroundColor: background.white }}>
                    <span style={{ font: font.h2 }}>Service Records</span>
                    <ServiceRecordHistoryToolbar />
                </div>
                <ServiceRecordList showFilters={false} />
            </div>
        );
    }
}

export default ServiceRecordHistory;
