import {storiesOf} from '@storybook/react';
import ClinicalMeasuresSummariesEntitiesPanel
    from 'main/summary/clinicalMeasures/ClinicalMeasuresSummariesEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {loadServiceType} from 'test/data/ServiceTypeMother';
import observationsWithNoHeight from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.NoHeight.json';
import observationsWithNoWeight from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.NoWeight.json';
import observationsOver18 from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.Over18.json';
import observationsOnlyUnder18 from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.Under18.json';
import observationsUnderAndOver18 from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.UnderAndOver18.json';
import patientDemographics19950101 from 'test/summary/clinicalMeasures/PatientDemographicsDOB19950101.json';

/**
 * Allow debugging of ClinicalMeasuresSummariesEntitiesPanel.tsx
 *
 * @author Thompson 25/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
// const patientDateOfBirth = { iso: '1995-01-01' };
const baseEntities: EntityDetails[] = [
    {
        id: 1,
        type: EntityType.Patient,
        value: patientDemographics19950101
    },
    {
        id: ServiceTypeEnum.ConsultationNotes,
        type: EntityType.ServiceType,
        value: loadServiceType(ServiceTypeEnum.ConsultationNotes)
    },
    {
        id: ServiceTypeEnum.LungFunction,
        type: EntityType.ServiceType,
        value: loadServiceType(ServiceTypeEnum.LungFunction)
    }
];
storiesOf('Summary/Clinical Measures', module)
    .add('No Height',
        () =>
        {
            const entities: EntityDetails[] = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: observationsWithNoHeight as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
            // return <ClinicalMeasuresSummariesPanel observations={observationsWithNoHeight as Observation[]}
            //     patientDateOfBirth={patientDateOfBirth} />;
        })
    .add('No Weight',
        () =>
        {
            const entities: EntityDetails[] = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: observationsWithNoWeight as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
        })
    .add('No Weight and Height',
        () =>
        {
            const entities: EntityDetails[] = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: [] as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
        })
    .add('Observations under 18',
        () =>
        {
            const entities: EntityDetails[] = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: observationsOnlyUnder18 as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
        })
    .add('Observations under & over 18',
        () =>
        {
            const entities: EntityDetails[] = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: observationsUnderAndOver18 as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
        })
    .add('Observations over 18',
        () =>
        {
            const entities = [
                ...baseEntities,
                {
                    id: ObservationGroup.ClinicalMeasures,
                    type: EntityType.Observations,
                    value: observationsOver18 as Observation[]
                }
            ];
            return (
                <SetStore set={appStore => appStore.sessionStore.currentPatientID = 1}>
                    <SetEntities entities={entities}>
                        <ClinicalMeasuresSummariesEntitiesPanel />
                    </SetEntities>
                </SetStore>
            );
        });
