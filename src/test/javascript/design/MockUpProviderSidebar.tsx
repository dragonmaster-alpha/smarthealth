import {colour, font, sidebar} from 'main/application/ThemeConstants';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import {fullName} from 'main/format/NameFormat';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {roleDescriptions} from 'smarthealth-javascript/Role';
import MockUpCollapseButton from 'test/design/MockUpCollapseButton';
import MockUpSidebarHeading from 'test/design/MockUpSidebarHeading';

/**
 * Details of current provider in sidebar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpProviderSidebarProps
{
    collapsedInitially?: boolean;
    provider: MedicalGroupMemberAggregate;
}

@observer
class MockUpProviderSidebar extends React.Component<MockUpProviderSidebarProps>
{
    @observable
    private collapsed;

    constructor(props)
    {
        super(props);
        this.collapsed = props.collapsedInitially;
    }

    @action.bound
    private onToggle(collapsed: boolean)
    {
        this.collapsed = collapsed;
    }

    public render(): React.ReactNode
    {
        const { provider } = this.props;
        return (
            <section style={{ padding: px(16, 24), borderBottom: sidebar.border }}>
                <MockUpCollapseButton collapsed={this.collapsed} onToggle={this.onToggle} />
                <MockUpSidebarHeading title="Provider" />
                {!this.collapsed && <>
                    <div style={{ paddingTop: '8px' }}>
                        <span className="shicon sh-user-small"
                            style={{ color: colour.navigation, fontSize: '120%', verticalAlign: 'top' }}></span>
                        <span style={{ paddingLeft: '16px', display: 'inline-block' }}>
                            <div style={{ color: colour.white }}>{fullName(provider.user.name)}</div>
                            <div style={{
                                font: font.navItem2, color: colour.navigation2
                            }}>{roleDescriptions[provider.member.role]}</div>
                        </span>
                    </div>
                    <div style={{ paddingTop: '0.5em' }}>
                        <span className="shicon sh-medicalgroup"
                            style={{ color: colour.navigation, fontSize: '120%', verticalAlign: 'top' }}></span>
                        <span style={{ paddingLeft: '1em', display: 'inline-block' }}>
                            <div style={{ color: colour.white }}>{provider.medicalGroup.name}</div>
                            <div style={{
                                font: font.navItem2, color: colour.navigation2
                            }}>{provider.medicalGroup.address.city}, {provider.medicalGroup.address.state}</div>
                        </span>
                    </div>
                </>}
            </section>
        );
    }
}

export default MockUpProviderSidebar;
