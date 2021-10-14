/* eslint-disable class-methods-use-this */
import LOG from 'loglevel';

/**
 * A mock ModalDialogStore for use in Storybook classes that records actions
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class MockModalDialogStore
{
    close()
    {
        LOG.debug('SessionStore.modalDialog.close()');
    }

    // eslint-disable-next-line no-unused-vars
    show(modalDialog)
    {
        LOG.debug('SessionStore.modalDialog.show()');
    }
}

export default MockModalDialogStore;
