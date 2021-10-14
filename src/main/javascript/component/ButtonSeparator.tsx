import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Vertical bar to separate buttons in a button bar.
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const buttonSeparatorStyle = css({
    border: 'none',
    borderLeft: border(colour.tabBorder),
    margin: px(4, 0),
    width: '1px',
    height: '20px'
});

class ButtonSeparator extends React.Component
{
    public render(): React.ReactNode
    {
        return <hr css={buttonSeparatorStyle} />;
    }
}

export default ButtonSeparator;
