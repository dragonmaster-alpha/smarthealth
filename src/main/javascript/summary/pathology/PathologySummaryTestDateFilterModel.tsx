import DateUtility from 'main/utility/DateUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import PathologyTestSummary from 'smarthealth-javascript/PathologyTestSummary';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Filter test from PathologySummaryData that is within the last 12 unique test dates.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3188
 *
 * @author Thompson 12/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class PathologySummaryTestDateFilterModel
{
    public static determine12LatestDates(summaryData: PathologySummaryData): EventDateTime[]
    {
        if (!summaryData)
        {
            return [];
        }

        const dates: Map<string, EventDateTime> = new Map();
        summaryData.tests.forEach(test =>
        {
            test.testResults.forEach(testResult =>
            {
                const eventDateTimePrecisionDay = DateUtility.reducePrecision(testResult.testDate,
                    Precision.Day);
                if (!dates.has(eventDateTimePrecisionDay.iso))
                {
                    dates.set(eventDateTimePrecisionDay.iso, eventDateTimePrecisionDay);
                }
            });
        });

        const datesSortedAscending = [...dates.entries()].sort();
        const datesSortedDescending = datesSortedAscending.reverse();
        const latest12Dates = datesSortedDescending.slice(0, 12)
            .map(date => date[1]);

        return latest12Dates;
    }

    private readonly summaryData: PathologySummaryData;

    constructor(summaryData: PathologySummaryData)
    {
        this.summaryData = summaryData;
    }

    public get pathologySummaryDataWithinLatest12Dates(): PathologySummaryData
    {
        if (!this.summaryData)
        {
            return { tests: [] };
        }

        const latest12Dates = PathologySummaryTestDateFilterModel.determine12LatestDates(this.summaryData);
        const tests = this.summaryData.tests.map<PathologyTestSummary>(test =>
        {
            const testResultsWithinLatest12Dates = test.testResults.filter(testResult =>
                latest12Dates.some(latest12Date => DateUtility.isSameDay(testResult.testDate, latest12Date)));
            return {
                ...test,
                testResults: testResultsWithinLatest12Dates
            };
        });

        return {
            tests
        };
    }
}

export default PathologySummaryTestDateFilterModel;
