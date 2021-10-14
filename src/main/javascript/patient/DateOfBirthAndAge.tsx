import {formatAge} from 'main/format/DateFormat';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import * as React from 'react';
import Patient from 'smarthealth-javascript/Patient';

/**
 * Display date of birth and age. Different if deceased.
 *
 * TODO deceased
 *
 * @author Larry 1/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface DateOfBirthAndAgeProps extends StoreProps
{
    patient: Patient;
}

@inject('appStore')
class DateOfBirthAndAge extends React.Component<DateOfBirthAndAgeProps>
{
    public render(): React.ReactNode
    {
        const { patient } = this.props;

        return <>
            {this.props.appStore.i18nStore.formatEventDateTime(patient.dateOfBirth)}
            {patient.deceasedDate ? null : ` (${formatAge(patient.dateOfBirth, this.props.appStore.dateTime.today())})`}
        </>;
    }
}

export default DateOfBirthAndAge;
