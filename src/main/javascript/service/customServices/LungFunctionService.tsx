import DiagnosticResultsTableTransform from 'main/field/DiagnosticResultsTableTransform';
import {customFieldRendererAdapter} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Display Lung Function service record with Results table as a rowspan table on Test and Date column.
 *
 * @author Thompson 23/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class LungFunctionService extends React.Component<EditViewFormComponentProps<EntityData>>
{
    public render()
    {
        const customFields = {
            Results: customFieldRendererAdapter(this.renderResultsTable)
        };
        return <EditViewFormComponent<EntityData> {...this.props} customFields={customFields} />;
    }

    private renderResultsTable(field: FormField, value: any): React.ReactNode
    {
        return <DiagnosticResultsTableTransform data={value} />;
    }
}

export default LungFunctionService;
