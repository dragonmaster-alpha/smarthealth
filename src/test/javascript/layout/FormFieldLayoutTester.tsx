import TabPane, {Tab} from 'main/container/TabPane';
import * as React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormTester from 'test/form/FormTester';

/**
 * Renders multiple FormTester with different column layout amount
 *
 * @author Thompson 19/07/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

interface FormTestersProps
{
    data?: {};
    formDescription: FormDescription;
}

class FormFieldLayoutTester extends React.Component<FormTestersProps>
{
    public render(): React.ReactNode
    {
        const { data, formDescription } = this.props;
        const tabs: Tab[] = [];
        for (let i = 1; i <= 6; i += 1)
        {
            const formDescriptionWithColumns = { ...formDescription, layoutColumns: i } as FormDescription;
            tabs.push({
                title: `${i} column${i > 1 ? 's' : ''}`,
                content: <FormTester data={data} formDescription={formDescriptionWithColumns} />
            });
        }
        return <TabPane tabs={tabs} />;
    }
}

export default FormFieldLayoutTester;
