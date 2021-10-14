import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, font} from 'main/application/ThemeConstants';
import MedicalGroupIconAndName from 'main/component/MedicalGroupIconAndName';
import OverlayBorder from 'main/component/OverlayBorder';
import UserIconAndName from 'main/component/UserIconAndName';
import MemberOrMedicalGroup, {isMedicalGroup, isMedicalGroupMemberAggregate} from 'main/data/MemberOrMedicalGroup';
import BaseField from 'main/field/BaseField';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import MemberOrMedicalGroupSelectionOverlay from 'main/fieldcomponent/MemberOrMedicalGroupSelectionOverlay';
import {medicalGroupMemberToolTip, medicalGroupToolTip} from 'main/utility/ToolTipUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormFieldMemberOrMedicalGroup from 'smarthealth-javascript/FormFieldMemberOrMedicalGroup';

/**
 * Field to display/select medical group member or medical group
 *
 * @author Larry 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */

const placeholderStyle = css({
    color: colour.placeholder,
    font: font.text,
    minHeight: '17px',
    minWidth: '100px'
});

@inject('appStore')
@observer
class MemberOrMedicalGroupField extends BaseField<FormFieldMemberOrMedicalGroup, MemberOrMedicalGroup>
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
        return <DropdownFieldComponent context={this.props.context} renderContent={this.renderContent}
            renderOverlay={this.renderOverlay} valid={this.valid} />;
    }

    protected renderObject(value: MemberOrMedicalGroup): React.ReactNode
    {
        if (isMedicalGroup(value))
        {
            return <MedicalGroupIconAndName medicalGroup={value} toolTip={medicalGroupToolTip(value)} />;
        }
        else if (isMedicalGroupMemberAggregate(value))
        {
            return <UserIconAndName user={value.user} toolTip={medicalGroupMemberToolTip(value)} />;
        }
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        return (
            <OverlayBorder>
                <MemberOrMedicalGroupSelectionOverlay
                    selectMedicalGroup={this.props.value && isMedicalGroup(this.props.value)}
                    onSelection={memberOrGroupID =>
                    {
                        this.onValueChange(memberOrGroupID);
                        onExit();
                    }} />
            </OverlayBorder>
        );
    }
}

export default MemberOrMedicalGroupField;
