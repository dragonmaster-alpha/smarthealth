import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import EnumUtility from 'main/utility/EnumUtility';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import MockUpOverlay from 'test/design/MockUpOverlay';
import MockUpOverlayButton from 'test/design/MockUpOverlayButton';

/**
 * Enum field for mockup
 *
 * @author Larry 15/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpEnumFieldProps
{
    editing: boolean;
    field: FormFieldEnum;
    value: string;
}

const enumFieldStyle = css({
    color: colour.text,
    font: font.text
});

const enumFieldEditStyle = css(enumFieldStyle, {
    alignItems: 'center',
    border: field.border,
    borderRadius: field.borderRadius,
    display: 'flex',
    justifyContent: 'space-between',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx, 7),
    width: '120px',
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

const enumFieldViewStyle = css(enumFieldStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

@observer
class MockUpEnumField extends React.Component<MockUpEnumFieldProps>
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
        const value = this.props.value;
        if (this.props.editing)
        {
            return (
                <>
                    <div css={enumFieldEditStyle}>
                        <span>
                            {value ? EnumUtility.getEnumText(this.props.field.enumType, value) : ''}
                        </span>
                        <MockUpOverlayButton collapsed={!this.showDropdown} onToggle={this.onToggleOverlay} />
                    </div>
                    {this.showDropdown && <MockUpOverlay onExit={this.onMockupExit} />}
                </>
            );
        }
        else
        {
            return (
                <div css={enumFieldViewStyle}>
                    {value ? EnumUtility.getEnumText(this.props.field.enumType, value) : '-'}
                </div>
            );
        }
    }
}

export default MockUpEnumField;
