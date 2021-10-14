import PathologySummaryPanelModel from 'main/summary/pathology/PathologySummaryPanelModel';
import PathologySummaryTable from 'main/summary/pathology/PathologySummaryTable';
import React from 'react';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';

/**
 * Display a summary table of pathology results in a Rowspan table form, this is different to the JavaUI
 * implementation.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3188
 *
 * @author Thompson 24/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface PathologySummaryProps
{
    data: PathologySummaryData;
}

class PathologySummaryPanel extends React.Component<PathologySummaryProps>
{
    public render()
    {
        const model = new PathologySummaryPanelModel(this.props.data);
        return <PathologySummaryTable model={model} />;
    }
}

export default PathologySummaryPanel;
