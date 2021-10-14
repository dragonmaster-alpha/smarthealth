import {autobind} from 'core-decorators';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import PatientIDProps from 'main/patient/PatientIDProps';
import {inject} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import PatientIdentifiers from 'smarthealth-javascript/PatientIdentifiers';
import PatientIdentifierType from 'smarthealth-javascript/PatientIdentifierType';

/**
 * Form to display and edit Patient Insurers And Identifiers
 *
 * @author Thompson 1/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

interface PatientInsurersAndIdentifiersPanelProps extends PatientIDProps
{
    data: PatientIdentifiers;
    formDescription: FormDescription;
}

@inject('appStore')
class PatientInsurersAndIdentifiersPanel extends React.Component<PatientInsurersAndIdentifiersPanelProps>
{
    @autobind
    private onSave(patientIdentifiers: PatientIdentifiers): Promise<boolean>
    {
        for (const identifierType in patientIdentifiers.identifiers)
        {
            if (!patientIdentifiers.identifiers[identifierType].hasOwnProperty('patientID'))
            {
                patientIdentifiers.identifiers[identifierType].patientID = this.props.patientID;
                // newly added identifier
                patientIdentifiers.identifiers[identifierType].identifierType = PatientIdentifierType[identifierType];
            }
        }
        const success = this.props.appStore.handlers.patientHandler.updatePatientIdentifiers(this.props.patientID,
            patientIdentifiers);
        return success;
    }

    public render()
    {
        return (
            <EditViewFormComponent formDescription={this.props.formDescription} data={this.props.data}
                onSave={this.onSave} />
        );
    }
}

export default PatientInsurersAndIdentifiersPanel;
