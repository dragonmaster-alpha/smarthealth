import AdminPermission from 'smarthealth-javascript/AdminPermissions';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import Permissions from 'smarthealth-javascript/Permissions';
import Program from 'smarthealth-javascript/Program';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import ServiceTypePermssions from 'smarthealth-javascript/ServiceTypePermssions';
import ServiceTypes from 'smarthealth-rest-test/servicetypes.json';

/**
 * Permissions objects for testing
 *
 * @author Larry 9/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function allAdminPermissions(): AdminPermission[]
{
    return Object.keys(AdminPermission)
        .map(key => AdminPermission[key]);
}

export function allClinicalPermissions(): ClinicalPermission[]
{
    return Object.keys(ClinicalPermission)
        .map(key => ClinicalPermission[key]);
}

export function allPermissions(): Permissions
{
    return {
        admin: allAdminPermissions(),
        clinical: allClinicalPermissions(),
        serviceTypes: allServiceTypePermissions()
    };
}

export function allServiceTypePermissions(): ServiceTypePermssions[]
{
    const permissions = [];
    Object.keys(ServiceTypeEnum)
        .forEach(key =>
        {
            const serviceTypeID = ServiceTypeEnum[key];
            const serviceType = ServiceTypes.find(serviceType => serviceType.serviceTypeID === serviceTypeID);
            if (!serviceType)
            {
                // can't assign permissions
            }
            else if (serviceType.permissionPerProgram)
            {
                Object.keys(Program)
                    .forEach(key =>
                    {
                        const program = Program[key];
                        permissions.push({ serviceTypeID, program, create: true, modify: true, view: true });
                    });
            }
            else
            {
                permissions.push({ serviceTypeID, program: null, create: true, modify: true, view: true });
            }
        });
    return permissions;
}
