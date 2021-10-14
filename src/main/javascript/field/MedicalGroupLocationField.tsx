import {autobind} from 'core-decorators';
import SelectionList, {SelectionListOption} from 'main/component/SelectionList';
import BaseField, {BaseFieldProps} from 'main/field/BaseField';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import MedicalGroupLocationUtility from 'main/utility/MedicalGroupLocationUtility';
import SelectionListUtility from 'main/utility/SelectionListUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupLocationDigest from 'smarthealth-javascript/MedicalGroupLocationDigest';

/**
 * Medical Group Location form field.
 *
 * In edit mode it selects from the list of locations for the currently logged in medical group.
 *
 * @author Priyanka 1/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MedicalGroupLocationFieldProps
    extends BaseFieldProps<FormFieldMedicalGroupLocation, MedicalGroupLocationDigest>
{
    medicalGroup: MedicalGroup;
}

@inject('sessionStore')
@observer
class MedicalGroupLocationField
    extends BaseField<FormFieldMedicalGroupLocation, MedicalGroupLocationDigest, MedicalGroupLocationFieldProps>
{
    private options: SelectionListOption<MedicalGroupLocationDigest>[];

    private size: number;

    private buildOptions()
    {
        this.options = MedicalGroupLocationUtility.buildLocationOptions(this.props.medicalGroup, this.mandatory);
        this.size = SelectionListUtility.determineSize(this.options);
    }

    @autobind
    private renderContent(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        return <InputFieldComponent context={this.props.context} editable={false} maxLength={this.size}
            onFocus={onFocus} onValueChange={() => null} value={this.renderValue(this.props.value, null)} />;
    }

    protected renderEditing(): React.ReactNode
    {
        this.buildOptions();

        return (
            <DropdownFieldComponent context={this.props.context} renderContent={this.renderContent}
                renderOverlay={this.renderOverlay} valid={this.valid} />
        );
    }

    protected renderObject(value: MedicalGroupLocationDigest): React.ReactNode
    {
        return value.name;
    }

    @autobind
    private renderOverlay(onExit: () => void): React.ReactNode
    {
        return <SelectionList size={this.size} options={this.options} onExit={onExit}
            onSelection={this.onValueChange} />;
    }
}

export default MedicalGroupLocationField;
