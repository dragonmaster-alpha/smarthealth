import {storiesOf} from '@storybook/react';
import ImmunologyAnoscopyService from 'main/service/customServices/ImmunologyAnoscopyService';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import AnoscopyForm from 'smarthealth-rest-test/formdesc/service/Form.Immunology.Anoscopy.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';

/**
 * Tester for ImmunologyAnoscopyService.tsx
 *
 * @author Thompson 19/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

const data = {

    PeriAnal: {
        PeriAnalAbnormalities: [
            {
                Site: 'Right lateral',
                Warts: false,
                Excoriation: false,
                Biopsy: true,
                BiopsyResult: 'Negative for AIN',
                Haemorrhoids: 'Q1',
                SkinTag: false,
                Impression: 'Negative for AIN',
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Right anterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Anterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Left anterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Left lateral',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Left posterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Posterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            },
            {
                Site: 'Right posterior',
                Warts: false,
                Excoriation: false,
                SkinTag: false,
                Dermatitis: false,
                Fissure: false,
                Other: false
            }
        ],
        NormalPeriAnal: true
    },
    Setting: 'Clinic',
    Assessment: {
        Lumps: 'None',
        AnalDischarge: 'None',
        Cytology: 'Indeterminate result',
        DreDetails: 'dets',
        Bleeding: 'None',
        Tenesmus: 'None',
        Pain: 'None',
        DateCytology: {
            iso: '2020-03-26'
        },
        HpvDna: 'Low Risk HPV DNA',
        DreProstate: 'Other',
        AnalItch: 'None',
        DateHpvDna: {
            iso: '2020-03-11'
        },
        Notes: 'Notes'
    },
    Patient: 2,
    HRAIntraAnal: {
        IntraAnalAbnormalities: [
            {
                Site: 'Right lateral',
                ProminentVessels: false,
                Biopsy: true,
                BiopsyResult: 'Negative for AIN',
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Impression: 'Negative for AIN',
                Other: false
            },
            {
                Site: 'Right anterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Anterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Left anterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Left lateral',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Left posterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Posterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            },
            {
                Site: 'Right posterior',
                ProminentVessels: false,
                Acetowhite: false,
                Punctation: false,
                LugolsNegative: false,
                Other: false
            }
        ],
        NormalHRAIntraAnal: true
    },
    Provider: {
        groupID: 26,
        userID: 18
    },
    ServiceDate: {
        iso: '2020-03-12T14:07+11'
    },
    Confidentiality: 'Normal',
    Version: 4,
    HgainQuantification: {
        PeriAnalTissueHighGradeDisease: '< half of 1 quadrant',
        IntraAnalMucosaHighGradeDisease: 'Single small lesion'
    },
    Summary: 'Fully populate from JavaUI to check carry over values in WebUI',
    ID: 'fbca3a88-c093-489f-aa72-02d98ac0e09c',
    SetID: '9cd1c559-8337-426c-8364-6dc73877fedb',
    ClinicalTrials: {
        Trials: [
            {
                TrialName: 'Trail 1',
                CommenceDate: {
                    iso: '2020-03-10'
                },
                CeaseDate: {
                    iso: '2020-03-13'
                }
            }
        ]
    },
    Location: {
        id: 3,
        name: 'Darlinghursts'
    }
};

storiesOf('Form/Service/Custom Service', module)
    .add('Immunology Anoscopy', () =>
    {
        const entities: EntityDetails[] = memberEntityDetails(MEMBER_WILLIAM_WENG);
        return (
            <SetEntities entities={entities}>
                <FullScreen>
                    <ImmunologyAnoscopyService formDescription={AnoscopyForm as FormDescription}
                        data={data} onSave={() => true} />
                </FullScreen>
            </SetEntities>
        );
    });
