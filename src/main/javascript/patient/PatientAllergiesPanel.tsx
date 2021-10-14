import {autobind} from 'core-decorators';
import EditViewTableFormComponent from 'main/form/EditViewTableFormComponent';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientClinical from 'smarthealth-javascript/PatientClinical';

/**
 * Display and edit Patient Allergies
 *
 * @author Thompson 14/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientAllergiesPanelProps extends PatientIDProps
{
    formDescription: FormDescription;
    patientClinical: PatientClinical;
    tableDescription: FormDescription;
}

@inject('appStore')
class PatientAllergiesPanel extends React.Component<PatientAllergiesPanelProps>
{
    @autobind
    private onSave(patientClinical: PatientClinical): Promise<boolean>
    {
        const result = this.props.appStore.handlers.patientHandler.updatePatientClinical(patientClinical);
        return result;
    }

    public render()
    {
        return (
            <EditViewTableFormComponent data={this.props.patientClinical}
                bodyFormDescription={this.props.formDescription} headerFormDescription={this.props.tableDescription}
                onSave={this.onSave}>
            </EditViewTableFormComponent>
        );
    }
}

export default PatientAllergiesPanel;
