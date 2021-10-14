import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import SessionStore from 'main/store/SessionStore';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Display notification message to let user know there are mandatory unfilled fields or invalid fields.
 *
 * @author Thompson 8/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MandatoryOrInvalidFieldDialogProps
{
    sessionStore?: SessionStore;
}

@inject('sessionStore')
class MandatoryOrInvalidFieldDialog extends React.Component<MandatoryOrInvalidFieldDialogProps>
{
    public render()
    {
        return (
            <OKDialog header="Message" icon={DialogIcons.warn}
                message="Please complete all mandatory or invalid fields with a red border." />
        );
    }
}

export default MandatoryOrInvalidFieldDialog;
