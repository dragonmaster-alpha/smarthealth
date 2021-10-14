import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import OverlayBorder from 'main/component/OverlayBorder';
import MemberSelectionOverlay from 'main/fieldcomponent/MemberSelectionOverlay';
import {jsonify} from 'main/utility/Jsonify';
import React from 'react';
import MemberID from 'smarthealth-javascript/MemberID';
import dropdownMemberForm from 'smarthealth-rest-test/formdesc/Form.Dropdown.Member.json';
import SetEntities from 'test/component/SetEntities';
import {EntityDetails} from 'test/component/SetEntity';
import {
    MEMBER_AND_MANY_RECENTS_ENTITIES, MEMBER_AND_RECENTS_ENTITIES
} from 'test/field/MemberOrMedicalGroupStoryConstants';
import {formDescriptionEntityDetails} from 'test/model/FormDescriptionMother';

/**
 * Tester for MemberSelectionOverlay
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function onSelection(memberID: MemberID)
{
    storybookAction('Selected')(jsonify(memberID));
}

storiesOf('FieldComponent/MemberSelectionOverlay', module)
    .add('Single entry', () =>
    {
        const entities: EntityDetails[] = [
            ...MEMBER_AND_RECENTS_ENTITIES,
            formDescriptionEntityDetails(dropdownMemberForm)
        ];
        return (
            <SetEntities entities={entities}>
                <div style={{ margin: '8px', maxWidth: '800px' }}>
                    <OverlayBorder>
                        <MemberSelectionOverlay onSelection={onSelection} />
                    </OverlayBorder>
                </div>
            </SetEntities>
        );
    })
    .add('Many entries', () =>
    {
        const entities: EntityDetails[] = [
            ...MEMBER_AND_MANY_RECENTS_ENTITIES,
            formDescriptionEntityDetails(dropdownMemberForm)
        ];
        return (
            <SetEntities entities={entities}>
                <div style={{ margin: '8px', maxWidth: '800px' }}>
                    <OverlayBorder>
                        <MemberSelectionOverlay onSelection={onSelection} />
                    </OverlayBorder>
                </div>
            </SetEntities>
        );
    });
