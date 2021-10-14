import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import CloseButton from 'main/component/CloseButton';
import React from 'react';

/**
 * A chip is a piece of text with a close button. Used in multiple selection lists.
 *
 * @author Larry 16/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ChipProps
{
    disabled?: boolean;
    onClose: () => void;
    text: string;
}

const chipStyle = css({
    color: colour.text,
    font: font.text,
    display: 'flex',
    gap: '4px',
    button: {
        color: colour.primary2a
    }
});

const chipDisabledStyle = css(chipStyle, {
    color: colour.disabled,
    button: {
        color: colour.disabled
    }
});

class Chip extends React.Component<ChipProps>
{
    public render(): React.ReactNode
    {
        return (
            <span css={this.props.disabled ? chipDisabledStyle : chipStyle}>
                {this.props.text}
                <CloseButton onClose={this.props.onClose} small={true} disabled={this.props.disabled}
                    title={`Remove ${this.props.text}`} />
            </span>
        );
    }
}

export default Chip;
