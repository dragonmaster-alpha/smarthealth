/**
 * Jest for TableFilterUtility.tsx
 *
 * @author Thompson 6/12/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

import TableFilterUtility, {TableFilterMode} from 'main/utility/TableFilterUtility';

test('filters items with any of the filter words', () =>
{
    const items = [
        { service: 'Consultation Notes' },
        { service: 'CF Inpatient Notes' },
        { service: 'Pathology' },
        { service: 'Lung Function' },
        { service: 'Dialysis Assessment' },
        { service: 'Assessment of Dialysis' }
    ];

    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'not', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items.slice(0, 2));
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'path', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual([items[2]]);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Func', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual([items[3]]);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Dialysis', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items.slice(4, 6));
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Assessment Dialysis', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items.slice(4, 6));
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Ass Dia', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items.slice(4, 6));
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Cancer Con Note', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items.slice(0, 2));
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'Consultation Notes', filterMode: TableFilterMode.Equals } }))
        .toEqual([items[0]]);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'consultation notes', filterMode: TableFilterMode.Equals } }))
        .toEqual([items[0]]);

    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'tion', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual([]);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: 'patient', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual([]);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: null, filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items);
    expect(TableFilterUtility.runFilters(items,
        { service: { filter: '', filterMode: TableFilterMode.ContainsAnyStartWords } }))
        .toEqual(items);
    expect(TableFilterUtility.runFilters(items, { service: { filter: 'Con Not', filterMode: TableFilterMode.Equals } }))
        .toEqual([]);
    expect(TableFilterUtility.runFilters(items, { service: { filter: 'Notes', filterMode: TableFilterMode.Equals } }))
        .toEqual([]);
});
