import {storiesOf} from '@storybook/react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FormFieldValueSet from 'smarthealth-javascript/FormFieldValueSet';
import bodystructureLaterality from 'smarthealth-rest-test/valueset/ValueSet.Bodystructure.Laterality.json';
import medicationChangeReason from 'smarthealth-rest-test/valueset/ValueSet.Medication.ChangeReason.json';
import renalOrganisms from 'smarthealth-rest-test/valueset/ValueSet.Renal.Organisms.json';
import SetEntity from 'test/component/SetEntity';
import FieldTester from 'test/field/FieldTester';
import {fieldUsagePredicate} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of ValueSetField component
 *
 * @author Priyanka 27/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/ValueSetField', module)
    .add('Standard', () =>
    {
        const field: FormFieldValueSet = {
            id: 'Assessment.Laterality',
            label: 'Laterality',
            type: FormFieldType.ValueSet,
            valueSetID: 'Bodystructure.Laterality'
        };
        return (
            <SetEntity type={EntityType.ValueSet} id="Bodystructure.Laterality" value={bodystructureLaterality}>
                <FieldTester field={field} />
            </SetEntity>
        );
    })
    .add('Standard, initialised', () =>
    {
        const field: FormFieldValueSet = {
            id: 'Assessment.Laterality',
            label: 'Laterality',
            type: FormFieldType.ValueSet,
            valueSetID: 'Bodystructure.Laterality'
        };
        const value = {
            code: 'R',
            codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
            value: 'Right'
        };
        return (
            <SetEntity type={EntityType.ValueSet} id="Bodystructure.Laterality" value={bodystructureLaterality}>
                <FieldTester field={field} value={value} />
            </SetEntity>
        );
    })
    .add('Editable', () =>
    {
        const field: FormFieldValueSet = {
            id: 'ChangeReason',
            label: 'Change reason',
            type: FormFieldType.ValueSet,
            valueSetID: 'Medication.ChangeReason'
        };
        return (
            <SetEntity type={EntityType.ValueSet} id="Medication.ChangeReason" value={medicationChangeReason}>
                <FieldTester field={field} />
            </SetEntity>
        );
    })
    .add('Multiple', () =>
    {
        const field: FormFieldValueSet = {
            id: 'Renal.Organisms',
            label: 'Organisms',
            type: FormFieldType.ValueSet,
            valueSetID: 'Renal.Organisms',
            multiple: true
        };
        return (
            <SetEntity type={EntityType.ValueSet} id="Renal.Organisms" value={renalOrganisms}>
                <FieldTester field={field} />
            </SetEntity>
        );
    })
    .add('Multiple, editable', () =>
    {
        const field: FormFieldValueSet = {
            id: 'ChangeReason',
            label: 'Change reason',
            type: FormFieldType.ValueSet,
            valueSetID: 'Medication.ChangeReason',
            multiple: true
        };
        return (
            <SetEntity type={EntityType.ValueSet} id="Medication.ChangeReason" value={medicationChangeReason}>
                <FieldTester field={field} />
            </SetEntity>
        );
    })
    .add('Usage: Single',
        () => fieldUsagePredicate('Field ValueSet, single',
            field => FormFieldTypes.isValueSet(field) && !field.multiple))
    .add('Usage: Multiple', () => fieldUsagePredicate('Field ValueSet, multiple',
        field => FormFieldTypes.isValueSet(field) && field.multiple));
