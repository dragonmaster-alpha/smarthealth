import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import MedicationProductField from 'main/field/MedicationProductField';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import SetStore from 'test/component/SetStore';
import FieldTester from 'test/field/FieldTester';
import productsLA from 'test/field/MedicationProductFieldStory.ProductsWithPrefixLA.json';
import productsZA from 'test/field/MedicationProductFieldStory.ProductsWithPrefixZA.json';
import recentMedicationProducts from 'test/field/MedicationProductFieldStory.RecentMedicationProducts.json';

/**
 * Allow debugging of MedicationProductField.tsx
 *
 * @author Thompson 4/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function searchMedicationProducts(productPrefix: string): Promise<CodedValue[]>
{
    const prefixLowercase = productPrefix.toLowerCase();
    if (prefixLowercase === 'la')
    {
        return new Promise(resolve => resolve(productsLA));
    }
    else if (prefixLowercase === 'za')
    {
        return new Promise(resolve => resolve(productsZA));
    }
    else
    {
        return new Promise(resolve => resolve([]));
    }
}

function getRecentMedicationProducts(): Promise<CodedValue[]>
{
    return new Promise(resolve => resolve(recentMedicationProducts));
}

function renderMedicationProductField(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
    onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: any,
    fieldState: FieldState): React.ReactNode
{
    return <MedicationProductField context={context} editing={editing} field={field as FormFieldFormSpecific}
        fieldState={fieldState} fieldValidator={fieldValidator} onFieldChange={onFieldChange} value={value} />;
}

const medicationProductField = {
    id: 'field',
    label: 'Product'
} as FormField;

storiesOf('Field/Custom/MedicationProductField', module)
    .add('Empty value', () =>
    {
        return (
            <>
                <SetStore set={appStore =>
                {
                    appStore.handlers.medicationHandler.searchMedicationProducts = searchMedicationProducts;
                    appStore.handlers.medicationHandler.getRecentMedicationProducts = getRecentMedicationProducts;
                }}>
                    <FieldTester field={medicationProductField}
                        customFieldRenderer={customFieldRendererAdapter(renderMedicationProductField)} />
                </SetStore>
                <h3>Usage</h3>
                <ul>
                    <li>Only the characters starting with "la" and "za" contains results.</li>
                </ul>
            </>
        );
    })
    .add('Initialised', () =>
    {
        const value = {
            code: '9276',
            codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
            value: 'Zactin'
        };
        return (
            <>
                <SetStore set={appStore =>
                {
                    appStore.handlers.medicationHandler.searchMedicationProducts = searchMedicationProducts;
                    appStore.handlers.medicationHandler.getRecentMedicationProducts = getRecentMedicationProducts;
                }}>
                    <FieldTester field={medicationProductField}
                        customFieldRenderer={customFieldRendererAdapter(renderMedicationProductField)}
                        value={value} />
                </SetStore>
                <h3>Usage</h3>
                <ul>
                    <li>Only the characters starting with "la" contains results.</li>
                </ul>
            </>
        );
    });
