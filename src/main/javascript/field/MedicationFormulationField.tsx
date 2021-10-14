import {autobind} from 'core-decorators';
import sort from 'fast-sort';
import lodash from 'lodash';
import SelectionMandatoryField from 'main/component/SelectionMandatoryField';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {action, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import MIMSConstants from 'smarthealth-javascript/MIMSConstants';
import MIMSFormulation from 'smarthealth-javascript/MIMSFormulation';
import BaseFieldOld, {BaseFieldOldProps} from './BaseFieldOld';

/**
 * Selection field with dynamic selection options based on what medication product the formulation is based on. The
 * options are sorted using sortOrder if product is a Product and ascending order if product is a Generics.
 *
 * There are two cases that this field handles, when a medication product is a Product and a Generic.
 * If a medication product is a Product and (MIMSFormulation.brand === props.product.value) then the label for selection
 * options will be taken from MIMSFormulation.formulationType. Otherwise, it will be taken from MIMSFormulation.brand.
 * When the user sets a value, the value structure will be a fully populated CodedValue.
 *
 * Otherwise if a medication product is a Generic then the label for selection options will be taken from
 * MIMSFormulation.formulationType and de-duplicated.
 * When the user sets a value, the value structure will be a CodedValue with only the value property.
 *
 * @author Thompson 11/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationFormulationFieldProps extends BaseFieldOldProps<FormFieldFormSpecific>
{
    product: CodedValue;
}

@inject('handlers')
@observer
class MedicationFormulationField
    extends BaseFieldOld<FormFieldFormSpecific, CodedValue, MedicationFormulationFieldProps>
{
    @observable
    private formulations?: MIMSFormulation[] = null;

    @observable
    private options: string[] = [];

    constructor(props)
    {
        super(props);
        // We handle unexpected cases here to make our methods cleaner by not handling it in there
        if (this.props.product && (
            (this.props.product.codeSet !== MIMSConstants.MIMS_Generics_CodeSet)
            && (this.props.product.codeSet !== MIMSConstants.MIMS_Product_CodeSet)
        ))
        {
            throw new ShouldNeverGetHereError();
        }
    }

    public componentDidMount()
    {
        this.fetchAndBuildOptions();
    }

    public componentDidUpdate(prevProps: MedicationFormulationFieldProps)
    {
        if (lodash.isEqual(prevProps.product, this.props.product))
        {
            return;
        }

        if (!this.props.product)
        {
            this.clearFormulationState();
            return;
        }

        this.clearFormulationState();
        this.fetchAndBuildOptions();
    }

    private buildFormulationValue(value: string): CodedValue
    {
        if (this.props.product.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            // Formulation from a Product Generic has a CodedValue value structure of a value property.
            return {
                value
            };
        }
        else
        {
            const formulation = this.formulations.find(formulation =>
            {
                if (formulation.brand === this.props.product.value)
                {
                    return formulation.formulationType === value;
                }
                else
                {
                    return formulation.brand === value;
                }
            });
            // Formulation from a Product Product has a CodedValue value structure of all 3 CodedValue properties.
            return {
                value,
                code: `${formulation.formulationCode}`,
                codeSet: MIMSConstants.MIMS_Formulation_CodeSet
            };
        }
    }

    private buildOptions(formulations: MIMSFormulation[]): string[]
    {
        if (this.props.product && (this.props.product.codeSet === MIMSConstants.MIMS_Product_CodeSet))
        {
            sort(formulations)
                .asc(formulation => formulation.sortOrder);
        }

        let options = (this.props.product && formulations)
            ? formulations.map(this.toFormulationName)
            : [];
        if (this.props.product && (this.props.product.codeSet === MIMSConstants.MIMS_Generics_CodeSet))
        {
            // Formulation from a Product Generic has options taken from MIMSFormulation.formulationType which are not
            // always unique.
            // e.g. all formulations could be of formulationType="Tablets". (Product example "Abacavir - Lamivudine")
            // Therefore we need to make sure options are unique.
            options = [...new Set(options)];
        }

        if (this.props.product && (this.props.product.codeSet === MIMSConstants.MIMS_Generics_CodeSet))
        {
            sort(formulations)
                .asc();
        }

        return options;
    }

    @action
    private clearFormulationState()
    {
        this.formulations = [];
        if (this.props.value)
        {
            this.props.onFieldChange(null, this.props.field);
        }
    }

    private async fetchAndBuildOptions()
    {
        const formulations = await this.fetchFormulations();
        const options = this.buildOptions(formulations);

        runInAction(() =>
        {
            this.formulations = formulations;
            this.options = options;
        });
    }

    private async fetchFormulations(): Promise<MIMSFormulation[]>
    {
        if (!this.props.product)
        {
            return [];
        }

        if (this.props.product.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            const genericFormulations = await this.props.handlers.medicationHandler.getGenericFormulations(
                this.props.product);
            return genericFormulations;
        }
        else
        {
            const productFormulations = await this.props.handlers.medicationHandler.getProductFormulations(
                this.props.product);
            return productFormulations;
        }
    }

    @autobind
    private onMedicationFieldChange(value: string, field: FormFieldFormSpecific)
    {
        this.props.onFieldChange(this.buildFormulationValue(value), field);
    }

    protected renderEditing(): React.ReactNode
    {
        return <SelectionMandatoryField context={this.props.context} disabled={this.props.disabled}
            editing={this.props.editing} field={this.props.field} fieldState={this.props.fieldState}
            fieldValidator={this.props.fieldValidator} onFieldChange={this.onMedicationFieldChange}
            options={this.options} value={this.props.value && this.props.value.value} />;
    }

    protected renderValue(): React.ReactNode
    {
        return this.props.value && this.props.value.value;
    }

    @autobind
    private toFormulationName(formulation: MIMSFormulation): string
    {
        if (this.props.product.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            return formulation.formulationType;
        }
        else
        {
            if (formulation.brand === this.props.product.value)
            {
                return formulation.formulationType;
            }
            else
            {
                return formulation.brand;
            }
        }
    }
}

export default MedicationFormulationField;
