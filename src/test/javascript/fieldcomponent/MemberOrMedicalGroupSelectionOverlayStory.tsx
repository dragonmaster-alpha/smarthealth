import {action as storybookAction} from '@storybook/addon-actions';
import OverlayBorder from 'main/component/OverlayBorder';
import MemberOrMedicalGroupSelectionOverlay from 'main/fieldcomponent/MemberOrMedicalGroupSelectionOverlay';
import FormDescription from 'smarthealth-javascript/FormDescription';
import searchMedicalGroupForm from 'smarthealth-rest-test/formdesc/Form.Dialog.MedicalGroup.Search.json';
import dropdownMedicalGroupForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.MedicalGroup.json';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import {
    MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES, MEDICAL_GROUP_AND_RECENTS_ENTITIES, MEMBER_AND_MANY_RECENTS_ENTITIES,
    MEMBER_AND_RECENTS_ENTITIES
} from 'test/field/MemberOrMedicalGroupStoryConstants';
import {formDescriptionEntityDetails} from 'test/model/FormDescriptionMother';

/**
 * Tester for MemberOrMedicalGroupSelectionOverlay
 *
 * @author Larry 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
export default {
    title: 'FieldComponent/MemberOrMedicalGroupSelectionOverlay'
};

export const shortList = () =>
{
    const entities: EntityDetails[] = [
        ...MEMBER_AND_RECENTS_ENTITIES,
        ...MEDICAL_GROUP_AND_RECENTS_ENTITIES,
        formDescriptionEntityDetails(dropdownMemberForm),
        formDescriptionEntityDetails(dropdownMedicalGroupForm),
        formDescriptionEntityDetails(searchMedicalGroupForm)
    ];
    return (
        <SetEntities entities={entities}>
            <div style={{ margin: '8px', maxWidth: '800px' }}>
                <OverlayBorder>
                    <MemberOrMedicalGroupSelectionOverlay onSelection={storybookAction('onSelection')} />
                </OverlayBorder>
            </div>
        </SetEntities>
    );
};

export const longList = () =>
{
    const entities: EntityDetails[] = [
        ...MEMBER_AND_MANY_RECENTS_ENTITIES,
        ...MEDICAL_GROUP_AND_MANY_RECENTS_ENTITIES,
        formDescriptionEntityDetails(dropdownMemberForm),
        formDescriptionEntityDetails(dropdownMedicalGroupForm as FormDescription),
        formDescriptionEntityDetails(searchMedicalGroupForm as FormDescription)
    ];
    return (
        <SetEntities entities={entities}>
            <div style={{ margin: '8px', maxWidth: '800px' }}>
                <OverlayBorder>
                    <MemberOrMedicalGroupSelectionOverlay onSelection={storybookAction('onSelection')} />
                </OverlayBorder>
            </div>
        </SetEntities>
    );
};

export const selectMedicalGroup = () =>
{
    const entities: EntityDetails[] = [
        ...MEMBER_AND_RECENTS_ENTITIES,
        ...MEDICAL_GROUP_AND_RECENTS_ENTITIES,
        formDescriptionEntityDetails(dropdownMemberForm),
        formDescriptionEntityDetails(dropdownMedicalGroupForm),
        formDescriptionEntityDetails(searchMedicalGroupForm)
    ];
    return (
        <SetEntities entities={entities}>
            <div style={{ margin: '8px', maxWidth: '800px' }}>
                <OverlayBorder>
                    <MemberOrMedicalGroupSelectionOverlay onSelection={storybookAction('onSelection')}
                        selectMedicalGroup={true} />
                </OverlayBorder>
            </div>
        </SetEntities>
    );
};
