import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Wrapper for buttons in a bar
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const navStyle = css({
    alignItems: 'center',
    backgroundColor: colour.white,
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end'
});

class ButtonBar extends React.Component
{
    public render(): React.ReactNode
    {
        return (
            <div css={navStyle}>
                {this.props.children}
            </div>
        );
    }
}

export default ButtonBar;
