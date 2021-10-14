import ErrorBoundary from 'main/component/ErrorBoundary';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Manage the display of a modal dialog box.
 *
 * @author Larry 19/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('componentStore')
@observer
class ModalDialogs extends React.Component<StoreProps>
{
    public render()
    {
        const { modalDialog } = this.props.componentStore;
        if (!modalDialog.empty)
        {
            return modalDialog.map((d, i) => <ErrorBoundary key={i}>{d}</ErrorBoundary>);
        }
        else
        {
            return null;
        }
    }
}

export default ModalDialogs;
