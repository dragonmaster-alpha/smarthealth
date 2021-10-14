import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Button with double chevrons that shows expanded or collapsed. Used larger sections of the page. Located at the
 * bottom of the section. State needs to be managed externally.
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface CollapseDoubleButtonProps
{
    collapsed?: boolean;
    onToggle?: (collapsed) => void;
    title?: string;
}

const collapseButtonStyle = css({
    backgroundColor: colour.primary2,
    color: colour.white,
    cursor: 'pointer',
    font: font.doubleChevron,
    border: border(colour.primary2),
    borderRadius: '2px',
    padding: px(4, 12, 2),
    ':active': {
        backgroundColor: colour.primary2
    },
    ':hover': {
        backgroundColor: colour.primary2a
    },
    ':focus': {
        outline: 'none'
    }
});

class CollapseDoubleButton extends React.Component<CollapseDoubleButtonProps>
{
    @autobind
    private onClick()
    {
        this.props.onToggle && this.props.onToggle(!this.props.collapsed);
    }

    public render(): React.ReactNode
    {
        const title = this.props.title ?
            this.props.collapsed ? `Show ${this.props.title}` : `Hide ${this.props.title}` :
            null;
        return (
            <button css={collapseButtonStyle} onClick={this.onClick} tabIndex={-1} title={title}>
                <SHIcon icon={this.props.collapsed ? 'double-chevron-down' : 'double-chevron-up'} title={title} />
            </button>
        );
    }
}

export default CollapseDoubleButton;
