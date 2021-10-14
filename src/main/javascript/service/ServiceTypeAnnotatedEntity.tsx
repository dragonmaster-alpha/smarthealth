import Entity from 'main/component/Entity';
import ServiceTypeAnnotated from 'main/service/ServiceTypeAnnotated';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Program from 'smarthealth-javascript/Program';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Load entities for ServiceTypeAnnotated
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ServiceTypeWithProgramAndDraftEntityProps
{
    draft?: boolean;
    program?: Program;
    serviceTypeID: number;
}

class ServiceTypeAnnotatedEntity extends React.Component<ServiceTypeWithProgramAndDraftEntityProps>
{
    public render()
    {
        return <Entity<ServiceType> type={EntityType.ServiceType} id={this.props.serviceTypeID}
            render={(serviceType) => <ServiceTypeAnnotated serviceType={serviceType} draft={this.props.draft}
                program={this.props.program} />}
        />;
    }
}

export default ServiceTypeAnnotatedEntity;
