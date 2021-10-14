import {css} from '@emotion/core';
import {background, colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button used on home panels
 *
 * @author Larry 22/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpHomeButtonProps
{
    icon: string;
    name: string;
    onClick?: () => void;
}

const buttonStyle = css({
    width: '160px',
    height: '160px',
    backgroundColor: background.white,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    '&:hover': {
        border: `solid 2px ${colour.primary2a}`
    },
    '& .shicon': {
        fontSize: '500%',
        lineHeight: '70%',
        color: colour.primary2
    },
    '&:hover .shicon': {
        color: colour.primary2a
    },
    '& div': {
        font: font.h3,
        color: colour.text,
        paddingTop: '0.5em'
    },
    '&:hover div': {
        color: colour.primary2a
    }
});

class MockUpHomeButton extends React.Component<MockUpHomeButtonProps>
{
    public render(): React.ReactNode
    {
        // TODO fix button movement on click
        return (
            <button css={buttonStyle} onClick={() => this.props.onClick && this.props.onClick()}>
                <SHIcon icon={this.props.icon} />
                <div>{this.props.name}</div>
            </button>
        );
    }
}

export default MockUpHomeButton;
