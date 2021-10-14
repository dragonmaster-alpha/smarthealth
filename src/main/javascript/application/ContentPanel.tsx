import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * The main part of the screen displays the content of the application. What is displayed depends on the nav
 * tree node selected.
 *
 * @author Larry 06/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
@inject('componentStore')
@observer
class ContentPanel extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        const { currentPage } = this.props.componentStore;
        if (!currentPage)
        {
            return <div>No page selected</div>;
        }
        else if (currentPage.renderPanel)
        {
            return currentPage.renderPanel();
        }
        else
        {
            return <div>TODO {currentPage.title}</div>;
        }
    }
}

export default ContentPanel;
