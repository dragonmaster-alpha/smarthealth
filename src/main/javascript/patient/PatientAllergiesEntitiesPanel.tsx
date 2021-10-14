import Entities, {EntityReferences} from 'main/component/Entities';
import PatientAllergiesPanel from 'main/patient/PatientAllergiesPanel';
import PatientIDProps from 'main/patient/PatientIDProps';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entities component to load PatientAllergiesPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class PatientAllergiesEntitiesPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            patientClinical: { type: EntityType.PatientClinical, id: this.props.patientID },
            formDescription: { type: EntityType.FormDescription, id: 'Patient.Allergies.Form' },
            tableDescription: { type: EntityType.FormDescription, id: 'Patient.Allergies.Table' }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientAllergiesPanel formDescription={data.formDescription} patientClinical={data.patientClinical}
                    patientID={this.props.patientID} tableDescription={data.tableDescription} />
            )} />
        );
    }
}

export default PatientAllergiesEntitiesPanel;
