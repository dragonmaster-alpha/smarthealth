import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Heading in the sidebar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpSidebarHeadingProps
{
    title: string;
}

class MockUpSidebarHeading extends React.Component<MockUpSidebarHeadingProps>
{
    public render(): React.ReactNode
    {
        return <div style={{ font: font.navItem2, color: colour.navigation }}>{this.props.title.toUpperCase()}</div>;
    }
}

export default MockUpSidebarHeading;
