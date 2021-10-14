import css from '@emotion/css';
import {px} from 'main/utility/StyleUtility';
import moment from 'moment';
import React from 'react';
import {calendarCellSelectedStyle, calendarCellWithHoverStyle} from 'test/design/MockUpDateTimeFieldCalendar';
import {
    dateTimeOverlayStyle, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING
} from 'test/design/MockUpDateTimeFieldConstants';
import MockUpDateTimeFieldOverlayHeader from 'test/design/MockUpDateTimeFieldOverlayHeader';

/**
 * DateTimeField calendar overlay mockup for Precision Month.
 *
 * @author Thompson 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const GRID_PADDING_HEIGHT = 5;
const GRID_PADDING_WIDTH = 9;

const calendarContainerStyle = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    margin: px(OVERLAY_TOP_PADDING, OVERLAY_SIDE_PADDING)
});

const monthCellWithHoverStyle = css(
    calendarCellWithHoverStyle,
    {
        padding: px(GRID_PADDING_HEIGHT, GRID_PADDING_WIDTH),
        ':hover': {
            padding: px(GRID_PADDING_HEIGHT - 1, GRID_PADDING_WIDTH - 4)
        }
    }
);

const monthCellSelectedStyle = css([
    calendarCellSelectedStyle,
    {
        padding: px(GRID_PADDING_HEIGHT - 1, GRID_PADDING_WIDTH - 4)
    }
]);

class MockUpDateTimeFieldMonthOverlay extends React.Component
{
    private static MAY_INDEX: number = 4;

    private static monthToSelect: string = moment.monthsShort()[MockUpDateTimeFieldMonthOverlay.MAY_INDEX];

    public render()
    {
        return (
            <div css={dateTimeOverlayStyle}>
                <MockUpDateTimeFieldOverlayHeader hasMonthSelection={false} />
                {this.renderMonthCalendar()}
            </div>
        );
    }

    private renderMonthCalendar(): React.ReactNode
    {
        const months = moment.monthsShort()
            .map(month =>
            {
                if (month === MockUpDateTimeFieldMonthOverlay.monthToSelect)
                {
                    return <span css={monthCellSelectedStyle}>{month}</span>;
                }

                return <span css={monthCellWithHoverStyle}>{month}</span>;
            });

        return (
            <div css={calendarContainerStyle}>
                {months}
            </div>
        );
    }
}

export default MockUpDateTimeFieldMonthOverlay;
