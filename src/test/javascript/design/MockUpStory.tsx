import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import {background, colour} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import SHIcon from 'main/component/SHIcon';
import ButtonBar from 'main/container/ButtonBar';
import Scroll from 'main/container/Scroll';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import insurersAndIdentifiers from 'smarthealth-rest-test/formdesc/Form.Patient.InsurersAndIdentifiers.json';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_JEMMA_HULL} from 'test/data/MedicalGroupMemberAggregateMother';
import MockUpForm from 'test/design/MockUpForm';
import MockUpHomeButton from 'test/design/MockUpHomeButton';
import MockUpPage from 'test/design/MockUpPage';
import MockUpPatientDetailsForm from 'test/design/MockUpPatientDetailsForm';
import MockUpPatientDetailsPage from 'test/design/MockUpPatientDetailsPage';
import patientDetailsInvalidData from 'test/design/MockUpStory.patientDetailsInvalidData.json';
import MockUpTabBar, {Tab} from 'test/design/MockUpTabBar';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENT_HARRY_POTTER} from 'test/model/PatientMother';

/**
 * Translation of Digital Garden mockups into simple HTML
 *
 * @author Larry 21/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

const providerNavItems = [
    { icon: 'user-small', name: 'Provider', primary: true },
    { icon: 'alert', name: 'Alerts' },
    { icon: 'meetings', name: 'Meetings' },
    { icon: 'patientlist', name: 'Patient List' }
];

export const patientNavItems = [
    ...providerNavItems,
    { icon: 'patient', name: 'Patient', primary: true },
    { icon: 'patient', name: 'Patient Details' },
    { icon: 'alert', name: 'Patient Alerts' },
    { icon: 'conditions', name: 'Conditions' },
    { icon: 'medications', name: 'Medications' },
    { icon: 'clinicalmeasures', name: 'Clinical Measures' },
    { icon: 'pathology', name: 'Pathology' },
    { icon: 'lungfunction', name: 'Lung Function' },
    { icon: 'history', name: 'Service Records' }
];

const patientDetailsTabs: Tab[] = [{ name: 'Overview' }, { name: 'Demographics' }, { name: 'Insurers & Identifiers' },
    { name: 'Contacts' }, { name: 'Family/Social' }, { name: 'Medical Alerts' }, { name: 'Allergies' },
    { name: 'Providers & Consents' }];

const errorDecoration = <sup style={{ color: colour.error, marginLeft: '2px' }}><SHIcon icon={'error'} /></sup>;
const errorPatientDetailsTabs: Tab[] = [{ name: 'Overview' },
    { name: 'Demographics', decoration: errorDecoration },
    { name: 'Insurers & Identifiers' },
    { name: 'Contacts', decoration: errorDecoration },
    { name: 'Family/Social' },
    { name: 'Medical Alerts' }, { name: 'Allergies' }, { name: 'Providers & Consents' }];

const buttonBar = (
    <ButtonBar>
        <Button title="Save" primary={true} onClick={null} />
        <Button title="Cancel" onClick={null} />
    </ButtonBar>
);

const homePageStyle = css({
    backgroundColor: background.main,
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    alignItems: 'start', justifyItems: 'center', paddingTop: '2em'
});

storiesOf('Design/Mockups', module)
    .add('Provider Homepage', () =>
    {
        return (
            <MockUpPage navItems={providerNavItems} navTreeSelection="Provider" pageTitle="Provider"
                provider={MEMBER_JEMMA_HULL}>
                <main css={homePageStyle}>
                    <MockUpHomeButton icon="patient" name="Open Patient" />
                    <MockUpHomeButton icon="patient-new" name="New Patient" />
                    <MockUpHomeButton icon="alert" name="Alerts" />
                    <MockUpHomeButton icon="meetings" name="Meetings" />
                    <MockUpHomeButton icon="patientlist" name="Patient List" />
                </main>
            </MockUpPage>
        );
    })
    .add('Patient Homepage', () =>
    {
        return (
            <MockUpPage navItems={patientNavItems} navTreeSelection="Patient" pageTitle="Patient"
                patient={PATIENT_AGGREGATE_HARRY_POTTER}
                provider={MEMBER_JEMMA_HULL}>
                <main css={homePageStyle}>
                    <MockUpHomeButton icon="patient" name="Patient Details" />
                    <MockUpHomeButton icon="alert" name="Alerts" />
                    <MockUpHomeButton icon="conditions" name="Conditions" />
                    <MockUpHomeButton icon="medications" name="Medications" />
                    <MockUpHomeButton icon="clinicalmeasures" name="Clinical Measures" />
                    <MockUpHomeButton icon="pathology" name="Pathology" />
                    <MockUpHomeButton icon="lungfunction" name="Lung Function" />
                    <MockUpHomeButton icon="history" name="Service Records" />
                </main>
            </MockUpPage>
        );
    })
    .add('Patient Details', () =>
    {
        return <MockUpPatientDetailsPage navItems={patientNavItems} tabs={patientDetailsTabs} />;
    })
    .add('Insurers & Identifiers (Edit)', () =>
    {
        return (
            <FullScreen>
                <Scroll>
                    <MockUpForm form={insurersAndIdentifiers as FormDescription} data={PATIENT_HARRY_POTTER}
                        editing={true} />
                </Scroll>
            </FullScreen>
        );
    })
    .add('Patient Details Field Incomplete', () =>
    {
        // TODO this does not present correctly after changes to the mockup fields
        return (
            <MockUpPage navItems={patientNavItems} navTreeSelection="Patient Details" pageTitle="Patient Details"
                patient={PATIENT_AGGREGATE_HARRY_POTTER}
                provider={MEMBER_JEMMA_HULL}>
                <main
                    style={{
                        backgroundColor: background.main,
                        display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr'
                    }}>
                    <div style={{
                        padding: '0px 32px',
                        display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '44px 1fr 56px'
                    }}>
                        <MockUpTabBar tabs={errorPatientDetailsTabs} selectedIndex={1} stretch={true} />
                        <Scroll>
                            <MockUpPatientDetailsForm data={patientDetailsInvalidData} edit={true}
                                invalidFields={{ email: true, preferredName: true }} />
                        </Scroll>
                        {buttonBar}
                    </div>
                </main>
            </MockUpPage>
        );
    });
