import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Heading in the sidebar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SidebarHeadingProps
{
    title: string;
}

class SidebarHeading extends React.Component<SidebarHeadingProps>
{
    public render(): React.ReactNode
    {
        return (
            <h1 style={{ color: colour.navigation, font: font.navHeading, margin: 0 }}>
                {this.props.title.toUpperCase()}
            </h1>
        );
    }
}

export default SidebarHeading;
