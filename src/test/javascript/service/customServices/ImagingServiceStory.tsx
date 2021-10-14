import {storiesOf} from '@storybook/react';
import ImagingService from 'main/service/customServices/ImagingService';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import ImagingForm from 'smarthealth-rest-test/formdesc/service/Form.Service.Imaging.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';

/**
 * Tester for ImagingService.tsx
 *
 * @author Thompson 21/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const data = {
    LabReference: 'st66',
    ServiceDate: { iso: '2020-04-17T11:55+10' },
    CopyTo: { groupID: 26, userID: 18 },
    SurgeryReference: '34dw',
    ImageURL: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    AllTestsComplete: true,
    TestResult: 'Cardiac ultrasound report',
    ReferringProvider: { groupID: 26, userID: 18 },
    Modality: 'Cardiac ultrasound',
    TestRequest: 'Request',
    Provider: { groupID: 26, userID: 18 }
};

storiesOf('Form/Service/Custom Service', module)
    .add('Imaging', () =>
    {
        const entities: EntityDetails[] = memberEntityDetails(MEMBER_WILLIAM_WENG);
        return (
            <SetEntities entities={entities}>
                <FullScreen>
                    <ImagingService data={data}
                        formDescription={ImagingForm as FormDescription} onSave={() => true} />
                </FullScreen>
            </SetEntities>
        );
    });
