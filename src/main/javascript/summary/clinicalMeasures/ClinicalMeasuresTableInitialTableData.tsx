import lodash from 'lodash';
import TableData from 'main/data/TableData';
import ObservationType from 'smarthealth-javascript/ObservationType';

/**
 * Provide initial table data structure for ClinicalMeasuresTable.
 *
 * @author Thompson 19/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function getClinicalMeasuresTableInitialTableData(): TableData
{
    // we use the key "measure" instead of observationType because BMI is not an ObservationType
    const clinicalMeasuresTableInitialTableData: TableData = [
        {
            measure: ObservationType.Height
        },
        {
            measure: ObservationType.Weight
        },
        {
            measure: 'BMI'
        },
        {
            measure: ObservationType.MinGoalWeight
        },
        {
            measure: ObservationType.MaxGoalWeight
        },
        {
            measure: ObservationType.BloodPressureSitting
        },
        {
            measure: ObservationType.BloodPressureStanding
        },
        {
            measure: ObservationType.BloodPressureLying
        },
        {
            measure: ObservationType.Pulse
        },
        {
            measure: ObservationType.Temperature
        },
        {
            measure: ObservationType.SPO2
        }
    ];
    return lodash.cloneDeep(clinicalMeasuresTableInitialTableData);
}
