import DialogIcons from 'main/dialog/DialogIcons';
import YesNoDialog from 'main/dialog/YesNoDialog';
import React, {Component} from 'react';

/**
 * A dialog to let the user know that there is unsaved data in a form.
 *
 * User can cancel or proceed with the abandon changes.
 *
 * @author Thompson 10/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface AbandonChangesDialogProps
{
    onAbandon: () => void;
}

class AbandonChangesDialog extends Component<AbandonChangesDialogProps>
{
    public render()
    {
        return <YesNoDialog header="Cancel edit" icon={DialogIcons.warn}
            message="There is unsaved data in this form. Do you wish to abandon the changes?"
            onYes={this.props.onAbandon} />;
    }
}

export default AbandonChangesDialog;
