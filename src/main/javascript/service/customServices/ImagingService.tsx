import {autobind} from 'core-decorators';
import FieldContext from 'main/field/FieldContext';
import {customFieldRendererAdapter, CustomFields, OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import FieldValidator from 'main/form/FieldValidator';
import {Button} from 'primereact/button';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormField from 'smarthealth-javascript/FormField';

/**
 * Display Imaging with custom imageURL button when clicked will open the link in a new browser tab for viewing.
 *
 * @author Thompson 21/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

class ImagingService extends React.Component<EditViewFormComponentProps<EntityData>>
{
    @autobind
    private onImageURLOpenButtonClick()
    {
        window.open(this.props.data.ImageURL);
    }

    public render()
    {
        const customFields: CustomFields<EntityData> = {
            imageURLOpenButton: customFieldRendererAdapter(this.renderImageURLOpenButton)
        };
        return <EditViewFormComponent {...this.props} customFields={customFields} />;
    }

    @autobind
    private renderImageURLOpenButton(field: FormField, value: any, editing: boolean, disabled: boolean, valid: boolean,
        onFieldChange: OnFieldChange, context: FieldContext, fieldValidator: FieldValidator,
        data: EntityData): React.ReactNode
    {
        // TODO data.ImageURL is undefined because null assignment is given to GroupField instead of the inner fields.
        //  Will cause inner fields to be not observable if it didn't have any initial values
        // TODO ImageURL field and this button may need styling.
        //  What does it need to look like when there is no ImageURL string
        //  What if the ImageURL string is longer than the allowable width of textfield
        return <Button label={field.label} onClick={this.onImageURLOpenButtonClick} disabled={!data.ImageURL} />;
    }
}

export default ImagingService;
