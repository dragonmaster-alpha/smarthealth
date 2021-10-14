import {storiesOf} from '@storybook/react';
import AssociatedMedicalGroupEntityAddDialog from 'main/dialog/AssociatedMedicalGroupEntityAddDialog';
import StoreProps from 'main/store/StoreProps';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import DialogAssociatedMedicalGroupAdd from 'smarthealth-rest-test/formdesc/Form.Dialog.AssociatedMedicalGroupAdd.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import {ST_VASELINE} from 'test/data/MedicalGroupMother';

/**
 * Allow debugging of AssociatedMedicalGroupAddDialog.tsx
 *
 * @author Thompson 20/11/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@inject('componentStore')
@observer
class OpenModal extends React.Component<StoreProps>
{
    @observable
    private data;

    @action.bound
    private async onClick()
    {
        this.props.componentStore.modalDialog.closeAll();
        this.data = await this.props.componentStore.modalDialog.showAndWait(
            <AssociatedMedicalGroupEntityAddDialog combinedValue={[]} />
        );
    }

    public render()
    {
        return (
            <>
                value: {JSON.stringify(this.data)} <br />
                <Button label="Add" onClick={this.onClick} />
            </>
        );
    }
}

storiesOf('Dialog/AssociatedMedicalGroupAddDialog', module)
    .add('Dialog', () =>
    {
        const entities: EntityDetails[] = [
            {
                type: EntityType.FormDescription,
                id: 'Dialog.AssociatedMedicalGroupAdd',
                value: DialogAssociatedMedicalGroupAdd
            },
            {
                type: EntityType.MedicalGroup,
                id: ST_VASELINE.groupID,
                value: ST_VASELINE
            },
            {
                type: EntityType.EntityReferenceList,
                id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupRecents),
                value: {
                    id: '/medicalgroups/recents',
                    referencedEntityType: EntityType.MedicalGroup,
                    references: [
                        {
                            id: 720,
                            type: EntityType.MedicalGroup
                        },
                        {
                            id: 23,
                            type: EntityType.MedicalGroup
                        }
                    ]
                }
            }
        ];
        return (
            <SetEntities entities={entities}>
                <OpenModal />
                <h3>Issue</h3>
                <ol>
                    <li>
                        Add Associated Medical Group modal dialog has internal vertical scroll when Calender button is
                        pressed to display the date picker.
                    </li>
                </ol>
            </SetEntities>
        );
    });
