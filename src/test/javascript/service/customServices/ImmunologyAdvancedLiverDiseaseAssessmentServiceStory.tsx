import {storiesOf} from '@storybook/react';
import ImmunologyAdvancedLiverDiseaseAssessmentService
    from 'main/service/customServices/ImmunologyAdvancedLiverDiseaseAssessmentService';
import React from 'react';
import ChildPughClassParameters from 'smarthealth-javascript/ChildPughClassParameters';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MELDParameters from 'smarthealth-javascript/MELDParameters';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import AdvanceLiverDiseaseAssessment
    from 'smarthealth-rest-test/formdesc/service/Form.Immunology.AdvancedLiverDiseaseAssessment.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';

/**
 * Tester for ImmunologyAdvancedLiverDiseaseAssessmentService.tsx
 *
 * @author Thompson 13/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

const data = {
    SyntheticFunction: {
        Encephalopathy: 'Mild (I-II)',
        Dialysis: true,
        Ascites: 'Absent'
    },
    Diagnostics: {
        PathologyResults: [
            {
                mappingID: 'Albumin',
                Value: '19',
                Range: '33-48',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: {
                        iso: '2020-01-20T08:26+11'
                    },
                    serviceID: 11620,
                    serviceType: 3,
                    summary: 'LFT'
                },
                Abnormal: 'L',
                Code: '61152-5',
                Units: 'g/L',
                Name: 'Albumin'
            },
            {
                mappingID: 'Immunology.Bilirubin',
                Value: '6',
                Range: '0-20',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: {
                        iso: '2020-01-20T08:26+11'
                    },
                    serviceID: 11620,
                    serviceType: 3,
                    summary: 'LFT'
                },
                Code: '14631-6',
                Units: 'umol/L',
                Name: 'Bilirubin'
            },
            {
                mappingID: 'Immunology.INR',
                Value: '0.9',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: { iso: '2020-01-20T12:05+11' },
                    serviceID: 11624,
                    serviceType: 3,
                    summary: 'Coag Screen'
                },
                Code: '6301-6',
                Name: 'INR'
            },
            {
                mappingID: 'Creatinine',
                Value: '170',
                Range: '60-110',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: {
                        iso: '2020-01-20T08:26+11'
                    },
                    serviceID: 11623,
                    serviceType: 3,
                    summary: 'UEC'
                },
                Abnormal: 'H',
                Code: '14682-9',
                Units: 'umol/L',
                Name: 'Creatinine'
            },
            {
                Name: 'AFP'
            },
            {
                Name: 'Vitamin D'
            },
            {
                mappingID: 'Calcium',
                Value: '1.91',
                Range: '2.10-2.60',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: {
                        iso: '2020-01-20T08:26+11'
                    },
                    serviceID: 11622,
                    serviceType: 3,
                    summary: 'Ca corr for Alb'
                },
                Abnormal: 'L',
                Code: '2000-8',
                Units: 'mmol/L',
                Name: 'Calcium'
            },
            {
                Name: 'Testosterone'
            },
            {
                mappingID: 'Thyrotropin',
                Value: '2.99',
                Range: '0.40-4.80',
                PathologyServiceRecord: {
                    owningGroupID: 29,
                    serviceDate: {
                        iso: '2020-01-20T08:15+11'
                    },
                    serviceID: 11621,
                    serviceType: 3,
                    summary: 'TFT'
                },
                Code: '3016-3',
                Units: 'mIU/L',
                Name: 'Thyrotropin (TSH)'
            }
        ]
    },
    Setting: 'Clinic',
    PortalHypertension: {
        EndoscopyDate: {
            iso: '2019-09-01'
        },
        PortalHypertensionTreatment: 'Medication - propranolol',
        Varices: 'Gastric',
        Endoscopy: true
    },
    Patient: 2,
    Purpose: 'Consultation',
    Molic: {
        DexaScanDate: {
            iso: '2020-03-11'
        },
        DexaScan: 'd'
    },
    Prognostic: {
        FibroscanDate: {
            iso: '2019-09-01'
        },
        Fibroscan: 1
    },
    Provider: {
        groupID: 26,
        userID: 18
    },
    Immunisations: {
        Immunisations: [
            {
                ImmunisationServiceRecord: {
                    confidentiality: 'Normal',
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2019-09-16T11:25+10'
                    },
                    serviceID: 157,
                    serviceType: 100,
                    summary: 'Adsorbed diphtheria+tetanus vaccine injection suspension 0.5mL prefilled syringe'
                },
                Immune: true,
                Immunised: true,
                Diagnosis: 'Diphtheria'
            },
            {
                ImmunisationServiceRecord: {
                    confidentiality: 'Normal',
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2020-02-24T14:27+11'
                    },
                    serviceID: 11571,
                    serviceType: 100,
                    summary: 'Hepatitis A + Typhoid vaccine'
                },
                Immune: true,
                Immunised: true,
                Diagnosis: 'Hepatitis A'
            },
            {
                Immune: true,
                Diagnosis: 'Hepatitis B'
            },
            {
                Immune: true,
                Diagnosis: 'Influenza'
            },
            {
                Immune: true,
                Diagnosis: 'Measles'
            },
            {
                Immune: true,
                Diagnosis: 'Mumps'
            },
            {
                Immune: true,
                Diagnosis: 'Pertussis'
            },
            {
                Immune: true,
                Diagnosis: 'Pneumococcal'
            },
            {
                Immune: true,
                Diagnosis: 'Rubella'
            },
            {
                ImmunisationServiceRecord: {
                    confidentiality: 'Normal',
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2019-09-16T11:25+10'
                    },
                    serviceID: 157,
                    serviceType: 100,
                    summary: 'Adsorbed diphtheria+tetanus vaccine injection suspension 0.5mL prefilled syringe'
                },
                Immune: true,
                Immunised: true,
                Diagnosis: 'Tetanus'
            },
            {
                Immune: true,
                Diagnosis: 'Zoster-Varicella'
            }
        ]
    },
    ServiceDate: {
        iso: '2020-03-13'
    },
    Confidentiality: 'Normal',
    Version: 1,
    Summary: 'webui with diagnostics',
    ID: '6904e55a-c491-4399-a58b-f2d0f340a87c',
    SetID: 'bbc20e42-df9d-4d61-b936-37e9f428bf0a',
    ClinicalTrials: {
        Reviews: [
            {
                DateCommenced: {
                    iso: '2020-03-10'
                },
                TrialName: 'Trail 1',
                DateCeased: {
                    iso: '2020-03-13'
                }
            }
        ]
    },
    HCCScreening: {
        HCCTreatment: 'Chemo-Sorafenib',
        Imaging: [
            {
                ImagingScreening: 'Abdominal ultrasound',
                ImagingDate: {
                    iso: '2020-03-17'
                }
            },
            {
                ImagingScreening: 'Abdominal ultrasound',
                ImagingDate: {
                    iso: '2020-03-18'
                }
            },
            {
                ImagingScreening: 'CT'
            },
            {
                ImagingScreening: 'MRI',
                ImagingDate: {
                    iso: '2020-03-12'
                }
            }
        ],
        AFPDate: {
            iso: '2020-03-11'
        },
        AFP: 1,
        DiagnosedHCC: true
    },
    Notes: {
        QOLScore: 1,
        QOLDate: {
            iso: '2019-09-01'
        },
        Notes: 'd',
        QOL: true
    },
    Location: {
        id: 3,
        name: 'Darlinghursts'
    }
};

function calculateChildPughClass(parameters: ChildPughClassParameters): Promise<string>
{
    // calculation done on server side, return value that user can manipulate to confirm auto calculation is working
    return new Promise(
        resolve => resolve(`working => ascites:${parameters.ascites}, encephalopathy:${parameters.encephalopathy}`));
}

function calculateMELD(parameters: MELDParameters): Promise<number>
{
    // calculation done on server side, return 1010 to allow user to see that the calculation is working.
    return new Promise(resolve => resolve(1010));
}

storiesOf('Form/Service/Custom Service', module)
    .add('Immunology Advanced Liver Disease Assessment', () =>
    {
        const entities: EntityDetails[] = [
            serviceTypeEntityDetails(ServiceTypeEnum.Immunisation),
            serviceTypeEntityDetails(ServiceTypeEnum.Pathology),
            ...memberEntityDetails(MEMBER_WILLIAM_WENG)
        ];
        return (
            <SetStore set={(appStore) =>
            {
                appStore.handlers.calculateHandler.calculateChildPughClass = calculateChildPughClass;
                appStore.handlers.calculateHandler.calculateMELD = calculateMELD;
            }}>
                <SetEntities entities={entities}>
                    <FullScreen>
                        <ImmunologyAdvancedLiverDiseaseAssessmentService onSave={() => true}
                            formDescription={AdvanceLiverDiseaseAssessment as FormDescription}
                            data={data} />
                    </FullScreen>
                </SetEntities>
            </SetStore>
        );
    });
