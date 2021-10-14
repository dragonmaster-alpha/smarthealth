import {storiesOf} from '@storybook/react';
import LungFunctionSummaryMainPanel from 'main/summary/lungFunction/LungFunctionSummaryMainPanel';
import React from 'react';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import EntityType from 'smarthealth-javascript/EntityType';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import {serviceTypeEntityDetails} from 'test/data/ServiceTypeMother';
import {getAllServiceTypes, getServices} from 'test/service/ServiceRecordListStory';
import lungFunctionObservations
    from 'test/summary/LungFunctionSummaryMainPanelStory.ObservationsLungFunctionResponse.json';

/**
 * Allow debugging of LungFunctionSummaryMainPanel.tsx
 *
 * @author Thompson 8/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function getObservations(observationGroup: ObservationGroup): Promise<Observation[]>
{
    return new Promise<Observation[]>(resolve => resolve(lungFunctionObservations as Observation[]));
}

function today(): EventDateTime
{
    return { iso: '2020-12-15' };
}

storiesOf('History', module)
    .add('Lung Function',
        () =>
        {
            const entities: EntityDetails[] = [
                { type: EntityType.MedicalGroup, id: 26, value: ST_VINCENTS_HOSPITAL },
                serviceTypeEntityDetails(72)
            ];
            return (
                <div id="l-content" style={{ marginLeft: '0px' }}>
                    <SetStore set={appStore =>
                    {
                        appStore.sessionStore.permissions = {
                            admin: [],
                            clinical: [ClinicalPermission.ViewLungFunctionSummary],
                            serviceTypes: []
                        };

                        appStore.sessionStore.serviceRecordListStore.clear();
                        appStore.sessionStore.currentPatientID = 35;
                        appStore.handlers.patientHandler.getServices = getServices;
                        appStore.handlers.serviceTypeHandler.getAllServiceTypes = getAllServiceTypes;

                        appStore.handlers.observationsHandler.getObservations = getObservations;

                        appStore.dateTime.today = today;
                    }}>
                        <SetEntities entities={entities}>
                            <LungFunctionSummaryMainPanel />
                        </SetEntities>
                    </SetStore>
                    <h3>Description</h3>
                    <ul>
                        <li>This story has a current date of 2020-12-15.</li>
                    </ul>
                </div>
            );
        }
    );
