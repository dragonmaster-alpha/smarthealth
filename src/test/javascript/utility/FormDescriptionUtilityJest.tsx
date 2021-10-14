import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import Confidentiality from 'smarthealth-javascript/Confidentiality';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import Program from 'smarthealth-javascript/Program';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import patientSearch from 'smarthealth-rest-test/formdesc/Form.Patient.Search.json';
import {MEMBER_WILLIAM_WENG} from 'test/data/MedicalGroupMemberAggregateMother';

/**
 * Test FormDescriptionUtility
 *
 * @author Larry 11/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
test('all fields', () =>
{
    {
        const fields: FormField[] = FormDescriptionUtility.allFields(patientSearch as FormDescription);
        expect(fields.length)
            .toBe(6);
    }
    // disable during Patient Watch development
    // {
    //     const fields: FormField[] = FormDescriptionUtility.allFields(patientWatchTreatmentStatusForm as
    // FormDescription); expect(fields.length) .toBe(27); }
});

test('find Patient Search Settings field', () =>
{
    const form: FormDescription = patientSearch as FormDescription;
    {
        const field: FormField = FormDescriptionUtility.findField(form, 'Setting');
        expect(field.label)
            .toBe('Setting');
        expect(field.type)
            .toBe(FormFieldType.Selection);

        const options = FormDescriptionUtility.buildOptions(field as FormFieldSelection);
        expect(options.length)
            .toBe(11);
    }
    {
        const options = FormDescriptionUtility.buildFieldOptions(form, 'Setting');
        expect(options.length)
            .toBe(11);
    }
});

test('update service record metadata from new service record data', () =>
{
    const newServiceRecord: ServiceRecord = {
        data: {
            Confidentiality: Confidentiality.Restricted,
            Provider: MEMBER_WILLIAM_WENG.member.memberID,
            Program: Program.DIABETES,
            ServiceDate: { iso: '2020-01-02' }
        },
        metadata: {
            confidentiality: Confidentiality.Normal,
            providerID: { groupID: 1, userID: 2 },
            owningGroupID: undefined,
            patientID: undefined,
            program: Program.CYSTIC_FIBROSIS,
            serviceDate: { iso: '2020-01-01' },
            serviceID: undefined,
            serviceType: undefined,
            status: undefined,
            summaryLine: undefined
        },
        version: 0
    };

    const serviceRecordUpdatedMetadata = FormDescriptionUtility.updateServiceRecordMetadata(newServiceRecord);
    expect(serviceRecordUpdatedMetadata)
        .toEqual({
            ...newServiceRecord,
            metadata: {
                ...newServiceRecord.metadata,
                confidentiality: newServiceRecord.data.Confidentiality,
                program: newServiceRecord.data.Program,
                providerID: newServiceRecord.data.Provider,
                serviceDate: newServiceRecord.data.ServiceDate
            }
        });

    const newServiceRecordNoUpdatedMetadata: ServiceRecord = {
        data: {
            height: 180
        },
        metadata: {
            confidentiality: undefined,
            providerID: undefined,
            owningGroupID: undefined,
            patientID: undefined,
            program: undefined,
            serviceDate: undefined,
            serviceID: undefined,
            serviceType: undefined,
            status: undefined,
            summaryLine: undefined
        },
        version: 0
    };
    const serviceRecordNoUpdatedMetadataUpdatedMetadata = FormDescriptionUtility.updateServiceRecordMetadata(
        newServiceRecordNoUpdatedMetadata);
    expect(serviceRecordNoUpdatedMetadataUpdatedMetadata)
        .toEqual({
            ...newServiceRecordNoUpdatedMetadata,
            metadata: {
                ...newServiceRecordNoUpdatedMetadata.metadata,
                confidentiality: newServiceRecordNoUpdatedMetadata.data.Confidentiality,
                program: newServiceRecordNoUpdatedMetadata.data.Program,
                providerID: newServiceRecordNoUpdatedMetadata.data.Provider,
                serviceDate: newServiceRecordNoUpdatedMetadata.data.ServiceDate
            }
        });
});
