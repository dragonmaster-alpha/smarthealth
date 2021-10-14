import AppStore from 'main/store/AppStore';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';

/**
 * Allow story to use stores.
 *
 * Use <SetStore/> to initialise or moc the stores
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface WithStoreProps extends StoreProps
{
    render: (appStore: AppStore) => React.ReactNode;
}

@inject('appStore')
class WithStore extends React.Component<WithStoreProps>
{
    public render(): React.ReactNode
    {
        return this.props.render(this.props.appStore);
    }
}

export default WithStore;
