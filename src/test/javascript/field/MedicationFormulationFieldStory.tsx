import {storiesOf} from '@storybook/react';
import FieldContext from 'main/field/FieldContext';
import MedicationFormulationField from 'main/field/MedicationFormulationField';
import {CustomFieldRenderer, customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldState from 'smarthealth-javascript/FieldState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';
import MIMSFormulation from 'smarthealth-javascript/MIMSFormulation';
import SetStore from 'test/component/SetStore';
import FieldTester from 'test/field/FieldTester';
import abacavirLamivudineFormulations
    from 'test/field/MedicationFormulationFieldStory.AbacavirLamivudineFormulations.json';
import abataceptFormulations from 'test/field/MedicationFormulationFieldStory.AbataceptFormulations.json';
import paladoptFormulations from 'test/field/MedicationFormulationFieldStory.PaladoptFormulations.json';
import panadolFormulations from 'test/field/MedicationFormulationFieldStory.PanadolFormulations.json';

/**
 * Tester for MedicationFormulationField.tsx
 *
 * @author Thompson 19/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
// TODO put these into CodedValueMother
const abacavirLamivudineGeneric: CodedValue = {
    code: '4788',
    codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Generics',
    value: 'Abacavir - Lamivudine'
};

const abataceptGeneric: CodedValue = {
    code: '2542',
    codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Generics',
    value: 'Abatacept'
};

const panadolProduct: CodedValue = {
    code: '391',
    codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
    value: 'Panadol'
};

const paladoptProduct: CodedValue = {
    code: '2776',
    codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
    value: 'Paladopt'
};

function getProductFormulations(codedValue: CodedValue): Promise<MIMSFormulation[]>
{
    if (codedValue.code === panadolProduct.code)
    {
        return new Promise(resolve => resolve(panadolFormulations as MIMSFormulation[]));
    }
    else if (codedValue.code === paladoptProduct.code)
    {
        return new Promise(resolve => resolve(paladoptFormulations as MIMSFormulation[]));
    }
    else
    {
        return new Promise(resolve => resolve([]));
    }
}

function getGenericFormulations(codedValue: CodedValue): Promise<MIMSFormulation[]>
{
    if (codedValue.code === abacavirLamivudineGeneric.code)
    {
        return new Promise(resolve => resolve(abacavirLamivudineFormulations as MIMSFormulation[]));
    }
    else if (codedValue.code === abataceptGeneric.code)
    {
        return new Promise<MIMSFormulation[]>((resolve => resolve(abataceptFormulations as MIMSFormulation[])));
    }
    else
    {
        return new Promise(resolve => resolve([]));
    }
}

function medicationFormulationFieldRender(product: CodedValue): CustomFieldRenderer<EntityData>
{
    const renderer = function renderMedicationFormulationField(field: FormField, value: any, editing: boolean,
        disabled: boolean, valid: boolean, onFieldChange: OnFieldChange, context: FieldContext,
        fieldValidator: FieldValidator, data: any, fieldState: FieldState): React.ReactNode
    {
        return <MedicationFormulationField context={context} product={product} editing={editing}
            field={field as FormFieldFormSpecific} fieldState={fieldState} fieldValidator={fieldValidator}
            onFieldChange={onFieldChange} value={value} />;
    };
    return customFieldRendererAdapter(renderer);
}

const field: FormFieldUnsupported = {
    name: 'Formulation',
    id: 'Formulation',
    label: 'Formulation',
    state: { editState: FieldEditState.Enabled },
    type: FormFieldType.Unsupported
};

storiesOf('Field/Custom/MedicationFormulationField', module)
    .add('Generic multiple options', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicationHandler.getGenericFormulations = getGenericFormulations;
            }}>
                <FieldTester field={field}
                    customFieldRenderer={medicationFormulationFieldRender(abataceptGeneric)} />
            </SetStore>
        );
    })
    .add('Generic single option', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicationHandler.getProductFormulations = getProductFormulations;
            }}>
                <FieldTester field={field}
                    customFieldRenderer={medicationFormulationFieldRender(abacavirLamivudineGeneric)} />
            </SetStore>
        );
    })
    .add('Product multiple options', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicationHandler.getProductFormulations = getProductFormulations;
            }}>
                <FieldTester field={field}
                    customFieldRenderer={medicationFormulationFieldRender(panadolProduct)} />
            </SetStore>
        );
    })
    .add('Product single option', () =>
    {
        return (
            <SetStore set={appStore =>
            {
                appStore.handlers.medicationHandler.getProductFormulations = getProductFormulations;
            }}>
                <FieldTester field={field}
                    customFieldRenderer={medicationFormulationFieldRender(paladoptProduct)} />
            </SetStore>
        );
    });
