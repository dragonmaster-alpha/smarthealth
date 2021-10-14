import AppStore from 'main/store/AppStore';
import PathologyFilteredPathologySummaryDataModel
    from 'main/summary/pathology/PathologyFilteredPathologySummaryDataModel';
import FilteredPathologySummaryData from 'smarthealth-javascript/FilteredPathologySummaryData';
import pathologyRenalDataTable
    from 'test/summary/pathology/PathologyFilteredPathologySummaryDataModelJest.PathologyRenalDataTableValues.json';
import renalFilteredPathologySummary
    from 'test/summary/pathology/PathologyHistoryAndSummaryStory.PathologyRenalResponse.json';

/**
 * Jest for PathologyFilteredPathologySummaryDataModel.tsx
 *
 * @author Thompson 14/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('extract correct date columns from FilteredPathologySummaryData', () =>
{
    expect(new PathologyFilteredPathologySummaryDataModel(new AppStore(), null).columns)
        .toEqual([
            { field: 'result', header: 'Result', key: 'Result' },
            { field: 'units', header: 'Units', key: 'Units' },
            { field: 'range', header: 'Range', key: 'Range' }
        ]);

    expect(new PathologyFilteredPathologySummaryDataModel(new AppStore(),
        renalFilteredPathologySummary as FilteredPathologySummaryData).columns)
        .toEqual([
            { field: 'result', header: 'Result', key: 'Result' },
            { field: '2020-05-02', header: '02/05/2020', key: '02/05/2020' },
            { field: '2020-02-13', header: '13/02/2020', key: '13/02/2020' },
            { field: '2020-01-20', header: '20/01/2020', key: '20/01/2020' },
            { field: '2008-02-25', header: '25/02/2008', key: '25/02/2008' },
            { field: 'units', header: 'Units', key: 'Units' },
            { field: 'range', header: 'Range', key: 'Range' }
        ]);
});

test('extract DataTable values from FilteredPathologySummaryData', () =>
{
    expect(new PathologyFilteredPathologySummaryDataModel(new AppStore(), null).values)
        .toEqual([]);
    expect(new PathologyFilteredPathologySummaryDataModel(new AppStore(),
        renalFilteredPathologySummary as FilteredPathologySummaryData).values)
        .toEqual(pathologyRenalDataTable);
});
