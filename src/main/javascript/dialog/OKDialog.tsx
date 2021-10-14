import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';

/**
 * A modal dialog to display a message
 *
 * @author Larry 6/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface OKDialogProps extends StoreProps
{
    header: string;
    icon?: React.ReactNode;
    message: React.ReactNode;
}

@inject('componentStore')
@observer
class OKDialog extends React.Component<OKDialogProps>
{
    @autobind
    private doClose()
    {
        this.props.componentStore.modalDialog.close();
    }

    public render()
    {
        const actions = (
            <div>
                <Button label="OK" onClick={this.doClose} />
            </div>);

        return (
            // Width of the Dialog component cannot be control via css styles, that need to be passed as a value
            <Dialog header={this.props.header} className="ct-ok-dialog" visible={true} style={{ width: '40em' }}
                modal={true} onHide={this.doClose} footer={actions} closable={false}>
                <div>{this.props.icon} {this.props.message}</div>
            </Dialog>
        );
    }
}

export default OKDialog;
