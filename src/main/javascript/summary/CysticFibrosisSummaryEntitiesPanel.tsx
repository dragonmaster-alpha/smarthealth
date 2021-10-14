import Entities, {EntityReferences} from 'main/component/Entities';
import StoreProps from 'main/store/StoreProps';
import SummaryPanel from 'main/summary/SummaryPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';

/**
 * Load data to display Cystic Fibrosis Summary
 *
 * @author Thompson 10/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class CysticFibrosisSummaryEntitiesPanel extends React.Component<StoreProps>
{
    public render()
    {
        const entities: EntityReferences = {
            summary: { id: SummaryType.CysticFibrosis, type: EntityType.Summary },
            formDescription: { id: summaryTypeFormDescID[SummaryType.CysticFibrosis], type: EntityType.FormDescription }
        };
        return (
            <Entities entities={entities} render={({ summary, formDescription }) => (
                <SummaryPanel data={summary} formDescription={formDescription} />
            )} />
        );
    }
}

export default CysticFibrosisSummaryEntitiesPanel;
