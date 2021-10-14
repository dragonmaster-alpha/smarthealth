import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, field} from 'main/application/ThemeConstants';
import CloseButton from 'main/component/CloseButton';
import SHIcon from 'main/component/SHIcon';
import {px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * A search/filter component
 *
 * @author Larry 12/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface FilterComponentProps
{
    onValueChange: (value: string) => void;
    value: string;
}

// TODO decide between these styles

// @ts-ignore
const searchStyle = css({
    border: field.border,
    borderRadius: '4px',
    padding: px(2),
    '.shicon': {
        fontSize: '12px',
        padding: px(0, 4, 0, 2),
        verticalAlign: '-2px',
        color: colour.border
    },
    input: {
        border: 'none'
    },
    ':hover': {
        ...field.hover,
        '.shicon': {
            color: colour.hover
        }
    },
    ':focus-within': {
        ...field.focus,
        '.shicon': {
            color: colour.focus
        }
    }
});

const searchStyleNoHover = css({
    border: field.focus.border,
    borderRadius: '4px',
    padding: px(2),
    '.shicon': {
        fontSize: '12px',
        padding: px(0, 4, 0, 2),
        verticalAlign: '-2px',
        color: colour.focus
    },
    input: {
        border: 'none'
    }
});

class FilterComponent extends React.Component<FilterComponentProps>
{
    @autobind
    private onKeyPress(event: React.KeyboardEvent)
    {
        if (event.key === 'Escape')
        {
            this.props.onValueChange('');
            event.stopPropagation();
        }
    }

    public render()
    {
        return (
            <span css={searchStyleNoHover} title="Search">
                <SHIcon icon="search" noTitle={true} />
                <input type="text" value={this.props.value} maxLength={20} size={20}
                    onChange={event => this.props.onValueChange(event.target.value)} onKeyUp={this.onKeyPress} />
                <CloseButton onClose={() => this.props.onValueChange('')} title="Clear" />
            </span>
        );
    }
}

export default FilterComponent;
