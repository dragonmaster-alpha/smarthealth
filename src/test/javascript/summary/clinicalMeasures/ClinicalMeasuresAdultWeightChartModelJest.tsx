import ClinicalMeasuresAdultWeightChartModel from 'main/summary/clinicalMeasures/ClinicalMeasuresAdultWeightChartModel';
import moment from 'moment';
import Observation from 'smarthealth-javascript/Observation';
import oneDataPointClinicalMeasures from 'test/summary/clinicalMeasures/ObservationClinicalMeasures.1UniqueDate.json';
import twoDataPointClinicalMeasures from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.2UniqueDates.json';
import lifeTimeDataPointClinicalMeasures
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.UnderAndOver18.json';

/**
 * Jest for ClinicalMeasuresAdultWeightChartModel.tsx
 *
 * @author Thompson 20/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('extract Clinical Measures Adult Weight Chart data point values', () =>
{
    const patientDateOfBirth = { iso: '1995-01-01' };
    expect(new ClinicalMeasuresAdultWeightChartModel(oneDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).values)
        .toEqual([
            {
                unixEpochMilliSeconds: moment('2020-08-20')
                    .startOf('day')
                    .valueOf(),
                weight: 68
            }
        ]);
    expect(new ClinicalMeasuresAdultWeightChartModel(twoDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).values)
        .toEqual([
            {
                weight: 65,
                unixEpochMilliSeconds: moment('2017-08-10')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 68.5,
                unixEpochMilliSeconds: moment('2020-08-19')
                    .startOf('day')
                    .valueOf()
            }
        ]);
    expect(new ClinicalMeasuresAdultWeightChartModel(lifeTimeDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).values)
        .toEqual([
            {
                weight: 62.4,
                unixEpochMilliSeconds: moment('2013-02-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 58.6,
                unixEpochMilliSeconds: moment('2015-02-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 70.3,
                unixEpochMilliSeconds: moment('2016-02-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 69.5,
                unixEpochMilliSeconds: moment('2017-02-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 73.3,
                unixEpochMilliSeconds: moment('2018-08-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 74.3,
                unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            },
            {
                weight: 73.3,
                unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }
        ]);
});

test('Calculate BMI 25, 20 and 18.5 reference line', () =>
{
    const patientDateOfBirth = { iso: '1995-01-01' };
    expect(new ClinicalMeasuresAdultWeightChartModel(oneDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi18AndAHalfWeight)
        .toEqual(53.47);
    expect(new ClinicalMeasuresAdultWeightChartModel(oneDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi20Weight)
        .toEqual(57.8);
    expect(new ClinicalMeasuresAdultWeightChartModel(oneDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi25Weight)
        .toEqual(72.25);

    expect(new ClinicalMeasuresAdultWeightChartModel(twoDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi18AndAHalfWeight)
        .toEqual(52.84);
    expect(new ClinicalMeasuresAdultWeightChartModel(twoDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi20Weight)
        .toEqual(57.12);
    expect(new ClinicalMeasuresAdultWeightChartModel(twoDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi25Weight)
        .toEqual(71.40);

    expect(new ClinicalMeasuresAdultWeightChartModel(lifeTimeDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi18AndAHalfWeight)
        .toEqual(57.96);
    expect(new ClinicalMeasuresAdultWeightChartModel(lifeTimeDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi20Weight)
        .toEqual(62.66);
    expect(new ClinicalMeasuresAdultWeightChartModel(lifeTimeDataPointClinicalMeasures as Observation[],
        patientDateOfBirth).bmi25Weight)
        .toEqual(78.32);
});
