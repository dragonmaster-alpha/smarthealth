import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import CollapseSingleButton from 'main/component/CollapseSingleButton';
import OverlayPanel from 'main/container/OverlayPanel';
import BaseContextFieldComponent, {BaseContextFieldComponentProps} from 'main/fieldcomponent/BaseContextFieldComponent';
import {borderStyle} from 'main/utility/BorderUtility';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Manage the dropdown and input field for a component
 *
 * @author Larry 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface DropdownFieldComponentProps extends BaseContextFieldComponentProps
{
    renderButton?: (disabled: boolean, onToggleDropdown: () => void) => React.ReactNode;
    // Param ref should be passed to an input component if it can accept the focus. Otherwise it should not be used.
    renderContent: (ref: React.RefObject<any>, onFocus: (focus: boolean) => void) => React.ReactNode;
    renderOverlay: (onExit: () => void) => React.ReactNode;
    valid?: boolean;
}

const fieldStyle = css({
    color: colour.text,
    font: font.text,
    whiteSpace: 'nowrap'
});

const editStyle = css(fieldStyle, {
    backgroundColor: colour.white,
    display: 'inline-flex',
    justifyItems: 'flex-start',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx, 7, field.paddingHeightPx),
    '>button': {
        marginLeft: '8px'
    }
});

const editReadOnlyStyle = css(editStyle, {
    backgroundColor: background.disabled
});

const dropdownStyle = css({
    marginTop: px(-field.marginHeightPx),
    marginBottom: px(field.marginHeightPx),
    position: 'relative'
});

@observer
class DropdownFieldComponent extends BaseContextFieldComponent<DropdownFieldComponentProps>
{
    @observable
    private focus: boolean = false;

    private inputRef: React.RefObject<any> = React.createRef();

    @observable
    private showDropdown: boolean = false;

    private determineStyle()
    {
        const style = [];
        style.push(this.readOnly ? editReadOnlyStyle : editStyle);
        style.push(borderStyle(this.props.context, this.props.valid, this.focus));
        return style;
    }

    @autobind
    private onClick(event: React.SyntheticEvent): void
    {
        if (!this.readOnly)
        {
            this.showDropdown = !this.showDropdown;
            event.stopPropagation();
        }
    }

    @action.bound
    private onInputFocus(focus: boolean)
    {
        this.focus = focus;
        if (focus)
        {
            this.showDropdown = false;
        }
    }

    @action.bound
    private onOverlayExit()
    {
        this.showDropdown = false;
    }

    @action.bound
    private onToggleDropdown()
    {
        if (!this.readOnly)
        {
            this.showDropdown = !this.showDropdown;
            this.inputRef.current && this.inputRef.current.focus && this.inputRef.current.focus();
        }
    }

    public render(): React.ReactNode
    {
        return (
            <>
                <div css={this.determineStyle()} onClick={this.onClick} title={this.toolTip}>
                    {this.props.renderContent(this.inputRef, this.onInputFocus)}
                    {this.renderButton()}
                </div>
                {this.showDropdown && this.renderDropdown()}
            </>
        );
    }

    private renderButton(): React.ReactNode
    {
        if (this.props.renderButton)
        {
            return this.props.renderButton(this.readOnly, this.onToggleDropdown);
        }
        else
        {
            return <CollapseSingleButton collapsed={!this.showDropdown} onToggle={this.onToggleDropdown}
                small={true} disabled={this.readOnly} />;
        }
    }

    private renderDropdown(): React.ReactNode
    {
        return (
            <div css={dropdownStyle}>
                <OverlayPanel onExit={this.onOverlayExit}>
                    {this.props.renderOverlay(this.onOverlayExit)}
                </OverlayPanel>
            </div>
        );
    }
}

export default DropdownFieldComponent;
