import AppStore from 'main/store/AppStore';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';

/**
 * Component allowing values to be set in a store
 *
 * @author Larry 30/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface SetStoreProps extends StoreProps
{
    // state is cleared prior to calling set unless this is set
    retainState?: boolean;
    set: (appStore: AppStore) => void;
}

@inject('appStore')
class SetStore extends React.Component<SetStoreProps>
{
    constructor(props)
    {
        super(props);
        this.clearState();
        this.props.set(this.props.appStore);
    }

    public componentDidUpdate(prevProps: Readonly<SetStoreProps>, prevState: Readonly<{}>, snapshot?: any): void
    {
        this.clearState();
        this.props.set(this.props.appStore);
    }

    private clearState()
    {
        if (this.props.retainState)
        {
            return;
        }

        const { appStore } = this.props;
        appStore.sessionStore.loggedOut();
    }

    public render(): React.ReactNode
    {
        return this.props.children;
    }
}

export default SetStore;
