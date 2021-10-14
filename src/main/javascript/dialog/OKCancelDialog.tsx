import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';

/**
 * A modal dialog to display a message and handle the selected response
 *
 * @author Larry 10/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface OKCancelDialogProps extends StoreProps
{
    header: string;
    icon?: React.ReactNode;
    message: React.ReactNode;
    onCancel?: () => any;
    onOK: () => any;
}

@inject('componentStore')
@observer
class OKCancelDialog extends React.Component<OKCancelDialogProps>
{
    @autobind
    private onCancel()
    {
        const result = this.props.onCancel && this.props.onCancel();
        this.props.componentStore.modalDialog.close(result);
    }

    @autobind
    private onOK()
    {
        const result = this.props.onOK();
        this.props.componentStore.modalDialog.close(result);
    }

    public render()
    {
        const actions = (
            <div>
                <Button label="OK" onClick={this.onOK} />
                <Button label="Cancel" onClick={this.onCancel} />
            </div>);

        return (
            // Width of the Dialog component cannot be control via css styles, that need to be passed as a value
            <Dialog closable={false} footer={actions} header={this.props.header} modal={true} onHide={this.onCancel}
                style={{ minWidth: '40em' }} visible={true}>
                <div>{this.props.icon} {this.props.message}</div>
            </Dialog>
        );
    }
}

export default OKCancelDialog;
