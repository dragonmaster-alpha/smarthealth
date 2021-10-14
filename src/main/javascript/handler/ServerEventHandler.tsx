import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import * as React from 'react';

/**
 * Handle events sent from the server. Javascript so JEST doesn't barf (this has been solved).
 *
 * @author Larry 4/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
function handleEvent(event)
{
    // only event expected at the moment is ShutdownEvent
    const message = `
            Smart Health is shutting down in ${event.minutes} minutes for ${event.reason}.
            Please save your work and log out.
        `;
    this.handlers.sessionStore.modalDialog.show(
        <OKDialog header="Shutdown" message={message} icon={DialogIcons.warn} />
    );
}

export default handleEvent;
