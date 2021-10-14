import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Menu options dropdown list.
 *
 * @author Thompson 5/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpMenuListItemsProps
{
    options: string[];
}

const menuListStyles = css({
    // layout
    margin: '8px 0',
    minWidth: '120px',
    position: 'absolute',
    right: '0px',

    // looks
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: '1px',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.6)',
    color: colour.text,
    font: font.menu,
    paddingLeft: '0px',

    // layout
    '&:before': {
        bottom: '100%',
        border: '4px solid transparent',
        borderTop: 'none',
        content: '""',
        height: 0,
        position: 'absolute',
        // offset to move the speech bubble arrow horizontally
        right: '5px',
        width: 0,

        // looks
        borderBottomColor: colour.white,
        filter: `drop-shadow(0 -1px 0 ${colour.border})`
    },
    li: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: colour.primary2a,
            color: colour.white
        }
    }
});

class MockUpMenuListItems extends React.Component<MockUpMenuListItemsProps>
{
    public render()
    {
        return (
            <ul css={menuListStyles}>
                {this.props.options.map((option) => (
                    <li style={{ borderBottom: field.border, listStyle: 'none', padding: '8px' }}>
                        {option}
                    </li>
                ))}
            </ul>
        );
    }
}

export default MockUpMenuListItems;
