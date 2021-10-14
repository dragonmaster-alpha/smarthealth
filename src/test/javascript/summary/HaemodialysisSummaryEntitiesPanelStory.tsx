import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import HaemodialysisSummaryEntitiesPanel from 'main/summary/HaemodialysisSummaryEntitiesPanel';
import {autorun} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';
import HaemodialysisSummaryForm from 'smarthealth-rest-test/formdesc/summary/Form.Summary.HaemodialysisSummary.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';

/**
 * Allow debugging of HaemodialysisSummaryEntitiesPanel.tsx
 *
 * @author Thompson 17/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const haemodialysisSummaryValue = {
    HaemodialysisPrescription: {
        HoursPerSession: '1',
        SessionsPerWeek: 3,
        BloodFlowRate: 100,
        HDPrescriptionService: {
            owningGroupID: 26,
            program: 'RENAL_DISEASE',
            serviceDate: {
                iso: '2020-01-09'
            },
            serviceID: 11516,
            serviceType: ServiceTypeEnum.RenalHDPrescription,
            summary: 'a'
        }
    },
    Haemodialysis: [
        {
            Qb: 1,
            ArtPress: 1,
            Comment: 'a',
            WeightPre: 110,
            BPPre: '111/11',
            BPPost: '124/10',
            OCMKTV: 4,
            VenPress: 1,
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2020-01-09'
                },
                serviceID: 11511,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: 'AV fistula, Left Forearm, Duration - 60 mins'
            },
            WeightPost: 79
        },
        {
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2020-01-08'
                },
                serviceID: 11468,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: 'Removed: Cuffed vascular catheter, Left Upper Arm, Duration - 10 mins'
            }
        },
        {
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2019-09-13T16:31+10'
                },
                serviceID: 139,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: ''
            }
        },
        {
            Qb: 4,
            ArtPress: 2,
            Comment: 'good',
            WeightPre: 80,
            BPPre: '110/0',
            OCMKTV: 9,
            VenPress: 3,
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2019-09-13'
                },
                serviceID: 140,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: 'Goretex graft, Left Upper Arm, Duration - 60 mins'
            },
            WeightPost: 72
        },
        {
            Qb: 100,
            ArtPress: 100,
            WeightPre: 70,
            OCMKTV: 4,
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2019-09-13'
                },
                serviceID: 141,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: 'Removed: null, Left Upper Arm, Duration - 60 mins'
            },
            WeightPost: 69
        },
        {
            Service: {
                owningGroupID: 26,
                program: 'RENAL_DISEASE',
                serviceDate: {
                    iso: '2019-09-13'
                },
                serviceID: 138,
                serviceType: ServiceTypeEnum.RenalHaemodialysis,
                summary: 'Removed: null, Left Upper Arm, Duration - 71 mins'
            }
        }
    ]
};

storiesOf('Form/Summary', module)
    .add('Haemodialysis', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.Summary,
                id: SummaryType.Haemodialysis,
                value: haemodialysisSummaryValue
            },
            {
                type: EntityType.FormDescription,
                id: summaryTypeFormDescID[SummaryType.Haemodialysis],
                value: HaemodialysisSummaryForm
            },
            serviceTypeEntityDetails(ServiceTypeEnum.RenalHDPrescription),
            serviceTypeEntityDetails(ServiceTypeEnum.RenalHaemodialysis)
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
                        <HaemodialysisSummaryEntitiesPanel />
                    </SetEntities>
                </SetStore>
            </FullScreen>
        );
    });
