import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import DateTime from 'main/component/DateTime';
import StringUtility from 'main/utility/StringUtility';
import {px} from 'main/utility/StyleUtility';
import moment from 'moment';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Allow debugging of DateFormattedViewStory.tsx
 *
 * @author Thompson 5/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface DateColumn
{
    date: EventDateTime;
    timezone: string;
}

const isoHeaderStyle = css({
    display: 'block',
    fontSize: '14px',
    fontWeight: 300
});

const tableStyle = css({
    border: '1px solid black',
    borderCollapse: 'collapse'
});

const tableHeaderStyle = css({
    border: '1px solid black',
    borderCollapse: 'collapse',
    maxWidth: '160px'
});

const tableDataStyle = css({
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: px(4, 8)
});

const tableRowStyle = css({
    border: '1px solid black',
    borderCollapse: 'collapse'
});

function createDate(timezone: string): EventDateTime
{
    const iso = moment
        .tz('2021-01-20T10:00', timezone)
        .format('YYYY-MM-DDTHH:mmZ');
    const isoShorten = StringUtility.removeEnd(iso, ':00');
    return { iso: isoShorten };
}

const dateTimeColumns: DateColumn[] = [
    { timezone: 'Australia/Adelaide', date: createDate('Australia/Sydney') },
    { timezone: 'Australia/Brisbane', date: createDate('Australia/Brisbane') },
    { timezone: 'Australia/Darwin', date: createDate('Australia/Darwin') },
    { timezone: 'Australia/Hobart', date: createDate('Australia/Hobart') },
    { timezone: 'Australia/Perth', date: createDate('Australia/Perth') },
    { timezone: 'Australia/Sydney', date: createDate('Australia/Sydney') },
    { timezone: 'Australia/Victoria', date: createDate('Australia/Victoria') },
    { timezone: 'Australia/Melbourne', date: createDate('Australia/Melbourne') }
];

storiesOf('Component/DateTime', module)
    .add('null date', () =>
    {
        return (
            <DateTime date={null} />
        );
    })
    .add('Year precision', () =>
    {
        const date: EventDateTime = { iso: '2001' };
        return (
            <DateTime date={date} />
        );
    })
    .add('Month precision', () =>
    {
        const date: EventDateTime = { iso: '2001-06' };
        return (
            <DateTime date={date} />
        );
    })
    .add('Day precision', () =>
    {
        const date: EventDateTime = { iso: '2001-06-20' };
        return (
            <DateTime date={date} />
        );
    })
    .add('Times in difference timezones', () =>
    {
        const timezoneRows: string[] = [
            'Australia/Adelaide',
            'Australia/Brisbane',
            'Australia/Darwin',
            'Australia/Hobart',
            'Australia/Perth',
            'Australia/Sydney',
            'Australia/Victoria',
            'Australia/Melbourne'
        ];
        const tableRows: React.ReactNode[] = [];
        tableRows.push(
            <tr css={tableRowStyle}>
                <td />
                {dateTimeColumns.map(dateTime => (
                    <th css={tableHeaderStyle}>{dateTime.timezone}
                        <span css={isoHeaderStyle}>{dateTime.date.iso}</span>
                    </th>
                ))}
            </tr>
        );

        timezoneRows.forEach(timezone =>
        {
            tableRows.push(
                <tr css={tableRowStyle}>
                    <th css={tableDataStyle}>{timezone}</th>
                    {dateTimeColumns.map(dateTime => (
                        // TODO need to provide a different timezone to DateTime
                        <td css={tableDataStyle}><DateTime date={dateTime.date} /></td>
                    ))}
                </tr>
            );
        });

        return (
            <>
                <table css={tableStyle}>
                    {tableRows}
                </table>
                <h3>Description</h3>
                <ul>
                    <li>TODO make this component display in different timezones</li>
                </ul>
            </>
        );
    });
