import {storiesOf} from '@storybook/react';
import ServiceRecordReferenceEntityHyperlink from 'main/component/ServiceRecordReferenceEntityHyperlink';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SetEntity from 'test/component/SetEntity';
import {loadServiceType} from 'test/data/ServiceTypeMother';

/**
 * Allow debugging of ServiceRecordReferenceEntityHyperlink.tsx
 *
 * @author Thompson 17/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/ServiceRecordReferenceEntityHyperlink', module)
    .add('value',
        () =>
        {
            const service: ServiceRecordReference = {
                owningGroupID: 22, serviceDate: { iso: '2007-10-24T10:30+10' }, serviceID: 11696,
                serviceType: ServiceTypeEnum.LungFunction, summary: 'Post BD FEV1: 1.52, FVC: 5.67'
            };
            return (
                <>
                    <SetEntity type={EntityType.ServiceType} id={ServiceTypeEnum.LungFunction}
                        value={loadServiceType(ServiceTypeEnum.LungFunction)}>
                        <ServiceRecordReferenceEntityHyperlink value="13.02L" service={service} />
                    </SetEntity>
                    <h3>TODO</h3>
                    <ul>
                        <li>Tooltip doesn't show in storybook but shows in Web Application.</li>
                    </ul>
                </>
            );
        });
