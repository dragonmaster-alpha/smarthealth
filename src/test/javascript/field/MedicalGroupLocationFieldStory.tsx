import {storiesOf} from '@storybook/react';
import lodash from 'lodash';
import React from 'react';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import SetSession from 'test/component/SetSession';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import FieldTester from 'test/field/FieldTester';
import {fieldUsage} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of MedicalGroupLocationField component
 *
 * @author Priyanka 01/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Field/MedicalGroupLocationField', module)
    .add('Suburb as location', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'Location',
            label: 'Location',
            type: FormFieldType.MedicalGroupLocation
        };

        return (
            <SetSession member={MEMBER_BILL_GOLFALOT}>
                <FieldTester field={field} />
            </SetSession>
        );
    })
    .add('With locations', () =>
    {
        const field: FormFieldMedicalGroupLocation = {
            id: 'Location',
            label: 'Location',
            type: FormFieldType.MedicalGroupLocation
        };

        const member = lodash.cloneDeep(MEMBER_BILL_GOLFALOT);
        member.medicalGroup.locations = [
            { id: 1, name: 'Here' },
            { id: 2, name: 'There' },
            { id: 3, name: 'Everywhere' }
        ];
        return (
            <SetSession member={member}>
                <FieldTester field={field} />
            </SetSession>
        );
    })
    .add('Usage', () => fieldUsage(FormFieldType.MedicalGroupLocation));
