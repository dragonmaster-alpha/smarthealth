import {css} from '@emotion/core';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {px} from 'main/utility/StyleUtility';
import moment from 'moment';
import React from 'react';
import {OVERLAY_SIDE_PADDING, OVERLAY_TOP_PADDING} from 'test/design/MockUpDateTimeFieldConstants';

/**
 * DateTimeField calendar overlay mockup for Precision Day.
 *
 * @author Thompson 22/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpDateTimeFieldOverlayHeaderProps
{
    hasMonthSelection: boolean;
}

const headerStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: background.white,
    padding: px(OVERLAY_TOP_PADDING, OVERLAY_SIDE_PADDING),
    button: {
        border: 'none',
        color: colour.text,
        cursor: 'pointer',
        fontSize: '10px',
        outline: 'none',
        padding: '0',
        ':hover': {
            color: colour.primary2a
        }
    }
});

const headerInputStyle = css({
    color: colour.text,
    border: field.border,
    borderRadius: field.borderRadius,
    font: font.text,
    ':not(:first-child)': {
        marginLeft: '10px'
    },
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

const yearInputStyle = css({
    width: '65px'
});

class MockUpDateTimeFieldOverlayHeader extends React.Component<MockUpDateTimeFieldOverlayHeaderProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={headerStyle}>
                <button><SHIcon icon="chevron-left" title="Previous month" /></button>
                <div>
                    {this.props.hasMonthSelection && this.renderMonthSelection()}
                    <input css={[headerInputStyle, yearInputStyle]} type="number" defaultValue={2020} step={1}
                        title="Year" />
                </div>
                <button><SHIcon icon="chevron-right" title="Next month" /></button>
            </div>
        );
    }

    private renderMonthSelection(): React.ReactNode
    {
        const selectMonthOptions = moment.months()
            .map(month => <option value={month}>{month}</option>);
        return (
            <select css={headerInputStyle} title="Month">
                {selectMonthOptions}
            </select>
        );
    }
}

export default MockUpDateTimeFieldOverlayHeader;
