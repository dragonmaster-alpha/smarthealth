import {autobind} from 'core-decorators';
import Entities, {EntityReferences} from 'main/component/Entities';
import FieldContext from 'main/field/FieldContext';
import TableFieldOld from 'main/field/TableFieldOld';
import {customFieldRendererAdapter, CustomFields, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import {inject} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import EntityType from 'smarthealth-javascript/EntityType';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';

/**
 * Display Emergency Access Service Record with custom fields
 *
 * @author Thompson 28/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('appStore')
class EmergencyAccessService extends React.Component<EditViewFormComponentProps<EntityData>>
{
    public render()
    {
        const customFields: CustomFields<EntityData> = {
            Services: customFieldRendererAdapter(this.renderServiceRecordsAccessedField)
        };
        return <EditViewFormComponent {...this.props} customFields={customFields} />;
    }

    @autobind
    private renderServiceRecordsAccessedField(field: FormField, value: any, editing: boolean, disabled: boolean,
        valid: boolean, onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: EntityData): React.ReactNode
    {
        const entities: EntityReferences = {};
        if (this.props.data.Services && (this.props.data.Services.length > 0))
        {
            this.props.data.Services.forEach(serviceAccessed =>
            {
                entities[serviceAccessed.Service.serviceType] = {
                    type: EntityType.ServiceType,
                    id: serviceAccessed.Service.serviceType
                };
            });
        }

        return (
            <Entities entities={entities} render={(data) =>
            {
                const serviceRecordAccessedTableData = this.props.data.Services && (this.props.data.Services.length > 0)
                    ? this.props.data.Services.map(
                        (serviceAccessed) =>
                        {
                            const serviceType = this.props.appStore.entityCache.serviceTypes.get(
                                serviceAccessed.Service.serviceType).value;
                            return ({
                                serviceType,
                                ...serviceAccessed
                            });
                        })
                    : [];

                return <TableFieldOld context={context} field={field as FormFieldTable} fieldValidator={fieldValidator}
                    onFieldChange={onFieldChange} value={serviceRecordAccessedTableData} />;
            }} />
        );
    }
}

export default EmergencyAccessService;
