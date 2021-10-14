/* eslint-disable react/sort-comp react/no-unused-prop-types */
import {autobind} from 'core-decorators';
import {sortBy} from 'lodash';
import LOG from 'loglevel';
import StoreProps from 'main/store/StoreProps';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {ListBox} from 'primereact/listbox';
import React from 'react';
import OIDCLoginController from './OIDCLoginController';

/**
 * Form as part of OIDCLogin to select medical group and location
 *
 * @author Larry 16/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

interface LoginGroupsAndLocationsFormProps extends StoreProps
{
    controller: OIDCLoginController;
}

@inject('sessionStore')
@observer
class LoginGroupsAndLocationsForm extends React.Component<LoginGroupsAndLocationsFormProps>
{
    @observable
    private groupID: number = null;

    @observable
    private groups: { label: string, value: number }[];

    @observable
    private locationID: number = null;

    @observable
    private locations: { label: string, value: number }[];

    constructor(props)
    {
        super(props);
        this.updateGroups();
        this.updateLocations();
    }

    @autobind
    private doCancel()
    {
        LOG.debug('doCancel()');
        // TODO this method is missing
        // this.props.handlers.sessionHandler.cancelLogin();
        this.props.sessionStore.loggedOut();
    }

    @autobind
    private doLogin()
    {
        this.props.controller.setGroupAndLocation(this.groupID, this.locationID);
    }

    @action.bound
    private onGroupChanged(e)
    {
        this.groupID = e.target.value;
        this.updateLocations();
    }

    @action.bound
    private onLocationChanged(e)
    {
        this.locationID = e.target.value;
    }

    public render(): React.ReactNode
    {
        return (
            <div className="p-grid ct-login-group">
                <div className="p-col-6">
                    Medical Group:
                    <ListBox value={this.groupID} options={this.groups} style={{ width: '100%' }}
                        listStyle={{ maxHeight: '8em' }} onChange={e => this.onGroupChanged(e)} />
                </div>
                <div className="p-col-6">
                    Location:
                    <ListBox value={this.locationID} options={this.locations} style={{ width: '100%' }}
                        listStyle={{ maxHeight: '8em' }} onChange={this.onLocationChanged} />
                </div>
                <div className="p-col-12">
                    <Button label="Login" onClick={this.doLogin} disabled={!this.locationID} />
                    <Button label="Cancel" onClick={this.doCancel} />
                </div>
            </div>
        );
    }

    @action
    private updateGroups()
    {
        const { groupsAndLocations } = this.props.sessionStore.oidcStore;
        const groups = groupsAndLocations.map(group =>
            ({
                label: group.medicalGroup.name,
                value: group.medicalGroup.groupID
            })
        );
        this.groups = sortBy(groups, 'label');
        this.groupID = null;
        if (groups.length === 1)
        {
            this.groupID = groups[0].value;
        }
    }

    @action
    private updateLocations()
    {
        if (this.groupID)
        {
            const { groupsAndLocations } = this.props.sessionStore.oidcStore;
            const group = groupsAndLocations.find(g => this.groupID === g.medicalGroup.groupID);
            if (group.locations.length === 0)
            {
                this.locations = [{ label: group.medicalGroup.city, value: -2 }];
                this.locationID = -2;
            }
            else
            {
                const locations = group.locations.map(l => ({
                    label: l.name,
                    value: l.id
                }));
                this.locations = sortBy(locations, 'label');
                this.locationID = null;
            }
        }
        else
        {
            this.locations = [];
        }
    }
}

export default LoginGroupsAndLocationsForm;
