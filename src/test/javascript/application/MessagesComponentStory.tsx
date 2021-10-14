/* tslint:disable:no-increment-decrement */
import {css} from '@emotion/core';
import Button from 'main/component/Button';
import ComponentStore from 'main/store/ComponentStore';
import StoreProps from 'main/store/StoreProps';
import {px} from 'main/utility/StyleUtility';
import {inject} from 'mobx-react';
import React from 'react';
import FullScreen from 'test/container/FullScreen';

/**
 * Storybook tester for message component
 *
 * @author Larry 8/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export default {
    title: 'Application/MessagesComponent'
};

interface MessageButtonProps extends StoreProps
{
    onClick: (componentStore: ComponentStore) => void;
    title: string;
}

@inject('componentStore')
class MessageButton extends React.Component<MessageButtonProps>
{
    public render(): React.ReactNode
    {
        return <Button title={this.props.title} onClick={() => this.props.onClick(this.props.componentStore)} />;
    }
}

const divStyle = css({
    alignItems: 'flex-end',
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    margin: px(8, 32)
});

let count = 1;

export const tester = () => (
    <FullScreen>
        <div css={divStyle}>
            <MessageButton title="Success"
                onClick={(componentStore => componentStore.message.success(`This is success message ${count++}`))} />
            <MessageButton title="Info"
                onClick={(componentStore => componentStore.message.info(`This is info message ${count++}`))} />
            <MessageButton title="Warning"
                onClick={(componentStore => componentStore.message.warning(`This is warning message ${count++}`))} />
            <MessageButton title="Error"
                onClick={(componentStore => componentStore.message.error(`This is error message ${count++}`))} />
            <MessageButton title="TODO"
                onClick={(componentStore => componentStore.message.todo(`This is TODO message ${count++}`))} />
        </div>
    </FullScreen>
);
