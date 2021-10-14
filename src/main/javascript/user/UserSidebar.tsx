import {css} from '@emotion/core';
import {Trans} from '@lingui/react';
import {background, colour, font, sidebar} from 'main/application/ThemeConstants';
import CollapseSingleButton from 'main/component/CollapseSingleButton';
import Entities from 'main/component/Entities';
import SHIcon from 'main/component/SHIcon';
import SidebarHeading from 'main/component/SidebarHeading';
import {fullName} from 'main/format/NameFormat';
import StoreProps from 'main/store/StoreProps';
import {px} from 'main/utility/StyleUtility';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';

/**
 * Display a few user details in the sidebar
 *
 * @author Larry 28/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const sectionStyle = css({
    backgroundColor: background.navigation,
    borderBottom: sidebar.border,
    padding: px(8, 24, 16),
    button: {
        color: colour.navigation,
        float: 'right',
        marginTop: '2px',
        '&:hover': {
            color: colour.white
        }
    },
    h1: {
        paddingBottom: '4px'
    },
    '>div': {
        '&:not(:first-of-type)': {
            paddingTop: '8px'
        },
        '& .shicon': {
            display: 'inline-block',
            color: colour.navigation,
            fontSize: '24px',
            paddingRight: '12px',
            verticalAlign: 'top'
        },
        '>div': {
            display: 'inline-block',
            '>div': {
                color: colour.navigation2,
                font: font.navItem2
            },
            '& :first-of-type': {
                color: colour.white,
                font: font.navItem1
            },
            '& :not(:first-of-type)': {
                paddingTop: '4px'
            }
        }
    }
});

@inject('componentStore', 'sessionStore')
@observer
class UserSidebar extends React.Component<StoreProps>
{
    public locationOrCity(medicalGroup: MedicalGroup): string
    {
        const { sessionStore } = this.props;
        return sessionStore.location ? sessionStore.location.name :
            `${medicalGroup.address.city}, ${medicalGroup.address.state}`;
    }

    @action.bound
    private onCollapse(collapsed: boolean)
    {
        this.props.componentStore.userSidebarCollapsed = collapsed;
    }

    public render()
    {
        const { sessionStore } = this.props;
        if (!sessionStore.loggedIn)
        {
            return <div><Trans>No provider</Trans></div>;
        }

        const { currentUserID, currentGroupID } = sessionStore;

        const entities = {};
        entities['user'] = { type: EntityType.User, id: currentUserID };
        entities['medicalGroup'] = { type: EntityType.MedicalGroup, id: currentGroupID };
        entities['member'] = {
            type: EntityType.MedicalGroupMember,
            id: { groupID: currentGroupID, userID: currentUserID }
        };

        return (
            <section css={sectionStyle}>
                <CollapseSingleButton collapsed={this.props.componentStore.userSidebarCollapsed}
                    onToggle={this.onCollapse}
                    title="Provider Details" />
                <SidebarHeading title="Provider" />
                {!this.props.componentStore.userSidebarCollapsed &&
                <Entities entities={entities} render={
                    ({ user, medicalGroup, member }) => (
                        <>
                            <div>
                                <SHIcon icon={user.participating ? 'user-small' : 'user-nonparticipating-small'}
                                    title="Provider" />
                                <div>
                                    <div>{fullName(user.name)}</div>
                                    <div>{member.role}</div>
                                </div>
                            </div>
                            <div>
                                <SHIcon icon={medicalGroup.participating ? 'medicalgroup' :
                                    'medicalgroup-nonparticipating'} title="Medical Group" />
                                <div>
                                    <div>{medicalGroup.name}</div>
                                    <div>{this.locationOrCity(medicalGroup)}</div>
                                </div>
                            </div>
                        </>
                    )} />
                }
            </section>
        );
    }
}

export default UserSidebar;
