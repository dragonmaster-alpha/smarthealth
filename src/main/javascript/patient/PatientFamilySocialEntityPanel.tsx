import Entities, {EntityReferences} from 'main/component/Entities';
import PatientFamilySocialPanel from 'main/patient/PatientFamilySocialPanel';
import PatientIDProps from 'main/patient/PatientIDProps';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entity component to load PatientFamilySocialPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class PatientFamilySocialEntityPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            formDescription: {
                type: EntityType.FormDescription,
                id: 'Patient.FamilySocial'
            },
            patientFamilySocial: {
                type: EntityType.PatientFamilySocial,
                id: this.props.patientID
            }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientFamilySocialPanel data={data.patientFamilySocial} formDescription={data.formDescription}
                    patientID={this.props.patientID} />
            )} />
        );
    }
}

export default PatientFamilySocialEntityPanel;
