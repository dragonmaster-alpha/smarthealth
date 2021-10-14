import {autobind} from 'core-decorators';
import {AssociatedMedicalGroupEntityAddDialogProps} from 'main/dialog/AssociatedMedicalGroupEntityAddDialog';
import DialogIcons from 'main/dialog/DialogIcons';
import MandatoryOrInvalidFieldDialog from 'main/dialog/MandatoryOrInvalidFieldDialog';
import OKDialog from 'main/dialog/OKDialog';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import {action, observable, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Modal dialog enables selection of a Medical Group and Consent Date.
 *
 * @author Thompson 11/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

export interface AssociatedMedicalGroupAddDialogProps extends StoreProps, AssociatedMedicalGroupEntityAddDialogProps
{
    formDescription: FormDescription;
}

@inject('appStore', 'sessionStore')
@observer
class AssociatedMedicalGroupAddDialog extends React.Component<AssociatedMedicalGroupAddDialogProps>
{
    @observable
    private data = { consentDate: null, groupID: null };

    @observable
    private readonly formContext: FormContext;

    constructor(props)
    {
        super(props);
        this.formContext = FormContext.build(props.appStore, props.formDescription);
        this.formContext.editing = true;
    }

    @autobind
    private onCancel()
    {
        this.props.appStore.componentStore.modalDialog.close();
    }

    @action.bound
    private onOK()
    {
        const invalidFields = this.formContext.fieldValidator.validateForm(this.data, this.props.formDescription,
            this.formContext.fieldStates);
        if (invalidFields.size > 0)
        {
            this.props.appStore.componentStore.modalDialog.show(<MandatoryOrInvalidFieldDialog />);
            return;
        }

        const associationExist = this.props.combinedValue.some(
            association => (association.groupID === this.data.groupID));
        if (associationExist)
        {
            this.props.appStore.componentStore.modalDialog.show(
                <OKDialog header="Add Associated Medical Group" icon={DialogIcons.warn}
                    message="This association already exists." />);
        }
        else
        {
            this.props.appStore.componentStore.modalDialog.close(toJS(this.data));
        }
    }

    public render()
    {
        const actions = (
            <div>
                <Button label="OK" onClick={this.onOK} />
                <Button label="Cancel" onClick={this.onCancel} />
            </div>);

        return (
            <Dialog className="cp-AssociatedMedicalGroupAddDialog" closable={false} footer={actions}
                header="Add Associated Medical Group" modal={true} onHide={this.onCancel} style={{ minWidth: '40em' }}
                visible={true}>
                <FormComponent context={this.formContext} data={this.data} />
            </Dialog>
        );
    }
}

export default AssociatedMedicalGroupAddDialog;
