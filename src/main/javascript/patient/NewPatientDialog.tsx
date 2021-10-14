import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';

/**
 * Create a new patient
 *
 * TODO This is currently a demonstration of how to create a modal dialog. The new patient function needs to be
 * implemented.
 *
 * @author Larry 19/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('componentStore')
@observer
class NewPatientDialog extends React.Component<StoreProps>
{
    @autobind
    private onCancel()
    {
        this.props.componentStore.modalDialog.close();
    }

    @autobind
    private onCreate()
    {
        // TODO really create a patient
        this.props.componentStore.modalDialog.close();
    }

    public render(): React.ReactNode
    {
        const buttons = (
            <div>
                <Button label="Create" onClick={this.onCreate} />
                <Button label="Cancel" onClick={this.onCancel} />
            </div>
        );

        return (
            // @ts-ignore
            <Dialog header="New Patient" footer={buttons} visible={true} modal={true} width="350px"
                onHide={this.onCancel}>
                TODO New patient form
            </Dialog>
        );
    }
}

export default NewPatientDialog;
