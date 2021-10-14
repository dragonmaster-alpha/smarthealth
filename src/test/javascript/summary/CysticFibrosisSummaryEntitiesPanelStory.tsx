import {storiesOf} from '@storybook/react';
import CysticFibrosisSummaryEntitiesPanel from 'main/summary/CysticFibrosisSummaryEntitiesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';
import CysticFibrosisSummaryForm from 'smarthealth-rest-test/formdesc/summary/Form.Summary.CysticFibrosisSummary.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import FullScreen from 'test/container/FullScreen';
import {MEMBER_WILLIAM_WENG, memberEntityDetails} from 'test/data/MedicalGroupMemberAggregateMother';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';

/**
 * Allow debugging of CysticFibrosisSummaryEntitiesPanel.tsx
 *
 * @author Thompson 17/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const cysticFibrosisSummaryValue = {
    MO: {
        groupID: 26,
        userID: 18
    },
    TreatmentHistory: {
        HomeIVDates: [
            {
                StartDate: {
                    iso: '2019-09-01'
                },
                StartServiceID: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2020-01-08T12:02+11'
                    },
                    serviceID: 11474,
                    serviceType: ServiceTypeEnum.CFTreatmentStatus,
                    summary: ''
                }
            }
        ],
        OutpatientDays: '6',
        HomeIVTherapyDays: '142',
        OnHomeIVTherapy: true,
        LastOutpatientDate: {
            iso: '2020-01-13'
        },
        Admitted: false,
        AdmittedDays: '0'
    },
    Anthropometry: {
        LowerHealthyWeight: 1,
        HealthyWeightService: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2019-09-16T16:21+10'
            },
            serviceID: 212,
            serviceType: 37,
            summary: 'WEBUI - CF Examination'
        },
        UpperHealthyWeight: 2
    },
    Infections: {
        CFExamination: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2019-09-16T16:21+10'
            },
            serviceID: 212,
            serviceType: 183,
            summary: 'WEBUI - CF Examination'
        },
        PseudomonasEradication: true,
        InfectionCategory: '2'
    },
    CO: {
        groupID: 26,
        userID: 18
    },
    Weight: 37.7,
    Conditions: {
        CurrentConditions: [
            {
                Condition: 'Chronic kidney disease stage 1',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-13'
                },
                ConceptID: 431855005
            },
            {
                Condition: 'Chronic renal impairment',
                MostRecent: {
                    iso: '2020-01-09'
                },
                FirstOccurrence: {
                    iso: '2019-09-13'
                },
                ConceptID: 236425005
            },
            {
                Condition: 'Hypertension',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 38341003
            },
            {
                Condition: 'Pancreatic insufficiency',
                Status: 'Improved',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 37992001
            },
            {
                Condition: 'Ischaemic heart disease',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 414545008
            },
            {
                Condition: 'Peripheral vascular disease',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 400047006
            },
            {
                Condition: 'Allergic bronchopulmonary aspergillosis',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 37981002
            },
            {
                Condition: 'Liver disease',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2020-01-14'
                },
                Notes: 'Advanced',
                ConceptID: 235856003
            },
            {
                Condition: 'Cerebrovascular disease',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 62914000
            },
            {
                Condition: 'Autonomic neuropathy',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 277879009
            },
            {
                Condition: 'Peripheral neuropathy',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 302226006
            },
            {
                Condition: 'Sinusitis',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 36971009
            },
            {
                Condition: 'Retinopathy',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 399625000
            },
            {
                Condition: 'Diabetes mellitus',
                MostRecent: {
                    iso: '2020-01-14'
                },
                FirstOccurrence: {
                    iso: '2019-09-16'
                },
                ConceptID: 73211009
            }
        ]
    },
    Transplant: {
        TransplantType: 'Heart/lung',
        TransplantStatus: 'Assessed',
        TransplantAssessmentService: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2019-09-16'
            },
            serviceID: 213,
            serviceType: 37,
            summary: 'Transplant type: Heart/lung, Acceptance status: Accepted but on deferred list'
        },
        TransplantCentre: 'Greenlane Auckland',
        DateTransplanted: {
            iso: '2019-09-01'
        }
    },
    CFDiagnosis: {
        ChlorideLevel: 100,
        SweatElectrolytesPathology: {
            owningGroupID: 26,
            serviceDate: {
                iso: '2020-01-08'
            },
            serviceID: 11478,
            serviceType: 3,
            summary: 'Sweat Test'
        },
        PancreaticInsufficiency: true,
        CFDiagnosis: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2020-01-08'
            },
            serviceID: 11477,
            serviceType: 182,
            summary: 'Updated Genotype'
        },
        SodiumLevel: 140,
        ModeOfPresentation: 'CF Siblings',
        Genotype1: {
            codeSet: 'http://ns.smarthealth.com.au/valueset/Cysticfibrosis.Genotype',
            value: '1G>A'
        },
        Genotype2: {
            codeSet: 'http://ns.smarthealth.com.au/valueset/Cysticfibrosis.Genotype',
            value: '621+1G>T'
        }
    },
    LungFunction: {
        BestFVC: 53,
        BestFEV1Service: {
            owningGroupID: 22,
            serviceDate: {
                iso: '2020-01-10T10:02+11'
            },
            serviceID: 11525,
            serviceType: 37,
            summary: 'Post BD FEV1: 0.96, FVC: 1.62'
        },
        LatestFVCService: {
            owningGroupID: 22,
            serviceDate: {
                iso: '2020-01-10T10:02+11'
            },
            serviceID: 11525,
            serviceType: 37,
            summary: 'Post BD FEV1: 0.96, FVC: 1.62'
        },
        LatestFVC: 53,
        LatestFEV1Service: {
            owningGroupID: 22,
            serviceDate: {
                iso: '2020-01-10T10:02+11'
            },
            serviceID: 11525,
            serviceType: 37,
            summary: 'Post BD FEV1: 0.96, FVC: 1.62'
        },
        LatestFEV1: 35,
        BestFEV1: 35,
        BestFVCService: {
            owningGroupID: 22,
            serviceDate: {
                iso: '2020-01-10T10:02+11'
            },
            serviceID: 11525,
            serviceType: 37,
            summary: 'Post BD FEV1: 0.96, FVC: 1.62'
        }
    },
    CFTreatmentStatusService: {
        owningGroupID: 26,
        program: 'CYSTIC_FIBROSIS',
        serviceDate: {
            iso: '2020-01-08T12:02+11'
        },
        serviceID: 11474,
        serviceType: 185,
        summary: ''
    },
    TreatmentStatus: {
        TreatmentStatus: [
            {
                TreatmentOrTest: 'Allergies',
                Date: {
                    iso: '2019-11-26'
                }
            },
            {
                Details: 'Updated: Pancreatic insufficiency',
                TreatmentOrTest: 'Conditions',
                Date: {
                    iso: '2020-01-08'
                }
            },
            {
                Details: 'WEBUI Dietitian Note CysticFibrosis1',
                TreatmentOrTest: 'Dietitian',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T15:19+10'
                    },
                    serviceID: 122,
                    serviceType: 41,
                    summary: 'WEBUI Dietitian Note CysticFibrosis1'
                },
                Date: {
                    iso: '2019-09-13T15:19+10'
                }
            },
            {
                Details: 'CF Gastroenterologist Note',
                TreatmentOrTest: 'Gastroenterologist',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-16T09:31+10'
                    },
                    serviceID: 153,
                    serviceType: 79,
                    summary: 'CF Gastroenterologist Note'
                },
                Date: {
                    iso: '2019-09-16T09:31+10'
                }
            },
            {
                Details: '1G>A,621+1G>T',
                TreatmentOrTest: 'Genotype',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2020-01-08'
                    },
                    serviceID: 11477,
                    serviceType: 182,
                    summary: 'Updated Genotype'
                },
                Date: {
                    iso: '2020-01-08'
                }
            },
            {
                TreatmentOrTest: 'Imaging'
            },
            {
                Details: 'Added',
                TreatmentOrTest: 'Immunisation',
                Service: {
                    confidentiality: 'Normal',
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2019-09-17T12:00+10'
                    },
                    serviceID: 249,
                    serviceType: 100,
                    summary: 'Anthrax vaccine injection solution 0.5mL ampoule'
                },
                Date: {
                    iso: '2019-09-17T12:00+10'
                }
            },
            {
                TreatmentOrTest: 'Lung function',
                Service: {
                    owningGroupID: 22,
                    serviceDate: {
                        iso: '2020-01-10T10:02+11'
                    },
                    serviceID: 11525,
                    serviceType: 72,
                    summary: 'Post BD FEV1: 0.96, FVC: 1.62'
                },
                Date: {
                    iso: '2020-01-10T10:02+11'
                }
            },
            {
                TreatmentOrTest: 'Medications'
            },
            {
                Details: 'WebUI CysticFibrosis.OccupationalTherapistNotes',
                TreatmentOrTest: 'Occupational therapist',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T16:05+10'
                    },
                    serviceID: 134,
                    serviceType: 46,
                    summary: 'WebUI CysticFibrosis.OccupationalTherapistNotes'
                },
                Date: {
                    iso: '2019-09-13T16:05+10'
                }
            },
            {
                Details: 'a',
                TreatmentOrTest: 'Physiotherapist',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T15:40+10'
                    },
                    serviceID: 126,
                    serviceType: ServiceTypeEnum.CFPhysiotherapistNotes,
                    summary: 'a'
                },
                Date: {
                    iso: '2019-09-13T15:40+10'
                }
            },
            {
                Details: 'CysticFibrosis.PsychologistNotes',
                TreatmentOrTest: 'Psychologist',
                Service: {
                    confidentiality: 'Normal',
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T16:02+10'
                    },
                    serviceID: 132,
                    serviceType: 45,
                    summary: 'CysticFibrosis.PsychologistNotes'
                },
                Date: {
                    iso: '2019-09-13T16:02+10'
                }
            },
            {
                Details: 'WebUI CF Social Worker Notes',
                TreatmentOrTest: 'Social worker',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T15:36+10'
                    },
                    serviceID: 124,
                    serviceType: 42,
                    summary: 'WebUI CF Social Worker Notes'
                },
                Date: {
                    iso: '2019-09-13T15:36+10'
                }
            },
            {
                Details: 'Colour: Clear, Achieved by Oropharyngeal suction, Sent to pathology',
                TreatmentOrTest: 'Sputum',
                Service: {
                    owningGroupID: 26,
                    program: 'CYSTIC_FIBROSIS',
                    serviceDate: {
                        iso: '2019-09-13T15:40+10'
                    },
                    serviceID: 126,
                    serviceType: ServiceTypeEnum.CFPhysiotherapistNotes,
                    summary: 'a'
                },
                Date: {
                    iso: '2019-09-13T15:40+10'
                }
            },
            {
                Details: 'Sodium: 140.0, Chloride: 100.0',
                TreatmentOrTest: 'Sweat test',
                Service: {
                    owningGroupID: 26,
                    serviceDate: {
                        iso: '2020-01-08'
                    },
                    serviceID: 11478,
                    serviceType: 3,
                    summary: 'Sweat Test'
                },
                Date: {
                    iso: '2020-01-08'
                }
            },
            {
                TreatmentOrTest: 'Thyrotropin (TSH)'
            }
        ]
    },
    Height: 160,
    Alerts: {
        RespiratoryPhysicianNotesService: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2020-01-13T15:17+11'
            },
            serviceID: 11524,
            serviceType: 37,
            summary: 'ss'
        },
        DrugAlerts: [
            'THC',
            'E'
        ],
        Sputum: 'Colour: White, Achieved by Oropharyngeal suction, Sent to pathology',
        PhysiotherapistNotesService: {
            owningGroupID: 26,
            program: 'CYSTIC_FIBROSIS',
            serviceDate: {
                iso: '2019-09-13T15:40+10'
            },
            serviceID: 126,
            serviceType: ServiceTypeEnum.CFPhysiotherapistNotes,
            summary: 'a'
        },
        OrganismAlerts: [
            {
                codeSet: 'http://ns.smarthealth.com.au/valueset/Cysticfibrosis.Organism',
                value: 'Burkholderia'
            },
            {
                codeSet: 'http://ns.smarthealth.com.au/valueset/Cysticfibrosis.Organism',
                value: 'Candida'
            },
            {
                codeSet: 'http://ns.smarthealth.com.au/valueset/Cysticfibrosis.Organism',
                value: 'Escherichia coli'
            }
        ]
    },
    BMI: 14.7
};

storiesOf('Form/Summary', module)
    .add('CysticFibrosis',
        () =>
        {
            const entities: EntityDetails[] = [
                {
                    type: EntityType.Summary,
                    id: 'CysticFibrosis',
                    value: cysticFibrosisSummaryValue
                },
                {
                    type: EntityType.FormDescription,
                    id: summaryTypeFormDescID[SummaryType.CysticFibrosis],
                    value: CysticFibrosisSummaryForm
                },
                ...memberEntityDetails(MEMBER_WILLIAM_WENG),
                serviceTypeEntityDetails(ServiceTypeEnum.CFTreatmentStatus),
                serviceTypeEntityDetails(ServiceTypeEnum.CFPhysiotherapistNotes),
                serviceTypeEntityDetails(ServiceTypeEnum.CFRespiratoryPhysicianNotes)
            ];
            return (
                <FullScreen>
                    <SetEntities entities={entities}>
                        <CysticFibrosisSummaryEntitiesPanel />
                    </SetEntities>
                </FullScreen>
            );
        });
