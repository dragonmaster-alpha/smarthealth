import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import React from 'react';

/**
 * Button bar for most forms
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpButtonBarProps
{
    // a map from the button label to an onClick function
    buttons: { [label: string]: () => void };
}

const navStyle = css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    font: font.h3,
    backgroundColor: colour.white,
    // boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.06)',
    gap: '16px'
});

class MockUpButtonBar extends React.Component<MockUpButtonBarProps>
{
    public render(): React.ReactNode
    {
        return (
            <nav css={navStyle}>
                {Object.keys(this.props.buttons)
                    .map((button, i) => (
                        <Button title={button} primary={i === 0} onClick={this.props.buttons[button]} />
                    ))}
            </nav>
        );
    }
}

export default MockUpButtonBar;
