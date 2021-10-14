import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';

/**
 * A modal dialog to display a message and handle the selected response.
 *
 * This component is almost identical to the OKCancelDialog.
 *
 * @author Thompson 10/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface AcceptCancelDialogProps extends StoreProps
{
    header: string;
    icon?: React.ReactNode;
    maxWidth?: string;
    message: React.ReactNode;
    onAccept: () => any;
    onCancel?: () => any;
}

@inject('componentStore')
@observer
class AcceptCancelDialog extends React.Component<AcceptCancelDialogProps>
{
    @autobind
    private onAccept()
    {
        const result = this.props.onAccept();
        this.props.componentStore.modalDialog.close(result);
    }

    @autobind
    private onCancel()
    {
        const result = this.props.onCancel && this.props.onCancel();
        this.props.componentStore.modalDialog.close(result);
    }

    public render()
    {
        const actions = (
            <div>
                <Button label="Accept" onClick={this.onAccept} />
                <Button label="Cancel" onClick={this.onCancel} />
            </div>
        );

        return (
            // Width of the Dialog component cannot be control via css styles, that need to be passed as a value
            <Dialog closable={false} footer={actions} header={this.props.header} modal={true} onHide={this.onCancel}
                style={{ minWidth: '40em', maxWidth: this.props.maxWidth }} visible={true}>
                <div>{this.props.icon} {this.props.message}</div>
            </Dialog>
        );
    }
}

export default AcceptCancelDialog;
