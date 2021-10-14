import LOG from 'loglevel';
import handleEvent from 'main/handler/ServerEventHandler';
import HandlerStore from 'main/store/HandlerStore';
import {action, observable, runInAction} from 'mobx';
import EntityType from 'smarthealth-javascript/EntityType';
import WebUIMessage from 'smarthealth-javascript/WebUIMessage';
import WebUIMessageType from 'smarthealth-javascript/WebUIMessageType';
import SockJS from 'sockjs-client';

/**
 * Handle the websocket connection
 *
 * @author Larry 20/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class WebsocketHandler
{
    private readonly handlers: HandlerStore;

    @observable
    public online: Boolean;

    private pinger;

    private websocket: WebSocket;

    private websocketCount: number;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    @action
    public close()
    {
        if (this.websocket)
        {
            this.websocket.close();
            this.websocket = undefined;
            this.online = false;
        }
        if (this.pinger)
        {
            clearInterval(this.pinger);
            this.pinger = undefined;
        }
    }

    public open()
    {
        const hostname = window.location.hostname || 'localhost';
        const { sessionID } = this.handlers.appStore.sessionStore;
        const url = `https://${hostname}/smarthealth-server/rest/websocket?sessionID=${sessionID}`;
        LOG.debug(`Starting websocket to ${url}`);
        this.websocketCount = 1;
        this.websocket = new SockJS(url);
        this.websocket.onopen = () =>
        {
            runInAction(() =>
            {
                this.online = true;
                const { currentGroupID, currentUserID } = this.handlers.appStore.sessionStore;
                this.subscribe(EntityType.MedicalGroup, currentGroupID);
                this.subscribe(EntityType.User, currentUserID);
            });
        };
        this.websocket.onclose = () =>
        {
            this.close();
        };
        this.websocket.onmessage = (e) =>
        {
            const message: WebUIMessage = JSON.parse(e.data);
            if (message)
            {
                this.processMessage(message);
            }
        };
        this.websocket.onerror = (e) =>
        {
            LOG.debug(`websocket.onerror ${e}`);
        };

        this.pinger = setInterval(() =>
        {
            this.ping();
        }, 15000);
        this.ping();
    }

    private ping()
    {
        this.send({ type: WebUIMessageType.Ping, count: this.websocketCount });
        this.websocketCount += 1;
    }

    public processMessage(message: WebUIMessage)
    {
        switch (message.type)
        {
        case WebUIMessageType.Event:
            handleEvent(message.payload);
            break;
        case WebUIMessageType.Ping:
            // ignore
            break;
        case WebUIMessageType.EntityChanged:
            this.handlers.appStore.entityCache.entityChanged(message.subscription);
            break;
        default:
            LOG.warn(`Unhandled message type ${message.type}`);
        }
    }

    public send(message: WebUIMessage)
    {
        if (!this.online)
        {
            // TODO consider queueing messages for when websocket is online
            // throw Error('Websocket offline');
            // LOG.warn('Trying to send while Websocket is offline');
            return;
        }
        const { readyState } = this.websocket;
        // TODO from some reason WebSocket.OPEN is undefined some of the time
        if (WebSocket.OPEN && (readyState !== WebSocket.OPEN))
        {
            this.close();
            throw Error(`Websocket invalid state ${readyState}`);
        }

        this.websocket.send(JSON.stringify(message));
    }

    public subscribe(type: EntityType, id: number | string, associatedID?: number | string)
    {
        this.send({ type: WebUIMessageType.Subscribe, subscription: { type, id, associatedID } });
    }

    public unsubscribe(type: EntityType, id: number | string, associatedID?: number | string)
    {
        this.send({ type: WebUIMessageType.Unsubscribe, subscription: { type, id, associatedID } });
    }
}

export default WebsocketHandler;
