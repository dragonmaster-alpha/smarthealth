import {autobind} from 'core-decorators';
import EditViewTableFormComponent from 'main/form/EditViewTableFormComponent';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientClinical from 'smarthealth-javascript/PatientClinical';

/**
 * Display and edit Patient Medical Alerts
 *
 * @author Thompson 14/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientMedicalAlertsPanelProps extends PatientIDProps
{
    formDescription: FormDescription;
    patientClinical: PatientClinical;
    tableDescription: FormDescription;
}

@inject('appStore')
class PatientMedicalAlertsPanel extends React.Component<PatientMedicalAlertsPanelProps>
{
    @autobind
    private onSave(patientClinical: PatientClinical): Promise<boolean>
    {
        const success = this.props.appStore.handlers.patientHandler.updatePatientClinical(patientClinical);
        return success;
    }

    public render()
    {
        return (
            <EditViewTableFormComponent data={this.props.patientClinical}
                bodyFormDescription={this.props.formDescription} headerFormDescription={this.props.tableDescription}
                onSave={this.onSave} />
        );
    }
}

export default PatientMedicalAlertsPanel;
