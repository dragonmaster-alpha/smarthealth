import {storiesOf} from '@storybook/react';
// tslint:disable-next-line:max-line-length
import PatientProvidersAndConsentsPanel, {PatientProvidersAndConsentsPanelData} from 'main/patient/PatientProvidersAndConsentsPanel';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import demographics from 'smarthealth-rest-test/formdesc/Form.Patient.Demographics.json';
import overview from 'smarthealth-rest-test/formdesc/Form.Patient.Overview.json';
import providersAndConsents from 'smarthealth-rest-test/formdesc/Form.Patient.ProvidersAndConsents.json';
import FullScreen from 'test/container/FullScreen';
import FormTester from 'test/form/FormTester';
import {PATIENTID_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Tester for Patient Forms
 *
 * @author Larry 16/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
storiesOf('Form/Patient', module)
    .add('Overview', () => (
            <FullScreen>
                <FormTester formDescription={overview as FormDescription} readOnly={true} />
            </FullScreen>
        )
    )
    .add('Demographics', () => (
            <FullScreen>
                <FormTester formDescription={demographics as FormDescription} />
            </FullScreen>
        )
    )
    .add('Providers and Consents', () => (
            <FullScreen>
                <FormTester formDescription={providersAndConsents as FormDescription}
                    renderCustomForm={(data, formDescription, onSave) => (
                        <PatientProvidersAndConsentsPanel data={data as PatientProvidersAndConsentsPanelData}
                            formDescription={formDescription} patientID={PATIENTID_HARRY_POTTER} />
                    )}
                />
            </FullScreen>
        )
    );
