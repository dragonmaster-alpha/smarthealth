import {storiesOf} from '@storybook/react';
import CloseButton from 'main/component/CloseButton';
import TabBar from 'main/component/TabBar';
import serviceRecordPanelFactory from 'main/service/ServiceRecordPanelFactory';
import {grid, px} from 'main/utility/StyleUtility';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import serviceFormDescriptions from 'smarthealth-rest-test/formdesc/service/ServiceFormDescriptions';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import FormTester from 'test/form/FormTester';
import {PATIENT_AGGREGATE_HARRY_POTTER} from 'test/model/PatientMother';
import ServiceRecordMother from 'test/service/ServiceRecordMother';

/**
 * Tester for Standard Service Forms
 *
 * @author Larry 16/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const allStories = {};
serviceFormDescriptions.forEach((serviceType) =>
{
    const program = serviceType.program || 'Standard';
    const { layoutColumns } = serviceType.formDesc;
    const prefix = (layoutColumns && (layoutColumns > 0)) ? '' : '/TODO';
    let stories = allStories[`${prefix}${program}`];
    if (!stories)
    {
        stories = storiesOf(`Form/Service${prefix}/${program}`, module);
        allStories[`${prefix}${program}`] = stories;
    }

    stories.add(`${serviceType.name} (${serviceType.id})`, () =>
    {
        const data = ServiceRecordMother.createRandomData(serviceType.formDesc as FormDescription);
        return (
            <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER}>
                <FullScreen>
                    <div style={{ ...grid(null, 'auto 1fr'), padding: px(0, 16) }}>
                        <TabBar tabs={[{
                            title: serviceType.name, content: null, decoration: <CloseButton onClose={() => null} />
                        }]} />
                        <FormTester formDescription={serviceType.formDesc as FormDescription} data={data}
                            renderCustomForm={(data, formDescription, onSave) => serviceRecordPanelFactory(
                                serviceType.id, { data, formDescription, onSave })} />
                    </div>
                </FullScreen>
            </SetSession>
        );
    });
});
