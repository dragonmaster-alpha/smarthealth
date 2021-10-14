import {storiesOf} from '@storybook/react';
import MedicationSummaryPanel from 'main/summary/medication/MedicationSummaryPanel';
import React from 'react';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import SetEntities from 'test/component/SetEntities';
import SetEntity, {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {
    MEDICATION_4_PANADOL_RAPID, MEDICATION_5_AMINO_ACIDS, MEDICATION_6_PANADOL, MEDICATION_7_PATIENT_BLUE_V
} from 'test/model/MedicationSummaryMother';
import multipleMedicationLatest from 'test/summary/medication/MedicationSummaryPanel.MultipleMedicationLatest.json';
import singleMedicationLatest from 'test/summary/medication/MedicationSummaryPanel.SingleMedicationLatest.json';

/**
 * Tester for MedicationSummaryPanel.tsx
 *
 * @author Thompson 29/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Summary/Medication', module)
    .add('Empty',
        () =>
        {
            return (
                <SetEntity type={EntityType.EntityReferenceList}
                    id={EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationsLatest)}
                    value={{
                        id: '/medications/latest',
                        referencedType: 'MedicationSummary',
                        references: []
                    }}>
                    <MedicationSummaryPanel />
                </SetEntity>
            );
        }
    )
    .add('Single Medication',
        () =>
        {
            async function getLatestMedications(): Promise<EntityReferenceList>
            {
                return new Promise<EntityReferenceList>(
                    resolve => resolve(singleMedicationLatest as EntityReferenceList));
            }

            const entities: EntityDetails[] = [
                {
                    type: EntityType.MedicationSummary,
                    id: MEDICATION_4_PANADOL_RAPID.id,
                    value: MEDICATION_4_PANADOL_RAPID
                },
                {
                    type: EntityType.EntityReferenceList,
                    id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationsLatest),
                    value: {
                        id: '/medications/latest',
                        referencedEntityType: 'MedicationSummary',
                        references: [
                            {
                                id: MEDICATION_4_PANADOL_RAPID.id,
                                type: 'MedicationSummary'
                            }
                        ]
                    }
                }
            ];
            return (
                <SetStore set={(appStore) =>
                {
                    appStore.handlers.medicationHandler.getLatestMedications = getLatestMedications;
                }}>
                    <SetEntities entities={entities}>
                        <MedicationSummaryPanel />
                    </SetEntities>
                </SetStore>
            );
        }
    )
    .add('Multiple Medication',
        () =>
        {
            async function getLatestMedications(): Promise<EntityReferenceList>
            {
                return new Promise<EntityReferenceList>(
                    resolve => resolve(multipleMedicationLatest as EntityReferenceList));
            }

            const entities: EntityDetails[] = [
                {
                    type: EntityType.MedicationSummary,
                    id: MEDICATION_4_PANADOL_RAPID.id,
                    value: MEDICATION_4_PANADOL_RAPID
                },
                {
                    type: EntityType.MedicationSummary,
                    id: MEDICATION_5_AMINO_ACIDS.id,
                    value: MEDICATION_5_AMINO_ACIDS
                },
                {
                    type: EntityType.MedicationSummary,
                    id: MEDICATION_6_PANADOL.id,
                    value: MEDICATION_6_PANADOL
                },
                {
                    type: EntityType.MedicationSummary,
                    id: MEDICATION_7_PATIENT_BLUE_V.id,
                    value: MEDICATION_7_PATIENT_BLUE_V
                },
                {
                    type: EntityType.EntityReferenceList,
                    id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationsLatest),
                    value: {
                        id: '/medications/latest',
                        referencedEntityType: 'MedicationSummary',
                        references: [
                            {
                                id: MEDICATION_4_PANADOL_RAPID.id,
                                type: 'MedicationSummary'
                            },
                            {
                                id: MEDICATION_5_AMINO_ACIDS.id,
                                type: 'MedicationSummary'
                            },
                            {
                                id: MEDICATION_6_PANADOL.id,
                                type: 'MedicationSummary'
                            },
                            {
                                id: MEDICATION_7_PATIENT_BLUE_V.id,
                                type: 'MedicationSummary'
                            }
                        ]
                    }
                }
            ];
            return (
                <SetStore set={(appStore) =>
                {
                    appStore.handlers.medicationHandler.getLatestMedications = getLatestMedications;
                }}>
                    <SetEntities entities={entities}>
                        <MedicationSummaryPanel />
                    </SetEntities>
                </SetStore>
            );
        }
    );
