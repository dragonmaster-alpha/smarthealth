import Entity from 'main/component/Entity';
import PathologySummariesPanel from 'main/summary/pathology/PathologySummariesPanel';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';

/**
 * Load data to display PathologySummariesPanel.tsx
 *
 * @author Thompson 5/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PathologySummariesEntityPanel extends React.Component
{
    public render()
    {
        return (
            <Entity<PathologySummaryData> id={0} type={EntityType.Pathology}
                render={(data) => (<PathologySummariesPanel data={data} />)} />
        );
    }
}

export default PathologySummariesEntityPanel;
