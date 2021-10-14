import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour, field, font} from 'main/application/ThemeConstants';
import NumberSpinnerInput from 'main/component/NumberSpinnerInput';
import StoreProps from 'main/store/StoreProps';
import DateUtility from 'main/utility/DateUtility';
import {px} from 'main/utility/StyleUtility';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';
import {OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING} from './DateTimeFieldConstants';

/**
 * Allow a user to select a month and year.
 *
 * @author Thompson 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
const GRID_PADDING_HEIGHT = 5;
const GRID_PADDING_WIDTH = 9;

const calendarContainerStyle = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    margin: px(OVERLAY_TOP_PADDING, OVERLAY_SIDE_PADDING)
});

const headerStyle = css({
    display: 'flex',
    justifyContent: 'center',
    margin: px(OVERLAY_TOP_PADDING, OVERLAY_SIDE_PADDING)
});

const monthCellStyle = css({
    font: font.text,
    color: colour.text,
    padding: px(GRID_PADDING_HEIGHT, GRID_PADDING_WIDTH),
    ':hover': {
        ...field.hover,
        borderRadius: field.borderRadius,
        cursor: 'pointer',
        margin: px(0, 3),
        padding: px(GRID_PADDING_HEIGHT - 1, GRID_PADDING_WIDTH - 4)
    }
});

const monthCellSelectedStyle = css({
    ...field.focus,
    borderRadius: field.borderRadius,
    margin: px(0, 3),
    padding: px(GRID_PADDING_HEIGHT - 1, GRID_PADDING_WIDTH - 4)
});

interface DateTimeFieldMonthOverlayProps extends StoreProps
{
    onChange: (value: string) => void;
    onExit: () => void;
    value: EventDateTime;
}

@inject('appStore')
@observer
class DateTimeFieldMonthOverlay extends React.Component<DateTimeFieldMonthOverlayProps>
{
    @observable
    private yearInput: number = DateUtility.isEventDateTime(this.props.value)
        ? DateUtility.eventDateTimeToDate(this.props.value)
            .getFullYear()
        : DateUtility.eventDateTimeToDate(this.props.appStore.dateTime.today())
            .getFullYear();

    @computed
    private get selectedMonthIndex(): number | null
    {
        return DateUtility.isEventDateTime(this.props.value) && DateUtility.isPrecisionEqualOrHigher(Precision.Month,
            this.props.value)
            ? DateUtility.eventDateTimeToDate(this.props.value)
                .getMonth()
            : null;
    }

    @action
    public componentDidUpdate(prevProps: DateTimeFieldMonthOverlayProps)
    {
        if ((prevProps.value !== this.props.value) && DateUtility.isEventDateTime(this.props.value))
        {
            this.yearInput = DateUtility.eventDateTimeToDate(this.props.value)
                .getFullYear();
        }
    }

    @autobind
    private onClickMonthCell(e)
    {
        // TODO Thompson - remove month starting on 0 for January to month starting on 1 for January.
        const monthIndex = parseInt(e.target.id, 10);
        const dateSelected: EventDateTime = DateUtility.createEventDateTime(this.yearInput, monthIndex + 1);
        this.props.onChange(dateSelected.iso);
        this.props.onExit();
    }

    @action.bound
    private onYearInputChange(value: number)
    {
        this.yearInput = value;
    }

    public render()
    {
        return (
            <div>
                <div css={headerStyle}>
                    <NumberSpinnerInput maximumDigits={4} onValueChange={this.onYearInputChange} title="Year"
                        value={this.yearInput} />
                </div>
                {this.renderMonthCalendar()}
            </div>
        );
    }

    private renderMonthCalendar(): React.ReactNode
    {
        const monthsShort = moment.monthsShort()
            .map((monthShort, monthIndex) =>
            {
                if (monthIndex === this.selectedMonthIndex)
                {
                    return <span css={[monthCellStyle, monthCellSelectedStyle]} id={`${monthIndex}`}
                        onClick={this.onClickMonthCell}>{monthShort}</span>;
                }

                return <span css={monthCellStyle} id={`${monthIndex}`}
                    onClick={this.onClickMonthCell}>{monthShort}</span>;
            });

        return (
            <div css={calendarContainerStyle}>
                {monthsShort}
            </div>
        );
    }
}

export default DateTimeFieldMonthOverlay;
