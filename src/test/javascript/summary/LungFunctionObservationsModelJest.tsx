import AppStore from 'main/store/AppStore';
import initialObservationsTableDataJSON from 'main/summary/lungFunction/LungFunctionObservationsInitialTableData.json';
import LungFunctionObservationsModel from 'main/summary/lungFunction/LungFunctionObservationsModel';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import lungFunctionObservationsDataTableValues
    from 'test/summary/LungFunctionObservationsModelJest.DataTableValues.json';
import lungFunctionObservations
    from 'test/summary/LungFunctionSummaryMainPanelStory.ObservationsLungFunctionResponse.json';

/**
 * Jest for LungFunctionObservationsModel.tsx
 *
 * @author Thompson 11/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function today(): EventDateTime
{
    return { iso: '2020-12-01' };
}

const appStore: AppStore = new AppStore();
appStore.dateTime.today = today;
test('extract date from Lung Function Observations data', () =>
{
    expect(new LungFunctionObservationsModel(appStore, null).columns)
        .toEqual([
            { field: 'observationType', header: '' },
            { field: 'best12Mon', header: 'Best 12 mon' }
        ]);
    expect(new LungFunctionObservationsModel(appStore, []).columns)
        .toEqual([
            { field: 'observationType', header: '' },
            { field: 'best12Mon', header: 'Best 12 mon' }
        ]);
    expect(new LungFunctionObservationsModel(appStore, lungFunctionObservations as Observation[]).columns)
        .toEqual([
            { field: 'observationType', header: '' },
            { field: 'best12Mon', header: 'Best 12 mon' },
            { field: '2020-03-22', header: '22/03/2020' },
            { field: '2020-01-10', header: '10/01/2020' },
            { field: '2019-12-10', header: '10/12/2019' },
            { field: '2018-06-02', header: '02/06/2018' },
            { field: '2009-04-24', header: '24/04/2009' },
            { field: '2008-10-24', header: '24/10/2008' },
            { field: '2008-04-24', header: '24/04/2008' },
            { field: '2007-10-24', header: '24/10/2007' }
        ]);
});

test('extract DataTable values from observations', () =>
{
    expect(new LungFunctionObservationsModel(appStore, null).values)
        .toEqual(initialObservationsTableDataJSON);
    expect(new LungFunctionObservationsModel(appStore, []).values)
        .toEqual(initialObservationsTableDataJSON);
    expect(new LungFunctionObservationsModel(appStore, lungFunctionObservations as Observation[]).values)
        .toEqual(lungFunctionObservationsDataTableValues);
});
