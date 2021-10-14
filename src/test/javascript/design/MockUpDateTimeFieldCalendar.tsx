import {css} from '@emotion/core';
import {colour, field, font} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import moment from 'moment';
import React from 'react';
import {OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING} from 'test/design/MockUpDateTimeFieldConstants';

/**
 * DateTimeField calendar day grid.
 *
 * @author Thompson 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const GRID_PADDING = 4;

const calendarContainerStyle = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    margin: px(0, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING)
});

const calendarHeaderStyle = css({
    color: colour.label,
    cursor: 'default',
    font: font.label,
    padding: px(0, GRID_PADDING),
    textAlign: 'center'
});

const calendarCellStyle = css({
    color: colour.text,
    cursor: 'pointer',
    font: font.text,
    padding: px(GRID_PADDING),
    textAlign: 'center'
});

const calendarCellBorderProperties = {
    borderRadius: field.borderRadius,
    padding: px(GRID_PADDING - 1, GRID_PADDING - 4),
    margin: px(0, 3)
};

export const calendarCellWithHoverStyle = css(
    calendarCellStyle,
    {
        ':hover': {
            ...field.hover,
            ...calendarCellBorderProperties
        }
    }
);

export const calendarCellSelectedStyle = css(
    calendarCellStyle,
    {
        ...field.focus,
        ...calendarCellBorderProperties
    }
);

const calendarDisabledCellStyle = css(calendarCellWithHoverStyle, {
    color: colour.disabled
});

class MockUpDateTimeFieldCalendar extends React.Component
{
    private static dateToSelect: number = 16;

    public render(): React.ReactNode
    {
        const dayHeaders = moment.weekdaysShort()
            .map(value => <span css={calendarHeaderStyle}>{value}</span>);

        const disabledDatesInPreMonth: number[] = [30];
        const disabledPreDates = disabledDatesInPreMonth.map(
            date => <span css={calendarDisabledCellStyle}>{date}</span>);

        const datesInCurrentMonth: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        const datesInMonth = datesInCurrentMonth.map(date =>
        {
            if (date === MockUpDateTimeFieldCalendar.dateToSelect)
            {
                return <span css={calendarCellSelectedStyle}>{date}</span>;
            }

            return <span css={calendarCellWithHoverStyle}>{date}</span>;
        });

        const disabledDatesInPostMonth: number[] = [1, 2, 3];
        const disabledPostDates = disabledDatesInPostMonth.map(
            date => <span
                css={calendarDisabledCellStyle}>{date}</span>);
        return (
            <div css={calendarContainerStyle}>
                {dayHeaders}
                {disabledPreDates}
                {datesInMonth}
                {disabledPostDates}
            </div>
        );
    }
}

export default MockUpDateTimeFieldCalendar;
