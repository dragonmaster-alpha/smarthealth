import {css} from '@emotion/core';
import {background} from 'main/application/ThemeConstants';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import React from 'react';
import PatientAggregate from 'smarthealth-javascript/PatientAggregate';
import MockUpNavTree from 'test/design/MockUpNavTree';
import MockUpPatientSidebar from 'test/design/MockUpPatientSidebar';
import MockUpProviderSidebar from 'test/design/MockUpProviderSidebar';

/**
 * Sidebar for the mockup.
 *
 * @author Larry 20/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface MockUpSidebarProps
{
    navItems: { icon: string, name: string, primary?: boolean }[];
    navTreeSelection?: string;
    patient?: PatientAggregate;
    provider: MedicalGroupMemberAggregate;
}

const asideStyle = css({
    backgroundColor: background.navigation,
    display: 'flex',
    flexDirection: 'column',
    '&>:last-child': {
        flexGrow: 1
    }
});

class MockUpSidebar extends React.Component<MockUpSidebarProps>
{
    public render()
    {
        return (
            <aside css={asideStyle}>
                {this.props.patient && <MockUpPatientSidebar patient={this.props.patient} />}
                <MockUpProviderSidebar provider={this.props.provider} collapsedInitially={!!this.props.patient} />
                <MockUpNavTree items={this.props.navItems} selection={this.props.navTreeSelection} />
            </aside>
        );
    }
}

export default MockUpSidebar;
