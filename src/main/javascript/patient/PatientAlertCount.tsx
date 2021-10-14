import AlertCount from 'main/component/AlertCount';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Count of patient alerts
 *
 * @author Larry 4/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
@inject('sessionStore')
@observer
class PatientAlertCount extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return <AlertCount count={this.props.sessionStore.patientAlertCount} />;
    }
}

export default PatientAlertCount;
