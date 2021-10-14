import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {colour, field, font} from 'main/application/ThemeConstants';
import CalendarUtility from 'main/utility/CalendarUtility';
import DateUtility from 'main/utility/DateUtility';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import moment from 'moment';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Allow selection of an EventDateTime from a grid of the days in a month.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface CalendarDayGridProps
{
    month?: number;
    onSelection: (value: string) => void;
    // value to determine what date cell to select in the Calendar
    value?: EventDateTime;
    year?: number;
}

const GRID_PADDING = 4;

const calendarGridContainerStyle = css({
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(7, 1fr)'
});

const calendarCellStyle = css({
    color: colour.text,
    font: font.text,
    padding: px(GRID_PADDING, 0),
    margin: px(0, GRID_PADDING),
    textAlign: 'center'
});

const calendarCellHoverStyle = css({
    ':hover': {
        ...field.hover,
        borderRadius: field.borderRadius,
        cursor: 'pointer',
        padding: px(GRID_PADDING - 1, 0)
    }
});

const calendarSelectedCellStyle = css({
    ...field.focus,
    borderRadius: field.borderRadius,
    padding: px(GRID_PADDING - 1, 0)
});

const calendarHeaderStyle = css({
    color: colour.label,
    font: font.label,
    width: '28px'
});

const calendarDisabledCellStyle = css({
    color: colour.disabled
});

@observer
class CalendarDayGrid extends React.Component<CalendarDayGridProps>
{
    private isDateCellSelected(currentCellYear: number, currentCellMonth: number, currentCellDate: number): boolean
    {
        const yearSelected = CalendarUtility.extractYearFromEventDateTime(this.props.value);
        const monthSelected = CalendarUtility.extractMonthFromEventDateTime(this.props.value);
        const dateSelected = CalendarUtility.extractDateFromEventDateTime(this.props.value);
        return (currentCellYear === yearSelected)
            && (currentCellMonth === monthSelected)
            && (currentCellDate === dateSelected);
    }

    @autobind
    private onClickSelectDate(year: number, month: number, date: number)
    {
        const dateSelected: EventDateTime = DateUtility.createEventDateTime(year, month, date);
        this.props.onSelection(dateSelected.iso);
    }

    public render()
    {
        return (
            <div css={calendarGridContainerStyle}>
                {this.renderHeaderCells()}
                {this.renderDateGrid()}
            </div>
        );
    }

    private renderDateCell(cellDate: number, monthDate, greyedOutDate: boolean)
    {
        if (this.isDateCellSelected(monthDate.year, monthDate.month, cellDate))
        {
            return <span css={[calendarCellStyle, calendarSelectedCellStyle, calendarCellHoverStyle,
                greyedOutDate && calendarDisabledCellStyle]}
                onClick={() => this.onClickSelectDate(this.props.year, this.props.month, cellDate)}>{cellDate}</span>;
        }

        return <span css={[calendarCellStyle, calendarCellHoverStyle, greyedOutDate && calendarDisabledCellStyle]}
            onClick={() => this.onClickSelectDate(monthDate.year, monthDate.month, cellDate)}>{cellDate}</span>;
    }

    private renderDateCells(dates: number[], monthDate, greyedOutDate?: boolean): React.ReactNode
    {
        return dates.map(date => this.renderDateCell(date, monthDate, greyedOutDate));
    }

    private renderDateGrid(): React.ReactNode
    {
        if (lodash.isNil(this.props.year) || lodash.isNil(this.props.month))
        {
            return null;
        }

        return (
            <>
                {this.renderDateInPreviousMonthCells(this.props.year, this.props.month)}
                {this.renderDateInMonthCells(this.props.year, this.props.month)}
                {this.renderDateInPostMonthCells(this.props.year, this.props.month)}
            </>
        );
    }

    private renderDateInMonthCells(year: number, month: number): React.ReactNode
    {
        const datesInCurrentMonth: number[] = CalendarUtility.createDatesForMonth(year, month);
        const currentMonthDate = { year, month };
        return this.renderDateCells(datesInCurrentMonth, currentMonthDate);
    }

    private renderDateInPostMonthCells(year: number, month: number): React.ReactNode
    {
        const postMonth = CalendarUtility.addMonth(1, year, month);
        const datesInPostMonthToShow = CalendarUtility.determineCalendarDatesInPostMonth(year, month);
        return this.renderDateCells(datesInPostMonthToShow, postMonth, true);
    }

    private renderDateInPreviousMonthCells(year: number, month: number): React.ReactNode
    {
        const previousMonth = CalendarUtility.addMonth(-1, year, month);
        const datesInPreviousMonthToShow: number[] = CalendarUtility.determineCalendarDatesInPreviousMonth(year, month);
        return this.renderDateCells(datesInPreviousMonthToShow, previousMonth, true);
    }

    private renderHeaderCells(): React.ReactNode
    {
        return moment.weekdaysShort()
            .map(weekdayShortName => <span css={[calendarCellStyle, calendarHeaderStyle]}>{weekdayShortName}</span>);
    }
}

export default CalendarDayGrid;
