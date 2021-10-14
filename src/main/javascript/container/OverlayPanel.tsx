import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {zIndex} from 'main/application/ThemeConstants';
import AutoCloser from 'main/utility/AutoCloser';
import React from 'react';

/**
 * OverlayPanel is a container component that can overlay other components on page.
 *
 * Based on PrimeReact OverlayPanel
 * https://github.com/primefaces/primereact/blob/master/src/components/overlaypanel/OverlayPanel.js
 *
 * @author Thompson 8/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface OverlayPanelProps
{
    className?: string;
    onExit: (event) => void;
    style?: React.CSSProperties;
}

const overlayStyle = css({
    position: 'absolute',
    zIndex: zIndex.overlay
});

class OverlayPanel extends React.Component<OverlayPanelProps>
{
    private autoCloser = new AutoCloser();

    private readonly overlayPanelRef: React.RefObject<HTMLInputElement>;

    constructor(props)
    {
        super(props);
        this.overlayPanelRef = React.createRef();
        this.autoCloser.addEventListener(document, 'click', this.onClickListener);
    }

    public componentWillUnmount(): void
    {
        this.autoCloser.onUnmount();
    }

    @autobind
    private onClickListener(e)
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
        const userClickedOverlayPanel = this.overlayPanelRef && this.overlayPanelRef.current.contains(e.target);
        if (!userClickedOverlayPanel)
        {
            this.props.onExit(e);
        }
    }

    public render(): React.ReactNode
    {
        return (
            <div css={overlayStyle} className={this.props.className} ref={this.overlayPanelRef}
                style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

export default OverlayPanel;
