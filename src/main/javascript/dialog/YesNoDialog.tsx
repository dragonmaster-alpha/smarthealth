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
interface YesNoDialogProps extends StoreProps
{
    header: string;
    icon: React.ReactNode;
    message: React.ReactNode;
    onNo?: () => any;
    onYes: () => any;
}

@inject('componentStore')
@observer
class YesNoDialog extends React.Component<YesNoDialogProps>
{
    @autobind
    private onNo()
    {
        const result = this.props.onNo && this.props.onNo();
        this.props.componentStore.modalDialog.close(result);
    }

    @autobind
    private onYes()
    {
        const result = this.props.onYes();
        this.props.componentStore.modalDialog.close(result);
    }

    public render()
    {
        const actions = (
            <div>
                <Button label="Yes" onClick={this.onYes} />
                <Button label="No" onClick={this.onNo} />
            </div>);

        return (
            <Dialog header={this.props.header} className="ct-ok-dialog" visible={true} style={{ width: '40em' }}
                modal={true} onHide={this.onNo} footer={actions} closable={false}>
                <div>{this.props.icon} {this.props.message}</div>
            </Dialog>
        );
    }
}

export default YesNoDialog;
