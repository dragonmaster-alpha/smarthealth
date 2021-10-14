import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Hyperlink component to open links in new tab.
 *
 * @author Thompson 7/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpHyperlinkFieldProps
{
    name: string;
    toPath: string;
}

class MockUpHyperlinkField extends React.Component<MockUpHyperlinkFieldProps>
{
    public render()
    {
        return (
            <a href={this.props.toPath}
                style={{
                    color: colour.primary2a, font: font.text, textDecoration: 'underline',
                    verticalAlign: 'sub'
                }}
                target="_blank">
                {this.props.name}
            </a>
        );
    }
}

export default MockUpHyperlinkField;
