import {storiesOf} from '@storybook/react';
import LungFunctionGraph from 'main/summary/lungFunction/LungFunctionGraph';
import {GraphPeriod} from 'main/summary/lungFunction/LungFunctionGraphSummaryDataModel';
import React from 'react';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType from 'smarthealth-javascript/ObservationType';
import observationsPatientLifeTime
    from 'test/summary/LungFunctionSummaryMainPanelStory.ObservationsSpanning50Years.json';

/**
 * Allow debugging of LungFunctionGraph.tsx
 *
 * @author Thompson 8/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Summary/Lung Function', module)
    .add('Graph with no observation data',
        () =>
        {
            return (
                <div style={{ height: '100vh' }}>
                    <LungFunctionGraph period={GraphPeriod.lifeTime} observations={[]} />
                    <h3>Description</h3>
                    <ul>
                        <li>
                            Test to make sure it doesn't fail render
                        </li>
                    </ul>
                </div>
            );
        }
    )
    .add('1 data point',
        () =>
        {
            return (
                <div style={{ height: '100vh' }}>
                    <LungFunctionGraph period={GraphPeriod.lifeTime} observations={[{
                        id: 823,
                        observationDate: {
                            iso: '1973-08-19T14:30+10'
                        },
                        observationType: ObservationType.PreBDFEV1,
                        patientID: 11,
                        serviceRecordReference: {
                            owningGroupID: 22,
                            serviceDate: {
                                iso: '1973-08-19T14:30+10'
                            },
                            serviceID: 11732,
                            serviceType: 72,
                            summary: 'Pre BD FEV1: 1.5, FVC: 1.8'
                        },
                        valueNumber: 1.500
                    }]} />
                    <h3>Description</h3>
                    <ul>
                        <li>
                            Test to make sure x-axis label renders once
                        </li>
                    </ul>
                </div>
            );
        }
    )
    .add('Graph Life Time',
        () =>
        {
            return (
                <div style={{ height: '100vh' }}>
                    <LungFunctionGraph period={GraphPeriod.lifeTime}
                        observations={observationsPatientLifeTime as Observation[]} />
                    <h3>Description</h3>
                    <ul>
                        <li>
                            Test to make sure the Patient line graph doesn't draw out of graph boundaries.
                        </li>
                        <li>
                            Test to make sure the X-axis Date for 01/01/1970 is not null.
                        </li>
                    </ul>
                </div>
            );
        }
    );
