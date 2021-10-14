import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {background, colour, field} from 'main/application/ThemeConstants';
import BaseInputFieldComponent, {BaseInputFieldComponentProps} from 'main/fieldcomponent/BaseInputFieldComponent';
import {YEAR_INPUT_RESTRICTOR} from 'main/fieldcomponent/DateTimeFieldConstants';
import InputFieldComponent from 'main/fieldcomponent/InputFieldComponent';
import StoreProps from 'main/store/StoreProps';
import {borderStyle} from 'main/utility/BorderUtility';
import DateUtility from 'main/utility/DateUtility';
import {px} from 'main/utility/StyleUtility';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Precision from 'smarthealth-javascript/Precision';

/**
 * Allow input of a year.
 *
 * This component output an unformatted string value and will need the parent component to format input string value for
 * presentation.
 *
 * @author Thompson 30/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface YearFieldComponentProps extends BaseInputFieldComponentProps, StoreProps
{
}

const inputWrapperStyle = css({
    backgroundColor: colour.white,
    display: 'inline-block',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx + 1, 7, field.paddingHeightPx - 1)
});

const inputReadOnlyStyle = css({
    backgroundColor: background.disabled
});

@inject('appStore')
@observer
class YearFieldComponent extends BaseInputFieldComponent<YearFieldComponentProps>
{
    private static MAX_LENGTH: number = 4;

    @observable
    private focus: boolean = false;

    @computed
    private get valid(): boolean
    {
        if (lodash.isNil(this.props.value))
        {
            const mandatory = this.mandatory && this.props.context.formContext.validateIncludeMandatory;
            return !mandatory;
        }

        if (this.props.appStore.i18nStore.isValidDateTimeString(this.props.value, Precision.Year))
        {
            return true;
        }

        const iso: string = this.props.value;
        if (DateUtility.isValidEventDateTimeISO(iso))
        {
            const eventDateTime: EventDateTime = { iso };
            const precision: Precision = DateUtility.determineEventDateTimePrecision(eventDateTime);
            if (precision === Precision.Year)
            {
                return true;
            }
        }

        return false;
    }

    @autobind
    private onChange(value: string, hasFocus: boolean)
    {
        if (!value || YEAR_INPUT_RESTRICTOR.test(value))
        {
            this.props.onValueChange(value, hasFocus);
        }
    }

    @action.bound
    private onFocus(focus: boolean)
    {
        this.focus = focus;
    }

    public render()
    {
        const border = borderStyle(this.props.context, this.valid, this.focus);
        return <div css={[inputWrapperStyle, border, this.readOnly && inputReadOnlyStyle]}>
            <InputFieldComponent context={this.props.context} editable={true} maxLength={YearFieldComponent.MAX_LENGTH}
                onFocus={this.onFocus} onValueChange={this.onChange} value={this.props.value} />
        </div>;
    }
}

export default YearFieldComponent;
