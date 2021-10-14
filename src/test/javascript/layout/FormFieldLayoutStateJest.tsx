import FormFieldLayoutState from 'main/layout/FormFieldLayoutState';

/**
 * Test FormFieldLayoutState
 *
 * @author Larry 9/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
describe('FormFieldLayoutState', () =>
{
    test('Invalid layout columns', () =>
    {
        expect(() => new FormFieldLayoutState(0))
            .toThrow('FormDescription layoutColumn must be greater than 0');

        expect(() => new FormFieldLayoutState(null))
            .toThrow('FormDescription layoutColumn must be greater than 0');

        expect(() => new FormFieldLayoutState(undefined))
            .toThrow('FormDescription layoutColumn must be greater than 0');

        expect(() => new FormFieldLayoutState(-2))
            .toThrow('FormDescription layoutColumn must be greater than 0');
    });

    test('Simple fields, 1 column', () =>
    {
        const layoutState = new FormFieldLayoutState(1);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Simple fields, 2 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(2);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Simple fields, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });

        expect(layoutState.isStartOfLine())
            .toEqual(false);
    });

    test('Fill line, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fillLine())
            .toEqual({ gridColumns: 6, oddRow: false });

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.fillLine())
            .toEqual({ gridColumns: 4, oddRow: true });

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fillLine())
            .toEqual({ gridColumns: 2, oddRow: false });

        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Fields with span, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.fill(2))
            .toEqual({ gridColumns: 4, oddRow: false });

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.fill(2))
            .toEqual({ gridColumns: 4, oddRow: true });

        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Field with span out of layout', () =>
    {
        const layoutState = new FormFieldLayoutState(1);

        expect(() => layoutState.fill(2))
            .toThrow('field span 2 out of layout boundary');
    });

    test('Fields with skip, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.skip(1))
            .toEqual({ skipGridColumns: 2, oddRow: false });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });

        expect(layoutState.skip(1))
            .toEqual({ skipGridColumns: 2, oddRow: true });
        expect(layoutState.fill(2))
            .toEqual({ gridColumns: 4, oddRow: true });

        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Field with skip out of layout', () =>
    {
        const layoutState = new FormFieldLayoutState(1);

        expect(() => layoutState.skip(2))
            .toThrow('skip 2 out of layout boundary');
    });

    test('Next line, 2 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(2);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 2, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);

        expect(layoutState.fill(2))
            .toEqual({ gridColumns: 4, oddRow: true });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 0, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Next line, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 4, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 2, oddRow: true });
        expect(layoutState.isStartOfLine())
            .toEqual(true);

        expect(layoutState.fill(2))
            .toEqual({ gridColumns: 4, oddRow: false });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 2, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);

        expect(layoutState.fill(3))
            .toEqual({ gridColumns: 6, oddRow: true });
        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 0, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);
    });

    test('Next line, skip, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });

        expect(layoutState.nextLine())
            .toEqual({ skipGridColumns: 4, oddRow: false });
        expect(layoutState.skip(1))
            .toEqual({ skipGridColumns: 2, oddRow: true });
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
    });

    test('Is start of line, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.isStartOfLine())
            .toEqual(true);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(false);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(false);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isStartOfLine())
            .toEqual(true);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.isStartOfLine())
            .toEqual(false);
    });

    test('Is odd row, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.isOddRow())
            .toEqual(false);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isOddRow())
            .toEqual(false);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isOddRow())
            .toEqual(false);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isOddRow())
            .toEqual(true);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.isOddRow())
            .toEqual(true);
    });

    test('Is first row, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.isFirstRow())
            .toEqual(true);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isFirstRow())
            .toEqual(true);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isFirstRow())
            .toEqual(true);
        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.isFirstRow())
            .toEqual(false);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.isFirstRow())
            .toEqual(false);
    });

    test('Current row and current layout column, 3 columns', () =>
    {
        const layoutState = new FormFieldLayoutState(3);

        expect(layoutState.currentRow)
            .toEqual(0);
        expect(layoutState.currentLayoutColumn)
            .toEqual(0);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.currentRow)
            .toEqual(0);
        expect(layoutState.currentLayoutColumn)
            .toEqual(1);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.currentRow)
            .toEqual(0);
        expect(layoutState.currentLayoutColumn)
            .toEqual(2);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: false });
        expect(layoutState.currentRow)
            .toEqual(1);
        expect(layoutState.currentLayoutColumn)
            .toEqual(0);

        expect(layoutState.fill(1))
            .toEqual({ gridColumns: 2, oddRow: true });
        expect(layoutState.currentRow)
            .toEqual(1);
        expect(layoutState.currentLayoutColumn)
            .toEqual(1);
    });
});

/*
    test('currentRow off by one', () =>
    {
        const fullRowOfFieldsDescription: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: SELECTION_SEX
                }
            ], layoutColumns: 2
        };
        const fullRowLayoutState = buildFormFieldLayoutState(fullRowOfFieldsDescription);
        fullRowLayoutState.next(fullRowOfFieldsDescription.fieldsAndSections[0].field.layout);
        expect(fullRowLayoutState.currentRow)
            .toEqual(0);
        fullRowLayoutState.next(fullRowOfFieldsDescription.fieldsAndSections[1].field.layout);
        expect(fullRowLayoutState.currentRow)
            .toEqual(0);

        const newLineSpanLineDescription: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...SELECTION_SEX,
                        layout: {
                            labelPosition: FieldLabelPosition.Before,
                            newLine: true,
                            spanLine: true
                        }
                    }
                }
            ], layoutColumns: 2
        };
        const newAndSpanLineLayoutState = buildFormFieldLayoutState(newLineSpanLineDescription);
        newAndSpanLineLayoutState.next(newLineSpanLineDescription.fieldsAndSections[0].field.layout);
        expect(newAndSpanLineLayoutState.currentRow)
            .toEqual(0);
        newAndSpanLineLayoutState.next(newLineSpanLineDescription.fieldsAndSections[1].field.layout);
        expect(newAndSpanLineLayoutState.currentRow)
            .toEqual(1);
    });

    describe('spanLine', () =>
    {
        test('return correct GridLayout for spanLine', () =>
        {
            const spanLineDescription: FormDescription = buildFormDescription([
                {
                    labelPosition: FieldLabelPosition.Before,
                    spanLine: true
                }
            ], 0);
            for (let i = 2; i <= 4; i += 1)
            {
                spanLineDescription.layoutColumns = i;
                const layoutState = buildFormFieldLayoutState(spanLineDescription);
                expect(layoutState.next(spanLineDescription.fieldsAndSections[0].field.layout))
                    .toEqual({
                        fieldSpanGridColumns: i * FormFieldLayoutState.LAYOUT_TO_GRID - LABEL_GRID_COLUMN,
                        labelAbove: false,
                        oddRow: false,
                        showLabel: true,
                        skipGridColumns: 0
                    });
            }
        });
    });

    test('field with span and spanLine throws error', () =>
    {
        const spanAndSpanLineDescription: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                span: 2,
                spanLine: true
            }
        ], 2);
        const layoutState = buildFormFieldLayoutState(spanAndSpanLineDescription);
        expect(() => layoutState.next(spanAndSpanLineDescription.fieldsAndSections[0].field.layout))
            .toThrow(new Error('FieldLayout cannot have span and spanLine'));
    });

    test.each([3, 4])('field with skip and span with %i columns', (i) =>
    {
        const skipAndSpanDescription: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                span: 2,
                skip: 1
            }
        ], 0);

        skipAndSpanDescription.layoutColumns = i;
        const layoutState = buildFormFieldLayoutState(skipAndSpanDescription);
        const skipAndSpanField = skipAndSpanDescription.fieldsAndSections[0];
        expect(layoutState.next(skipAndSpanField.field.layout))
            .toEqual({
                fieldSpanGridColumns: 3,
                labelAbove: false,
                oddRow: false,
                showLabel: true,
                skipGridColumns: skipAndSpanField.field.layout.skip * FormFieldLayoutState.LAYOUT_TO_GRID
            });
    });

    test('field with skip and spanLine', () =>
    {
        const skipAndSpanDescription: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                spanLine: true,
                skip: 1
            }
        ], 0);
        for (let i = 2; i <= 4; i += 1)
        {
            skipAndSpanDescription.layoutColumns = i;
            const layoutState = buildFormFieldLayoutState(skipAndSpanDescription);
            const [skipAndSpanLineField] = skipAndSpanDescription.fieldsAndSections;
            const gridColumnsSkip = skipAndSpanLineField.field.layout.skip * FormFieldLayoutState.LAYOUT_TO_GRID;
            expect(layoutState.next(skipAndSpanLineField.field.layout))
                .toEqual({
                    fieldSpanGridColumns: ((i * FormFieldLayoutState.LAYOUT_TO_GRID)
                        - LABEL_GRID_COLUMN - gridColumnsSkip),
                    labelAbove: false,
                    oddRow: false,
                    showLabel: true,
                    skipGridColumns: gridColumnsSkip
                });
        }
    });

    test('field with newLine and spanLine', () =>
    {
        const newLineAndSpanLineDescription: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                spanLine: true
            }
        ], 0);
        for (let i = 1; i <= 4; i += 1)
        {
            newLineAndSpanLineDescription.layoutColumns = i;
            const layoutState = buildFormFieldLayoutState(newLineAndSpanLineDescription);
            const [newLineAndSpanLineField] = newLineAndSpanLineDescription.fieldsAndSections;
            expect(layoutState.next(newLineAndSpanLineField.field.layout))
                .toEqual({
                    fieldSpanGridColumns: i * FormFieldLayoutState.LAYOUT_TO_GRID - LABEL_GRID_COLUMN,
                    labelAbove: false,
                    oddRow: false,
                    showLabel: true,
                    skipGridColumns: 0
                });
        }
    });

    test('field with newLine, skip and span', () =>
    {
        const newLineSkipAndSpanDescription: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                skip: 1,
                span: 2
            }
        ], 0);
        for (let i = 3; i <= 4; i += 1)
        {
            newLineSkipAndSpanDescription.layoutColumns = i;
            const layoutState = buildFormFieldLayoutState(newLineSkipAndSpanDescription);
            const [newLineSkipAndSpanField] = newLineSkipAndSpanDescription.fieldsAndSections;
            expect(layoutState.next(newLineSkipAndSpanField.field.layout))
                .toEqual({
                    fieldSpanGridColumns: (newLineSkipAndSpanField.field.layout.span
                        * FormFieldLayoutState.LAYOUT_TO_GRID - LABEL_GRID_COLUMN),
                    labelAbove: false,
                    oddRow: false,
                    showLabel: true,
                    skipGridColumns: newLineSkipAndSpanField.field.layout.skip * FormFieldLayoutState.LAYOUT_TO_GRID
                });
        }
    });

    test('field with newLine, skip and spanLine', () =>
    {
        const newLineSkipAndSpanLine: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                skip: 1,
                spanLine: true
            }
        ], 0);
        for (let i = 2; i <= 4; i += 1)
        {
            newLineSkipAndSpanLine.layoutColumns = i;
            const layoutState = buildFormFieldLayoutState(newLineSkipAndSpanLine);
            const [newLineSkipAndSpan] = newLineSkipAndSpanLine.fieldsAndSections;
            const gridColumnsSkip = newLineSkipAndSpan.field.layout.skip * FormFieldLayoutState.LAYOUT_TO_GRID;
            expect(layoutState.next(newLineSkipAndSpan.field.layout))
                .toEqual({
                    fieldSpanGridColumns: i * FormFieldLayoutState.LAYOUT_TO_GRID - LABEL_GRID_COLUMN - gridColumnsSkip,
                    labelAbove: false,
                    oddRow: false,
                    showLabel: true,
                    skipGridColumns: gridColumnsSkip
                });
        }
    });

    test('Patient.Demographics', () =>
    {
        const layoutState = buildFormFieldLayoutState(PatientDemographics as FormDescription);
        const [EHR, title, givenName, otherNames, familyName, preferredName, alsoknownAs, sex, dateOfBirth, address1,
            address2, city, state, postcode, country, phoneH, phoneW, phoneM,
            email] = PatientDemographics.fieldsAndSections;

        expect(layoutState.next(EHR.field.layout as FieldLayout))
            .toEqual({
                fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0
            });
        expect(layoutState.next(title.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(givenName.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(otherNames.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(familyName.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(preferredName.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(alsoknownAs.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(sex.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(dateOfBirth.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(address1.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(address2.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(city.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(state.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(postcode.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(country.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(phoneH.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(phoneW.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(phoneM.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(email.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
    });

    test('random combinations 1', () =>
    {
        const combination: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                span: 2
            },
            {
                labelPosition: FieldLabelPosition.Before,
                spanLine: true
            },
            {
                labelPosition: FieldLabelPosition.Before,
                skip: 1,
                span: 2
            },
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                skip: 1,
                span: 2
            }
        ], 3);
        const layoutState = buildFormFieldLayoutState(combination);

        const [fieldOne, fieldTwo, fieldThree, fieldFour] = combination.fieldsAndSections;
        expect(layoutState.next(fieldOne.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldTwo.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldThree.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldFour.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
    });

    test('random combinations 2', () =>
    {
        const combination: FormDescription = buildFormDescription([
            {
                labelPosition: FieldLabelPosition.Before,
                span: 2
            },
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                skip: 1,
                span: 2
            },
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                skip: 1,
                span: 2
            }
        ], 3);
        const layoutState = buildFormFieldLayoutState(combination);

        const [fieldOne, fieldTwo, fieldThree, fieldFour, fieldFifth] = combination.fieldsAndSections;
        expect(layoutState.next(fieldOne.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldTwo.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldThree.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldFour.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldFifth.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 6 });
    });

    test('random combinations 3', () =>
    {
        const combination: FormDescription = buildFormDescription([
            null,
            null,
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                skip: 1,
                span: 2
            },
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                span: 2
            },
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                span: 3
            },
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true
            },
            {
                labelPosition: FieldLabelPosition.Before,
                skip: 1
            }
        ], 3);
        const layoutState = buildFormFieldLayoutState(combination);

        const [fieldOne, fieldTwo, fieldThree, fieldFour, fieldFifth, fieldSix, fieldSeven, fieldEight, fieldNine]
            = combination.fieldsAndSections;
        expect(layoutState.next(fieldOne.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldTwo.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldThree.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldFour.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldFifth.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldSix.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 4 });
        expect(layoutState.next(fieldSeven.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 5, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldEight.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldNine.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 2 });
    });

    test('random combinations 4', () =>
    {
        const combination: FormDescription = buildFormDescription([
            null,
            null,
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true,
                span: 2
            },
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                newLine: true
            },
            null,
            null,
            {
                labelPosition: FieldLabelPosition.Before,
                skip: 1
            }
        ], 2);
        const layoutState = buildFormFieldLayoutState(combination);

        const [fieldOne, fieldTwo, fieldThree, fieldFour, fieldFifth, fieldSix, fieldSeven, fieldEight, fieldNine]
            = combination.fieldsAndSections;
        expect(layoutState.next(fieldOne.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldTwo.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldThree.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldFour.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 3, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldFifth.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldSix.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
        expect(layoutState.next(fieldSeven.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldEight.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: true, showLabel: true, skipGridColumns: 0 });
        expect(layoutState.next(fieldNine.field.layout as FieldLayout))
            .toEqual(
                { fieldSpanGridColumns: 1, labelAbove: false, oddRow: false, showLabel: true, skipGridColumns: 2 });
    });
});
*/
