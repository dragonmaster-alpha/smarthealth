import ActionStore from 'main/store/ActionStore';
import ComponentStore from 'main/store/ComponentStore';
import DateTimeService from 'main/store/DateTimeService';
import EntityCache from 'main/store/EntityCache';
import HandlerStore from 'main/store/HandlerStore';
import I18nStore from 'main/store/I18nStore';
import SessionStore from 'main/store/SessionStore';

/**
 * Base Store for the application
 *
 * TODO migrate other stores into here as the only store
 *
 * @author Larry 6/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class AppStore
{
    public readonly actionStore: ActionStore;

    public readonly componentStore: ComponentStore;

    public readonly dateTime: DateTimeService;

    public readonly entityCache: EntityCache;

    public readonly handlers: HandlerStore;

    public readonly i18nStore: I18nStore;

    public readonly sessionStore: SessionStore;

    constructor()
    {
        this.actionStore = new ActionStore(this);
        this.componentStore = new ComponentStore(this);
        this.dateTime = new DateTimeService();
        this.handlers = new HandlerStore(this);
        this.entityCache = new EntityCache(this, this.handlers);
        this.i18nStore = new I18nStore();
        this.sessionStore = new SessionStore(this);
    }
}

export default AppStore;
