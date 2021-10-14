import Entities, {EntityReferences} from 'main/component/Entities';
import Entity from 'main/component/Entity';
import ServiceRecordPanel from 'main/service/ServiceRecordPanel';
import {ServiceTab} from 'main/store/ServiceRecordTabStore';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Display header and Service Record
 *
 * @author Thompson 10/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

interface ServiceRecordEntityPanelProps
{
    closeServiceTab: (serviceID: number) => void;
    openServiceTab: (serviceSummaryExt: ServiceSummary) => void;
    serviceTab: ServiceTab;
}

class ServiceRecordEntityPanel extends React.Component<ServiceRecordEntityPanelProps>
{
    public render()
    {
        const { serviceTab } = this.props;
        const isNew = this.props.serviceTab.isNew;

        const entities: EntityReferences = {
            serviceType: { id: serviceTab.serviceSummary.serviceType, type: EntityType.ServiceType }
        };
        if (!isNew)
        {
            entities.serviceRecord = { id: serviceTab.serviceSummary.serviceID, type: EntityType.ServiceRecord };
        }

        return (
            <Entities entities={entities} render={data =>
            {
                const serviceRecord = isNew ? this.props.serviceTab.serviceRecord : data.serviceRecord;
                return (
                    <Entity<FormDescription> id={data.serviceType.formDescriptionID} type={EntityType.FormDescription}
                        render={(formDescription) => (
                            <ServiceRecordPanel serviceRecord={serviceRecord}
                                formDescription={formDescription}
                                onClose={() => this.props.closeServiceTab(serviceTab.serviceSummary.serviceID)}
                                openTab={this.props.openServiceTab} serviceSummary={serviceTab.serviceSummary}
                                serviceType={data.serviceType}
                                newServiceRecord={isNew} />
                        )}
                    />
                );
            }} />
        );
    }
}

export default ServiceRecordEntityPanel;
