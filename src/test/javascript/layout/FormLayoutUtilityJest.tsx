import FormFieldLayoutState from 'main/layout/FormFieldLayoutState';
import {buildTemplateColumns, buildTemplateRows} from 'main/layout/FormLayoutUtility';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FORM_DIALOG_ASSOCIATED_MEDICAL_GROUP_ADD
    from 'smarthealth-rest-test/formdesc/Form.Dialog.AssociatedMedicalGroupAdd.json';
import periodicReviewForm from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.PeriodicReview.json';
import FORM_SUMMARY_HEPATITIS from 'smarthealth-rest-test/formdesc/summary/Form.Summary.HepatitisSummary.json';
import FORM_SUMMARY_PATIENT_WATCH from 'smarthealth-rest-test/formdesc/summary/Form.Summary.PatientWatch.json';
import {
    BOOLEAN_INTERPRETER, createFormDescription, DATE_TIME_DATE, NUMBER_WEIGHT, SELECTION_SEX, TABLE_NAME_AND_SEX,
    TEXT_EMAIL, TEXT_NAME
} from 'test/model/FormFieldMother';

/**
 * Test FormLayoutUtility
 *
 * @author Larry 5/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('FormLayoutUtility.buildTemplateRows', () =>
{
    function buildTemplateRowsFromFormDesc(formDescription: FormDescription): string
    {
        return buildTemplateRows(formDescription.layoutColumns, formDescription.fieldsAndSections, false);
    }

    test('single fillHeight', () =>
    {
        const tableField: FormFieldTable = {
            ...TABLE_NAME_AND_SEX,
            layout: {
                labelPosition: FieldLabelPosition.Above,
                fillHeight: true,
                newLine: true
            }
        };
        const fields: FormField[] = [
            TEXT_NAME,
            SELECTION_SEX,
            DATE_TIME_DATE,
            TEXT_EMAIL,
            BOOLEAN_INTERPRETER,
            tableField
        ];
        const tableDescription = createFormDescription(fields);
        expect(buildTemplateRowsFromFormDesc(tableDescription))
            .toEqual('auto auto auto 1fr');
    });

    test('Patient Watch Periodic Review', () =>
    {
        expect(buildTemplateRowsFromFormDesc(periodicReviewForm as FormDescription))
            .toBe('auto auto auto 1fr');
    });

    test('two fillHeights', () =>
    {
        expect(buildTemplateRowsFromFormDesc(FORM_SUMMARY_PATIENT_WATCH as FormDescription))
            .toEqual('auto auto auto auto auto auto auto auto auto 1fr 1fr');
    });

    test('fillHeight and hidden fields', () =>
    {
        expect(buildTemplateRowsFromFormDesc(createFormDescription([
            TEXT_NAME,
            TEXT_EMAIL,
            DATE_TIME_DATE,
            {
                ...SELECTION_SEX,
                state: {
                    viewStateHidden: true,
                    editState: FieldEditState.Hidden
                }
            },
            {
                ...BOOLEAN_INTERPRETER,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillHeight: true
                }
            }
        ])))
            .toBe('auto 1fr');
    });

    test('fillHeight with hidden fields and field after', () =>
    {
        expect(buildTemplateRowsFromFormDesc(createFormDescription([
            TEXT_NAME,
            TEXT_EMAIL,
            DATE_TIME_DATE,
            {
                ...SELECTION_SEX,
                state: {
                    viewStateHidden: true,
                    editState: FieldEditState.Hidden
                }
            },
            {
                ...BOOLEAN_INTERPRETER,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillHeight: true
                }
            },
            NUMBER_WEIGHT
        ])))
            .toBe('auto 1fr auto');
    });
});

// TODO buildTemplateColumns not used at the moment
describe.skip('FormLayoutUtility.buildTemplateColumns', () =>
{
    function buildTemplateColumnsFromFormDesc(formDescription: FormDescription): string
    {
        const state = new FormFieldLayoutState(formDescription.layoutColumns);
        return buildTemplateColumns(state);
    }

    test('single fillWidth', () =>
    {
        const tableField: FormFieldTable = {
            ...TABLE_NAME_AND_SEX,
            layout: {
                labelPosition: FieldLabelPosition.Above,
                fillWidth: true,
                newLine: true
            }
        };
        const fields: FormField[] = [
            TEXT_NAME,
            SELECTION_SEX,
            TEXT_EMAIL,
            BOOLEAN_INTERPRETER,
            tableField
        ];
        const fillWidthTable = createFormDescription(fields);
        expect(buildTemplateColumnsFromFormDesc(fillWidthTable as FormDescription))
            .toEqual('auto 1fr auto auto');
    });

    test('single fillWidth with skip', () =>
    {
        const fillWidthAndSkipForm: FormDescription = {
            fieldsAndSections: [
                { field: TEXT_EMAIL },
                {
                    field: {
                        ...TEXT_NAME,
                        layout: {
                            labelPosition: FieldLabelPosition.Above,
                            skip: 1,
                            fillWidth: true
                        }
                    }
                }
            ],
            layoutColumns: 2
        };
        expect(buildTemplateColumnsFromFormDesc(fillWidthAndSkipForm))
            .toEqual('auto 1fr auto auto');
    });

    test('single fillWidth with newLine', () =>
    {
        const fillWidthAndNewLineForm: FormDescription = {
            fieldsAndSections: [
                { field: TEXT_EMAIL },
                {
                    field: {
                        ...TEXT_NAME,
                        layout: {
                            labelPosition: FieldLabelPosition.Above,
                            newLine: true,
                            fillWidth: true
                        }
                    }
                }
            ],
            layoutColumns: 2
        };
        expect(buildTemplateColumnsFromFormDesc(fillWidthAndNewLineForm))
            .toEqual('auto 1fr auto auto');
    });

    test('single fillWidth with newLine and spanLine', () =>
    {
        const fillWidthNewLineAndSpanLineForm: FormDescription = {
            fieldsAndSections: [
                { field: TEXT_EMAIL },
                {
                    field: {
                        ...TEXT_NAME,
                        layout: {
                            labelPosition: FieldLabelPosition.Above,
                            newLine: true,
                            spanLine: true,
                            fillWidth: true
                        }
                    }
                }
            ],
            layoutColumns: 2
        };
        expect(buildTemplateColumnsFromFormDesc(fillWidthNewLineAndSpanLineForm))
            .toEqual('auto 1fr auto 1fr');
    });

    test('two fillWidths - hepatitis summary', () =>
    {
        expect(buildTemplateColumnsFromFormDesc(FORM_SUMMARY_HEPATITIS as FormDescription))
            .toEqual('auto 1fr auto 1fr auto 1fr');
    });

    test('two fillWidths - associated groups dialod', () =>
    {
        expect(buildTemplateColumnsFromFormDesc(FORM_DIALOG_ASSOCIATED_MEDICAL_GROUP_ADD as FormDescription))
            .toEqual('auto 1fr auto 1fr');
    });

    test('fillWidth with first field hidden', () =>
    {
        expect(buildTemplateColumnsFromFormDesc(createFormDescription([
            {
                ...SELECTION_SEX,
                state: {
                    viewStateHidden: true,
                    editState: FieldEditState.Hidden
                }
            },
            {
                ...BOOLEAN_INTERPRETER,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillWidth: true
                }
            }
        ])))
            .toBe('auto 1fr auto auto');
    });

    test('fillWidth with hidden field', () =>
    {
        expect(buildTemplateColumnsFromFormDesc(createFormDescription([
            TEXT_NAME,
            TEXT_EMAIL,
            {
                ...SELECTION_SEX,
                state: {
                    viewStateHidden: true,
                    editState: FieldEditState.Hidden
                }
            },
            {
                ...BOOLEAN_INTERPRETER,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillWidth: true
                }
            },
            NUMBER_WEIGHT
        ])))
            .toBe('auto 1fr auto auto');
    });

    test('two fillWidth with hidden field', () =>
    {
        expect(buildTemplateColumnsFromFormDesc(createFormDescription([
            TEXT_NAME,
            TEXT_EMAIL,
            {
                ...SELECTION_SEX,
                state: {
                    viewStateHidden: true,
                    editState: FieldEditState.Hidden
                }
            },
            {
                ...BOOLEAN_INTERPRETER,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillWidth: true
                }
            },
            {
                ...NUMBER_WEIGHT,
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    fillWidth: true
                }
            }
        ])))
            .toBe('auto 1fr auto 1fr');
    });
});
