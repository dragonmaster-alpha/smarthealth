import FormFieldWidthVisitor from 'main/field/FormFieldWidthVisitor';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldType from 'smarthealth-javascript/FormFieldType';

/**
 * Tester for FormFieldWidthVisitorJest.tsx
 *
 * @author Larry 15/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
describe('FormFieldBoolean', () =>
{
    test('Yes/No', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean
        };

        expect(FormFieldWidthVisitor.accept(field, field.state))
            .toEqual(5);
    });
    test('True/False', () =>
    {
        const field: FormFieldBoolean = {
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.Boolean,
            trueDisplayText: 'True',
            falseDisplayText: 'False'
        };

        expect(FormFieldWidthVisitor.accept(field, field.state))
            .toEqual(7);
    });
});

describe('FormFieldSelection', () =>
{
    test('enabled', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            state: { editState: FieldEditState.Enabled }
        };
        expect(FormFieldWidthVisitor.accept(field, field.state))
            .toEqual(8);
    });

    test('mandatory', () =>
    {
        const field: FormFieldSelection = {
            id: 'field',
            label: 'Field',
            type: FormFieldType.Selection,
            options: ['Yes', 'No', 'Maybe'],
            size: 5,
            state: { editState: FieldEditState.Mandatory }
        };
        expect(FormFieldWidthVisitor.accept(field, field.state))
            .toEqual(7);
    });
});

test('FormFieldText 10', () =>
{
    const field: FormFieldText = {
        id: 'field',
        label: 'Field',
        type: FormFieldType.Text,
        size: 10,
        state: { editState: FieldEditState.Enabled }
    };

    expect(FormFieldWidthVisitor.accept(field, field.state))
        .toEqual(7);
});
