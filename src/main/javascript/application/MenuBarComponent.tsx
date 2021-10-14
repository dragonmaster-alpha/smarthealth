import {autobind} from 'core-decorators';
import AboutOverviewDialog from 'main/about/AboutOverviewDialog';
import TermsOfUseDialog from 'main/dialog/TermsOfUseDialog';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import {Menubar} from 'primereact/menubar';
import React from 'react';

/**
 * MenuBar Component of the Application
 *
 * TODO Larry - this code is not sustainable for a large menu - need to work out how to do this better
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('appStore')
@observer
class MenuBarComponent extends React.Component<StoreProps>
{
    @autobind
    private getItems()
    {
        const { appStore } = this.props;
        return [
            {
                label: 'File',
                items: [
                    { label: 'Logout', command: () => appStore.actionStore.logout() }
                ]
            },
            {
                label: 'Patient',
                items: [
                    {
                        label: 'New Patient',
                        command: () => appStore.actionStore.createNewPatient()
                    },
                    {
                        label: 'Open Patient',
                        command: () => appStore.actionStore.openPatient()
                    },
                    {
                        label: 'Close Patient',
                        command: () => appStore.actionStore.closePatient()
                    }
                ]
            },
            {
                label: 'Tools',
                items: [
                    {
                        label: 'Change password',
                        command: () => appStore.componentStore.message.todo('show change password component')
                    }
                ]
            },
            {
                label: 'Help',
                items: [
                    {
                        label: 'Terms of use ',
                        command: () => appStore.componentStore.modalDialog.show(<TermsOfUseDialog accepted={true} />)
                    },
                    {
                        label: 'User Guide',
                        command: () => window.open(
                            `https://${window.location.hostname || 'localhost'}/smarthealth/userguide.pdf`,
                            '_blank')
                            .focus()
                    },
                    {
                        label: 'Release Notes ',
                        command: () => window.open('https://www.smarthealth.com.au/release-notes', '_blank')
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'About',
                        command: () => appStore.componentStore.modalDialog.show(<AboutOverviewDialog />)
                    }
                ]
            }
        ];
    }

    public render()
    {
        return (
            <nav>
                <Menubar model={this.getItems()} />
            </nav>
        );
    }
}

export default MenuBarComponent;
