import {autobind} from 'core-decorators';
import MedicalGroupIconAndName from 'main/component/MedicalGroupIconAndName';
import OverlayBorder from 'main/component/OverlayBorder';
import BaseField from 'main/field/BaseField';
import {placeholderStyle} from 'main/field/MemberField';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import MedicalGroupSelectionOverlay from 'main/fieldcomponent/MedicalGroupSelectionOverlay';
import {medicalGroupToolTip} from 'main/utility/ToolTipUtility';
import React from 'react';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Field to select/display a medical group
 *
 * @author Larry 15/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
class MedicalGroupField extends BaseField<FormFieldMedicalGroup, MedicalGroup>
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

    protected renderObject(medicalGroup): React.ReactNode
    {
        return <MedicalGroupIconAndName medicalGroup={medicalGroup} toolTip={medicalGroupToolTip(medicalGroup)} />;
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        return (
            <OverlayBorder>
                <MedicalGroupSelectionOverlay onSelection={groupID =>
                {
                    this.onValueChange(groupID);
                    onExit();
                }} />
            </OverlayBorder>
        );
    }
}

export default MedicalGroupField;
