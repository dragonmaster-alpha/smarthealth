import * as lodash from 'lodash';
import {isObservableArray, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import HandlerStore from '../store/HandlerStore';
import SessionStore from '../store/SessionStore';

/**
 * Alerts for the current user.
 *
 * @author Larry 14/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('handlers', 'sessionStore')
@observer
class UserAlertsPanel extends React.Component
{
    componentDidMount()
    {
        const { userHandler } = this.props.handlers;
        runInAction(() =>
        {
            this.props.sessionStore.memberAlerts = 'Loading ...';
        });
        userHandler.getMemberAlerts()
            .then(alerts => runInAction(() =>
            {
                this.props.sessionStore.memberAlerts = alerts;
            }))
            .catch(() => runInAction(() =>
            {
                this.props.sessionStore.memberAlerts = 'Error';
            }));
    }

    render()
    {
        const alerts = this.props.sessionStore.memberAlerts;

        let content;
        if (!alerts)
        {
            content = 'Not loaded';
        }
        else if (lodash.isString(alerts))
        {
            content = alerts;
        }
        else if (Array.isArray(alerts) || isObservableArray(alerts))
        {
            // TODO Larry use internationalisation
            if (alerts.length === 0)
            {
                content = 'There are no alerts';
            }
            else if (alerts.length === 1)
            {
                content = 'There is 1 alert';
            }
            else
            {
                content = `There are ${alerts.length} alerts`;
            }
        }
        else
        {
            // TODO Larry exception
            content = `Unknown data type ${typeof alerts}`;
        }

        return (
            <div>
                <h1>Alerts</h1>
                <div>{content}</div>
            </div>
        );
    }
}

UserAlertsPanel.wrappedComponent.propTypes = {
    handlers: PropTypes.instanceOf(HandlerStore).isRequired,
    sessionStore: PropTypes.instanceOf(SessionStore).isRequired
};

export default UserAlertsPanel;
