import {autobind} from 'core-decorators';
import lodash from 'lodash';
import CalendarDropdownButton from 'main/component/CalendarDropdownButton';
import OverlayBorder from 'main/component/OverlayBorder';
import BaseInputFieldComponent, {BaseInputFieldComponentProps} from 'main/fieldcomponent/BaseInputFieldComponent';
import {DATE_INPUT_RESTRICTOR} from 'main/fieldcomponent/DateTimeFieldConstants';
import DateTimeFieldDayOverlay from 'main/fieldcomponent/DateTimeFieldDayOverlay';
import DropdownFieldComponent from 'main/fieldcomponent/DropdownFieldComponent';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import StoreProps from 'main/store/StoreProps';
import DateUtility from 'main/utility/DateUtility';
import {computed} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Allow selection of a date by text input or mouse click selection.
 *
 * This component output an unformatted string value and will need the parent component to format input string value for
 * presentation.
 *
 * @author Thompson 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface DateFieldComponentProps extends BaseInputFieldComponentProps, StoreProps
{
    monthAllowed: boolean;
    yearAllowed: boolean;
}

@inject('appStore')
@observer
class DateFieldComponent extends BaseInputFieldComponent<DateFieldComponentProps>
{
    // Take in consideration for date format DD/MMM/YYYY
    private static MAX_LENGTH: number = 11;

    @computed
    private get overlayValue(): EventDateTime
    {
        if ((this.props.yearAllowed && this.props.appStore.i18nStore.isValidDateTimeString(this.props.value,
            Precision.Year))
            || this.props.monthAllowed && this.props.appStore.i18nStore.isValidDateTimeString(this.props.value,
                Precision.Month)
            || this.props.appStore.i18nStore.isValidDateTimeString(this.props.value, Precision.Day))
        {
            const valueConverted: EventDateTime | string = this.props.appStore.i18nStore.toEventDateTimeOrString(
                this.props.value);
            if (DateUtility.isEventDateTime(valueConverted))
            {
                return valueConverted;
            }
        }

        return null;
    }

    @computed
    private get valid(): boolean
    {
        if (lodash.isNil(this.props.value))
        {
            const mandatory = this.mandatory && this.props.context.formContext.validateIncludeMandatory;
            return !mandatory;
        }

        if ((this.props.yearAllowed
            && this.props.appStore.i18nStore.isValidDateTimeString(this.props.value, Precision.Year))
            || (this.props.monthAllowed
                && this.props.appStore.i18nStore.isValidDateTimeString(this.props.value, Precision.Month))
            || this.props.appStore.i18nStore.isValidDateTimeString(this.props.value, Precision.Day))
        {
            return true;
        }

        const iso: string = this.props.value;
        if (DateUtility.isValidEventDateTimeISO(iso))
        {
            const eventDateTime: EventDateTime = { iso };
            const precision: Precision = DateUtility.determineEventDateTimePrecision(eventDateTime);
            if ((this.props.yearAllowed && (precision === Precision.Year))
                || (this.props.monthAllowed && (precision === Precision.Month))
                || precision === Precision.Day)
            {
                return true;
            }
        }

        return false;
    }

    @autobind
    private onChange(value: string, hasFocus: boolean)
    {
        if (!value || DATE_INPUT_RESTRICTOR.test(value))
        {
            this.props.onValueChange(value, hasFocus);
        }
    }

    @autobind
    private onChangeDateSelected(value)
    {
        this.props.onValueChange(value, false);
    }

    public render(): React.ReactNode
    {
        return <div style={{ display: 'inline-block' }}>
            <DropdownFieldComponent context={this.props.context} renderButton={this.renderCalendarButton}
                renderContent={this.renderDateInput} renderOverlay={this.renderDateOverlay} valid={this.valid} />
        </div>;
    }

    private renderCalendarButton(disabled: boolean, onToggleDropdown: () => void): React.ReactNode
    {
        return <CalendarDropdownButton disabled={disabled} onToggle={onToggleDropdown} />;
    }

    @autobind
    private renderDateInput(ref: React.RefObject<any>, onFocus: (focus: boolean) => void): React.ReactNode
    {
        return <InputFieldComponent context={this.props.context} editable={true}
            maxLength={DateFieldComponent.MAX_LENGTH} onFocus={onFocus} onValueChange={this.onChange}
            value={this.props.value} />;
    }

    @autobind
    private renderDateOverlay(onExit: () => void)
    {
        return <OverlayBorder>
            <DateTimeFieldDayOverlay onExit={onExit} onChange={this.onChangeDateSelected} value={this.overlayValue} />
        </OverlayBorder>;
    }
}

export default DateFieldComponent;
