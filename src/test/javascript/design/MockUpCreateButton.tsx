import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border} from 'main/utility/StyleUtility';
import React from 'react';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';

/**
 * Button on the New Service Record dialog
 *
 * @author Larry 24/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpCreateButtonProps
{
    item: NewServiceMenuItem;
}

const buttonStyle = css({
    width: '100px',
    height: '100px',
    backgroundColor: background.white,
    border: border(background.white, 2),
    borderRadius: '12px',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
        border: `solid 2px ${colour.primary2a}`
    },
    '& .shicon': {
        fontSize: '200%',
        color: colour.primary2
    },
    '&:hover .shicon': {
        color: colour.primary2a
    },
    '& div': {
        font: font.text,
        color: colour.text,
        paddingTop: '0.5em'
    },
    '&:hover div': {
        color: colour.primary2a
    }
});

class MockUpCreateButton extends React.Component<MockUpCreateButtonProps>
{
    @autobind
    private onClick()
    {
// TODO
    }

    public render(): React.ReactNode
    {
        return (
            <button css={buttonStyle} onClick={this.onClick} title={this.props.item['description']}>
                <SHIcon icon="plus" />
                <div>{this.props.item.name}</div>
            </button>
        );
    }
}

export default MockUpCreateButton;
