import EntityType from 'smarthealth-javascript/EntityType';
import PatientFormDescriptions from 'smarthealth-rest-test/formdesc/PatientFormDescriptions';
import {EntityDetails} from 'test/component/SetEntity';

/**
 * Simplify handling patient form descriptions
 *
 * @author Larry 16/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export function patientFormDescEntityDetails(formID: string): EntityDetails
{
    return { type: EntityType.FormDescription, id: formID, value: PatientFormDescriptions[formID] };
}

export function allPatientFormDescEntityDetails(): EntityDetails[]
{
    return Object.keys(PatientFormDescriptions)
        .map(key => patientFormDescEntityDetails(key));
}
