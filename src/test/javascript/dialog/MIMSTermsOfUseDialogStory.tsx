import {storiesOf} from '@storybook/react';
import MIMSTermsOfUseDialog from 'main/dialog/MIMSTermsOfUseDialog';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';
import SetStore from 'test/component/SetStore';

/**
 * Tester for MIMSTermsOfUseDialogStory.tsx
 *
 * @author Thompson 10/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
async function acceptMIMSLicence(): Promise<boolean>
{
    return new Promise<boolean>(resolve => resolve(true));
}

@inject('componentStore')
class MIMSLicenceDialogOpener extends React.Component<StoreProps>
{
    public render()
    {
        return (
            <Button label="Open MIMS Licence Dialog"
                onClick={() => this.props.componentStore.modalDialog.show(<MIMSTermsOfUseDialog />)} />
        );
    }
}

storiesOf('Dialog', module)
    .add('MIMSTermsOfUseDialog', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicationHandler.acceptMIMSLicence = () => acceptMIMSLicence();

                appStore.componentStore.modalDialog.closeAll();
                appStore.componentStore.modalDialog.show(<MIMSTermsOfUseDialog />);
            }}>
                <MIMSLicenceDialogOpener />
            </SetStore>
        );
    });
