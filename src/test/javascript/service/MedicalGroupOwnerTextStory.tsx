import {storiesOf} from '@storybook/react';
import MedicalGroupOwnerText from 'main/service/MedicalGroupOwnerText';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SetEntity from 'test/component/SetEntity';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';

/**
 * Tester for MedicalGroupOwnerText.tsx
 *
 * @author Thompson 14/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Service/MedicalGroupOwnerText', module)
    .add('St Vincents Hospital', () =>
    {
        return (
            <SetEntity type={EntityType.MedicalGroup} id={ST_VINCENTS_HOSPITAL.groupID}
                value={ST_VINCENTS_HOSPITAL}>
                <MedicalGroupOwnerText groupID={ST_VINCENTS_HOSPITAL.groupID} />
            </SetEntity>

        );
    });
