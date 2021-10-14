import TableData from 'main/data/TableData';

/**
 * Utility for Table fields
 *
 * @author Thompson 6/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class TableUtility
{
    public static fillToMinimumRows(tableData: TableData, minimumRows: number): TableData
    {
        if (tableData.length >= minimumRows)
        {
            return tableData;
        }

        const rowsToFill = minimumRows - tableData.length;
        const tableRowFiller = Array(rowsToFill)
            .fill({});
        return [...tableData, ...tableRowFiller];
    }
}

export default TableUtility;
