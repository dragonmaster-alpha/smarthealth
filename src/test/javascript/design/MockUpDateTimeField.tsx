import {css} from '@emotion/core';
import lodash from 'lodash';
import {colour, field, font} from 'main/application/ThemeConstants';
import OverlayPanel from 'main/container/OverlayPanel';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import Precision from 'smarthealth-javascript/Precision';
import MockUpDateTimeFieldDayOverlay from 'test/design/MockUpDateTimeFieldDayOverlay';
import MockUpDateTimeFieldMinuteOverlay from 'test/design/MockUpDateTimeFieldMinuteOverlay';
import MockUpDateTimeFieldMonthOverlay from 'test/design/MockUpDateTimeFieldMonthOverlay';
import MockUpDateTimeFieldOption2MinuteOverlay from 'test/design/MockUpDateTimeFieldOption2MinuteOverlay';
import MockUpDateTimeFieldOption3MinuteOverlay from 'test/design/MockUpDateTimeFieldOption3MinuteOverlay';

/**
 * Calender field with Edit and View mode.
 *
 * @author Thompson 5/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpDateTimeFieldProps
{
    editing: boolean;
    field?: FormFieldDateTime;
    mandatory?: boolean;
    value: string;
}

const timeSpinnerHeightPadding = 6;

const dateTimeContainerStyle = css({
    display: 'flex'
});

const dateTimePickerButton = css({
    ':hover': {
        cursor: 'pointer'
    }
});

const dateTimeStyle = css({
    color: colour.text
});

const dateTimeEditStyle = css(dateTimeStyle, {
    alignItems: 'center',
    border: field.border,
    backgroundColor: colour.white,
    borderRadius: field.borderRadius,
    display: 'flex',
    justifyContent: 'flex-start',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx, 0),
    input: {
        border: 'none',
        font: font.text,
        outline: 'none',
        margin: px(0, 8),
        width: '140px'
    },
    ':hover': {
        ...field.hover
    }
});

const dateTimeViewStyle = css(dateTimeStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

const formattedTimeInputStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    margin: px(field.marginHeightPx, 0, field.marginHeightPx, 12),
    padding: px(field.paddingHeightPx, 8),
    width: '55px',
    ':hover': {
        ...field.hover
    }
});

const inputFocusStyle = css({
    ...field.focus,
    ':hover': {
        ...field.focus
    }
});

const timeSpinnerContainerStyle = css({
    marginLeft: '12px'
});

const timeSpinnerStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    margin: px(field.marginHeightPx, 0, field.marginHeightPx),
    padding: px(timeSpinnerHeightPadding, 0, timeSpinnerHeightPadding, 8),
    width: '45px',
    ':hover': {
        ...field.hover
    }
});

@observer
class MockUpDateTimeField extends React.Component<MockUpDateTimeFieldProps>
{
    private static dateFieldWidths = {
        [Precision.Minute]: '140px',
        [`${Precision.Minute}4`]: '90px',
        [`${Precision.Minute}5`]: '90px',
        [Precision.Day]: '90px',
        [Precision.Month]: '60px',
        [Precision.Year]: '40px'
    };

    // Redo into a utility if needed
    public static determineFieldHighestPrecision(field: FormFieldDateTime): Precision
    {
        if (!field || field.precisionMinute)
        {
            return Precision.Minute;
        }
        else if (field.precisionDay)
        {
            return Precision.Day;
        }
        else if (field.precisionMonth)
        {
            return Precision.Month;
        }
        else if (field.precisionYear)
        {
            return Precision.Year;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    @observable
    private dateInputFocus: boolean = false;

    private fieldHighestPrecision: Precision = MockUpDateTimeField.determineFieldHighestPrecision(this.props.field);

    @observable
    private formattedTimeInput: string = '';

    @observable
    private formattedTimeInputFocus: boolean = false;

    @observable
    private hoursSpinnerInputFocus: boolean = false;

    @observable
    private minutesSpinnerInputFocus: boolean = false;

    @observable
    private overlayShow: boolean = false;

    @action.bound
    private onBlur(e)
    {
        if (lodash.isNil(this[e.target.id]))
        {
            throw Error('To set onBlur field needs an ID or field property name does not exist.');
        }

        this[e.target.id] = false;
    }

    @action.bound
    private onChangeFormattedTimeInput(e)
    {
        const numberAndColonPattern = new RegExp('^[0-9:]+$');
        if (numberAndColonPattern.test(e.target.value) || !e.target.value)
        {
            this.formattedTimeInput = e.target.value;
        }
    }

    @action.bound
    private onClickToggleOverlay()
    {
        this.overlayShow = !this.overlayShow;
    }

    @action.bound
    private onExitOverlay()
    {
        this.overlayShow = false;
    }

    @action.bound
    private onFocusAndSelect(e)
    {
        if (lodash.isNil(this[e.target.id]))
        {
            throw Error('To set focus field needs an ID or field property name does not exist.');
        }

        this[e.target.id] = true;
        e.target.select();
    }

    private overlayFactory(): React.ReactNode
    {
        if (this.fieldHighestPrecision === Precision.Minute)
        {
            // TODO temporary property to allow for easy switching of the minute overlay mock-up in
            // MockUpFieldStory.tsx
            // @ts-ignore
            if (!this.props.field.minuteOption || (this.props.field.minuteOption === 1))
            {
                return <MockUpDateTimeFieldMinuteOverlay />;
            }
            // @ts-ignore
            else if (this.props.field.minuteOption === 2)
            {
                return <MockUpDateTimeFieldOption2MinuteOverlay />;
            }
            // @ts-ignore
            else if (this.props.field.minuteOption === 3)
            {
                return <MockUpDateTimeFieldOption3MinuteOverlay onExitOverlay={this.onExitOverlay} />;
            }
            // @ts-ignore
            else if (this.props.field.minuteOption === 4)
            {
                return <MockUpDateTimeFieldDayOverlay />;
            }
            // @ts-ignore
            else if (this.props.field.minuteOption === 5)
            {
                return <MockUpDateTimeFieldDayOverlay />;
            }
            else
            {
                throw new ShouldNeverGetHereError();
            }
        }
        else if (this.fieldHighestPrecision === Precision.Day)
        {
            return <MockUpDateTimeFieldDayOverlay />;
        }
        else if (this.fieldHighestPrecision === Precision.Month)
        {
            return <MockUpDateTimeFieldMonthOverlay />;
        }
        else
        {
            throw ShouldNeverGetHereError;
        }
    }

    public render()
    {
        if (this.props.editing)
        {
            const hasDateButton: boolean = (MockUpDateTimeField.determineFieldHighestPrecision(
                this.props.field) !== Precision.Year);
            const isMinuteOption4 = (this.fieldHighestPrecision === Precision.Minute)
                // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                // MockUpFieldStory.tsx
                // @ts-ignore
                && (this.props.field.minuteOption === 4);
            const isMinuteOption5 = (this.fieldHighestPrecision === Precision.Minute)
                // TODO temporary property to allow for easy switching of the minute overlay mock-up in
                // MockUpFieldStory.tsx
                // @ts-ignore
                && (this.props.field.minuteOption === 5);
            const dateFieldWidth =
                // @ts-ignore
                MockUpDateTimeField.dateFieldWidths[`${this.fieldHighestPrecision}${this.props.field.minuteOption}`]
                || MockUpDateTimeField.dateFieldWidths[this.fieldHighestPrecision];
            return (
                <>
                    <div css={dateTimeContainerStyle}>
                        <div css={[dateTimeEditStyle, (this.dateInputFocus || this.overlayShow) && inputFocusStyle]}>
                            <input id="dateInputFocus" maxLength={18}
                                onBlur={this.onBlur} onFocus={this.onFocusAndSelect} style={{ width: dateFieldWidth }}
                                type="text" value={this.props.value} />
                            {hasDateButton && <span css={dateTimePickerButton} className="shicon sh-calendar"
                                onClick={this.onClickToggleOverlay}
                                style={{ color: colour.primary6, height: '16px', width: '18px' }} />}
                        </div>
                        {isMinuteOption4 && this.renderFormattedTimeInput()}
                        {isMinuteOption5 && this.renderTimeSpinnerInput()}
                    </div>
                    {this.renderOverlay()}
                </>
            );
        }
        else
        {
            return <div css={dateTimeViewStyle}>{this.props.value || '-'}</div>;
        }
    }

    private renderFormattedTimeInput(): React.ReactNode
    {
        return <input css={[formattedTimeInputStyle, this.formattedTimeInputFocus && inputFocusStyle]}
            id="formattedTimeInputFocus" onBlur={this.onBlur} onChange={this.onChangeFormattedTimeInput}
            onFocus={this.onFocusAndSelect} placeholder="hh:mm" type="text" maxLength={5}
            value={this.formattedTimeInput} />;
    }

    private renderOverlay(): React.ReactNode
    {
        if (!this.overlayShow)
        {
            return null;
        }

        return (
            <OverlayPanel onExit={this.onExitOverlay}>
                {this.overlayFactory()}
            </OverlayPanel>
        );
    }

    private renderTimeSpinnerInput(): React.ReactNode
    {
        // TODO for minutes input to display value of "01" properly and not get converted to "1". Input type should be
        // string and not number. However, if input type is a string, the stepper (up & down buttons) is not displayed.
        // A custom input of type text instead of number with stepper buttons might be necessary to display "01".
        // https://stackoverflow.com/a/50200364/4728289
        return (
            <div css={timeSpinnerContainerStyle}>
                <input css={[timeSpinnerStyle, this.hoursSpinnerInputFocus && inputFocusStyle]} defaultValue={14}
                    id="hoursSpinnerInputFocus" max={23} min={0} onBlur={this.onBlur} onFocus={this.onFocusAndSelect}
                    step={1} type="number" title="Hours" />
                {' '}:{' '}
                <input css={[timeSpinnerStyle, this.minutesSpinnerInputFocus && inputFocusStyle]} defaultValue={0}
                    id="minutesSpinnerInputFocus" max={59} min={0} onBlur={this.onBlur} onFocus={this.onFocusAndSelect}
                    step={1} type="number" title="Minutes" />
            </div>
        );
    }

}

export default MockUpDateTimeField;
