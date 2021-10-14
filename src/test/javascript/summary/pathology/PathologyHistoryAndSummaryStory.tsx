import {storiesOf} from '@storybook/react';
import PathologyHistoryAndSummary from 'main/summary/pathology/PathologyHistoryAndSummary';
import React from 'react';
import ClinicalPermission from 'smarthealth-javascript/ClinicalPermission';
import EntityType from 'smarthealth-javascript/EntityType';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import FilteredPathologyType from 'smarthealth-javascript/FilteredPathologyType';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import {getAllServiceTypes, getServices} from 'test/service/ServiceRecordListStory';
import pathologyRenalResponse from 'test/summary/pathology/PathologyHistoryAndSummaryStory.PathologyRenalResponse.json';
import pathologyRenalTransplantResponse
    from 'test/summary/pathology/PathologyHistoryAndSummaryStory.PathologyRenalTransplantResponse.json';
import pathologySummaryData from 'test/summary/pathology/PathologySummaryPanelStory.PathologySummaryData.json';

/**
 * Allow debugging of PathologyHistoryAndSummary.tsx
 *
 * @author Thompson 13/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
async function getPathologyFilteredBy(filteredType: FilteredPathologyType): Promise<FilteredPathologySummaryData>
{
    if (filteredType === FilteredPathologyType.Renal)
    {
        return new Promise<FilteredPathologySummaryData>(
            resolve => resolve(pathologyRenalResponse as FilteredPathologySummaryData));
    }
    else if (filteredType === FilteredPathologyType.RenalTransplant)
    {
        return new Promise<FilteredPathologySummaryData>(
            resolve => resolve(pathologyRenalTransplantResponse as FilteredPathologySummaryData));
    }
}

storiesOf('History', module)
    .add('Pathology',
        () =>
        {
            const entities: EntityDetails[] = [
                { type: EntityType.MedicalGroup, id: 26, value: ST_VINCENTS_HOSPITAL },
                { type: EntityType.Pathology, id: 0, value: pathologySummaryData }
            ];
            return (
                <div id="l-content" style={{ marginLeft: '0px' }}>
                    <SetStore set={appStore =>
                    {
                        appStore.sessionStore.permissions = {
                            admin: [],
                            clinical: [
                                ClinicalPermission.ViewPathologySummary,
                                ClinicalPermission.ViewRenalPathologySummary,
                                ClinicalPermission.ViewRenalTransplantPathologySummary
                            ],
                            serviceTypes: []
                        };

                        appStore.sessionStore.serviceRecordListStore.clear();
                        appStore.sessionStore.currentPatientID = 35;
                        appStore.handlers.patientHandler.getServices = getServices;
                        appStore.handlers.serviceTypeHandler.getAllServiceTypes = getAllServiceTypes;

                        appStore.handlers.pathologyHandler.getPathologyFilteredBy = getPathologyFilteredBy;
                    }}>
                        <SetEntities entities={entities}>
                            <PathologyHistoryAndSummary />
                        </SetEntities>
                    </SetStore>
                </div>
            );
        });
