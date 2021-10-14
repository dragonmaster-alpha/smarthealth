import {action as storybookAction} from '@storybook/addon-actions';
import lodash from 'lodash';
import {autorun} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import Program from 'smarthealth-javascript/Program';
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SetEntities from 'test/component/SetEntities';
import SetEntity from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';
import FieldTester from 'test/field/FieldTester';
import {fieldUsagePredicate} from 'test/field/FieldUsageUtility';

/**
 * Allow implementation of ServiceRecordReferenceFieldOld
 *
 * @author Thompson 13/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export default {
    title: 'Field/ServiceRecordReference'
};

const fieldValue = {
    owningGroupID: 26, program: Program.CYSTIC_FIBROSIS, serviceDate: { iso: '2020-01-08T12:02' },
    serviceID: 11474, serviceType: ServiceTypeEnum.CFTreatmentStatus, summary: 'Cystic Fibrosis Summary'
};

const serviceType185 = {
    abbreviation: 'CF Treatment Status', category: 'TreatmentStatus',
    formDescriptionID: 'CysticFibrosis.TreatmentStatus', name: 'CF Treatment Status', program: 'CYSTIC_FIBROSIS',
    serviceTypeID: 185, supportDraft: false
};

const serviceDateField: FormFieldServiceRecordReference = {
    displayType: ServiceRecordReferenceDisplayType.ServiceDate, id: 'field', label: 'field',
    state: { editState: FieldEditState.Enabled }, type: FormFieldType.ServiceRecordReference
};
const summaryField: FormFieldServiceRecordReference = {
    displayType: ServiceRecordReferenceDisplayType.Summary, id: 'field', label: 'field',
    state: { editState: FieldEditState.Enabled }, type: FormFieldType.ServiceRecordReference
};
const buttonOnlyField: FormFieldServiceRecordReference = {
    displayType: ServiceRecordReferenceDisplayType.ButtonOnly, id: 'field', label: 'field',
    state: { editState: FieldEditState.Enabled }, type: FormFieldType.ServiceRecordReference
};

export const buttonOnly = () =>
{
    return (
        <FieldTester field={buttonOnlyField} />
    );
};

export const serviceDate = () =>
{
    return (
        <FieldTester field={serviceDateField} />
    );
};

export const summary = () =>
{
    return (
        <FieldTester field={summaryField} />
    );
};

export const buttonOnlyInitialised = () =>
{
    const entities = [
        serviceTypeEntityDetails(ServiceTypeEnum.CFTreatmentStatus)
    ];
    return (
        <SetStore set={(appStore) =>
        {
            autorun(() =>
            {
                storybookAction('service to open in tab store')(
                    appStore.componentStore.serviceToOpenInTabStore);
            });
        }}>
            <SetEntities entities={entities}>
                <FieldTester field={buttonOnlyField} value={fieldValue} />
            </SetEntities>
        </SetStore>
    );
};

export const serviceDateInitialised = () =>
{
    return (
        <SetStore set={(appStore) =>
        {
            autorun(() =>
            {
                storybookAction('service to open in tab store')(
                    appStore.componentStore.serviceToOpenInTabStore);
            });
        }}>
            <SetEntity id={185} value={serviceType185} type={EntityType.ServiceType}>
                <FieldTester field={serviceDateField} value={fieldValue} />
            </SetEntity>
        </SetStore>
    );
};

export const summaryInitialised = () =>
{
    return (
        <SetStore set={(appStore) =>
        {
            autorun(() =>
            {
                storybookAction('service to open in tab store')(
                    appStore.componentStore.serviceToOpenInTabStore);
            });
        }}>
            <SetEntity id={185} value={serviceType185} type={EntityType.ServiceType}>
                <FieldTester field={summaryField} value={fieldValue} />
            </SetEntity>
        </SetStore>
    );
};

export const usageButtonOnly = () => fieldUsagePredicate('Field ServiceRecordReference, button only',
    field => FormFieldTypes.isServiceRecordReference(field)
        && (lodash.isNil(field.displayType) || (field.displayType === ServiceRecordReferenceDisplayType.ButtonOnly)));

export const usageServiceDate = () => fieldUsagePredicate('Field ServiceRecordReference, service date',
    field => FormFieldTypes.isServiceRecordReference(field)
        && (field.displayType === ServiceRecordReferenceDisplayType.ServiceDate));

export const usageSummary = () => fieldUsagePredicate('Field ServiceRecordReference, summary',
    field => FormFieldTypes.isServiceRecordReference(field)
        && (field.displayType === ServiceRecordReferenceDisplayType.Summary));
