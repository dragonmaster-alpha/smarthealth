import lodash from 'lodash';
import BooleanField from 'main/field/BooleanField';
import EnumField from 'main/field/EnumField';
import FieldContext from 'main/field/FieldContext';
import FormattedField from 'main/field/FormattedField';
import GroupField from 'main/field/GroupField';
import MedicalGroupEntityField from 'main/field/MedicalGroupEntityField';
import MedicalGroupListField from 'main/field/MedicalGroupListField';
import MedicalGroupLocationEntityField from 'main/field/MedicalGroupLocationEntityField';
import MemberEntityField from 'main/field/MemberEntityField';
import MemberOrMedicalGroupEntityField from 'main/field/MemberOrMedicalGroupEntityField';
import NumberField from 'main/field/NumberField';
import SelectionField from 'main/field/SelectionField';
import ServiceRecordReferenceEntityField from 'main/field/ServiceRecordReferenceEntityField';
import SnomedTermField from 'main/field/SnomedTermField';
import TextField from 'main/field/TextField';
import UnsupportedField from 'main/field/UnsupportedField';
import ValueSetField from 'main/field/ValueSetField';
import {CustomFieldRenderer, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FormDataUtility from 'main/utility/FormDataUtility';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import DateTimeField from './DateTimeField';
import DateTimeFieldOld from './DateTimeFieldOld';
import TableField from './TableField';

/**
 * Select the appropriate Field component for the field definition.
 *
 * @author Larry 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FieldFactoryProps
{
    context: FieldContext;
    data: any;
    onFieldChange: OnFieldChange;
    // temporary property being used during migration of fields
    useOld?: boolean;
}

// default set of controls to use - we can change this when doing a build
const USE_OLD_DEFAULT = true;

@observer
class FieldFactory extends React.Component<FieldFactoryProps>
{
    public render(): React.ReactNode
    {
        const useOld = lodash.isNil(this.props.useOld) ? USE_OLD_DEFAULT : this.props.useOld;
        const { context, onFieldChange } = this.props;
        const { field } = context;
        const { customFields, editing, fieldValidator } = context.formContext;
        const disabled = false;
        const fieldState = context.formContext.fieldStates[field.id];
        // used to wrap old fields until we can convert them
        const padding = this.props.context.formContext.editing ? px(2) : px(8);
        const value = FormDataUtility.get(this.props.data, field);

        const customFieldRenderer: CustomFieldRenderer<any> = customFields && customFields[field.id];
        if (customFieldRenderer)
        {
            return customFieldRenderer(context, value, this.props.data, onFieldChange);
        }
        else if (FormFieldTypes.isBoolean(field))
        {
            return <BooleanField context={context} value={value} onFieldChange={onFieldChange} />;
        }
        else if (FormFieldTypes.isButton(field))
        {
            // a button must always be created as a custom field so that the onClick can be supplied
            throw new Error(`FieldButton ${field.id} must be added as a custom control`);
        }
        else if (FormFieldTypes.isDateTime(field))
        {
            if (useOld)
            {
                return <div style={{ padding }}><DateTimeFieldOld context={context} disabled={disabled}
                    editing={editing} field={field} fieldState={fieldState} fieldValidator={fieldValidator}
                    onFieldChange={onFieldChange} value={value} /></div>;
            }
            else
            {
                return <DateTimeField context={context} onFieldChange={onFieldChange} value={value} />;
            }
        }
        else if (FormFieldTypes.isEnum(field))
        {
            return <EnumField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isFormatted(field))
        {
            return <div style={{ padding }}><FormattedField context={context} editing={editing} disabled={disabled}
                field={field}
                fieldState={fieldState} fieldValidator={fieldValidator} onFieldChange={onFieldChange}
                value={value} /></div>;
        }
        else if (FormFieldTypes.isFormSpecific(field))
        {
            throw new Error(`Form specific field ${field.id} must be implemented`);
        }
        else if (FormFieldTypes.isGroup(field))
        {
            return <GroupField context={context} data={this.props.data} onFieldChange={onFieldChange} />;
        }
        else if (FormFieldTypes.isMedicalGroup(field))
        {
            return <MedicalGroupEntityField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isMedicalGroupList(field))
        {
            return <MedicalGroupListField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isMedicalGroupLocation(field))
        {
            return <MedicalGroupLocationEntityField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isMember(field))
        {
            return <MemberEntityField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isMemberOrMedicalGroup(field))
        {
            return <MemberOrMedicalGroupEntityField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isNumber(field))
        {
            return <div style={{ padding }}><NumberField context={context} disabled={disabled} editing={editing}
                field={field}
                fieldState={fieldState} fieldValidator={fieldValidator} onFieldChange={onFieldChange} value={value} />
            </div>;
        }
        else if (FormFieldTypes.isSelection(field))
        {
            return <SelectionField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isServiceRecordReference(field))
        {
            return <ServiceRecordReferenceEntityField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isSnomedTerm(field))
        {
            return <div style={{ padding }}><SnomedTermField context={context} disabled={disabled} editing={editing}
                field={field}
                fieldValidator={fieldValidator} onFieldChange={onFieldChange} value={value} /></div>;
        }
        else if (FormFieldTypes.isTable(field))
        {
            return <TableField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isText(field))
        {
            return <TextField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isUnsupported(field))
        {
            return <UnsupportedField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else if (FormFieldTypes.isValueSet(field))
        {
            return <ValueSetField context={context} onFieldChange={onFieldChange} value={value} />;
        }
        else
        {
            // @ts-ignore
            return `Unknown field type: ${field.type}`;
        }
    }
}

export default FieldFactory;
