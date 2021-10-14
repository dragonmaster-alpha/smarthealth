import Observation from 'smarthealth-javascript/Observation';

/**
 * Utility for Observations.
 *
 * @author Thompson 19/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export function isObservation(value: any): value is Observation
{
    return value && value.observationType && value.observationDate;
}

export function determineNewestObservation(observation1: Observation, observation2: Observation): Observation
{
    if (!observation1 && !observation2)
    {
        return null;
    }
    else if (!observation1 && observation2)
    {
        return observation2;
    }
    else if (observation1 && !observation2)
    {
        return observation1;
    }

    if ((observation1.observationDate.iso === observation2.observationDate.iso)
        && (observation1.serviceRecordReference.serviceID < observation2.serviceRecordReference.serviceID))
    {
        return observation2;
    }
    else if (observation1.observationDate.iso < observation2.observationDate.iso)
    {
        return observation2;
    }
    else
    {
        return observation1;
    }
}
