// tslint:disable-next-line
import LungFunctionGraphSummaryDataModel, {GraphPeriod} from 'main/summary/lungFunction/LungFunctionGraphSummaryDataModel';
import moment from 'moment';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import lungFunctionObservations from 'test/summary/LungFunctionSummaryMainPanelStory.ObservationsSpanning50Years.json';

/**
 * Jest for LungFunctionGraphSummaryDataModel.tsx
 *
 * @author Thompson 27/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const TODAY: EventDateTime = { iso: '2020-06-02' };
test('determine the correct ChartPoints from Observations for a particular Graph period',
    () =>
    {
        expect(new LungFunctionGraphSummaryDataModel(
            lungFunctionObservations as Observation[], GraphPeriod.last12Months, TODAY).data)
            .toEqual([{
                PreBDFEV1: 0.86, PreBDFEV1Predicted: 22, PreBDFVC: 1.88, PreBDFVCPredicted: 40,
                date: { iso: '2019-08-16' }, unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, date: { iso: '2020-06-23' }, unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }]);
        expect(new LungFunctionGraphSummaryDataModel(
            lungFunctionObservations as Observation[], GraphPeriod.last2Years, TODAY).data)
            .toEqual([{
                PreBDFEV1: 0.8, PreBDFEV1Predicted: 24, PreBDFVC: 1.85, PreBDFVCPredicted: 38,
                date: { iso: '2018-08-16' }, unixEpochMilliSeconds: moment('2018-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.86, PreBDFEV1Predicted: 22, PreBDFVC: 1.88, PreBDFVCPredicted: 40,
                date: { iso: '2019-08-16' }, unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, date: { iso: '2020-06-23' }, unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }]);
        expect(new LungFunctionGraphSummaryDataModel(
            lungFunctionObservations as Observation[], GraphPeriod.last5Years, TODAY).data)
            .toEqual([{
                PreBDFEV1: 0.82, PreBDFEV1Predicted: 30, PreBDFVC: 1.86, PreBDFVCPredicted: 45,
                date: { iso: '2016-02-16' }, unixEpochMilliSeconds: moment('2016-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.78, PreBDFEV1Predicted: 35, PreBDFVC: 1.8, PreBDFVCPredicted: 40,
                date: { iso: '2017-02-16' }, unixEpochMilliSeconds: moment('2017-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.8, PreBDFEV1Predicted: 24, PreBDFVC: 1.85, PreBDFVCPredicted: 38,
                date: { iso: '2018-08-16' }, unixEpochMilliSeconds: moment('2018-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.86, PreBDFEV1Predicted: 22, PreBDFVC: 1.88, PreBDFVCPredicted: 40,
                date: { iso: '2019-08-16' }, unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, date: { iso: '2020-06-23' }, unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }]);
        expect(new LungFunctionGraphSummaryDataModel(
            lungFunctionObservations as Observation[], GraphPeriod.last10Years, TODAY).data)
            .toEqual([{
                PreBDFEV1: 0.78, PreBDFEV1Predicted: 35, PreBDFVC: 1.82, PreBDFVCPredicted: 47,
                date: { iso: '2011-02-16' }, unixEpochMilliSeconds: moment('2011-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.74, PreBDFEV1Predicted: 37, PreBDFVC: 1.87, PreBDFVCPredicted: 45,
                date: { iso: '2013-02-16' }, unixEpochMilliSeconds: moment('2013-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.71, PreBDFEV1Predicted: 39, PreBDFVC: 1.85, PreBDFVCPredicted: 47,
                date: { iso: '2015-02-16' }, unixEpochMilliSeconds: moment('2015-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, PreBDFEV1Predicted: 30, PreBDFVC: 1.86, PreBDFVCPredicted: 45,
                date: { iso: '2016-02-16' }, unixEpochMilliSeconds: moment('2016-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.78, PreBDFEV1Predicted: 35, PreBDFVC: 1.8, PreBDFVCPredicted: 40,
                date: { iso: '2017-02-16' }, unixEpochMilliSeconds: moment('2017-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.8, PreBDFEV1Predicted: 24, PreBDFVC: 1.85, PreBDFVCPredicted: 38,
                date: { iso: '2018-08-16' }, unixEpochMilliSeconds: moment('2018-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.86, PreBDFEV1Predicted: 22, PreBDFVC: 1.88, PreBDFVCPredicted: 40,
                date: { iso: '2019-08-16' }, unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, date: { iso: '2020-06-23' }, unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }]);
        expect(new LungFunctionGraphSummaryDataModel(
            lungFunctionObservations as Observation[], GraphPeriod.lifeTime, TODAY).data)
            .toEqual([{
                PreBDFEV1: 1, PreBDFEV1Predicted: 75, PreBDFVC: 0.8, PreBDFVCPredicted: 85,
                date: { iso: '1973-03-19' }, unixEpochMilliSeconds: moment('1973-03-19')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 1.5, PreBDFEV1Predicted: 82, PreBDFVC: 1.8, PreBDFVCPredicted: 90,
                date: { iso: '1973-08-19' }, unixEpochMilliSeconds: moment('1973-08-19')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 1.5, PreBDFEV1Predicted: 82, PreBDFVC: 1.8, PreBDFVCPredicted: 90,
                date: { iso: '1974-02-19' }, unixEpochMilliSeconds: moment('1974-02-19')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 3.1, PreBDFEV1Predicted: 85, PreBDFVC: 2.5, PreBDFVCPredicted: 85,
                date: { iso: '1976-02-19' }, unixEpochMilliSeconds: moment('1976-02-19')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 4.1, PreBDFEV1Predicted: 80, PreBDFVC: 5.4, PreBDFVCPredicted: 90,
                date: { iso: '1983-02-19' }, unixEpochMilliSeconds: moment('1983-02-19')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.78, PreBDFEV1Predicted: 35, PreBDFVC: 1.82, PreBDFVCPredicted: 47,
                date: { iso: '2011-02-16' }, unixEpochMilliSeconds: moment('2011-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.74, PreBDFEV1Predicted: 37, PreBDFVC: 1.87, PreBDFVCPredicted: 45,
                date: { iso: '2013-02-16' }, unixEpochMilliSeconds: moment('2013-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.71, PreBDFEV1Predicted: 39, PreBDFVC: 1.85, PreBDFVCPredicted: 47,
                date: { iso: '2015-02-16' }, unixEpochMilliSeconds: moment('2015-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, PreBDFEV1Predicted: 30, PreBDFVC: 1.86, PreBDFVCPredicted: 45,
                date: { iso: '2016-02-16' }, unixEpochMilliSeconds: moment('2016-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.78, PreBDFEV1Predicted: 35, PreBDFVC: 1.8, PreBDFVCPredicted: 40,
                date: { iso: '2017-02-16' }, unixEpochMilliSeconds: moment('2017-02-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.8, PreBDFEV1Predicted: 24, PreBDFVC: 1.85, PreBDFVCPredicted: 38,
                date: { iso: '2018-08-16' }, unixEpochMilliSeconds: moment('2018-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.86, PreBDFEV1Predicted: 22, PreBDFVC: 1.88, PreBDFVCPredicted: 40,
                date: { iso: '2019-08-16' }, unixEpochMilliSeconds: moment('2019-08-16')
                    .startOf('day')
                    .valueOf()
            }, {
                PreBDFEV1: 0.82, date: { iso: '2020-06-23' }, unixEpochMilliSeconds: moment('2020-06-23')
                    .startOf('day')
                    .valueOf()
            }]);
    });
