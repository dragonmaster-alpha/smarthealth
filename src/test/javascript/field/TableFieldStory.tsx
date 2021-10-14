import {storiesOf} from '@storybook/react';
import TableData from 'main/data/TableData';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import medicalGroupSearchForm from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import patientOverviewForm from 'smarthealth-rest-test/formdesc/Form.Patient.Overview.json';
import breastCancerMDTReviewForm from 'smarthealth-rest-test/formdesc/service/Form.Cancer.Breast.MDTReview.json';
import hepCCarePlanForm from 'smarthealth-rest-test/formdesc/service/Form.Immunology.HepatitisCCarePlan.json';
import hivAssessmentForm from 'smarthealth-rest-test/formdesc/service/Form.Immunology.HIVAssessment.json';
import patientWatchTreatmentStatusForm
    from 'smarthealth-rest-test/formdesc/service/Form.PatientWatch.TreatmentStatus.json';
import renalHaemodialysisForm from 'smarthealth-rest-test/formdesc/service/Form.Renal.Haemodialysis.json';
import cfSummaryForm from 'smarthealth-rest-test/formdesc/summary/Form.Summary.CysticFibrosisSummary.json';
import tumourGradeValueSet from 'smarthealth-rest-test/valueset/ValueSet.Cancer.Pathology.TumourGrade.json';
import patientAllergyValueSet from 'smarthealth-rest-test/valueset/ValueSet.Patient.Allergy.json';
import patientMedicalAlertValueSet from 'smarthealth-rest-test/valueset/ValueSet.Patient.MedicalAlert.json';
import SetEntity from 'test/component/SetEntity';
import FieldTester from 'test/field/FieldTester';

/**
 * Allow debugging of TableField component
 *
 * @author Thompson 10/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/TableField', module)
    .add('Form.Patient.Overview Allergies', () =>
    {
        const value: TableData = [];
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverviewForm as FormDescription,
            'Allergies.patientClinical.allergies') as FormFieldTable;

        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.Allergy" value={patientAllergyValueSet}>
                <FieldTester field={field} value={value} />
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
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverviewForm as FormDescription,
            'Allergies.patientClinical.allergies') as FormFieldTable;
        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.Allergy" value={patientAllergyValueSet}>
                <>
                    <FieldTester field={field} value={value} />
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
        const field: FormFieldTable = FormDescriptionUtility.findField(patientOverviewForm as FormDescription,
            'MedicalAlerts.patientClinical.medicalAlerts') as FormFieldTable;
        return (
            <SetEntity type={EntityType.ValueSet} id="Patient.MedicalAlert ValueSet"
                value={patientMedicalAlertValueSet}>
                <FieldTester field={field} />
            </SetEntity>
        );
    })
    .add('PatientWatch.TreatmentStatus Clinicians', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(
            patientWatchTreatmentStatusForm as FormDescription,
            'HealthcareAndSupport.Clinicians') as FormFieldTable;
        return <FieldTester field={field} />;
    })
    .add('PatientWatch.TreatmentStatus SupportServices', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(
            patientWatchTreatmentStatusForm as FormDescription,
            'HealthcareAndSupport.SupportServices') as FormFieldTable;
        return <FieldTester field={field} />;
    })
    .add('Dialog.MedicalGroup.Search Results', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearchForm as FormDescription,
            'Results') as FormFieldTable;
        return <FieldTester field={field} />;
    })
    .add('Dialog.MedicalGroup.Search Results with Data', () =>
    {
        const value = [
            { name: 'St Vaseline Intensive Care', city: 'Sydney', state: 'NSW' },
            { name: 'Plain Pathology', city: 'Sydney', state: 'NSW' }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearchForm as FormDescription,
            'Results') as FormFieldTable;
        return <FieldTester field={field} value={value} />;
    })
    .add('Dialog.MedicalGroup.Search Results with Data and FixedRow', () =>
    {
        const value = [
            { name: 'St Vaseline Intensive Care', city: 'Sydney', state: 'NSW' },
            { name: 'Plain Pathology', city: 'Sydney', state: 'NSW' }
        ];
        const field: FormFieldTable = FormDescriptionUtility.findField(medicalGroupSearchForm as FormDescription,
            'Results') as FormFieldTable;
        const fieldFixedRows = { ...field, fixedRows: true };
        return <FieldTester field={fieldFixedRows} value={value} />;
    })
    .add('columns with units', () =>
    {
        const value: TableData = [];
        const field = FormDescriptionUtility.findField(renalHaemodialysisForm as FormDescription,
            'Observations.Observations') as FormFieldTable;

        return <FieldTester field={field} value={value} />;
    })
    .add('sortable table', () =>
    {
        const value: TableData = [];
        const field = FormDescriptionUtility.findField(cfSummaryForm as FormDescription,
            'TreatmentStatus.TreatmentStatus') as FormFieldTable;

        return <FieldTester field={field} value={value} />;
    })
    .add('sortable columns', () =>
    {
        const value: TableData = [];
        const field = FormDescriptionUtility.findField(hepCCarePlanForm as FormDescription,
            'ReferralsSection.Referrals') as FormFieldTable;

        return <FieldTester field={field} value={value} />;
    })
    .add('sortable columns, initialised', () =>
    {
        const value: TableData = [
            { ReferredTo: 'Palliative care', ReferralDate: { iso: '2019-01-02' }, Notes: 'Recovered' },
            { ReferredTo: 'Social worker', ReferralDate: { iso: '2020-01-07' }, Notes: 'Support services' },
            { ReferredTo: 'Dietitian', ReferralDate: { iso: '2021-01-04' }, Notes: 'Nutrition assessment' }
        ];
        const field = FormDescriptionUtility.findField(hepCCarePlanForm as FormDescription,
            'ReferralsSection.Referrals') as FormFieldTable;

        return <FieldTester field={field} value={value} />;
    })
    .add('hidden columns', () =>
    {
        const field = FormDescriptionUtility.findField(breastCancerMDTReviewForm as FormDescription,
            'Pathology.PathologyTable') as FormFieldTable;
        const value: TableData = [];

        return (
            <SetEntity type={EntityType.ValueSet} id="Cancer.Pathology.TumourGrade" value={tumourGradeValueSet}>
                <FieldTester field={field} value={value} />
            </SetEntity>
        );
    })
    .add('3 layoutRows with no RowData', () =>
    {
        const field: FormFieldTable = FormDescriptionUtility.findField(hivAssessmentForm as FormDescription,
            'History.AidsDefiningIllnesses') as FormFieldTable;
        return (
            <>
                <FieldTester field={field} value={[]} />
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
                <FieldTester field={field} value={value} />
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
                <FieldTester field={field} value={value} />
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
                <FieldTester field={field} value={value} />
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
