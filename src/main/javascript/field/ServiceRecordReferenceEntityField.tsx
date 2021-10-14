import Entity from 'main/component/Entity';
import {BaseFieldProps} from 'main/field/BaseField';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceType from 'smarthealth-javascript/ServiceType';
import ServiceRecordReferenceField from './ServiceRecordReferenceField';

/**
 * Entity to fetch service type for ServiceRecordReference
 *
 * @author Larry 20/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
class ServiceRecordReferenceEntityField
    extends React.Component<BaseFieldProps<FormFieldServiceRecordReference, ServiceRecordReference>>
{
    public render(): React.ReactNode
    {
        if (this.props.value)
        {
            return (
                <Entity<ServiceType> id={this.props.value.serviceType} type={EntityType.ServiceType}
                    render={serviceType => <ServiceRecordReferenceField context={this.props.context}
                        onFieldChange={this.props.onFieldChange} serviceType={serviceType} value={this.props.value} />
                    } />
            );
        }
        else
        {
            return <ServiceRecordReferenceField context={this.props.context} onFieldChange={this.props.onFieldChange}
                serviceType={null} value={this.props.value} />;
        }
    }

}

export default ServiceRecordReferenceEntityField;
