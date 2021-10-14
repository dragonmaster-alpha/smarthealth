import Entities, {EntityReferences} from 'main/component/Entities';
import PatientIDProps from 'main/patient/PatientIDProps';
import PatientOverviewPanel from 'main/patient/PatientOverviewPanel';
import {inject} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entities component to load PatientOverviewPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@inject('sessionStore')
class PatientOverviewEntitiesPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const { patientID } = this.props;
        const entities: EntityReferences = {
            demographics: { type: EntityType.Patient, id: patientID },
            identifiers: { type: EntityType.PatientIdentifiers, id: patientID },
            contacts: { type: EntityType.PatientContacts, id: patientID },
            association: {
                type: EntityType.PatientMedicalGroupAssociation,
                id: { id: patientID, associatedID: this.props.sessionStore.currentGroupID }
            },
            patientClinical: { type: EntityType.PatientClinical, id: this.props.patientID },
            formDescription: { type: EntityType.FormDescription, id: 'Patient.Overview' }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientOverviewPanel patientID={this.props.patientID} data={data}
                    formDescription={data.formDescription} />
            )} />
        );
    }
}

export default PatientOverviewEntitiesPanel;
