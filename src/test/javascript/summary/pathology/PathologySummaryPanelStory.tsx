import {storiesOf} from '@storybook/react';
import PathologySummaryPanel from 'main/summary/pathology/PathologySummaryPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';
import SetEntity from 'test/component/SetEntity';
import {loadServiceType} from 'test/data/ServiceTypeMother';
import pathologySummaryData from './PathologySummaryPanelStory.PathologySummaryData.json';

/**
 * Allow debugging of PathologySummaryPanel.tsx
 *
 * @author Thompson 24/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Summary/Pathology', module)
    .add('No test',
        () =>
        {
            return (
                <PathologySummaryPanel data={null} />
            );
        })
    .add('1 test',
        () =>
        {
            const oneTestPathologySummary: PathologySummaryData = {
                tests: [
                    {
                        code: 'C071',
                        name: 'Ca corr for Alb',
                        testResults: [
                            {
                                code: 'C071',
                                name: 'Ca corr for Alb',
                                results: [
                                    {
                                        abnormalFlags: 'L',
                                        code: '2000-8',
                                        codeSystem: 'LOINC',
                                        name: 'Calcium',
                                        range: '2.10-2.60',
                                        units: 'mmol/L',
                                        value: '1.91'
                                    },
                                    {
                                        code: '29265-6',
                                        codeSystem: 'LOINC',
                                        name: 'Calcium (corr. Alb)',
                                        range: '2.10-2.60',
                                        units: 'mmol/L',
                                        value: '2.16'
                                    }
                                ],
                                service: {
                                    owningGroupID: 29,
                                    serviceDate: {
                                        iso: '2020-01-20T08:26+11'
                                    },
                                    serviceID: 11620,
                                    serviceType: 3,
                                    summary: 'Ca corr for Alb'
                                },
                                testDate: {
                                    iso: '2020-01-20'
                                }
                            }
                        ]
                    }
                ]
            };

            return (
                <SetEntity type={EntityType.ServiceType} id={ServiceTypeEnum.Pathology}
                    value={loadServiceType(ServiceTypeEnum.Pathology)}>
                    <PathologySummaryPanel data={oneTestPathologySummary} />
                </SetEntity>
            );
        })
    .add('Multiple test',
        () =>
        {
            return (
                <SetEntity type={EntityType.ServiceType} id={ServiceTypeEnum.Pathology}
                    value={loadServiceType(ServiceTypeEnum.Pathology)}>
                    <PathologySummaryPanel data={pathologySummaryData as PathologySummaryData} />
                </SetEntity>
            );
        });
