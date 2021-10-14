import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import {fullName} from 'main/format/NameFormat';
import AppStore from 'main/store/AppStore';
import DateUtility from 'main/utility/DateUtility';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Build the tooltips for data objects
 *
 * @author Larry 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export function medicalGroupMemberToolTip(member: MedicalGroupMemberAggregate): string
{
    return `${fullName(member.user.name)} ( ${member.medicalGroup.name} @ ${member.medicalGroup.address.city}, ${
        member.medicalGroup.phone} )`;
}

export function medicalGroupToolTip(medicalGroup: MedicalGroup): string
{
    return medicalGroup && `${medicalGroup.name} ( ${medicalGroup.address.city} @  ${medicalGroup.phone})`;
}

export function serviceRecordReferenceToolTip(reference: ServiceRecordReference, serviceType: ServiceType,
    appStore: AppStore): string
{
    return `${serviceType.abbreviation}\n${DateUtility.formatEventDateTime(reference.serviceDate,
        appStore.i18nStore.locale)}\n${reference.summary}`;
}
