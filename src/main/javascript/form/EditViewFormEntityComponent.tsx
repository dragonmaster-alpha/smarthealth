import Entity from 'main/component/Entity';
import EditViewFormComponent, {BaseEditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import {observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Load a form to be rendered
 *
 * @author Larry 07/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface EditViewFormEntityComponentProps<T> extends BaseEditViewFormComponentProps<T>
{
    formDescriptionID: string;
}

@observer
class EditViewFormEntityComponent<T> extends React.Component<EditViewFormEntityComponentProps<T>>
{
    public render()
    {
        return (
            <Entity type={EntityType.FormDescription} id={this.props.formDescriptionID}
                render={(formDescription: FormDescription) => (
                    <EditViewFormComponent<T> formDescription={formDescription} {...this.props} />
                )}
            />
        );
    }
}

export default EditViewFormEntityComponent;
