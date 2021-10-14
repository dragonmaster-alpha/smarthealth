import Entities, {EntityReferences} from 'main/component/Entities';
import PatientContactsPanel from 'main/patient/PatientContactsPanel';
import PatientIDProps from 'main/patient/PatientIDProps';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';

/**
 * Entities component to load PatientContactsPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class PatientContactsEntitiesPanel extends React.Component<PatientIDProps>
{
    public render()
    {
        const entities: EntityReferences = {
            patientContacts: { type: EntityType.PatientContacts, id: this.props.patientID },
            formDescription: { type: EntityType.FormDescription, id: 'Patient.Contacts.Form' },
            tableDescription: { type: EntityType.FormDescription, id: 'Patient.Contacts.Table' },
            pas: { type: EntityType.PatientPAS, id: this.props.patientID }
        };

        return (
            <Entities entities={entities} render={(data) => (
                <PatientContactsPanel formDescription={data.formDescription} pas={data.pas}
                    patientContacts={data.patientContacts} patientID={this.props.patientID}
                    tableDescription={data.tableDescription} />
            )} />
        );
    }
}

export default PatientContactsEntitiesPanel;
