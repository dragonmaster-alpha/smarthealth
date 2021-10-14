import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {modalWait} from 'main/wait/WaitModalComponent';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';

/**
 * A dialog to display a message
 *
 * @author Larry 6/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface TermsOfUseDialogProps extends StoreProps
{
    accepted: boolean;
}

@inject('actionStore', 'sessionStore', 'handlers', 'componentStore')
@observer
class TermsOfUseDialog extends React.Component<TermsOfUseDialogProps>
{
    @autobind
    private doAccept()
    {
        const promise = this.props.handlers.sessionHandler.sendAcceptTermsOfUse();
        modalWait(promise, this.props.sessionStore)
            .then(() =>
            {
                this.props.componentStore.modalDialog.close();
            });
    }

    @autobind
    private doClose()
    {
        this.props.componentStore.modalDialog.close();
    }

    @autobind
    private doDecline()
    {
        this.props.actionStore.logout();
    }

    public render()
    {
        const acceptMode = this.props.accepted
            ? 'You have agreed to these Terms of Use'
            : 'By clicking Accept you agree to these Terms of Use';
        const actions = this.props.accepted ? (
            <div>
                <Button label="OK" onClick={this.doClose} />
            </div>
        ) : (
            <div>
                <Button label="Accept" onClick={this.doAccept} />
                <Button label="Decline" onClick={this.doDecline} />
            </div>
        );

        return (
            <Dialog header="Smart Health Terms of Use" visible={true} style={{ width: '40em' }} modal={true}
                onHide={this.doClose} footer={actions} closable={false}>
                <div>
                    {acceptMode}:
                    <ul>
                        <li>
                            You are aware that Patient health information is sensitive data. Its access and use is
                            governed
                            by Commonwealth and state legislation.
                            There may be significant penalties, including large fines and imprisonment, for breaching
                            legislations.
                            All accesses to Smart Health are logged.
                        </li>
                        <li>You will only disclose patient health information to authorised parties.</li>
                        <li>
                            Smart Health allows the capture and export of sensitive patient information to local
                            devices.
                            You will ensure that export and capture of this information is only used where essential,
                            and that measures are taken to ensure that the information is kept secure.
                        </li>
                        <li>You will not share your authentication passwords or codes with any other users.</li>
                        <li>You will log off the system or lock your workstation when you are not using it.</li>
                        <li>You will not share your account with other users, nor will you permit them to use your
                            account.
                        </li>
                        <li>You will ensure that anti-virus or anti-malware applications are installed on your
                            workstation.
                        </li>
                    </ul>
                </div>
            </Dialog>
        );
    }
}

export default TermsOfUseDialog;
