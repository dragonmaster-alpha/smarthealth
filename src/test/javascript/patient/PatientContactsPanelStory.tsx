import {storiesOf} from '@storybook/react';
import PatientContactsEntitiesPanel from 'main/patient/PatientContactsEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MA_POTTER, MA_POTTER_PAS, PA_POTTER} from 'test/data/PatientContactMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';

/**
 * Allow debugging of PatientContactsPanel.tsx
 *
 * @author Thompson 11/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const valueWithoutPAS = {
    contacts: [
        MA_POTTER,
        PA_POTTER
    ],
    patientID: 2
};

const valueWithPAS = {
    contacts: [
        MA_POTTER_PAS
    ],
    patientID: 2
};

const entities: EntityDetails[] = [
    patientFormDescEntityDetails('Patient.Contacts.Form'),
    patientFormDescEntityDetails('Patient.Contacts.Table'),
    {
        type: EntityType.PatientPAS,
        id: 2,
        value: {
            patientID: 2,
            pasName: 'Test PAS',
            pasID: 1
        }
    }
];

storiesOf('Patient/PatientContactsPanel', module)
    .add('No contact under PAS', () =>
    {
        const entitiesWithoutPAS = [
            ...entities,
            {
                value: valueWithoutPAS,
                type: EntityType.PatientContacts,
                id: 2
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={entitiesWithoutPAS}>
                    <PatientContactsEntitiesPanel patientID={2} />
                </SetEntities>
            </FullScreen>
        );
    })
    .add('One contact under PAS', () =>
    {
        const entitiesWithPAS = [
            ...entities,
            {
                value: valueWithPAS,
                type: EntityType.PatientContacts,
                id: 2
            }
        ];
        return (
            <FullScreen>
                <SetEntities entities={entitiesWithPAS}>
                    <PatientContactsEntitiesPanel patientID={2} />
                </SetEntities>
            </FullScreen>
        );
    });
