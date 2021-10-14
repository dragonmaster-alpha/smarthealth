import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import PatientWatchSummaryEntityPanel from 'main/summary/PatientWatchSummaryEntityPanel';
import {autorun} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';
import PatientWatchSummaryForm from 'smarthealth-rest-test/formdesc/summary/Form.Summary.PatientWatch.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';

/**
 * Allow debugging of PatientWatchSummaryEntitiesPanel.tsx
 *
 * @author Thompson 21/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const patientWatchSummaryValue = {
    ParticipationStatusService: {
        owningGroupID: 26,
        program: 'PATIENT_WATCH',
        serviceDate: {
            iso: '2020-01-21T12:04+11'
        },
        serviceID: 11546,
        serviceType: 191,
        summary: 'Start: 01/09/2019; Funded; VIP'
    },
    PermanentResidentialCare: true,
    PermanentResidentialCareService: {
        owningGroupID: 26,
        program: 'PATIENT_WATCH',
        serviceDate: {
            iso: '2020-01-21T12:02+11'
        },
        serviceID: 11545,
        serviceType: 191,
        summary: 'Start: 01/09/2019; Funded; Candidate'
    },
    ResearchConsent: 'Considering',
    NextCall: {
        iso: '2020-01-22'
    },
    MostRecentTreatmentStatus: {
        owningGroupID: 26,
        program: 'PATIENT_WATCH',
        serviceDate: {
            iso: '2020-01-21T13:30+11'
        },
        serviceID: 11551,
        serviceType: 191,
        summary: 'Start: 01/09/2019; Funded; VIP'
    },
    ParticipationStatus: 'VIP',
    FundingStatus: 'Funded',
    TelecareGuide: {
        groupID: 26,
        userID: 18
    },
    Problems: [
        {
            PriorityActions: 0,
            Priority: 'Low',
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-21'
                },
                serviceID: 11547,
                serviceType: 193,
                summary: 'Open; Low; soreness'
            },
            Problem: 'soreness',
            ProblemDate: {
                iso: '2020-01-21'
            },
            OpenActions: 2
        }
    ],
    FundingStatusService: {
        owningGroupID: 26,
        program: 'PATIENT_WATCH',
        serviceDate: {
            iso: '2020-01-21T12:02+11'
        },
        serviceID: 11545,
        serviceType: 191,
        summary: 'Start: 01/09/2019; Funded; Candidate'
    },
    ResearchConsentService: {
        owningGroupID: 26,
        program: 'PATIENT_WATCH',
        serviceDate: {
            iso: '2020-01-21T12:04+11'
        },
        serviceID: 11546,
        serviceType: 191,
        summary: 'Start: 01/09/2019; Funded; VIP'
    },
    Questionnaires: [
        {
            Status: 'Final',
            TelecareGuide: {
                groupID: 26,
                userID: 18
            },
            Outcome: 'No answer',
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-21T12:17+11'
                },
                serviceID: 11548,
                serviceType: 204,
                summary: 'No answer; Next call: 21/01/2020'
            },
            TotalIssues: 0,
            DateTime: {
                iso: '2020-01-21T12:17+11'
            },
            OpenIssues: 0
        },
        {
            Status: 'Draft',
            TelecareGuide: {
                groupID: 26,
                userID: 18
            },
            HighestSeverity: 'Moderate',
            Outcome: 'No answer',
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-21T12:20+11'
                },
                serviceID: 11549,
                serviceType: 204,
                summary: 'No answer; Next call: 21/01/2020'
            },
            TotalIssues: 1,
            DateTime: {
                iso: '2020-01-21T12:20+11'
            },
            OpenIssues: 1
        },
        {
            Status: 'Draft',
            TelecareGuide: {
                groupID: 26,
                userID: 18
            },
            Outcome: 'Answered by respondent',
            Respondent: 'Patient',
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-21T13:38+11'
                },
                serviceID: 11553,
                serviceType: 204,
                summary: 'Answered by respondent; Next call: 22/01/2020'
            },
            TotalIssues: 0,
            DateTime: {
                iso: '2020-01-21T13:38+11'
            },
            OpenIssues: 0
        },
        {
            Status: 'Draft',
            TelecareGuide: {
                groupID: 26,
                userID: 18
            },
            HighestSeverity: 'High',
            Outcome: 'Answered by respondent',
            Respondent: 'Patient',
            Service: {
                owningGroupID: 26,
                program: 'PATIENT_WATCH',
                serviceDate: {
                    iso: '2020-01-21T13:47+11'
                },
                serviceID: 11554,
                serviceType: 204,
                summary: 'Answered by respondent; Next call: 22/01/2020'
            },
            TotalIssues: 2,
            DateTime: {
                iso: '2020-01-21T13:47+11'
            },
            OpenIssues: 2
        }
    ],
    ProgramStartDate: {
        iso: '2019-09-01'
    },
    MostRecentPeriodicReview: {
        owningGroupID: 26,
        serviceDate: {
            iso: '2020-01-21'
        },
        serviceID: 11550,
        serviceType: 191,
        summary: 'Decision: Good'
    },
    CallsAllowed: false,
    Coach: {
        groupID: 26,
        userID: 18
    }
};

storiesOf('Form/Summary', module)
    .add('PatientWatch',
        () =>
        {
            const entities: EntityDetails[] = [
                {
                    type: EntityType.Summary,
                    id: SummaryType.PatientWatch,
                    value: patientWatchSummaryValue
                },
                {
                    type: EntityType.FormDescription,
                    id: summaryTypeFormDescID[SummaryType.PatientWatch],
                    value: PatientWatchSummaryForm
                },
                serviceTypeEntityDetails(ServiceTypeEnum.PatientWatchTreatmentStatus),
                serviceTypeEntityDetails(ServiceTypeEnum.PatientWatchQuestionnaire),
                serviceTypeEntityDetails(ServiceTypeEnum.PatientWatchProblemAndAction),
                serviceTypeEntityDetails(ServiceTypeEnum.PatientWatchPeriodicReview),
                ...memberEntityDetails(MEMBER_WILLIAM_WENG)
            ];
            return (
                <FullScreen>
                    <SetStore set={(appStore =>
                    {
                        autorun(() =>
                        {
                            storybookAction('Open new service, registered')(
                                appStore.componentStore.serviceToOpenInTabStore);
                        });
                    })}>
                        <SetEntities entities={entities}>
                            <PatientWatchSummaryEntityPanel />
                        </SetEntities>
                    </SetStore>
                </FullScreen>
            );
        });
