import {isIDPair} from 'main/data/IDPair';
import IDType, {isMemberID} from 'main/data/IDType';
import WebsocketHandler from 'main/handler/WebsocketHandler';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * A service for a cache to subscribe to updates
 *
 * @author Larry 4/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class SubscriptionService
{
    private readonly type: EntityType;

    private readonly websocketHandler: WebsocketHandler;

    constructor(type: EntityType, websocketHandler: WebsocketHandler)
    {
        this.type = type;
        this.websocketHandler = websocketHandler;
    }

    public subscribe(id: IDType)
    {
        if (isIDPair(id))
        {
            this.websocketHandler.subscribe(this.type, id.id, id.associatedID);
        }
        else if (isMemberID(id))
        {
            this.websocketHandler.subscribe(this.type, id.groupID, id.userID);
        }
        else
        {
            this.websocketHandler.subscribe(this.type, id);
        }
    }

    public unsubscribe(id: IDType)
    {
        if (isIDPair(id))
        {
            this.websocketHandler.unsubscribe(this.type, id.id, id.associatedID);
        }
        else if (isMemberID(id))
        {
            this.websocketHandler.unsubscribe(this.type, id.groupID, id.userID);
        }
        else
        {
            this.websocketHandler.unsubscribe(this.type, id);
        }
    }
}

export default SubscriptionService;
