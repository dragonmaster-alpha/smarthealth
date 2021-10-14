import {autobind} from 'core-decorators';
import Button from 'main/component/Button';
import ProgressBar from 'main/component/ProgressBar';
import {
    STATE_AUTHENTICATE, STATE_CHECK_VERSION, STATE_LOGIN, STATE_OIDC_SETTINGS, STATE_SELECT_MEMBER
} from 'main/store/OIDCStore';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';

import React from 'react';
import LoginGroupsAndLocationsForm from './LoginGroupsAndLocationsForm';
import OIDCLoginController from './OIDCLoginController';

/**
 * Login using OIDC
 *
 * @author Larry 5/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('sessionStore', 'appStore')
@observer
class OIDCLogin extends React.Component<StoreProps>
{
    private controller: OIDCLoginController;

    public componentDidMount()
    {
        this.controller = new OIDCLoginController(this.props.appStore);
        this.controller.initStateMachine();
        if (!this.props.sessionStore.oidcStore.error)
        {
            this.controller.determineState();
        }
    }

    public componentWillUnmount()
    {
        this.controller.close();
    }

    @autobind
    // @ts-ignore
    private onLogin()
    {
        this.props.sessionStore.oidcStore.clear();
        this.controller.determineState();
    }

    public render(): React.ReactNode
    {
        const { oidcStore } = this.props.sessionStore;
        const { state } = oidcStore;
        if (oidcStore.error)
        {
            return this.renderWithLoginButton(oidcStore.error);
        }
        else if (state === STATE_CHECK_VERSION)
        {
            return this.renderWithProgressBar('Loading version details...');
        }
        else if (state === STATE_OIDC_SETTINGS)
        {
            return this.renderWithProgressBar('Loading OIDC Settings...');
        }
        else if (state === STATE_AUTHENTICATE)
        {
            return this.renderWithProgressBar('Loading Smart Auth...');
        }
        else if (state === STATE_LOGIN)
        {
            return this.renderWithProgressBar('Loading Smart Health...');
        }
        else if (state === STATE_SELECT_MEMBER)
        {
            return <LoginGroupsAndLocationsForm controller={this.controller} />;
        }
        else
        {
            return this.renderWithProgressBar('Loading...');
        }
    }

    private renderWithLoginButton(message: string)
    {
        return (
            <div>
                <div style={{ paddingBottom: '12px' }}>{message}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button title="Login" small={true} onClick={this.onLogin} />
                </div>
            </div>
        );
    }

    private renderWithProgressBar(message: string): React.ReactNode
    {
        return (
            <div>
                <div style={{ paddingBottom: '6px' }}>{message}</div>
                <ProgressBar indeterminate={true} />
            </div>
        );
    }
}

export default OIDCLogin;
