import Entities, {EntityReferences} from 'main/component/Entities';
import PatientWatchSummaryPanel from 'main/summary/PatientWatchSummaryPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';

/**
 * Load data into PatientWatchSummaryPanel.tsx
 *
 * @author Thompson 21/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

class PatientWatchSummaryEntityPanel extends React.Component
{
    public render()
    {
        const entities: EntityReferences = {
            summary: {
                id: SummaryType.PatientWatch,
                type: EntityType.Summary
            },
            formDescription: {
                id: summaryTypeFormDescID[SummaryType.PatientWatch],
                type: EntityType.FormDescription
            }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <PatientWatchSummaryPanel data={data.summary} formDescription={data.formDescription} />
            )} />
        );
    }
}

export default PatientWatchSummaryEntityPanel;
