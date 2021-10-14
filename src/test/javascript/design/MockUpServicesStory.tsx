import {storiesOf} from '@storybook/react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import serviceFormDescriptions from 'smarthealth-rest-test/formdesc/service/ServiceFormDescriptions';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import MockUpServiceRecordPage from 'test/design/MockUpServiceRecordPage';
import {patientNavItems} from 'test/design/MockUpStory';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';
import ServiceRecordMother from 'test/service/ServiceRecordMother';

/**
 * Present all the service record types in storybook using the mockup code
 *
 * @author Larry 9/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const allStories = {};

serviceFormDescriptions.forEach((service) =>
{
    const program = service.program || 'Standard';
    const { layoutColumns } = service.formDesc;
    const prefix = (layoutColumns && (layoutColumns > 0)) ? '' : '/TODO';
    let stories = allStories[`${prefix}${program}`];
    if (!stories)
    {
        stories = storiesOf(`Design/Mockups/Service${prefix}/${program}`, module);
        allStories[`${prefix}${program}`] = stories;
    }

    stories.add(`${service.name} (${service.id})`, () =>
    {
        const formDesc = service.formDesc as FormDescription;
        const data = ServiceRecordMother.createRandomData(formDesc);
        return (
            <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                <MockUpServiceRecordPage navItems={patientNavItems} title={service.name} form={formDesc} data={data} />
            </SetSession>
        );
    });
});
