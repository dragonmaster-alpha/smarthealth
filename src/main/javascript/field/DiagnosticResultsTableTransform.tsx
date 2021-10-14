import TableData, {TableRow} from 'main/data/TableData';
import DiagnosticResultsTable from 'main/field/DiagnosticResultsTable';
import StoreProps from 'main/store/StoreProps';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Render the DiagnosticResultsTable component. This component transform the data from the server which is in the
 * TableTreeData format. Into an acceptable data format for react-table table data. Making the data easier to work with
 * in DiagnosticResultsTable component.
 *
 * @author Thompson 16/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface DiagnosticResultsTableTransformProps extends StoreProps
{
    data: TableData;
}

@inject('appStore')
class DiagnosticResultsTableTransform extends React.Component<DiagnosticResultsTableTransformProps>
{
    private rowSpans: number[] = [];

    public render(): React.ReactNode
    {
        return <DiagnosticResultsTable appStore={this.props.appStore} data={this.transform(this.props.data)}
            rowSpans={this.rowSpans} />;
    }

    private transform(data: TableData): TableData
    {
        const reactTableValue = [];
        let testRow: TableRow = null;
        let testID = -1;
        data && data.forEach((treeNode, treeNodeIndex) =>
        {
            if (treeNode['depth'] === 1)
            {
                testRow = treeNode;
                testID += 1;
                this.rowSpans[testID] = 0;
            }
            else if (treeNode['depth'] === 2)
            {
                if (testRow === null)
                {
                    throw new ShouldNeverGetHereError();
                }

                reactTableValue.push({ testID, test: testRow['Name'], date: testRow['Date'], ...treeNode });
                this.rowSpans[testID] += 1;
            }
            else
            {
                throw new ShouldNeverGetHereError();
            }
        });
        return reactTableValue;
    }
}

export default DiagnosticResultsTableTransform;
