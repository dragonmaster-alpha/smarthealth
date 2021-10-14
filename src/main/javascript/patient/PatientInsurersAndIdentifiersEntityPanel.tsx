import Entities, {EntityReferences} from 'main/component/Entities';
import PatientIDProps from 'main/patient/PatientIDProps';
import PatientInsurersAndIdentifiersPanel from 'main/patient/PatientInsurersAndIdentifiersPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entity component to load PatientInsurersAndIdentifiersPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class PatientInsurersAndIdentifiersEntityPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            patientIdentifiers: {
                type: EntityType.PatientIdentifiers,
                id: this.props.patientID
            },
            formDescription: {
                type: EntityType.FormDescription,
                id: 'Patient.InsurersAndIdentifiers'
            }
        };

        return (
            <Entities entities={entities} render={(data) => (
                <PatientInsurersAndIdentifiersPanel data={data.patientIdentifiers}
                    formDescription={data.formDescription} patientID={this.props.patientID} />
            )} />
        );
    }
}

export default PatientInsurersAndIdentifiersEntityPanel;
