import Permissions from 'smarthealth-javascript/Permissions';
import Program from 'smarthealth-javascript/Program';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceType from 'smarthealth-javascript/ServiceType';
import ServiceTypePermssions from 'smarthealth-javascript/ServiceTypePermssions';

/**
 * Utility methods to determine permissions
 *
 * @author Thompson 5/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PermissionUtility
{
    public static canModifyServiceRecord(permissions: Permissions, serviceRecord: ServiceRecord,
        serviceType: ServiceType): boolean
    {
        const serviceTypePermissions = PermissionUtility.findServiceTypePermissions(permissions, serviceRecord,
            serviceType);

        // modify can potentially be undefined
        return !!(serviceTypePermissions && serviceTypePermissions.modify);
    }

    public static canViewServiceRecord(permissions: Permissions, serviceRecord: ServiceRecord,
        serviceType: ServiceType): boolean
    {
        const serviceTypePermissions = PermissionUtility.findServiceTypePermissions(permissions, serviceRecord,
            serviceType);

        // view can potentially be undefined
        return !!(serviceTypePermissions && serviceTypePermissions.view);
    }

    private static findPermissionsForServiceType(permissions: Permissions, serviceTypeID: number): ServiceTypePermssions
    {
        return permissions.serviceTypes.find(serviceTypePermission =>
        {
            return serviceTypePermission.serviceTypeID === serviceTypeID;
        });
    }

    private static findPermissionsForServiceTypeAndProgram(permissions: Permissions, serviceTypeID: number,
        program: Program): ServiceTypePermssions
    {
        return permissions.serviceTypes.find(serviceTypePermission =>
        {
            return (serviceTypePermission.serviceTypeID === serviceTypeID)
                && ((serviceTypePermission.program === program) || (!serviceTypePermission.program && !program));
        });
    }

    private static findServiceTypePermissions(permissions: Permissions, serviceRecord: ServiceRecord,
        serviceType: ServiceType)
    {
        const serviceTypeID = serviceRecord.metadata.serviceType;
        const program = serviceRecord.metadata.program || serviceType.program;
        const permission = serviceType.permissionPerProgram ?
            PermissionUtility.findPermissionsForServiceTypeAndProgram(permissions, serviceTypeID, program) :
            PermissionUtility.findPermissionsForServiceType(permissions, serviceTypeID);
        return permission;
    }
}

export default PermissionUtility;
