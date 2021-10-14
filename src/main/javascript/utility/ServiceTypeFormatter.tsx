import Program from 'smarthealth-javascript/Program';
import ServiceType from 'smarthealth-javascript/ServiceType';
import EnumUtility from './EnumUtility';

/**
 * Formatter for service types
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class ServiceTypeFormatter
{
    public static formatName(serviceType: ServiceType, program?: Program): string
    {
        const programName = program ? EnumUtility.getEnumText('Program', program) : '';
        return serviceType.name.replace('%P', programName);
    }
}

export default ServiceTypeFormatter;
