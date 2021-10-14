import {storiesOf} from '@storybook/react';
import TableData from 'main/data/TableData';
import FieldContext from 'main/field/FieldContext';
import TableFieldOld from 'main/field/TableFieldOld';
import {customFieldRendererAdapter, OnFieldChange} from 'main/form/CustomFieldRenderer';
import FieldValidator from 'main/form/FieldValidator';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import EntityType from 'smarthealth-javascript/EntityType';
import FieldState from 'smarthealth-javascript/FieldState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import medicalGroupSearch from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import patientOverview from 'smarthealth-rest-test/formdesc/Form.Patient.Overview.json';
import hivAssessmentForm from 'smarthealth-rest-test/formdesc/service/Form.Immunology.HIVAssessment.json';
import treatmentStatus from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.TreatmentStatus.json';
import patientAllergyValueSet from 'smarthealth-rest-test/valueset/ValueSet.Patient.Allergy.json';
import SetEntity from 'test/component/SetEntity';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging of TableField component
 *
 * @author Thompson 10/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
function renderTable(field: FormFieldTable, value: any, editing: boolean, disabled: boolean, valid: boolean,
    onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator, data: EntityData,
    fieldState: FieldState): React.ReactNode
{
    return <div style={{ padding: editing ? px(0, 8) : px(8) }}>
        <TableFieldOld context={context} disabled={disabled} editing={editing} field={field}
            fieldState={fieldState} fieldValidator={fieldValidator} onFieldChange={onFieldChange}
            value={value} />
    </div>;
}

storiesOf('Field/TableFieldOld', module)
    .add('Form.Patient.Overview Allergies', () =>
    {
        const value: TableData = [];
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverview as FormDescription,
            'Allergies.patientClinical.allergies') as FormFieldTable;

        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.Allergy" value={patientAllergyValueSet}>
                <FieldTester field={field} value={value}
                    customFieldRenderer={customFieldRendererAdapter(renderTable)} />
            </SetEntity>
        );
    })
    .add('Form.Patient.Overview Allergies with Data', () =>
    {
        const value = [
            {
                name: {
                    code: 'PENICILLIN',
                    codeSet: 'http://ns.smarthealth.com.au/valueset/Patient.Allergy',
                    value: 'Penicillin'
                },
                date: { iso: '2019-05-01' },
                details: 'mild rash'
            },
            { name: 'Nuts', date: { iso: '2019-05-02' }, details: 'may require Epipen' }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverview as FormDescription,
            'Allergies.patientClinical.allergies') as FormFieldTable;
        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.Allergy" value={patientAllergyValueSet}>
                <>
                    <FieldTester field={field} value={value}
                        customFieldRenderer={customFieldRendererAdapter(renderTable)} />
                    <h3>TODO</h3>
                    <ol>
                        <li>
                            View is not showing uncoded values
                        </li>
                    </ol>
                </>
            </SetEntity>
        );
    })
    .add('Patient.Overview MedicalAlerts', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverview as FormDescription,
            'Allergies.patientClinical.allergies') as FormFieldTable;
        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.Allergy" value={patientAllergyValueSet}>
                <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderTable)} />
            </SetEntity>
        );
    })
    .add('PatientWatch.TreatmentStatus Clinicians', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(treatmentStatus as FormDescription,
            'HealthcareAndSupport.Clinicians') as FormFieldTable;
        return <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderTable)} />;
    })
    .add('PatientWatch.TreatmentStatus SupportServices', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(treatmentStatus as FormDescription,
            'HealthcareAndSupport.SupportServices') as FormFieldTable;
        return <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderTable)} />;
    })
    .add('Dialog.MedicalGroup.Search Results', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearch as FormDescription,
            'Results') as FormFieldTable;
        return <FieldTester field={field} customFieldRenderer={customFieldRendererAdapter(renderTable)} />;
    })
    .add('Dialog.MedicalGroup.Search Results with Data', () =>
    {
        const value = [
            { name: 'St Vaseline Intensive Care', city: 'Sydney', state: 'NSW' },
            { name: 'Plain Pathology', city: 'Sydney', state: 'NSW' }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearch as FormDescription,
            'Results') as FormFieldTable;
        return <FieldTester field={field} value={value}
            customFieldRenderer={customFieldRendererAdapter(renderTable)} />;
    })
    .add('Dialog.MedicalGroup.Search Results with Data and FixedRow', () =>
    {
        const value = [
            { Name: 'St Vaseline Intensive Care', City: 'Sydney', State: 'NSW' },
            { Name: 'Plain Pathology', City: 'Sydney', State: 'NSW' }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearch as FormDescription,
            'Results') as FormFieldTable;
        const fieldFixedRows = { ...field, fixedRows: true };
        return <FieldTester field={fieldFixedRows} value={value}
            customFieldRenderer={customFieldRendererAdapter(renderTable)} />;
    })
    .add('3 layoutRows with no RowData', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(hivAssessmentForm as FormDescription,
            'History.AidsDefiningIllnesses') as FormFieldTable;
        return (
            <>
                <FieldTester field={field} value={[]} customFieldRenderer={customFieldRendererAdapter(renderTable)} />
                <h3>Description</h3>
                <ol>
                    <li>
                        Table body will hold 3 table rows worth of height even if there is no row data to fill the
                        table body.
                    </li>
                </ol>
            </>
        );
    })
    .add('3 layoutRows with 1 RowData', () =>
    {
        const value = [
            { IllnessName: 'Bartonellosis', DateOfDiagnosis: { iso: '2020-01-19' } }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(hivAssessmentForm as FormDescription,
            'History.AidsDefiningIllnesses') as FormFieldTable;
        return (
            <>
                <FieldTester field={field} value={value}
                    customFieldRenderer={customFieldRendererAdapter(renderTable)} />
                <h3>Description</h3>
                <ol>
                    <li>
                        Table body will hold 3 table rows worth of height even if there is not enough row data to
                        fill the table body.
                    </li>
                </ol>
            </>
        );
    })
    .add('3 layoutRows with 3 RowData', () =>
    {
        const value = [
            { IllnessName: 'Bartonellosis', DateOfDiagnosis: { iso: '2020-01-19' } },
            { IllnessName: 'Candidiasis of lungs', DateOfDiagnosis: { iso: '2020-01-20' } },
            { IllnessName: 'Cervical cancer, invasive', DateOfDiagnosis: { iso: '2020-01-20' } }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(hivAssessmentForm as FormDescription,
            'History.AidsDefiningIllnesses') as FormFieldTable;
        return (
            <>
                <FieldTester field={field} value={value}
                    customFieldRenderer={customFieldRendererAdapter(renderTable)} />
                <h3>Description</h3>
                <ol>
                    <li>
                        Table body will hold 3 table rows worth of height. A vertical scroll bar should not appear
                        on the table body.
                    </li>
                </ol>
            </>
        );
    })
    .add('3 layoutRows with 4 RowData, scrollable', () =>
    {
        const value = [
            { IllnessName: 'Bartonellosis', DateOfDiagnosis: { iso: '2020-01-19' } },
            { IllnessName: 'Candidiasis of lungs', DateOfDiagnosis: { iso: '2020-01-20' } },
            { IllnessName: 'Cervical cancer, invasive', DateOfDiagnosis: { iso: '2020-01-20' } },
            { IllnessName: 'Aspergillosis, invasive', DateOfDiagnosis: { iso: '2020-01-20' } }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(hivAssessmentForm as FormDescription,
            'History.AidsDefiningIllnesses') as FormFieldTable;
        return (
            <>
                <FieldTester field={field} value={value}
                    customFieldRenderer={customFieldRendererAdapter(renderTable)} />
                <h3>Description</h3>
                <ol>
                    <li>
                        Table body will hold 3 table rows worth of height. A vertical scroll bar will appear
                        on the table body to reveal the other table rows.
                    </li>
                </ol>
            </>
        );
    });
