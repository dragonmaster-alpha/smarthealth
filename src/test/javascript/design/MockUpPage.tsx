import {css} from '@emotion/core';
import {sidebar, title} from 'main/application/ThemeConstants';
import ApplicationLogo from 'main/component/ApplicationLogo';
import React from 'react';
import MockUpMenu from 'test/design/MockUpMenu';
import MockUpPageHeading from 'test/design/MockUpPageHeading';
import MockUpSidebar, {MockUpSidebarProps} from 'test/design/MockUpSidebar';

/**
 * Basic layout for the mock up
 *
 * Note: Shadow under header has been omitted as it doesn't seem to work correctly.
 *  boxShadow: '0 2px 14px 0 rgba(1, 0, 0, 0.04)'
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpPageProps extends MockUpSidebarProps
{
    pageTitle: string;
}

const pageStyle = css({
    display: 'grid',
    gridTemplateColumns: `${sidebar.width} 1fr`,
    gridTemplateRows: `${title.height} 1fr`,
    height: '100vh',
    position: 'relative',
    '&>header': {
        borderBottom: title.border,
        display: 'flex',
        justifyContent: 'space-between'
    }
});

class MockUpPage extends React.Component<MockUpPageProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={pageStyle}>
                <ApplicationLogo />
                <header>
                    <MockUpPageHeading title={this.props.pageTitle} />
                    <MockUpMenu />
                </header>
                <MockUpSidebar patient={this.props.patient} provider={this.props.provider}
                    navItems={this.props.navItems}
                    navTreeSelection={this.props.navTreeSelection} />
                {this.props.children}
            </div>
        );
    }
}

export default MockUpPage;
