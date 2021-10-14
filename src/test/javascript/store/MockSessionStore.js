/* eslint-disable class-methods-use-this */
import {readonly} from 'core-decorators';
import LOG from 'loglevel';
import MockModalDialogStore from './MockModalDialogStore';

/**
 * A mock SessionStore for use in Storybook classes that records actions
 *
 * TODO see if we can getCache storybook actions to work
 *
 * @author Larry 19/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class MockSessionStore
{
    currentGroupID;

    @readonly modalDialog = new MockModalDialogStore(this);

    constructor(props)
    {
        Object.assign(this, props);
        LOG.debug(this);
    }

    hasClinicalPermission()
    {
        return true;
    }

    login(user)
    {
        LOG.debug(`SessionStore.login(${user})`);
    }

    openPatient()
    {
        LOG.debug('SessionStore.openPatient()');
    }
}

export default MockSessionStore;
