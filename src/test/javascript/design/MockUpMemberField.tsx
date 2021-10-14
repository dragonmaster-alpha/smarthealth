import {css} from '@emotion/core';
import {action as storybookAction} from '@storybook/addon-actions';
import {colour, field, font} from 'main/application/ThemeConstants';
import Entities from 'main/component/Entities';
import UserIconAndName from 'main/component/UserIconAndName';
import OverlayPanel from 'main/container/OverlayPanel';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import {fullName} from 'main/format/NameFormat';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import MemberID from 'smarthealth-javascript/MemberID';
import MockUpMemberSelection from 'test/design/MockUpMemberSelection';
import MockUpOverlayButton from 'test/design/MockUpOverlayButton';

/**
 * Medical Group Member for mockup
 *
 * @author Larry 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpMemberFieldProps
{
    editing: boolean;
    field: FormFieldMember;
    value: MemberID;
}

const memberFieldStyle = css({
    color: colour.text,
    font: font.text
});

const memberFieldEditStyle = css(memberFieldStyle, {
    alignItems: 'center',
    border: field.border,
    borderRadius: field.borderRadius,
    display: 'flex',
    justifyContent: 'space-between',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx, 7),
    width: '240px',
    ':hover': {
        ...field.hover
    },
    ':focus': {
        ...field.focus
    }
});

const memberFieldViewStyle = css(memberFieldStyle, {
    padding: px(field.viewPaddingHeightPx, field.viewPaddingWidthPx)
});

const dropdownPlaceholderStyle = css({
    marginTop: px(-field.marginHeightPx),
    marginBottom: px(field.marginHeightPx),
    position: 'relative'
});

@observer
class MockUpMemberField extends React.Component<MockUpMemberFieldProps>
{
    @observable
    private showDropdown: boolean = false;

    @action.bound
    private onOverlayExit()
    {
        this.showDropdown = false;
    }

    @action.bound
    private onSelection(member: MedicalGroupMemberAggregate)
    {
        this.showDropdown = false;
        storybookAction('selected')(fullName(member.user.name));
    }

    @action.bound
    private onToggleOverlay()
    {
        this.showDropdown = !this.showDropdown;
    }

    public render()
    {
        const entities = {};
        if (this.props.value)
        {
            entities['user'] = { type: EntityType.User, id: this.props.value.userID };
            entities['medicalGroup'] = { type: EntityType.MedicalGroup, id: this.props.value.groupID };
            entities['member'] = { type: EntityType.MedicalGroupMember, id: this.props.value };
        }

        if (this.props.editing)
        {
            return (
                <>
                    <Entities entities={entities}
                        render={({ user, medicalGroup, member }) => (
                            <div css={memberFieldEditStyle}>
                                <span>
                                    <UserIconAndName user={user} />
                                </span>
                                <MockUpOverlayButton collapsed={!this.showDropdown} onToggle={this.onToggleOverlay} />
                            </div>
                        )} />
                    {this.showDropdown && this.renderOverlay()}
                </>
            );
        }
        else
        {
            return (
                <Entities entities={entities} render={({ user, medicalGroup, member }) =>
                {
                    const toolTip = `${fullName(user.name)} ( ${medicalGroup.name} @ ${medicalGroup.address.city}, ${
                        medicalGroup.phone} )`;
                    return (
                        <div css={memberFieldViewStyle} title={toolTip}>
                            <UserIconAndName user={user} toolTip={toolTip} />
                        </div>
                    );
                }} />
            );
        }
    }

    private renderOverlay(): React.ReactNode
    {
        return (
            <div css={dropdownPlaceholderStyle}>
                <OverlayPanel onExit={this.onOverlayExit}>
                    <MockUpMemberSelection onSelection={this.onSelection} />
                </OverlayPanel>
            </div>
        );
    }
}

export default MockUpMemberField;
