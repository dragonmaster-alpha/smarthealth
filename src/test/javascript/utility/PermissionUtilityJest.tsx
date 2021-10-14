import PermissionUtility from 'main/utility/PermissionUtility';
import Permissions from 'smarthealth-javascript/Permissions';
import Program from 'smarthealth-javascript/Program';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import LoginMedicalGroupAndLocation from 'smarthealth-rest-test/handler/Login.MedicalGroupAndLocation.json';

/**
 * Jest for PermissionUtilityJest.tsx
 *
 * @author Thompson 6/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

function generateServiceRecord(program: Program, serviceTypeID: number)
{
    const serviceRecord: ServiceRecord = {
        data: {}, metadata: { program, serviceType: serviceTypeID } as ServiceSummary, version: 0
    };
    return serviceRecord;
}

function generateServiceType(program: Program, serviceTypeID: number, permissionPerProgram?: boolean)
{
    const serviceType: ServiceType = {
        program, serviceTypeID, permissionPerProgram, abbreviation: '', formDescriptionID: '', name: ''
    };
    return serviceType;
}

const permissions = LoginMedicalGroupAndLocation.permissions as Permissions;

describe('PermissionUtility', () =>
{
    test('canModifyServiceRecord', () =>
    {
        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        // no modify permission - invalid serviceTypeID
        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, 91),
            generateServiceType(Program.CYSTIC_FIBROSIS, 91)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, 91),
            generateServiceType(Program.CYSTIC_FIBROSIS, 91)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, 91),
            generateServiceType(null, 91)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, 91),
            generateServiceType(null, 91)))
            .toEqual(false);
    });

    test('canModifyServiceRecord permissionPerProgram', () =>
    {
        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        // no modify permission - invalid serviceTypeID
        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, 91),
            generateServiceType(Program.CYSTIC_FIBROSIS, 91, true)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, 91),
            generateServiceType(Program.CYSTIC_FIBROSIS, 91, true)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, 91),
            generateServiceType(null, 91, true)))
            .toEqual(false);

        expect(PermissionUtility.canModifyServiceRecord(
            permissions,
            generateServiceRecord(null, 91),
            generateServiceType(null, 91, true)))
            .toEqual(false);
    });

    test('canViewServiceRecord', () =>
    {
        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);

        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes)))
            .toEqual(true);
    });

    test('canViewServiceRecord permissionPerProgram', () =>
    {
        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(null, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);

        expect(PermissionUtility.canViewServiceRecord(
            permissions,
            generateServiceRecord(null, ServiceTypeEnum.ConsultationNotes),
            generateServiceType(Program.CYSTIC_FIBROSIS, ServiceTypeEnum.ConsultationNotes, true)))
            .toEqual(true);
    });
});
