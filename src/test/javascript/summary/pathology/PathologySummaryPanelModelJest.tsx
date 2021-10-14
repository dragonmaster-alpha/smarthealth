import PathologySummaryPanelModel from 'main/summary/pathology/PathologySummaryPanelModel';
import PathologySummaryData from 'smarthealth-javascript/PathologySummaryData';
import results from 'test/summary/pathology/PathologySummaryPanelModelJest.Results.json';
import tests from 'test/summary/pathology/PathologySummaryPanelModelJest.Tests.json';
import values from 'test/summary/pathology/PathologySummaryPanelModelJest.Values.json';
import summaryDataJSON from 'test/summary/pathology/PathologySummaryPanelStory.PathologySummaryData.json';

/**
 * Demonstrate PathologySummaryPanelModel file being imported to a Jest file causes Error message:
 * "Test suite failed to run
 * Could not find file:
 * 'C:\A\dev\smarthealth\smarthealth-webui-war\src\test\javascript\summary\PathologySummaryPanelModelJest.tsx'."
 *
 * @author Thompson 3/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
test('transform PathologySummaryData into PathologySummaryPanelModel field values', () =>
{
    {
        const model = new PathologySummaryPanelModel(null);
        expect(model.tests)
            .toEqual([]);
        expect(model.results)
            .toEqual([]);
        expect(model.dates)
            .toEqual([]);
        expect(model.values)
            .toEqual([]);
    }
    {
        const model = new PathologySummaryPanelModel({ tests: [] } as PathologySummaryData);
        expect(model.tests)
            .toEqual([]);
        expect(model.results)
            .toEqual([]);
        expect(model.dates)
            .toEqual([]);
        expect(model.values)
            .toEqual([]);
    }
    {
        const model = new PathologySummaryPanelModel({
            tests: [{
                code: 'Sweat Test',
                name: 'Sweat Test',
                testResults: [
                    {
                        code: 'Sweat Test',
                        name: 'Sweat Test',
                        results: [
                            {
                                code: '2954-6',
                                codeSystem: 'LOINC',
                                name: 'Sodium result',
                                units: 'mmol/L',
                                value: '140.0'
                            }
                        ],
                        service: {
                            owningGroupID: 26,
                            serviceDate: {
                                iso: '2020-01-08'
                            },
                            serviceID: 11478,
                            serviceType: 3,
                            summary: 'Sweat Test'
                        },
                        testDate: {
                            iso: '2020-01-08'
                        }
                    }
                ]
            }]
        } as PathologySummaryData);
        expect(model.tests)
            .toEqual([{
                code: 'Sweat Test',
                name: 'Sweat Test'
            }]);
        expect(model.results)
            .toEqual([
                [{
                    code: '2954-6',
                    codeSystem: 'LOINC',
                    name: 'Sodium result'
                }]
            ]);
        expect(model.dates)
            .toEqual([{
                iso: '2020-01-08'
            }]);
        expect(model.values)
            .toEqual([
                [
                    [{
                        code: '2954-6',
                        codeSystem: 'LOINC',
                        name: 'Sodium result',
                        units: 'mmol/L',
                        value: '140.0',
                        service: {
                            owningGroupID: 26,
                            serviceDate: {
                                iso: '2020-01-08'
                            },
                            serviceID: 11478,
                            serviceType: 3,
                            summary: 'Sweat Test'
                        },
                        testDate: {
                            iso: '2020-01-08'
                        }
                    }]
                ]
            ]);
    }
    {
        const model = new PathologySummaryPanelModel(summaryDataJSON as PathologySummaryData);
        expect(model.tests)
            .toEqual(tests);
        expect(model.results)
            .toEqual(results);
        expect(model.dates)
            .toEqual([
                { iso: '2020-05-02' },
                { iso: '2020-02-13' },
                { iso: '2020-01-21' },
                { iso: '2020-01-20' },
                { iso: '2020-01-08' },
                { iso: '2008-02-25' }
            ]);
        expect(model.values)
            .toEqual(values);
    }
});
