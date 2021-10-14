import MockAdapter from 'axios-mock-adapter';
import PatientHandler from 'main/handler/PatientHandler';
import AppStore from 'main/store/AppStore';
import PatientSearchTarget from 'smarthealth-javascript/PatientSearchTarget';
import {PATIENT_HARRY_POTTER, PATIENT_RON_WEASLEY} from 'test/model/PatientMother';

/**
 * Unit Test for Patient Handler
 *
 * @author Uditha 12/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('searchPatient with Results', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);
    const mockPatients = [PATIENT_HARRY_POTTER, PATIENT_RON_WEASLEY];

    mock.onGet('/patients/',
        {
            params: {
                target: 'MedicalGroup',
                familyNamePrefix: 'Karu',
                givenNamePrefix: 'Udi',
                includeDeceased: false
            }
        })
        .reply(200, mockPatients);

    const handler = new PatientHandler(appStore.handlers);
    const patientResults = await handler.searchPatient(PatientSearchTarget.MedicalGroup, null, 'Karu',
        'Udi', false);
    expect(patientResults)
        .toHaveLength(mockPatients.length);
});

test('searchPatient with Error', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    mock.onGet('/patients/',
        {
            params: {
                target: 'MedicalGroup',
                familyNamePrefix: 'Karu',
                givenNamePrefix: 'Udi',
                includeDeceased: false
            }
        })
        .reply(500, 'Error');

    const handler = new PatientHandler(appStore.handlers);
    try
    {
        await handler.searchPatient(PatientSearchTarget.MedicalGroup, null, 'Karu',
            'Udi', false);
    }
    catch (error)
    {
        expect(500)
            .toEqual(error.response.status);
        expect('Error')
            .toEqual(error.response.data);
    }
});
