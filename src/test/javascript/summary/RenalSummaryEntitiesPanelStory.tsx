import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import RenalSummaryEntitiesPanel from 'main/summary/RenalSummaryEntitiesPanel';
import {autorun} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';
import RenalSummaryForm from 'smarthealth-rest-test/formdesc/summary/Form.Summary.RenalSummary.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';

/**
 * Allow debugging of RenalSummaryEntitiesPanel.tsx
 *
 * @author Thompson 20/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const renalSummaryValue = {
    AlliedHealth: {
        SocialWork: 'Some summary for Renal Social worker notes',
        SocialWorkerNotesService: {
            owningGroupID: 26,
            program: 'RENAL_DISEASE',
            serviceDate: {
                iso: '2019-09-13T13:33+10'
            },
            serviceID: 108,
            serviceType: 37,
            summary: 'Some summary for Renal Social worker notes'
        },
        DietitianNotesService: {
            owningGroupID: 26,
            program: 'RENAL_DISEASE',
            serviceDate: {
                iso: '2019-09-13'
            },
            serviceID: 105,
            serviceType: 37,
            summary: 'Summary'
        },
        Dietitian: 'Summary'
    },
    AccessCarePlan: {
        Accesses: [
            {
                AccessLocation: 'Left Subclavian',
                Dialysis: 'Peritoneal Dialysis',
                InsertedCreated: {
                    iso: '2020-01-23'
                },
                AccessType: 'Swan neck PD catheter left double cuffed 43 cm',
                AccessStatus: 'New',
                AccessCarePlanService: {
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2020-01-23'
                    },
                    serviceID: 11562,
                    serviceType: 32,
                    summary: 'Swan neck PD catheter left double cuffed 43 cm, Left Subclavian'
                }
            },
            {
                AccessLocation: 'Left Upper Arm',
                Dialysis: 'Haemodialysis',
                InsertedCreated: {
                    iso: '2019-09-02'
                },
                LastUsed: {
                    iso: '2020-01-08'
                },
                AccessType: 'Cuffed vascular catheter',
                AccessStatus: 'Current',
                AccessCarePlanService: {
                    owningGroupID: 26,
                    program: 'RENAL_DISEASE',
                    serviceDate: {
                        iso: '2019-09-13'
                    },
                    serviceID: 114,
                    serviceType: 37,
                    summary: 'Removed: Cuffed vascular catheter, Left Upper Arm'
                }
            },
            {
                AccessLocation: 'Left Upper Arm',
                Dialysis: 'Haemodialysis',
                InsertedCreated: {
                    iso: '2019-09-01'
                },
                LastUsed: {
                    iso: '2019-09-13'
                },
                AccessCarePlanService: {
                    owningGroupID: 26,
                    program: 'RENAL_DISEASE',
                    serviceDate: {
                        iso: '2019-09-13T14:21+10'
                    },
                    serviceID: 115,
                    serviceType: 37,
                    summary: 'Removed: null, Left Upper Arm'
                }
            },
            {
                AccessLocation: 'Left Forearm',
                Dialysis: 'Haemodialysis',
                InsertedCreated: {
                    iso: '2019-09-01'
                },
                AccessType: 'AV fistula',
                AccessStatus: 'New',
                AccessCarePlanService: {
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2019-09-16'
                    },
                    serviceID: 155,
                    serviceType: 37,
                    summary: 'AV fistula, Left Forearm'
                }
            },
            {
                AccessLocation: 'Left Upper Arm',
                Dialysis: 'Haemodialysis',
                InsertedCreated: {
                    iso: '2019-09-01'
                },
                AccessCarePlanService: {
                    owningGroupID: 26,
                    program: 'RENAL_DISEASE',
                    serviceDate: {
                        iso: '2019-09-16T11:19+10'
                    },
                    serviceID: 156,
                    serviceType: 37,
                    summary: 'Removed: null, Left Upper Arm'
                }
            },
            {
                AccessLocation: 'Left Upper Arm',
                Dialysis: 'Haemodialysis',
                InsertedCreated: {
                    iso: '2019-07-18'
                },
                LastUsed: {
                    iso: '2019-09-13'
                },
                AccessType: 'Goretex graft',
                AccessStatus: 'Current',
                AccessCarePlanService: {
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2019-07-24'
                    },
                    serviceID: 7,
                    serviceType: 37,
                    summary: 'Goretex graft, Left Upper Arm'
                }
            }
        ]
    },
    TreatmentCentre: {
        VascularAccessNurse: {
            groupID: 26,
            userID: 18
        },
        RenalService: 26,
        TreatmentCentre: 26,
        TreatmentStatusService: {
            owningGroupID: 26,
            program: 'RENAL_DISEASE',
            serviceDate: {
                iso: '2020-01-09T09:02+11'
            },
            serviceID: 11503,
            serviceType: 118,
            summary: 's'
        },
        Nephrologist: {
            groupID: 26,
            userID: 18
        },
        CaseManager: {
            groupID: 26,
            userID: 18
        },
        Location: 'Outpatient'
    },
    Anthropometry: {
        DateOfMostRecentDryWeight: {
            iso: '2020-01-10T10:02+11'
        },
        MostRecentHeight: 160,
        MostRecentDryWeight: 37.7,
        BMI: 14.7
    },
    TreatmentStatus: {
        TreatmentStatusService: {
            owningGroupID: 26,
            program: 'RENAL_DISEASE',
            serviceDate: {
                iso: '2020-01-09T09:02+11'
            },
            serviceID: 11503,
            serviceType: 37,
            summary: 's'
        },
        StartDateForCurrentClass: {
            iso: '2020-01-09'
        },
        PatientClass: 'APD/IPD Hospital',
        PrimaryRenalDisease: 'Renal tuberculosis'
    }
};

storiesOf('Form/Summary', module)
    .add('Renal', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.Summary,
                id: SummaryType.Renal,
                value: renalSummaryValue
            },
            {
                type: EntityType.FormDescription,
                id: summaryTypeFormDescID[SummaryType.Renal],
                value: RenalSummaryForm
            },
            ...memberEntityDetails(MEMBER_WILLIAM_WENG),
            // TODO Thompson - why is this using a CF service type?
            serviceTypeEntityDetails(ServiceTypeEnum.CFRespiratoryPhysicianNotes)
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
                        <RenalSummaryEntitiesPanel />
                    </SetEntities>
                </SetStore>
            </FullScreen>
        );
    });
