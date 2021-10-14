import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import DialogIcons from 'main/dialog/DialogIcons';
import OKCancelDialog from 'main/dialog/OKCancelDialog';
import OKDialog from 'main/dialog/OKDialog';
import YesNoDialog from 'main/dialog/YesNoDialog';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';
import SetStore from 'test/component/SetStore';

/**
 * OK/Cancel Dialog in Storybook
 *
 * @author Larry 19/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@inject('componentStore')
@observer
class DialogCount extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return <>There are {this.props.componentStore.modalDialog.count} modal dialogs</>;
    }
}

storiesOf('Dialog/ModalDialog', module)
    .add('1 dialog', () =>
    {
        return (
            <SetStore set={(appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                appStore.componentStore.modalDialog.show(
                    <OKCancelDialog header="OK/Cancel" message="This is a statement about what will happen."
                        onOK={() => storybookAction('onOK')()}
                    />);
            }}>
                <DialogCount />
            </SetStore>
        );
    })
    .add('Nested dialogs', () =>
    {
        return (
            <SetStore set={(appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                appStore.componentStore.modalDialog.show(
                    <OKCancelDialog header="OK/Cancel" message="This is a statement about what will happen."
                        icon={DialogIcons.info} onOK={() => storybookAction('onOK')()}
                    />);
                appStore.componentStore.modalDialog.show(
                    <YesNoDialog header="Yes/No" message="Are you sure?" icon={DialogIcons.question}
                        onYes={() => storybookAction('onYes')()}
                    />);
            }}>
                <DialogCount />
            </SetStore>
        );
    })
    .add('Return a value', () =>
    {
        return (
            <SetStore set={(appStore) =>
            {
                appStore.componentStore.modalDialog.closeAll();
                const promise = appStore.componentStore.modalDialog.showAndWait(
                    <YesNoDialog header="Question" message="Do you want to say hello?"
                        icon={DialogIcons.question} onYes={() => 'hello'} onNo={() => 'nothing'}
                    />);
                promise.then((result) =>
                    appStore.componentStore.modalDialog.show(
                        <OKDialog header="Result" message={`You said ${result}`}
                            icon={DialogIcons.info}
                        />)
                );
            }}>
                <DialogCount />
            </SetStore>
        );
    });
