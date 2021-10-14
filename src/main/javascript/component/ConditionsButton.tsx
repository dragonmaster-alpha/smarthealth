import {autobind} from 'core-decorators';
import Icon from 'main/component/Icon';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';

/**
 * Render a button with an icon. When clicked will navigate user to the Conditions section for viewing.
 *
 * @author Thompson 27/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore')
class ConditionsButton extends React.Component<StoreProps>
{
    @autobind
    private onClick()
    {
        // TODO add conditionsAction
        this.props.appStore.componentStore.message.todo('Open conditions table');
    }

    public render()
    {
        return (
            <Button label=" " onClick={this.onClick}>
                <Icon name="/patient/conditions" />
            </Button>
        );
    }
}

export default ConditionsButton;
