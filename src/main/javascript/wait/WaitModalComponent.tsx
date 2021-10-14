import {css} from '@emotion/core';
import SessionStore from 'main/store/SessionStore';
import {Dialog} from 'primereact/dialog';
import {ProgressBar} from 'primereact/progressbar';
import {ProgressSpinner} from 'primereact/progressspinner';
import React from 'react';

/**
 * A modal component to show that the application is busy.
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const spinnerStyle = css({
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
});

class WaitModalComponent extends React.Component
{
    public render(): React.ReactNode
    {
        // TODO? after a time show the dialog
        // eslint-disable-next-line no-constant-condition
        if (false)
        {
            return (
                <Dialog header="Communicating with server" visible={true} modal={true}
                    closable={false} onHide={() => null}>
                    <ProgressBar mode="indeterminate" />
                </Dialog>
            );
        }
        else
        {
            return <div css={spinnerStyle} id="layout-overlay"><ProgressSpinner strokeWidth="5px" /></div>;
        }
    }
}

/**
 * Wrap a promise or an async function so that it displays the WaitModalComponent.
 *
 * TODO change parameter to appStore, or use actionStore
 */
export async function modalWait<T>(promise: Promise<T>, sessionStore: SessionStore): Promise<T>
{
    sessionStore.appStore.componentStore.modalDialog.show(<WaitModalComponent />);
    try
    {
        return await Promise.resolve(promise);
    }
    finally
    {
        sessionStore.appStore.componentStore.modalDialog.close();
    }
}

export default WaitModalComponent;
