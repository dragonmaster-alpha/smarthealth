import {css} from '@emotion/core';
import React from 'react';

/**
 * Wrapper for stories to make them use up the full screen. It expects a single html component with to contain the
 * contents. If there are comments then these should be included in a separate html component.
 *
 * @author Larry 13/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const fullScreenStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    height: '100vh'
});

class FullScreen extends React.Component
{
    public render(): React.ReactNode
    {
        return (
            <div css={fullScreenStyle}>
                {this.props.children}
            </div>
        );
    }
}

export default FullScreen;
