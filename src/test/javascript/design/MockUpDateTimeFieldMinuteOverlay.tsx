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
 * DateTimeField calendar overlay mockup for Precision Minute.
 *
 * @author Thompson 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const timeSelectorWrapperStyle = css({
    margin: px(0, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING)
});

class MockUpDateTimeFieldMinuteOverlay extends React.Component
{
    public render()
    {
        return (
            <div css={dateTimeOverlayStyle}>
                <MockUpDateTimeFieldOverlayHeader hasMonthSelection={true} />
                <MockUpDateTimeFieldCalendar />
                <div css={timeSelectorWrapperStyle}>
                    <MockUpDateTimeFieldTimeSelector />
                </div>
            </div>
        );
    }
}

export default MockUpDateTimeFieldMinuteOverlay;
