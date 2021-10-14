import {css} from '@emotion/core';
import {colour, field} from 'main/application/ThemeConstants';
import CloseButton from 'main/component/CloseButton';
import SHIcon from 'main/component/SHIcon';
import {px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * A search/filter component for the mock up
 *
 * @author Larry 12/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpFilterComponentProps
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

class MockUpFilterComponent extends React.Component<MockUpFilterComponentProps>
{
    public render()
    {
        return (
            <span css={searchStyleNoHover} title="Search">
                <SHIcon icon="search" noTitle={true} />
                <input type="text" value={this.props.value}
                    onChange={event => this.props.onValueChange(event.target.value)} />
                <CloseButton onClose={() => this.props.onValueChange('')} title="Clear" />
            </span>
        );
    }
}

export default MockUpFilterComponent;
