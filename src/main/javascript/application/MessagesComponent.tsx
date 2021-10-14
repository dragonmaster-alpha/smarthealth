import {css} from '@emotion/core';
import {background, colour, field, font, zIndex} from 'main/application/ThemeConstants';
import CloseButton from 'main/component/CloseButton';
import StoreProps from 'main/store/StoreProps';
import AutoCloser from 'main/utility/AutoCloser';
import {grid, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Display messages/toasts/growls
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const DISPLAY_SECONDS = 10;

const messagesStyle = css({
    position: 'absolute',
    bottom: '48px',
    right: '32px',
    zIndex: zIndex.toast
});

const messageStyle = css({
    backgroundColor: background.white,
    borderRadius: field.borderRadius,
    minHeight: '40px',
    width: '240px',
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.2)',
    margin: px(8, 0),
    padding: '4px',
    ...grid('1fr auto', 'auto auto')
});

const titleStyle = css({
    font: font.label,
    i: {
        marginRight: '4px'
    },
    '.fa-times-circle': {
        color: colour.error
    },
    '.fa-exclamation-circle': {
        color: colour.warning
    },
    '.fa-check-circle': {
        color: colour.success
    },
    '.fa-info-circle': {
        color: colour.cool
    }
});

const textStyle = css({
    font: font.text,
    gridColumnEnd: 'span 2'
});

@inject('componentStore')
@observer
class MessagesComponent extends React.Component<StoreProps>
{
    private autoCloser = new AutoCloser();

    @observable
    private messages = [];

    public componentDidMount(): void
    {
        this.autoCloser.createMobXAutorun(() =>
        {
            const { componentStore } = this.props;
            if (componentStore.message && componentStore.message.hasMessage)
            {
                const message = componentStore.message.pop();
                this.addMessage(message);
            }
        });
    }

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    @action
    private addMessage(message)
    {
        this.messages.unshift(message);
        setTimeout(() =>
        {
            this.onClose(message);
        }, DISPLAY_SECONDS * 1000);
    }

    @action
    private onClose(message)
    {
        const index = this.messages.lastIndexOf(message);
        this.messages.splice(index, 1);
    }

    public render()
    {
        return (
            <div css={messagesStyle}>
                {this.messages.map(message =>
                {
                    return (
                        <div css={messageStyle}>
                            <div css={titleStyle}>{this.renderIcon(message.severity)} {message.summary}</div>
                            <CloseButton onClose={() => this.onClose(message)} small={true} />
                            <div css={textStyle}>{message.detail}</div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // @ts-ignore
    private renderIcon(severity: string)
    {
        if (severity === 'error')
        {
            // @ts-ignore
            return <i class="fa fa-times-circle"></i>;
        }
        else if (severity === 'warn')
        {
            // @ts-ignore
            return <i class="fa fa-exclamation-circle"></i>;
        }
        else if (severity === 'success')
        {
            // @ts-ignore
            return <i class="fa fa-check-circle"></i>;
        }
        else
        {
            // @ts-ignore
            return <i class="fa fa-info-circle"></i>;
        }
    }
}

export default MessagesComponent;
