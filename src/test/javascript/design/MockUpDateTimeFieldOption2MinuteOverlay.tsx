import {css} from '@emotion/core';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import MockUpDateTimeFieldCalendar from 'test/design/MockUpDateTimeFieldCalendar';
import {
    dateTimeOverlayStyle, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING
} from 'test/design/MockUpDateTimeFieldConstants';
import MockUpDateTimeFieldOverlayHeader from 'test/design/MockUpDateTimeFieldOverlayHeader';
import MockUpDateTimeFieldTimeSelector from 'test/design/MockUpDateTimeFieldTimeSelector';

/**
 * Option 2 minute precision overlay which has time component on top of the calendar.
 *
 * @author Thompson 8/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
const timeSelectorWrapperStyle = css({
    margin: px(12, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING)
});

class MockUpDateTimeFieldOption2MinuteOverlay extends React.Component
{
    public render()
    {
        return (
            <div css={dateTimeOverlayStyle}>
                <MockUpDateTimeFieldOverlayHeader hasMonthSelection={true} />
                <div css={timeSelectorWrapperStyle}>
                    <MockUpDateTimeFieldTimeSelector />
                </div>
                <MockUpDateTimeFieldCalendar />
            </div>
        );
    }
}

export default MockUpDateTimeFieldOption2MinuteOverlay;
