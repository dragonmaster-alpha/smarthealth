import Entities, {EntityReferences} from 'main/component/Entities';
import SummaryPanel from 'main/summary/SummaryPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';

/**
 * load data to display SummaryPanel.tsx
 *
 * @author Thompson 13/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SummaryEntitiesPanelProps
{
    summaryType: SummaryType;
}

class SummaryEntitiesPanel extends React.Component<SummaryEntitiesPanelProps>
{
    public render()
    {
        const entities: EntityReferences = {
            summary: {
                id: this.props.summaryType,
                type: EntityType.Summary
            },
            formDescription: {
                id: summaryTypeFormDescID[this.props.summaryType],
                type: EntityType.FormDescription
            }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <SummaryPanel formDescription={data.formDescription} data={data.summary} />
            )} />
        );
    }
}

export default SummaryEntitiesPanel;
