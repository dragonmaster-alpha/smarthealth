import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button to invoke an action that is next or previous.
 *
 * @author Thompson 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface ChevronSideButtonProps
{
    disabled?: boolean;
    onClick: () => void;
    // switch direction of the chevron to the previous direction
    previous?: boolean;
    toolTip: string;
}

const buttonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    color: colour.text,
    fontSize: '10px',
    outline: 'none',
    padding: '0',
    ':hover': {
        color: colour.primary2a,
        cursor: 'pointer'
    },
    ':disabled': {
        color: colour.disabled,
        cursor: 'default'
    }
});

class NextPreviousButton extends React.Component<ChevronSideButtonProps>
{
    public render()
    {
        return <button css={buttonStyle} onClick={this.props.onClick}
            disabled={this.props.disabled}>
            <SHIcon icon={`chevron-${this.props.previous ? 'left' : 'right'}`} title={this.props.toolTip} />
        </button>;
    }
}

export default NextPreviousButton;
