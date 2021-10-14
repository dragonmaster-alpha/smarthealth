import Entity from 'main/component/Entity';
import ServiceRecordReferenceHyperlink from 'main/component/ServiceRecordReferenceHyperlink';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Load entity data to ServiceRecordReferenceHyperlink.tsx
 *
 * @author Thompson 17/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface ServiceRecordReferenceEntityHyperlinkProps
{
    service: ServiceRecordReference;
    value: React.ReactNode;
}

class ServiceRecordReferenceEntityHyperlink extends React.Component<ServiceRecordReferenceEntityHyperlinkProps>
{
    public render()
    {
        return (
            <Entity<ServiceType> id={this.props.service.serviceType} type={EntityType.ServiceType}
                render={(data) => (
                    <ServiceRecordReferenceHyperlink service={this.props.service} serviceType={data}
                        value={this.props.value} />
                )} />
        );
    }
}

export default ServiceRecordReferenceEntityHyperlink;
