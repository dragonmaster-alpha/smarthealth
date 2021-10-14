import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import OverlayBorder from 'main/component/OverlayBorder';
import UserIconAndName from 'main/component/UserIconAndName';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import BaseField from 'main/field/BaseField';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import MemberSelectionOverlay from 'main/fieldcomponent/MemberSelectionOverlay';
import {medicalGroupMemberToolTip} from 'main/utility/ToolTipUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';

/**
 * Member form field
 *
 * @author Larry 16/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export const placeholderStyle = css({
    color: colour.placeholder,
    font: font.text,
    minHeight: '17px',
    minWidth: '100px'
});

@inject('appStore')
@observer
class MemberField extends BaseField<FormFieldMember, MedicalGroupMemberAggregate>
{
    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        if (this.props.value)
        {
            return this.renderObject(this.props.value);
        }
        else
        {
            return <span css={placeholderStyle}>{this.placeholder}</span>;
        }
    }

    protected renderEditing(): React.ReactNode
    {
        return (
            <DropdownFieldComponent context={this.props.context} renderContent={this.renderContent}
                renderOverlay={this.renderOverlay} valid={this.valid} />
        );
    }

    protected renderObject(value): React.ReactNode
    {
        return <UserIconAndName user={value.user} toolTip={medicalGroupMemberToolTip(value)} />;
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        return (
            <OverlayBorder>
                <MemberSelectionOverlay onSelection={memberID =>
                {
                    this.onValueChange(memberID);
                    onExit();
                }} />
            </OverlayBorder>
        );
    }
}

export default MemberField;
