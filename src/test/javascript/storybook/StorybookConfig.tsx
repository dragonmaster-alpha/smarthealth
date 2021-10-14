import HandlerStore from 'main/store/HandlerStore';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

/**
 * Extra configuration for storybook stories
 *
 * @author Larry 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface StorybookConfigProps
{
    handlerStore?: HandlerStore;
}

@inject('handlerStore')
@observer
class StorybookConfig extends React.Component<StorybookConfigProps>
{
    @action
    public componentDidMount(): void
    {
        this.props.handlerStore.websocketHandler.online = true;
    }

    public render(): React.ReactNode
    {
        return this.props.children;
    }
}

export default StorybookConfig;
