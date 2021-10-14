import {autobind} from 'core-decorators';
import Button from 'main/component/Button';
import DialogIcons from 'main/dialog/DialogIcons';
import YesNoDialog from 'main/dialog/YesNoDialog';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, CustomFields, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import EHRConsentComponent from 'main/patient/EHRConsentComponent';
import PatientEHRConsentDialog from 'main/patient/PatientEHRConsentDialog';
import PatientPASIndicator from 'main/patient/PatientPASIndicator';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import Patient from 'smarthealth-javascript/Patient';
import PatientPAS from 'smarthealth-javascript/PatientPAS';

/**
 * Form to display/edit patient demographics
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface PatientDemographicsPanelProps extends StoreProps
{
    data: Patient;
    formDescription: FormDescription;
    pas: PatientPAS;
    patientID: number;
}

@inject('appStore', 'handlers', 'sessionStore')
class PatientDemographicsPanel extends React.Component<PatientDemographicsPanelProps>
{
    @autobind
    private onConsent()
    {
        this.props.appStore.componentStore.modalDialog.show(<PatientEHRConsentDialog data={this.props.data} />);
    }

    @autobind
    private async onEdit(): Promise<boolean>
    {
        if (this.props.pas.pasID)
        {
            const editable = await this.props.appStore.componentStore.modalDialog.showAndWait(<YesNoDialog
                header="Edit Patient Demographics" icon={DialogIcons.warn}
                message={`Demographics for this patient are under control of ${this.props.pas.pasName
                }. Editing this patient will override that control. Do you wish to proceed?`}
                onYes={() => true}
                onNo={() => false} />);

            return editable;
        }
        else
        {
            return true;
        }
    }

    @autobind
    private onRefreshFromPAS()
    {
        this.props.handlers.patientHandler.refreshPatientFromPAS(this.props.patientID);
    }

    @autobind
    private onSave(patient): Promise<boolean>
    {
        return this.props.handlers.patientHandler.updatePatientDemographics(patient);
    }

    public render()
    {
        const canSave = this.props.sessionStore.hasClinicalPermission(ClinicalPermission.ModifyDemographicDetails);
        const extraButtons = [
            { renderer: this.renderConsentButton, position: 1 },
            { renderer: this.renderRefreshFromPAS, position: 2 }
        ];

        const customField: CustomFields<Patient> = {
            ehrConsentDate: customFieldRendererAdapter(
                (field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
                    onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
                    data: Patient) => this.renderEHRConsentField(field, value, editing, disabled, valid, onFieldChange,
                    context, fieldValidator, data))
        };
        // TODO incorporate the indicator into the EditViewFormComponent so it is part of the grid
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr' }}>
                <PatientPASIndicator pas={this.props.pas} />
                <EditViewFormComponent customFields={customField} data={this.props.data} extraButtons={extraButtons}
                    formDescription={this.props.formDescription} onSave={canSave && this.onSave} onEdit={this.onEdit} />
            </div>
        );
    }

    @autobind
    private renderConsentButton(editing: boolean): React.ReactNode
    {
        return !editing
            && !this.props.data.ehrConsentDate
            && <Button title="Consent" onClick={this.onConsent} />;
    }

    @autobind
    private renderEHRConsentField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: Patient): React.ReactNode
    {
        return <EHRConsentComponent context={context} disabled={disabled} editing={editing}
            field={field as FormFieldDateTime} fieldValidator={fieldValidator} onFieldChange={onFieldChange}
            value={value} />;
    }

    @autobind
    private renderRefreshFromPAS(editing: boolean): React.ReactNode
    {
        return !editing && <Button title="Refresh From PAS" onClick={this.onRefreshFromPAS} />;
    }
}

export default PatientDemographicsPanel;
