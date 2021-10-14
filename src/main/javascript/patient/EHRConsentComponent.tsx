import TermsAndConditionsLink from 'main/component/TermsAndConditionsLink';
import DateTimeFieldOld from 'main/field/DateTimeFieldOld';
import DateUtility from 'main/utility/DateUtility';
import {InputText} from 'primereact/inputtext';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import {BaseFieldOldProps} from '../field/BaseFieldOld';

/**
 * Display EHR Consent state
 * If value is a consent date it will display the consent date
 * Else if value is not a consent date and in editing mode display "not given" in an InputText
 * else display the string "not given"
 *
 * @author Thompson 19/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class EHRConsentComponent extends React.Component<BaseFieldOldProps<FormFieldDateTime, EventDateTime>>
{
    private readonly CONSENT_MESSAGE = 'not given';

    public render()
    {
        const { context, disabled, editing, field, fieldValidator, onFieldChange, value } = this.props;
        let ehrField: React.ReactNode = null;
        if (DateUtility.isEventDateTime(value))
        {
            ehrField = (
                <DateTimeFieldOld context={context} disabled={disabled} editing={editing} field={field}
                    fieldValidator={fieldValidator} onFieldChange={onFieldChange} value={value} />
            );
        }
        else
        {
            if (editing)
            {
                ehrField = <InputText value={this.CONSENT_MESSAGE} readOnly={true} />;
            }
            else
            {
                ehrField = this.CONSENT_MESSAGE;
            }
        }

        return (
            <>
                {ehrField} <TermsAndConditionsLink />
            </>
        );
    }
}

export default EHRConsentComponent;
