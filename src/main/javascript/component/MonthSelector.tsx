import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {colour, field, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import CalendarUtility from 'main/utility/CalendarUtility';
import {px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Allow selection of a month in a year.
 *
 * @author Thompson 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MonthSelectorProps
{
    onSelection: (month: number) => void;
    value: number;
}

const selectorStyle = css({
    color: colour.text,
    position: 'relative',
    select: {
        appearance: 'none',
        border: field.border,
        borderRadius: field.borderRadius,
        color: colour.text,
        font: font.text,
        padding: px(2, 20, 2, 0),
        width: '100px',
        ':not(:first-child)': {
            marginLeft: '8px'
        },
        ':hover': {
            ...field.hover
        },
        ':focus': {
            ...field.focus
        }
    },
    '.shicon': {
        font: font.chevronSmall,
        position: 'absolute',
        left: '85px',
        pointerEvents: 'none',
        top: '7px'
    },
    ':hover .shicon': {
        color: colour.primary2a
    }
});

class MonthSelector extends React.Component<MonthSelectorProps>
{
    @autobind
    private onChange(event: React.ChangeEvent<HTMLSelectElement>)
    {
        // null fallback in case parseInt returns NaN from event.target.value = null
        const month: number = parseInt(event.target.value, 10) || null;
        this.props.onSelection(month);
    }

    public render()
    {
        const monthOptions = CalendarUtility.MONTH_OPTIONS
            .map(month => <option value={month.value}>{month.label}</option>);
        if (lodash.isNil(this.props.value))
        {
            monthOptions.push(<option value={null} disabled={true} selected={true}></option>);
            return (
                <span css={selectorStyle}>
                    <select onChange={this.onChange} title="Month">
                        {monthOptions}
                    </select>
                    <SHIcon icon="chevron-down" noTitle={true} />
                </span>
            );
        }
        else
        {
            return (
                <span css={selectorStyle}>
                    <select onChange={this.onChange} title="Month" value={this.props.value}>
                        {monthOptions}
                    </select>
                    <SHIcon icon="chevron-down" noTitle={true} />
                </span>
            );
        }
    }
}

export default MonthSelector;
