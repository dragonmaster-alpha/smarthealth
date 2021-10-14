import PathologySummaryTestDateFilterModel from 'main/summary/pathology/PathologySummaryTestDateFilterModel';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import summaryData from 'test/summary/pathology/PathologySummaryTestDateFilterModel.PathologySummaryData.json';
import summaryDataFilteredWithin12Dates
    from 'test/summary/pathology/PathologysummaryTestDateFilterModelJest.FilteredWith12TestDates.json';

/**
 * Jest for PathologySummaryTestDateFilterModel.tsx
 *
 * @author Thompson 12/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('extract the latest 12 test result dates', () =>
{
    expect(PathologySummaryTestDateFilterModel.determine12LatestDates(null))
        .toEqual([]);
    expect(PathologySummaryTestDateFilterModel.determine12LatestDates(summaryData as PathologySummaryData))
        .toEqual([
            { iso: '2020-05-25' },
            { iso: '2020-04-25' },
            { iso: '2020-01-25' },
            { iso: '2019-09-25' },
            { iso: '2019-07-25' },
            { iso: '2019-05-25' },
            { iso: '2018-01-25' },
            { iso: '2017-08-25' },
            { iso: '2016-06-25' },
            { iso: '2015-11-25' },
            { iso: '2015-10-25' },
            { iso: '2014-02-25' }
        ]);
});

test('filter tests that are within the last 12 unique test result dates', () =>
{
    expect(new PathologySummaryTestDateFilterModel(null).pathologySummaryDataWithinLatest12Dates)
        .toEqual({ tests: [] });
    expect(new PathologySummaryTestDateFilterModel(
        summaryData as PathologySummaryData).pathologySummaryDataWithinLatest12Dates)
        .toEqual(summaryDataFilteredWithin12Dates);
});
