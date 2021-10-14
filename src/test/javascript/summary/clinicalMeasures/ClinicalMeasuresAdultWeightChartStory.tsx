import {storiesOf} from '@storybook/react';
import ClinicalMeasuresAdultWeightChart from 'main/summary/clinicalMeasures/ClinicalMeasuresAdultWeightChart';
import React from 'react';
import Observation from 'smarthealth-javascript/Observation';
import oneDataPointClinicalMeasures from 'test/summary/clinicalMeasures/ObservationClinicalMeasures.1UniqueDate.json';
import twoDataPoint1DayApartClinicalMeasures
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.2Dates1DayApart.json';
import twoDataPointClinicalMeasures from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.2UniqueDates.json';
import threeDataPoint1DayApartClinicalMeasures
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.3Dates1DayApart.json';
import lifeTimeDataPointClinicalMeasures
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.UnderAndOver18.json';

/**
 * Allow debugging of ClinicalMeasuresAdultWeightChart.tsx
 *
 * @author Thompson 18/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const patientDateOfBirth = { iso: '1995-01-01' };
storiesOf('Summary/Adult Weight Chart', module)
    .add('1 data point',
        () =>
        {
            return (
                <div style={{ height: '95vh' }}>
                    <ClinicalMeasuresAdultWeightChart observations={oneDataPointClinicalMeasures as Observation[]}
                        patientDateOfBirth={patientDateOfBirth} />
                </div>
            );
        })
    .add('2 data points',
        () =>
        {
            return (
                <div style={{ height: '95vh' }}>
                    <ClinicalMeasuresAdultWeightChart observations={twoDataPointClinicalMeasures as Observation[]}
                        patientDateOfBirth={patientDateOfBirth} />
                </div>
            );
        })
    .add('2 data points 1 day apart',
        () =>
        {
            return (
                <div style={{ height: '95vh' }}>
                    <ClinicalMeasuresAdultWeightChart
                        observations={twoDataPoint1DayApartClinicalMeasures as Observation[]}
                        patientDateOfBirth={patientDateOfBirth} />
                </div>
            );
        })
    .add('3 data points 1 day apart',
        () =>
        {
            return (
                <div style={{ height: '95vh' }}>
                    <ClinicalMeasuresAdultWeightChart
                        observations={threeDataPoint1DayApartClinicalMeasures as Observation[]}
                        patientDateOfBirth={patientDateOfBirth} />
                </div>
            );
        })
    .add('Lifetime data points',
        () =>
        {
            return (
                <div style={{ height: '95vh' }}>
                    <ClinicalMeasuresAdultWeightChart observations={lifeTimeDataPointClinicalMeasures as Observation[]}
                        patientDateOfBirth={patientDateOfBirth} />
                </div>
            );
        });
