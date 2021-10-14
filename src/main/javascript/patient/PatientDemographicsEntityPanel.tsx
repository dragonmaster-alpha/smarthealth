import Entities, {EntityReferences} from 'main/component/Entities';
import PatientDemographicsPanel from 'main/patient/PatientDemographicsPanel';
import PatientIDProps from 'main/patient/PatientIDProps';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entities component to load PatientDemographicsPanel.tsx
 *
 * @author Thompson 9/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class PatientDemographicsEntityPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            demographics: { id: this.props.patientID, type: EntityType.Patient },
            formDescription: { id: 'Patient.Demographics', type: EntityType.FormDescription },
            pas: { id: this.props.patientID, type: EntityType.PatientPAS }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientDemographicsPanel data={data.demographics} formDescription={data.formDescription}
                    patientID={this.props.patientID} pas={data.pas} />
            )} />
        );
    }
}

export default PatientDemographicsEntityPanel;
