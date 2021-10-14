import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, font, form, zIndex} from 'main/application/ThemeConstants';
import CloseButton from 'main/component/CloseButton';
import StoreProps from 'main/store/StoreProps';
import {grid, px} from 'main/utility/StyleUtility';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Modal dialog container.
 * <p>
 * Create with this.props.sessionStore.modalDialog.show(<ModalDialog heading="...">Content<ModalDialog/>);
 *
 * @author Larry 26/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ModalDialogProps extends StoreProps
{
    heading: string;
    onClose?: () => void;
}

const fullScreenOverlayStyle = css({
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    ...grid(),
    height: '100vh',
    justifyItems: 'center',
    left: 0,
    overflow: 'hidden',
    padding: '10%',
    position: 'fixed',
    top: 0,
    width: '100vw',
    zIndex: zIndex.modalDialog
});

const dialogBoxStyle = css({
    backgroundColor: background.white,
    ...grid(null, 'auto 1fr')
});

const dialogHeadingStyle = css({
    font: font.h3,
    ...grid('1fr auto'),
    padding: px(16),
    borderBottom: form.border
});

@inject('componentStore')
class ModalDialog extends React.Component<ModalDialogProps>
{
    @autobind
    private onClose()
    {
        if (this.props.onClose)
        {
            this.props.onClose;
        }
        else
        {
            this.props.componentStore.modalDialog.close();
        }
    }

    public render(): React.ReactNode
    {
        return (
            <div css={fullScreenOverlayStyle}>
                <div css={dialogBoxStyle}>
                    <div css={dialogHeadingStyle}>
                        <span>{this.props.heading}</span>
                        <span><CloseButton onClose={this.onClose} /></span>
                    </div>
                    <div style={grid()}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;
