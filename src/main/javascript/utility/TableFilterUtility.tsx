import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {toJS} from 'mobx';

/**
 * Utility functions for ServiceRecordListStore.tsx
 *
 * @author Thompson 11/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export interface TableFiltersMetadata
{
    [field: string]: TableFilterMetadata;
}

export enum TableFilterMode
{
    Equals = 'equals',
    ContainsAnyStartWords = 'containsAnyStartWords'
}

interface TableFilterMetadata
{
    filter: string;
    filterMode: TableFilterMode;
    // if filter value is not a simple string value e.g. program filter value is of type enum program
    parseFilter?: (value: any) => string;
    // if field value is not a simple string value e.g. serviceDate is an EventDateTime
    parseValue?: (value: any) => string;
}

class TableFilterUtility
{
    public static parseValue(value: string, parser: (value: any) => string): string
    {
        if (value && parser)
        {
            return parser(value);
        }
        else
        {
            return value;
        }
    }

    private static runFilter<T>(items: T[], field: string, filterMetadata: TableFilterMetadata): T[]
    {
        return items.filter(item =>
        {
            const filter = TableFilterUtility.parseValue(filterMetadata.filter, filterMetadata.parseFilter);
            const value = TableFilterUtility.parseValue(item[field], filterMetadata.parseValue);
            if (filterMetadata.filterMode === TableFilterMode.Equals)
            {
                return filter.toLowerCase() === (value && value.toLowerCase());
            }
            else if (filterMetadata.filterMode === TableFilterMode.ContainsAnyStartWords)
            {
                const filterWords = filter && filter.split(' ');
                const valueWords = value && value.split(' ');

                return valueWords && valueWords.some(
                    valueWord => filterWords.some(
                        filterWord => valueWord.toLowerCase()
                            .startsWith(filterWord.toLowerCase())));
            }
            else
            {
                throw new ShouldNeverGetHereError();
            }
        });
    }

    public static runFilters<T>(items: T[], filtersMetadata: TableFiltersMetadata): T[]
    {
        let newItems = toJS(items);

        for (const field in filtersMetadata)
        {
            if (filtersMetadata[field].filter)
            {
                newItems = TableFilterUtility.runFilter<T>(newItems, field, filtersMetadata[field]);
            }
        }

        return newItems;
    }
}

export default TableFilterUtility;
