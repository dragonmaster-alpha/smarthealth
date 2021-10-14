import PathologySummaryTestDateFilterModel from 'main/summary/pathology/PathologySummaryTestDateFilterModel';
import DateUtility from 'main/utility/DateUtility';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';

/**
 * Transform a PathologySummaryData into a PathologySummaryValue matrix which contains the date and result mapping for
 * a value to be used in PathologySummaryPanel.tsx.
 *
 * @author Thompson 3/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface PathologySummaryTest
{
    code: string;
    name: string;
}

interface PathologySummaryResult
{
    code: string;
    codeSystem?: string;
    name: string;
}

export interface PathologySummaryValue
{
    abnormalFlags?: string;
    range?: string;
    service: ServiceRecordReference;
    testDate: EventDateTime;
    units?: string;
    value: string;
}

class PathologySummaryPanelModel
{
    // [date]
    public readonly dates: EventDateTime[];

    // [test][results]
    public readonly results: PathologySummaryResult[][];

    // [test]
    public readonly tests: PathologySummaryTest[];

    // [test][results][date]
    public readonly values: PathologySummaryValue[][][];

    constructor(summaryData: PathologySummaryData)
    {
        const testDateFilter = new PathologySummaryTestDateFilterModel(summaryData);
        this.tests = this.buildTests(testDateFilter.pathologySummaryDataWithinLatest12Dates);
        this.results = this.buildResults(testDateFilter.pathologySummaryDataWithinLatest12Dates);
        this.dates = this.buildDates(testDateFilter.pathologySummaryDataWithinLatest12Dates);
        this.values = this.buildValues(testDateFilter.pathologySummaryDataWithinLatest12Dates);
    }

    private buildDates(summaryData: PathologySummaryData)
    {
        if (!summaryData)
        {
            return [];
        }

        const dates = [];
        summaryData.tests.forEach((test) =>
        {
            test.testResults.forEach(testResult =>
            {
                const dateFound = dates.find(date => DateUtility.isSameDay(date, testResult.testDate));
                if (!dateFound)
                {
                    dates.push(testResult.testDate);
                }
            });
        });
        dates.sort(DateUtility.compareDescending);

        return dates;
    }

    private buildResults(summaryData: PathologySummaryData): PathologySummaryResult[][]
    {
        if (!summaryData)
        {
            return [];
        }

        const resultSummaries: PathologySummaryResult[][] = [];
        summaryData.tests.forEach(test =>
        {
            const testResultSummaries: PathologySummaryResult[] = [];
            test.testResults.forEach(testResult =>
            {
                testResult.results.forEach(result =>
                {
                    const testResultSummary = testResultSummaries.find(
                        // TODO Larry emailed, check the 'code' property is all we need to check they are the same
                        testResultSummary => (testResultSummary.code === result.code));
                    if (!testResultSummary)
                    {
                        testResultSummaries.push({
                            code: result.code,
                            name: result.name,
                            // if no codeSystem set to null because undefined is not a valid JSON value
                            codeSystem: result.codeSystem ? result.codeSystem : null
                        });
                    }
                });
            });
            resultSummaries.push(testResultSummaries);
        });

        return resultSummaries;
    }

    private buildTests(summaryData: PathologySummaryData): PathologySummaryTest[]
    {
        if (!summaryData)
        {
            return [];
        }

        return summaryData.tests.map(test => ({
            code: test.code,
            name: test.name
        }));
    }

    private buildValues(summaryData: PathologySummaryData): PathologySummaryValue[][][]
    {
        if (!summaryData)
        {
            return [];
        }

        const pathologySummaryValues: PathologySummaryValue[][][] = [];
        summaryData.tests.forEach((test, testIndex) =>
        {
            // create a test array
            pathologySummaryValues[testIndex] = [];
            test.testResults.forEach(currentTestResult =>
            {
                currentTestResult.results.forEach((currentTestResultResult) =>
                {
                    // TODO Larry emailed, check the 'code' property is all we need to check they are the same
                    const resultIndex = this.results[testIndex].findIndex(
                        resultExtracted => (resultExtracted.code === currentTestResultResult.code));
                    if (!pathologySummaryValues[testIndex][resultIndex])
                    {
                        // initialise the result values
                        // result values are the result row cells corresponding to their respective date
                        pathologySummaryValues[testIndex][resultIndex] = Array(this.dates.length)
                            .fill(null);
                    }
                    const dateIndex = this.dates.findIndex(dateExtracted =>
                        DateUtility.isSameDay(dateExtracted, currentTestResult.testDate));

                    pathologySummaryValues[testIndex][resultIndex][dateIndex] = {
                        ...currentTestResultResult,
                        service: currentTestResult.service,
                        testDate: currentTestResult.testDate
                    };
                });
            });
        });
        return pathologySummaryValues;
    }
}

export default PathologySummaryPanelModel;
