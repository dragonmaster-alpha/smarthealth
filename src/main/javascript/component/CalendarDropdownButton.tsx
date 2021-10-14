import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button with calendar icon used to invoke onClick and stop event propagation.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface CalendarDropdownButtonProps
{
    disabled?: boolean;
    onToggle?: () => void;
}

// TODO Larry extract common button styles
const buttonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    color: colour.primary6,
    cursor: 'pointer',
    padding: 0,
    ':active': {
        color: colour.primary2a
    },
    ':hover': {
        color: colour.primary2a
    },
    ':focus': {
        outline: 'none'
    }
});

const disabledStyle = css({
    cursor: 'default',
    '.shicon': {
        color: colour.disabled
    }
});

class CalendarDropdownButton extends React.Component<CalendarDropdownButtonProps>
{
    @autobind
    private onClick(event: React.SyntheticEvent)
    {
        this.props.onToggle && this.props.onToggle();
        event.stopPropagation();
    }

    public render(): React.ReactNode
    {
        const styles = [
            buttonStyle,
            this.props.disabled && disabledStyle
        ];
        return (
            <button css={styles} disabled={this.props.disabled} onClick={this.onClick} tabIndex={-1}
                title="Calendar button">
                <SHIcon icon={'calendar'} noTitle={true} />
            </button>
        );
    }

}

export default CalendarDropdownButton;
