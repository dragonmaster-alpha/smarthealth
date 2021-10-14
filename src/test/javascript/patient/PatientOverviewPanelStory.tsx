import {storiesOf} from '@storybook/react';
import PatientOverviewEntitiesPanel from 'main/patient/PatientOverviewEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import {EntityDetails} from 'test/component/SetEntity';
import SetSession from 'test/component/SetSession';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {patientFormDescEntityDetails} from 'test/model/PatientFormDescriptionMother';
import {PATIENT_AGGREGATE_HARRY_POTTER, PATIENTID_HARRY_POTTER} from 'test/model/PatientMother';
// import MockSessionStore from 'test/store/MockSessionStore';

/**
 * Allow debugging of PatientOverviewPanel component
 *
 * @author Uditha 01/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/PatientOverviewPanel', module)
    .add('Harry Potter', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.PatientClinical,
                id: PATIENTID_HARRY_POTTER,
                value: {
                    allergies: [
                        {
                            name: {
                                code: 'ADRENALINE',
                                value: 'Adrenaline'
                            }
                        },
                        {
                            date: {
                                iso: '2019-10-01'
                            },
                            details: 'details',
                            name: {
                                code: 'ANTI_INFLAMMATORIES',
                                value: 'Anti-Inflammatories'
                            }
                        }
                    ],
                    audit: {
                        auditDateTime: '2019-10-10T11:22:32',
                        auditUserId: 50,
                        auditIPAddress: '127.0.0.1',
                        auditMedicalGroupId: 26
                    },
                    medicalAlerts: [
                        {
                            date: {
                                iso: '2019-09-11'
                            },
                            details: 'Details',
                            name: {
                                code: 'CONDITION_DIABETES',
                                value: 'Diabetes'
                            }
                        },
                        {
                            date: {
                                iso: '2019-10-17'
                            },
                            details: 'asthma details',
                            name: {
                                code: 'CONDITION_ASTHMA',
                                value: 'Asthma'
                            }
                        }
                    ],
                    patientID: PATIENTID_HARRY_POTTER,
                    version: 3
                }
            },
            patientFormDescEntityDetails('Patient.Overview')
        ];

        return (
            <FullScreen>
                <SetSession member={MEMBER_BILL_GOLFALOT} patient={PATIENT_AGGREGATE_HARRY_POTTER} entities={entities}>
                    <PatientOverviewEntitiesPanel patientID={PATIENTID_HARRY_POTTER}
                        // sessionStore={new MockSessionStore({ currentGroupID: 26 })} 
                        />
                </SetSession>
                <div>
                    <hr />
                    <p>TODO: Medical Alerts, Allergies</p>
                </div>
            </FullScreen>
        );
    });
