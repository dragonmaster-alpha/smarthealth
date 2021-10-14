import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import CalendarDayGrid from 'main/component/CalendarDayGrid';
import MonthSelector from 'main/component/MonthSelector';
import NextPreviousButton from 'main/component/NextPreviousButton';
import NumberSpinnerInput from 'main/component/NumberSpinnerInput';
import {OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING} from 'main/fieldcomponent/DateTimeFieldConstants';
import CalendarUtility from 'main/utility/CalendarUtility';
import {px} from 'main/utility/StyleUtility';
import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';

/**
 * Overlay to allow a user to select a day, month and year. Selecting the day cell will finalise the day, month and
 * year selection.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface DateTimeFieldOverlayProps
{
    onChange: (value: string) => void;
    onExit: () => void;
    value: EventDateTime;
}

const headerContainerStyle = css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
});

const inputContainerStyle = css({
    alignItems: 'center',
    display: 'flex'
});

const overlayContainerStyle = css({
    padding: px(OVERLAY_TOP_PADDING, OVERLAY_SIDE_PADDING)
});

@observer
class DateTimeFieldDayOverlay extends React.Component<DateTimeFieldOverlayProps>
{
    @observable
    private month: number = CalendarUtility.extractMonthFromEventDateTime(this.props.value);

    @observable
    private year: number = CalendarUtility.extractYearFromEventDateTime(this.props.value);

    @computed
    private get value(): EventDateTime
    {
        if (typeof this.props.value === 'string')
        {
            return null;
        }
        else
        {
            return this.props.value;
        }
    }

    @action.bound
    private onClickDecrementMonth()
    {
        const newMonthDate = CalendarUtility.addMonth(-1, this.year, this.month);
        this.month = newMonthDate.month;
        this.year = newMonthDate.year;
    }

    @action.bound
    private onClickIncrementMonth()
    {
        const newMonthDate = CalendarUtility.addMonth(1, this.year, this.month);
        this.month = newMonthDate.month;
        this.year = newMonthDate.year;
    }

    @autobind
    private onSelectionDate(date: string)
    {
        this.props.onChange(date);
        this.props.onExit();
    }

    @action.bound
    private onSelectionMonth(month: number)
    {
        this.month = month;
    }

    @action.bound
    private onValueChangeYear(year: number)
    {
        this.year = year;
    }

    public render()
    {
        const isMonthChevronDisabled = !this.month || !this.year;
        return (
            <div css={overlayContainerStyle}>
                <div css={headerContainerStyle}>
                    <NextPreviousButton disabled={isMonthChevronDisabled} previous={true}
                        onClick={this.onClickDecrementMonth} toolTip="Previous month" />
                    <div css={inputContainerStyle}>
                        <MonthSelector onSelection={this.onSelectionMonth} value={this.month} />
                        <NumberSpinnerInput maximumDigits={4} onValueChange={this.onValueChangeYear} title="Year"
                            value={this.year} />
                    </div>
                    <NextPreviousButton disabled={isMonthChevronDisabled} onClick={this.onClickIncrementMonth}
                        toolTip="Next month" />
                </div>
                <CalendarDayGrid month={this.month} year={this.year} onSelection={this.onSelectionDate}
                    value={this.value} />
            </div>
        );
    }
}

export default DateTimeFieldDayOverlay;
