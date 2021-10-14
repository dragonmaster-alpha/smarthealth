import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import MedicalGroupLocationDigest from 'smarthealth-javascript/MedicalGroupLocationDigest';
import MockUpOverlay from 'test/design/MockUpOverlay';
import MockUpOverlayButton from 'test/design/MockUpOverlayButton';

/**
 * Mock up for Medical Group Location field
 *
 * @author Larry 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpLocationFieldProps
{
    editable?: boolean;
    editing: boolean;
    mandatory?: boolean;
    value: MedicalGroupLocationDigest;
}

const locationFieldStyle = css({
    color: colour.text,
    font: font.text
});

const locationFieldEditStyle = css(locationFieldStyle, {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    color: colour.text,
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

const locationFieldViewStyle = css(locationFieldStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

@observer
class MockUpLocationField extends React.Component<MockUpLocationFieldProps>
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
        const value = this.props.value && this.props.value.name;
        if (this.props.editing)
        {
            const required = (this.props.mandatory && !this.props.value);
            return (
                <>
                    <div css={locationFieldEditStyle}
                        style={{ color: required ? colour.placeholder : colour.text }}>
                        <span>{required ? 'Required' : value}</span>
                        <MockUpOverlayButton collapsed={!this.showDropdown} onToggle={this.onToggleOverlay} />
                    </div>
                    {this.showDropdown && <MockUpOverlay onExit={this.onMockupExit} />}
                </>
            );
            return (
                <div css={locationFieldEditStyle}>
                    <span>{required ? 'Required' : this.props.value}</span>
                    <span className="shicon sh-chevron-down" style={{ color: colour.primary6, fontSize: '6px' }} />
                </div>
            );
        }
        else
        {
            return (
                <div css={locationFieldViewStyle}>
                    {value || '-'}
                </div>
            );
        }
    }
}

export default MockUpLocationField;
