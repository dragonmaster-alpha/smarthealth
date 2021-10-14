import React from 'react';
import MockUpDateTimeFieldCalendar from 'test/design/MockUpDateTimeFieldCalendar';
import {dateTimeOverlayStyle} from 'test/design/MockUpDateTimeFieldConstants';
import MockUpDateTimeFieldOverlayHeader from 'test/design/MockUpDateTimeFieldOverlayHeader';

/**
 * DateTimeField calendar overlay mockup for Precision Day.
 *
 * @author Thompson 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class MockUpDateTimeFieldDayOverlay extends React.Component
{
    public render()
    {
        return (
            <div css={dateTimeOverlayStyle}>
                <MockUpDateTimeFieldOverlayHeader hasMonthSelection={true} />
                <MockUpDateTimeFieldCalendar />
            </div>
        );
    }
}

export default MockUpDateTimeFieldDayOverlay;
