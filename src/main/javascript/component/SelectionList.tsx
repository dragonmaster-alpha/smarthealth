import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, dropdownBoxShadow, field, font} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * List of selectable options
 *
 * T is the type of the values for the list
 *
 * When a selection is made onSelection then onExit are called.
 *
 * @author Larry 15/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface SelectionListOption<T = string>
{
    label: string;
    value: T;
}

interface SelectionListProps<T = string>
{
    onExit?: () => void;
    onSelection: (value: T) => void;
    options: SelectionListOption<T>[];
    other?: boolean;
    size: number;
}

const dropdownStyle = css({
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    boxShadow: dropdownBoxShadow,
    color: colour.text,
    font: font.text,
    div: {
        cursor: 'pointer',
        padding: px(4, 8),
        whiteSpace: 'nowrap',
        ':hover': {
            backgroundColor: background.buttonHover
        }
    }
});

const dropdownScrollStyle = css(dropdownStyle, {
    maxHeight: '180px',
    overflow: 'auto',
    // prevent horizontal scroll bar
    paddingRight: '18px'
});

const otherInputStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    color: colour.text,
    font: font.text,
    margin: px(4, 5, 6),
    padding: px(2),
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

@observer
class SelectionList<T = string> extends React.Component<SelectionListProps<T>>
{
    @autobind
    private onClick(event: React.SyntheticEvent, option)
    {
        this.props.onSelection(option && option.value);
        this.props.onExit && this.props.onExit();
        event.stopPropagation();
    }

    @autobind
    private onKeyUp(event)
    {
        if (event.key === 'Enter')
        {
            this.props.onSelection(event.target.value);
            this.props.onExit && this.props.onExit();
        }
    }

    public render(): React.ReactNode
    {
        const scroll = this.props.options.length > 7;
        return (
            <div css={scroll ? dropdownScrollStyle : dropdownStyle}>
                {this.props.options.map(
                    option => <div onClick={event => this.onClick(event, option)}>{option.label}</div>)}
                {this.props.other &&
                <input css={otherInputStyle} maxLength={this.props.size} onKeyUp={this.onKeyUp} placeholder="Other"
                    type="text" />}
            </div>
        );
    }

}

export default SelectionList;
