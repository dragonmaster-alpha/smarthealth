import FieldContext from 'main/field/FieldContext';
import {CustomFieldRenderer, customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import {oneLineAddress} from 'main/format/AddressFormat';
import {fullName} from 'main/format/NameFormat';
import DateOfBirthAndAge from 'main/patient/DateOfBirthAndAge';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import Patient from 'smarthealth-javascript/Patient';
import PatientContact from 'smarthealth-javascript/PatientContact';
import PatientIdentifiers from 'smarthealth-javascript/PatientIdentifiers';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';

/**
 * Display an overview of the Patient
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface Overview
{
    association: PatientMedicalGroupAssociation;
    contacts: PatientContact[];
    demographics: Patient;
    identifiers: PatientIdentifiers;
}

interface PatientOverviewPanelProps extends PatientIDProps
{
    data: Overview;
    formDescription: FormDescription;
}

@inject('appStore')
@observer
class PatientOverviewPanel extends React.Component<PatientOverviewPanelProps>
{
    public render()
    {
        const customFields: { [key: string]: CustomFieldRenderer<Overview> } = {
            'demographics.address': customFieldRendererAdapter(this.renderAddress),
            'demographics.dateOfBirth': customFieldRendererAdapter(this.renderDateOfBirthAndAge),
            'demographics.name': customFieldRendererAdapter(this.renderFullName),
            'demographics.contactDetails': customFieldRendererAdapter(this.renderPhones),
            'identifiers.MRN': customFieldRendererAdapter(this.renderURMRN),
            'identifiers.DVA': customFieldRendererAdapter(this.renderDVA)
        };
        return (
            <EditViewFormComponent
                customFields={customFields} data={this.props.data} formDescription={this.props.formDescription} />
        );
    }

    private renderAddress(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: Overview)
        : React.ReactNode
    {
        return value && oneLineAddress(value);
    }

    private renderDVA(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Overview): React.ReactNode
    {
        return value && `${value.identifier} ${value.qualifier}`;
    }

    private renderDateOfBirthAndAge(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Overview): React.ReactNode
    {
        return data.demographics.dateOfBirth && <DateOfBirthAndAge patient={data.demographics} />;
    }

    private renderFullName(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Overview): React.ReactNode
    {
        return value && fullName(value, data.demographics.preferredName);
    }

    private renderPhones(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Overview): React.ReactNode
    {
        if (!value)
        {
            return null;
        }
        const phoneNumbers = [];
        if (value.phoneMobile)
        {
            phoneNumbers.push(`${value.phoneMobile} (M)`);
        }
        if (value.phoneHome)
        {
            phoneNumbers.push(`${value.phoneHome} (H)`);
        }
        if (value.phoneWork)
        {
            phoneNumbers.push(`${value.phoneWork} (W)`);
        }
        return phoneNumbers.join(', ');
    }

    private renderURMRN(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Overview): React.ReactNode
    {
        return data.association && data.association.urmrn;
    }
}

export default PatientOverviewPanel;
