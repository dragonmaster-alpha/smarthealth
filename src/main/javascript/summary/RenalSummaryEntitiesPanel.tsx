import Entities, {EntityReferences} from 'main/component/Entities';
import StoreProps from 'main/store/StoreProps';
import RenalSummaryPanel from 'main/summary/RenalSummaryPanel';

import {inject} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import SummaryType, {summaryTypeFormDescID} from 'smarthealth-javascript/SummaryType';

/**
 * load data to display RenalSummaryPanel.tsx
 *
 * @author Thompson 16/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('appStore')
class RenalSummaryEntitiesPanel extends React.Component<StoreProps>
{
    public render()
    {
        const entities: EntityReferences = {
            summary: {
                id: SummaryType.Renal,
                type: EntityType.Summary
            },
            formDescription: {
                id: summaryTypeFormDescID[SummaryType.Renal],
                type: EntityType.FormDescription
            }
        };
        return (
            <Entities entities={entities} render={(data) => (
                <RenalSummaryPanel data={data.summary} formDescription={data.formDescription} />
            )} />
        );
    }
}

export default RenalSummaryEntitiesPanel;
