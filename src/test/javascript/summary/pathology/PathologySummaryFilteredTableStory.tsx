import {storiesOf} from '@storybook/react';
import PathologySummaryFilteredTable from 'main/summary/pathology/PathologySummaryFilteredTable';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import FilteredPathologyType from 'smarthealth-javascript/FilteredPathologyType';
import renalSummaryForm from 'smarthealth-rest-test/summary/RenalSummary.json';
import renalTransplantSummaryForm from 'smarthealth-rest-test/summary/RenalTransplantSummary.json';
import SetEntity from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import pathologyRenalResponse from 'test/summary/pathology/PathologyHistoryAndSummaryStory.PathologyRenalResponse.json';
import pathologyRenalTransplantResponse
    from 'test/summary/pathology/PathologyHistoryAndSummaryStory.PathologyRenalTransplantResponse.json';

async function getPathologyFilteredBy(filteredType: FilteredPathologyType): Promise<FilteredPathologySummaryData>
{
    if (filteredType === FilteredPathologyType.Renal)
    {
        return pathologyRenalResponse as FilteredPathologySummaryData;
    }
    else if (filteredType === FilteredPathologyType.RenalTransplant)
    {
        return pathologyRenalTransplantResponse as FilteredPathologySummaryData;
    }
    else
    {
        throw new ShouldNeverGetHereError();
    }
}

storiesOf('Summary', module)
    .add('Renal Pathology',
        () =>
        {
            return (
                <SetStore set={(appStore) =>
                {
                    appStore.handlers.pathologyHandler.getPathologyFilteredBy = getPathologyFilteredBy;
                }}>
                    <SetEntity type={EntityType.ServiceType} id={3} value={renalSummaryForm}>
                        <PathologySummaryFilteredTable filterType={FilteredPathologyType.Renal} />
                    </SetEntity>
                </SetStore>
            );
        })
    .add('Renal Transplant Pathology',
        () =>
        {
            return (
                <SetStore set={(appStore) =>
                {
                    appStore.handlers.pathologyHandler.getPathologyFilteredBy = getPathologyFilteredBy;
                }}>
                    <SetEntity type={EntityType.ServiceType} id={3} value={renalTransplantSummaryForm}>
                        <PathologySummaryFilteredTable filterType={FilteredPathologyType.RenalTransplant} />
                    </SetEntity>
                </SetStore>);
        });
