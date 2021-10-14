import {storiesOf} from '@storybook/react';
import NumberSpinnerInput from 'main/component/NumberSpinnerInput';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Tester for NumberSpinnerInput.
 *
 * @author Thompson 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface NumberSpinnerInputWrapperProps
{
    maximumDigits?: number;
    title: string;
    value?: number;
}

@observer
class NumberSpinnerInputWrapper extends React.Component<NumberSpinnerInputWrapperProps>
{
    @observable
    private value: number = this.props.value || null;

    @action.bound
    private onChange(value: number)
    {
        this.value = value;
    }

    public render()
    {
        return <NumberSpinnerInput maximumDigits={this.props.maximumDigits} onValueChange={this.onChange}
            title={this.props.title} value={this.value} />;
    }
}

storiesOf('Component/NumberSpinnerInput', module)
    .add('Default', () =>
    {
        return (
            <NumberSpinnerInputWrapper title="Number input" />
        );
    })
    .add('Year spinner', () =>
    {
        return (
            <NumberSpinnerInputWrapper maximumDigits={4} title="Year" value={2020} />
        );
    });
