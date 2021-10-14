import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Utility methods for services
 *
 * @author Larry 4/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export function isServiceSummary(service: any): service is ServiceSummary
{
    return ('serviceID' in service) && ('status' in service) && ('summaryLine' in service);
}

export function isServiceRecordReference(service: any): service is ServiceRecordReference
{
    return ('serviceID' in service) && ('serviceDate' in service) && ('serviceType' in service);
}
