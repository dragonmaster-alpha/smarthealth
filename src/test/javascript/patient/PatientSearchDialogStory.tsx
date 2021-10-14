import {storiesOf} from '@storybook/react';
import PatientSearchDialog from 'main/patient/PatientSearchDialog';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import formPatientSearch from 'smarthealth-rest-test/formdesc/Form.Patient.Search.json';

/**
 * Allow debugging of PatientSearchDialog component
 *
 * @author Uditha 01/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/PatientSearchDialog', module)
    .add('Standard', () => (
        <PatientSearchDialog formDescription={formPatientSearch as FormDescription} />
    ));
