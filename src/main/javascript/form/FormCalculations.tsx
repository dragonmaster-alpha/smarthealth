import FormCalculation from 'main/form/FormCalculation';
import {calculatorFactory} from 'main/utility/Calculator';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';

/**
 * Setup all form calculations in a particular form so it will automatically calculated its value if one of the
 * calculation parameter changes.
 *
 * @author Thompson 19/09/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class FormCalculations
{
    private readonly formCalculations: FormCalculation[];

    public constructor(editData: {}, formDescription: FormDescription)
    {
        const calculationFields = this.extractCalculationFields(formDescription);
        this.formCalculations = [];
        if (calculationFields.length > 0)
        {
            calculationFields.forEach(calculationField =>
            {
                const calculator = calculatorFactory(calculationField.calculation.type);
                const calculation = new FormCalculation(editData, calculationField.id,
                    calculationField.calculation.paramFieldIDs, calculator);
                this.formCalculations.push(calculation);
            });
        }
    }

    public cleanUp()
    {
        if (this.formCalculations)
        {
            this.formCalculations.forEach(formCalculation => formCalculation.cleanUp());
        }
    }

    private extractCalculationFields(formDescription: FormDescription): FormField[]
    {
        const calculationFields: FormField[] = [];
        this.extractCalculationFieldsTraversal(calculationFields, formDescription.fieldsAndSections);
        return calculationFields;
    }

    private extractCalculationFieldsTraversal(calculationFields: FormField[],
        fieldsAndSections: FormFieldOrSection[]): void
    {
        const onField = (fieldOrSection: FormFieldOrSection) =>
        {
            if (fieldOrSection.field.calculation)
            {
                calculationFields.push(fieldOrSection.field);
            }
        };

        const onSection = (fieldOrSection: FormFieldOrSection) => (
            this.extractCalculationFieldsTraversal(calculationFields, fieldOrSection.section.fieldsAndSections)
        );

        FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(fieldsAndSections, onField, onSection);
    }
}

export default FormCalculations;
