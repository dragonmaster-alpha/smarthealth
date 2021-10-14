import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import MockUpOverlay from 'test/design/MockUpOverlay';
import MockUpOverlayButton from 'test/design/MockUpOverlayButton';

/**
 * Text field with Edit and View mode.
 *
 * @author Thompson 2/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpSelectionFieldProps
{
    editable?: boolean;
    editing: boolean;
    mandatory?: boolean;
    size: number;
    value: string;
}

const selectionFieldStyle = css({
    color: colour.text,
    font: font.text
});

const selectionFieldEditStyle = css(selectionFieldStyle, {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    color: colour.text,
    margin: px(field.marginHeightPx, 0),
    minHeight: '26px',
    padding: px(field.paddingHeightPx, 7),
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

const selectionFieldViewStyle = css(selectionFieldStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

@observer
class MockUpSelectionField extends React.Component<MockUpSelectionFieldProps>
{
    @observable
    private showDropdown: boolean = false;

    @action.bound
    private onMockupExit()
    {
        this.showDropdown = false;
    }

    @action.bound
    private onToggleOverlay()
    {
        this.showDropdown = !this.showDropdown;
    }

    public render()
    {
        if (this.props.editing)
        {
            const required = (this.props.mandatory && !this.props.value);
            return (
                <>
                    <div css={selectionFieldEditStyle}
                        style={{ color: required ? colour.placeholder : colour.text }}>
                        <span>{required ? 'Required' : this.props.value}</span>
                        <MockUpOverlayButton collapsed={!this.showDropdown} onToggle={this.onToggleOverlay} />
                    </div>
                    {this.showDropdown && <MockUpOverlay onExit={this.onMockupExit} />}
                </>
            );
        }
        else
        {
            return (
                <div css={selectionFieldViewStyle}>
                    {this.props.value || '-'}
                </div>
            );
        }
    }
}

export default MockUpSelectionField;
