import {action as storybookAction} from '@storybook/addon-actions';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Tester for forms that wraps the FormComponent to make it work nicely
 *
 * @author Larry 16/04/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FormTesterProps
{
    data?: {};
    formDescription: FormDescription;
    readOnly?: boolean;
    renderCustomForm?: (data: {}, formDescription: FormDescription,
        onSave: (T) => boolean | Promise<boolean>) => React.ReactNode;
}

@observer
class FormTester extends React.Component<FormTesterProps>
{
    @observable
    private data;

    constructor(props)
    {
        super(props);
        this.data = this.props.data || {};
    }

    @action.bound
    public onSave(data): boolean
    {
        storybookAction('onSave')(data);
        this.data = data;
        return true;
    }

    public render(): React.ReactNode
    {
        if (this.props.formDescription.layoutColumns === 0)
        {
            return <span>layoutColumns cannot be zero</span>;
        }

        const onSave = this.props.readOnly ? null : this.onSave;
        if (this.props.renderCustomForm)
        {
            return this.props.renderCustomForm(this.data, this.props.formDescription, onSave);
        }
        else
        {
            return (
                <EditViewFormComponent data={this.data}
                    formDescription={this.props.formDescription} onSave={onSave} />
            );
        }
    }
}

export default FormTester;
