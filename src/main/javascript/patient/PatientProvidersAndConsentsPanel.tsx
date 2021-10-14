import {autobind} from 'core-decorators';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, CustomFields, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import EHRConsentComponent from 'main/patient/EHRConsentComponent';
import MedicalGroupAssociationsTable from 'main/patient/MedicalGroupAssociationsTable';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import EntityUpdate from 'smarthealth-javascript/EntityUpdate';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import Patient from 'smarthealth-javascript/Patient';
import PatientClinical from 'smarthealth-javascript/PatientClinical';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import PatientProviderAssociation from 'smarthealth-javascript/PatientProviderAssociation';

/**
 * Form to view and edit Patient Providers and Consents
 *
 * @author Thompson 1/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface PatientProvidersAndConsentsPanelData
{
    medicalGroupAssociations: PatientMedicalGroupAssociation[];
    patient: Patient;
    patientClinical: PatientClinical;
    providers: PatientProviderAssociation[];
}

interface PatientProvidersAndConsentsPanelProps extends PatientIDProps
{
    data: PatientProvidersAndConsentsPanelData;
    formDescription: FormDescription;
}

@inject('appStore')
@observer
class PatientProvidersAndConsentsPanel extends React.Component<PatientProvidersAndConsentsPanelProps>
{
    @autobind
    private async onSave(data: PatientProvidersAndConsentsPanelData): Promise<boolean>
    {
        const entityList: EntityUpdate[] = [
            {
                entityReference: {
                    id: data.patientClinical.patientID,
                    type: EntityType.PatientClinical
                },
                entity: data.patientClinical
            },
            {
                entityReference: {
                    type: EntityType.EntityUpdateList,
                    id: data.patientClinical.patientID
                },
                entity: {
                    type: EntityType.PatientMedicalGroupAssociation,
                    entities: data.medicalGroupAssociations
                }
            }
        ];
        const result = await this.props.appStore.handlers.entityReferenceListHandler.updateEntityList(entityList);
        return result;
    }

    public render()
    {
        const customFields: CustomFields<PatientProvidersAndConsentsPanelData> = {
            'patient.ehrConsentDate': customFieldRendererAdapter(this.renderEHRConsent),
            medicalGroupAssociations: customFieldRendererAdapter(this.renderMedicalGroupAssociations)
        };

        return (
            <EditViewFormComponent customFields={customFields} data={this.props.data}
                formDescription={this.props.formDescription} onSave={this.onSave} />
        );
    }

    @autobind
    private renderEHRConsent(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: PatientProvidersAndConsentsPanelData): React.ReactNode
    {
        return (
            <EHRConsentComponent context={context} field={field as FormFieldDateTime} fieldValidator={fieldValidator}
                onFieldChange={onFieldChange} value={value} />
        );
    }

    @autobind
    private renderMedicalGroupAssociations(field: FormField, value: any, editing: boolean, disabled: boolean,
        valid: boolean, onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: PatientProvidersAndConsentsPanelData): React.ReactNode
    {
        return <MedicalGroupAssociationsTable context={context} data={data} disabled={disabled} editing={editing}
            field={field as FormFieldTable} formDescription={this.props.formDescription} fieldValidator={fieldValidator}
            medicalGroupAssociationViewMode={this.props.data.medicalGroupAssociations}
            onFieldChange={onFieldChange} onSave={this.onSave} value={value} />;
    }
}

export default PatientProvidersAndConsentsPanel;
