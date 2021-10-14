import Entities, {EntityReferences} from 'main/component/Entities';
import PatientIDProps from 'main/patient/PatientIDProps';
import PatientMedicalAlertsPanel from 'main/patient/PatientMedicalAlertsPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entity component to load PatientMedicalAlertsPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class PatientMedicalAlertsEntitiesPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            patientClinical: { type: EntityType.PatientClinical, id: this.props.patientID },
            formDescription: { type: EntityType.FormDescription, id: 'Patient.MedicalAlerts.Form' },
            tableDescription: { type: EntityType.FormDescription, id: 'Patient.MedicalAlerts.Table' }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientMedicalAlertsPanel patientClinical={data.patientClinical} patientID={this.props.patientID}
                    formDescription={data.formDescription} tableDescription={data.tableDescription} />
            )} />
        );
    }
}

export default PatientMedicalAlertsEntitiesPanel;
