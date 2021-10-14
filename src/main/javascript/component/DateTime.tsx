import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Render a locale formatted date that is an EventDateTime.
 *
 * @author Thompson 5/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface DateFormattedViewProps extends StoreProps
{
    date: EventDateTime;
}

@inject('appStore')
class DateTime extends React.Component<DateFormattedViewProps>
{
    public render()
    {
        const { date } = this.props;
        if (!date)
        {
            return null;
        }

        const { i18nStore } = this.props.appStore;
        return <time dateTime={date.iso}>{i18nStore.formatEventDateTime(date)}</time>;
    }
}

export default DateTime;
