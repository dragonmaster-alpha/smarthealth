import {storiesOf} from '@storybook/react';
import ClinicalMeasuresTable from 'main/summary/clinicalMeasures/ClinicalMeasuresTable';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Observation from 'smarthealth-javascript/Observation';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import {loadServiceType} from 'test/data/ServiceTypeMother';
import clinicalMeasuresLimit12Dates
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.13UniqueDates.json';
import clinicalMeasuresBMICases from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.BMITestCases.json';
import clinicalMeasuresOutOfRangeWeight
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.OutOfRangeWeight.json';

/**
 * Allow debugging of ClinicalMeasuresTable.tsx
 *
 * @author Thompson 18/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Summary/Clinical Measures Table', module)
    .add('Limit 12 Date columns',
        () =>
        {
            const entities: EntityDetails[] = [
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.ConsultationNotes,
                    value: loadServiceType(ServiceTypeEnum.ConsultationNotes)
                },
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.DietitianNotes,
                    value: loadServiceType(ServiceTypeEnum.DietitianNotes)
                },
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.ImmunologyHIVAssessment,
                    value: loadServiceType(ServiceTypeEnum.ImmunologyHIVAssessment)
                },
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.LungFunction,
                    value: loadServiceType(ServiceTypeEnum.LungFunction)
                },
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.RenalHDPrescription,
                    value: loadServiceType(ServiceTypeEnum.RenalHDPrescription)
                },
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.ImmunologyHepatitisAssessment,
                    value: loadServiceType(ServiceTypeEnum.ImmunologyHepatitisAssessment)
                }
            ];
            return (
                <SetEntities entities={entities}>
                    <ClinicalMeasuresTable observations={clinicalMeasuresLimit12Dates as Observation[]} />
                </SetEntities>
            );
        })
    .add('Out of range weight',
        () =>
        {
            const entities: EntityDetails[] = [
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.ConsultationNotes,
                    value: loadServiceType(ServiceTypeEnum.ConsultationNotes)
                }
            ];
            return (
                <SetEntities entities={entities}>
                    <ClinicalMeasuresTable observations={clinicalMeasuresOutOfRangeWeight as Observation[]} />
                </SetEntities>
            );
        })
    .add('BMI calculations',
        () =>
        {
            const entities: EntityDetails[] = [
                {
                    type: EntityType.ServiceType,
                    id: ServiceTypeEnum.ConsultationNotes,
                    value: loadServiceType(ServiceTypeEnum.ConsultationNotes)
                }
            ];
            return (
                <SetEntities entities={entities}>
                    <ClinicalMeasuresTable observations={clinicalMeasuresBMICases as Observation[]} />
                </SetEntities>
            );
        });
