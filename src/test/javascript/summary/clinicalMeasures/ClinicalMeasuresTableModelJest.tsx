import AppStore from 'main/store/AppStore';
import ClinicalMeasuresTableModel from 'main/summary/clinicalMeasures/ClinicalMeasuresTableModel';
import Observation from 'smarthealth-javascript/Observation';
import bmiTestsValues from 'test/summary/clinicalMeasures/ClinicalMeasuresTableModel.BMITestsValues.json';
import clinicalMeasures2DatesValues
    from 'test/summary/clinicalMeasures/ClinicalMeasuresTableModelJest.clinicalMeasures2DatesValues.json';
import dateReductionClinicalMeasuresValues
    from 'test/summary/clinicalMeasures/ClinicalMeasuresTableModelJest.dateReductionClinicalMeasuresValues.json';
import dateReductionClinicalMeasures
    from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.13UniqueDates.json';
import clinicalMeasures2Dates from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.2UniqueDates.json';
import BMITestsClinicalMeasures from 'test/summary/clinicalMeasures/ObservationsClinicalMeasures.BMITestCases.json';

/**
 * Jest for ClinicalMeasuresTableModel.tsx
 *
 * @author Thompson 19/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('extract columns and values for Clinical Measures Table', () =>
{
    expect(new ClinicalMeasuresTableModel(new AppStore(), null).columns)
        .toEqual([
            { header: 'Measure', field: 'measure' }
        ]);
    expect(new ClinicalMeasuresTableModel(new AppStore(), []).columns)
        .toEqual([
            { header: 'Measure', field: 'measure' }
        ]);
    expect(new ClinicalMeasuresTableModel(new AppStore(), clinicalMeasures2Dates as Observation[]).columns)
        .toEqual([
            { header: 'Measure', field: 'measure' },
            { header: '19/08/2020', field: '2020-08-19' },
            { header: '10/08/2017', field: '2017-08-10' }
        ]);
    expect(new ClinicalMeasuresTableModel(new AppStore(), clinicalMeasures2Dates as Observation[]).values)
        .toEqual(clinicalMeasures2DatesValues);
    expect(new ClinicalMeasuresTableModel(new AppStore(), dateReductionClinicalMeasures as Observation[]).columns)
        .toEqual([
            { header: 'Measure', field: 'measure' },
            { header: '18/08/2020', field: '2020-08-18' },
            { header: '16/08/2020', field: '2020-08-16' },
            { header: '11/06/2020', field: '2020-06-11' },
            { header: '08/04/2020', field: '2020-04-08' },
            { header: '07/04/2020', field: '2020-04-07' },
            { header: '22/03/2020', field: '2020-03-22' },
            { header: '10/03/2020', field: '2020-03-10' },
            { header: '25/02/2020', field: '2020-02-25' },
            { header: '23/01/2020', field: '2020-01-23' },
            { header: '20/01/2020', field: '2020-01-20' },
            { header: '10/01/2020', field: '2020-01-10' },
            { header: '09/01/2020', field: '2020-01-09' }
        ]);
    expect(new ClinicalMeasuresTableModel(new AppStore(), dateReductionClinicalMeasures as Observation[]).values)
        .toEqual(dateReductionClinicalMeasuresValues);

    expect(new ClinicalMeasuresTableModel(new AppStore(), BMITestsClinicalMeasures as Observation[]).values)
        .toEqual(bmiTestsValues);
});
