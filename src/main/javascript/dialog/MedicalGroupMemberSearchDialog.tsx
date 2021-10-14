import classNames from 'classnames';
import {autobind} from 'core-decorators';
import MedicalGroupIconAndName from 'main/component/MedicalGroupIconAndName';
import UserIconAndName from 'main/component/UserIconAndName';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import StoreProps from 'main/store/StoreProps';
import {action, computed, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {ListBox} from 'primereact/listbox';
import React from 'react';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';
import MedicalGroupMemberDigest from 'smarthealth-javascript/MedicalGroupMemberDigest';
import MemberID from 'smarthealth-javascript/MemberID';
import {roleDescriptions} from 'smarthealth-javascript/Role';
import UserDigest from 'smarthealth-javascript/UserDigest';

/**
 * Medial Group Search Dialog. Usually loaded from MemberField.
 *
 * @author Larry 8/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MedicalGroupMemberSearchDialogProps extends StoreProps
{
    // use onSelect(null) to remove selection
    onSelect: (memberID: MemberID) => void;
}

@inject('appStore')
@observer
class MedicalGroupMemberSearchDialog extends React.Component<MedicalGroupMemberSearchDialogProps>
{
    @observable
    private inputSearch: string = '';

    @observable
    private medicalGroupSelection: MedicalGroupMemberDigest;

    @observable
    private searchList: MedicalGroupMemberDigest[];

    @observable
    private userSelection: UserDigest;

    @computed
    private get medicalGroupMemberDescription(): string
    {
        if (!this.userSelection || !this.medicalGroupSelection)
        {
            return '';
        }
        const { city, phone, name } = this.medicalGroupSelection.medicalGroupDigest;
        const role = this.medicalGroupSelection.role
            ? ` ${roleDescriptions[this.medicalGroupSelection.role]} @`
            : '';
        return `(${role} ${name}, ${city}, ${phone} )`;
    }

    @observable
    private createMedicalGroupOptions(): { label: MedicalGroupDigest, value: MedicalGroupMemberDigest }[]
    {
        if (!this.userSelection)
        {
            return [];
        }

        const medicalGroupOptions = [];
        this.searchList.forEach(medicalGroupMember =>
        {
            if (medicalGroupMember.userDigest.userID === this.userSelection.userID)
            {
                medicalGroupOptions.push({ label: medicalGroupMember.medicalGroupDigest, value: medicalGroupMember });
            }
        });

        return medicalGroupOptions;
    }

    private createUserOptions(): { label: UserDigest, value: UserDigest }[]
    {
        if (!this.searchList)
        {
            return [];
        }

        const users: { [key: string]: UserDigest } = {};
        this.searchList.forEach(medicalGroupMember =>
        {
            if (!users[medicalGroupMember.userDigest.userID])
            {
                users[medicalGroupMember.userDigest.userID] = medicalGroupMember.userDigest;
            }
        });

        return Object.keys(users)
            .map((key) => ({ label: users[key], value: users[key] }));
    }

    @autobind
    private onCancel()
    {
        this.props.appStore.componentStore.modalDialog.close();
        this.props.onSelect(null);
    }

    @autobind
    private onClickCreateNewUser()
    {
        // TODO
        this.props.appStore.componentStore.message.todo('create new user');
    }

    @autobind
    private onClickOtherMedicalGroup()
    {
        // TODO
        this.props.appStore.componentStore.message.todo('other medical group');
    }

    @action.bound
    private async onClickSearch()
    {
        this.searchList = [];

        if (this.inputSearch.length < 2)
        {
            this.props.appStore.componentStore.modalDialog.show(<OKDialog header="Select Provider"
                icon={DialogIcons.info} message="Please complete the search field before searching" />);
            return;
        }

        const result = await this.props.appStore.handlers.medicalGroupMemberHandler
            .findMedicalGroupMemberByFamilyName(this.inputSearch);
        if (result.length === 0)
        {
            this.props.appStore.componentStore.modalDialog.show(<OKDialog header="Select Provider"
                icon={DialogIcons.info} message={`No providers found matching: ${this.inputSearch}`} />);
        }
        else
        {
            runInAction(() => this.searchList = result);
        }
    }

    @autobind
    private onClickSelectMedicalGroupMember()
    {
        this.props.appStore.componentStore.modalDialog.close();
        const memberID: MemberID = {
            userID: this.userSelection.userID, groupID: this.medicalGroupSelection.medicalGroupDigest.groupID
        };
        this.props.onSelect(memberID);
        this.props.appStore.handlers.medicalGroupMemberHandler.addMedicalGroupMemberRecent(memberID);
    }

    @action.bound
    private onInputSearchChange(event)
    {
        this.inputSearch = event.target.value;
    }

    @action.bound
    private onListChange(event)
    {
        this[event.target.id] = event.target.value;
    }

    @action.bound
    private onUserListChange(event)
    {
        this.medicalGroupSelection = null;
        this.onListChange(event);
    }

    public render(): React.ReactNode
    {
        const acceptButtonDisabled = !!(!this.medicalGroupSelection || !this.userSelection);
        const actions = (
            <>
                <Button label="Accept" disabled={acceptButtonDisabled} onClick={this.onClickSelectMedicalGroupMember} />
                <Button label="Cancel" onClick={this.onCancel} />
            </>
        );

        const inputSearchValidity = this.inputSearch.length > 1;

        // TODO search input padding
        return (
            <Dialog header="Select Provider" visible={true} modal={true} onHide={this.onCancel}
                footer={actions} closable={false}>
                <div className="cp-medicalGroupMemberSearchDialog">
                    <div className="cp-medicalGroupMemberSearchDialog-section">
                        <h4>User</h4>
                        <div className="cp-medicalGroupMemberSearchDialog-search">
                            <InputText className={classNames({ 'p-error': !inputSearchValidity })}
                                id="search" onChange={this.onInputSearchChange} value={this.inputSearch} />
                            <Button label="Search" onClick={this.onClickSearch} />
                        </div>
                        <ListBox
                            className="cp-medicalGroupMemberSearchDialog-listBox cp-medicalGroupMemberSearchDialog-user"
                            id="userSelection" options={this.createUserOptions()} itemTemplate={this.renderUserLabel}
                            onChange={this.onUserListChange} value={this.userSelection} />
                        <Button className="listButton" label="New User" onClick={this.onClickCreateNewUser} />
                    </div>
                    <div className="cp-medicalGroupMemberSearchDialog-section">
                        <h4>Medical Group</h4>
                        <ListBox
                            className="cp-medicalGroupMemberSearchDialog-listBox
                            cp-medicalGroupMemberSearchDialog-medicalGroup"
                            id="medicalGroupSelection" itemTemplate={this.renderMedicalGroupLabel}
                            options={this.createMedicalGroupOptions()} onChange={this.onListChange}
                            value={this.medicalGroupSelection} />
                        <Button className="listButton" label="Other Medical Group"
                            onClick={this.onClickOtherMedicalGroup} />
                    </div>
                </div>
                {this.renderMedicalGroupInformation()}
            </Dialog>
        );
    }

    private renderMedicalGroupInformation()
    {
        if (!this.userSelection || !this.medicalGroupSelection)
        {
            return <span>Please select a User and a Medical Group.</span>;
        }

        return (
            <>
                <UserIconAndName key="UserIconAndName" user={this.userSelection} />
                <span key="medicalGroupMemberDescription">
                     &nbsp;{this.medicalGroupMemberDescription}
                </span>
            </>
        );
    }

    private renderMedicalGroupLabel(item: { label: MedicalGroupMemberDigest, value: MedicalGroupMemberDigest })
    {
        const role = roleDescriptions[item.value.role]
            ? ` ${roleDescriptions[item.value.role]} @`
            : '';
        return (
            <div className="cp-medicalGroupMemberSearchDialog-medicalGroupLabel">
                <MedicalGroupIconAndName medicalGroup={item.value.medicalGroupDigest} />
                <span>
                     &nbsp;({role} {item.value.medicalGroupDigest.city}, {
                    item.value.medicalGroupDigest.phone} )
                </span>
            </div>
        );
    }

    private renderUserLabel(item: { label: UserDigest, value: UserDigest })
    {
        return <UserIconAndName user={item.value} />;
    }
}

export default MedicalGroupMemberSearchDialog;
