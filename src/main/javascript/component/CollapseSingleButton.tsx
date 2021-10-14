import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Button with single chevrons that shows expanded or collapsed. Used for menus and small sections of the page. Located
 * at the top of the section. Inherits the background colour. State needs to be managed externally.
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface CollapseSingleButtonProps
{
    collapsed?: boolean;
    disabled?: boolean;
    onToggle?: (collapsed) => void;
    small?: boolean;
    title?: string;
}

// TODO Larry extract common button styles
const collapseButtonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    cursor: 'pointer',
    font: font.chevron,
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

const collapseSmallButtonStyle = css(collapseButtonStyle, {
    font: font.chevronSmall,
    verticalAlign: '2px'
});

const disabledStyle = css({
    cursor: 'default',
    '.shicon': {
        color: colour.disabled
    }
});

class CollapseSingleButton extends React.Component<CollapseSingleButtonProps>
{
    @autobind
    private onClick(event: React.SyntheticEvent)
    {
        this.props.onToggle && this.props.onToggle(!this.props.collapsed);
        event.stopPropagation();
    }

    public render(): React.ReactNode
    {
        const title = (this.props.title != null) && this.props.title
            ? (this.props.collapsed ? `Show ${this.props.title}` : `Hide ${this.props.title}`)
            : null;

        const styles = [
            this.props.small ? collapseSmallButtonStyle : collapseButtonStyle,
            this.props.disabled ? disabledStyle : null
        ];
        return (
            <button css={styles} onClick={this.onClick}
                tabIndex={-1} title={title}>
                <SHIcon icon={this.props.collapsed ? 'chevron-down' : 'chevron-up'} noTitle={true} />
            </button>
        );
    }

}

export default CollapseSingleButton;
