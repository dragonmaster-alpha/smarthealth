import {storiesOf} from '@storybook/react';
import MedicationService from 'main/service/customServices/MedicationService';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MedicationForm from 'smarthealth-rest-test/formdesc/service/Form.Service.Medication.json';
import changeReasonValueSet from 'smarthealth-rest-test/valueset/ValueSet.Medication.ChangeReason.json';
import changeTypeValueSet from 'smarthealth-rest-test/valueset/ValueSet.Medication.ChangeType.json';
import routeOfAdministrationValueSet
    from 'smarthealth-rest-test/valueset/ValueSet.Medication.RouteOfAdministration.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_PETER_FLOWER, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import data from 'test/service/customServices/MedicationServiceStory.MedicationCeased.json';

/**
 * Tester for MedicationService.tsx
 *
 * @author Thompson 03/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Form/Service/Custom Service', module)
    .add('Medication', () =>
    {
        const entities: EntityDetails[] = [
            ...memberEntityDetails(MEMBER_PETER_FLOWER),
            {
                type: EntityType.ValueSet,
                id: 'Medication.ChangeType',
                value: changeTypeValueSet
            },
            {
                type: EntityType.ValueSet,
                id: 'Medication.ChangeReason',
                value: changeReasonValueSet
            },
            {
                type: EntityType.ValueSet,
                id: 'Medication.RouteOfAdministration',
                value: routeOfAdministrationValueSet
            }
        ];
        return (
            <SetEntities entities={entities}>
                <FullScreen>
                    <MedicationService data={data}
                        formDescription={MedicationForm as FormDescription} onSave={() => true} />
                </FullScreen>
            </SetEntities>
        );
    });
