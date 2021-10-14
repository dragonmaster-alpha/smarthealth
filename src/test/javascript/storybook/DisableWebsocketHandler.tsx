import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Disable the WebsocketStore so it doesn't produce lots of messages during testing.
 *
 * @author Larry 1/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('handlers')
class DisableWebsocketHandler extends React.Component<StoreProps>
{
    public componentDidMount()
    {
        this.props.handlers.websocketHandler.subscribe = () =>
        {
            // disable the method
        };
        this.props.handlers.websocketHandler.unsubscribe = () =>
        {
            // disable the method
        };
    }

    public render()
    {
        return this.props.children;
    }
}

export default DisableWebsocketHandler;
