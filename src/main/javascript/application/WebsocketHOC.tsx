import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Higher Order Component to provide a websocket connection
 *
 * @author Larry 20/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('handlers')
@observer
class WebsocketHOC extends React.Component<StoreProps>
{
    public componentDidMount()
    {
        this.props.handlers.websocketHandler.open();
    }

    public componentWillUnmount()
    {
        this.props.handlers.websocketHandler.close();
    }

    public render(): React.ReactNode
    {
        if (this.props.handlers.websocketHandler.online)
        {
            return this.props.children;
        }
        else
        {
            return <div>Websocket is offline</div>;
        }
    }
}

export default WebsocketHOC;
