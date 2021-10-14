import ActionStore from 'main/store/ActionStore';
import AppStore from 'main/store/AppStore';
import ComponentStore from 'main/store/ComponentStore';
import EntityCache from 'main/store/EntityCache';
import HandlerStore from 'main/store/HandlerStore';
import SessionStore from 'main/store/SessionStore';

/**
 * Standard interface for properties for stores
 *
 * @author Larry 15/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface StoreProps
{
    actionStore?: ActionStore;
    appStore?: AppStore;
    componentStore?: ComponentStore;
    entityCache?: EntityCache;
    handlers?: HandlerStore;
    sessionStore?: SessionStore;
}

export default StoreProps;
