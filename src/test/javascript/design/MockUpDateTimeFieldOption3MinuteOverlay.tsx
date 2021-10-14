import {css} from '@emotion/core';
import Button from 'main/component/Button';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import MockUpDateTimeFieldCalendar from 'test/design/MockUpDateTimeFieldCalendar';
import {
    dateTimeOverlayStyle, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING
} from 'test/design/MockUpDateTimeFieldConstants';
import MockUpDateTimeFieldOverlayHeader from 'test/design/MockUpDateTimeFieldOverlayHeader';
import MockUpDateTimeFieldTimeSelector from 'test/design/MockUpDateTimeFieldTimeSelector';

/**
 * Option 3 minute precision overlay which has Cancel and Ok buttons under the calendar and time selector.
 *
 * @author Thompson 8/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpDateTimeFieldOption3MinuteOverlayProps
{
    onExitOverlay: () => void;
}

const buttonsContainerStyle = css({
    button: {
        ':not(:last-child)': {
            marginRight: '4px'
        }
    }
});

const overlayFooterStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: px(0, OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING)
});

class MockUpDateTimeFieldOption3MinuteOverlay extends React.Component<MockUpDateTimeFieldOption3MinuteOverlayProps>
{
    public render()
    {
        return (
            <div css={dateTimeOverlayStyle}>
                <MockUpDateTimeFieldOverlayHeader hasMonthSelection={true} />
                <MockUpDateTimeFieldCalendar />
                <div css={overlayFooterStyle}>
                    <MockUpDateTimeFieldTimeSelector />
                    <div css={buttonsContainerStyle}>
                        <Button onClick={this.props.onExitOverlay} small={true} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}

export default MockUpDateTimeFieldOption3MinuteOverlay;
