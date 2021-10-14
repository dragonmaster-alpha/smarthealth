import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import EditViewTableFormComponent from 'main/form/EditViewTableFormComponent';
import React from 'react';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import PatientContactsForm from 'smarthealth-rest-test/formdesc/Form.Patient.Contacts.Form.json';
import PatientContactsTable from 'smarthealth-rest-test/formdesc/Form.Patient.Contacts.Table.json';
import FullScreen from 'test/container/FullScreen';
import {MA_POTTER, PA_POTTER} from 'test/data/PatientContactMother';

/**
 * Allow for Testing of EditViewTableFormComponentStory.tsx
 *
 * @author Thompson 15/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
function onSave()
{
    storybookAction('onSave')();
    return true;
}

storiesOf('Form/EditViewTableFormComponent', module)
    .add('With data', () =>
    {
        const data = {
            contacts: [
                MA_POTTER,
                PA_POTTER
            ],
            patientID: 2
        };

        return (
            <FullScreen>
                <EditViewTableFormComponent data={data} bodyFormDescription={PatientContactsForm as FormDescription}
                    onSave={onSave} headerFormDescription={PatientContactsTable as FormDescription} />
            </FullScreen>
        );
    })
    .add('Without data', () =>
    {
        return (
            <FullScreen>
                <EditViewTableFormComponent data={{}} bodyFormDescription={PatientContactsForm as FormDescription}
                    onSave={onSave} headerFormDescription={PatientContactsTable as FormDescription} />
            </FullScreen>
        );
    })
    .add('undefined data', () =>
    {
        return (
            <FullScreen>
                <EditViewTableFormComponent data={undefined}
                    bodyFormDescription={PatientContactsForm as FormDescription}
                    onSave={onSave} headerFormDescription={PatientContactsTable as FormDescription} />
            </FullScreen>
        );
    })
    .add('Incorrect Table FormDescription', () =>
    {
        const tableDescription: FormDescription = {
            description: 'Incorrect form description',
            fieldsAndSections: [{
                field: {
                    id: 'notATable',
                    label: 'Not a TableField',
                    state: { editState: FieldEditState.Enabled },
                    type: FormFieldType.Boolean
                }
            }],
            layoutColumns: 0
        };
        return (
            <FullScreen>
                <EditViewTableFormComponent data={{}} bodyFormDescription={PatientContactsForm as FormDescription}
                    onSave={onSave} headerFormDescription={tableDescription} />
            </FullScreen>
        );
    });
