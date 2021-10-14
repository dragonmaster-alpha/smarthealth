import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Heading for the page
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpPageHeadingProps
{
    title: string;
}

const headingStyle = css({
    alignItems: 'center',
    display: 'flex',
    '>span': {
        color: colour.text,
        font: font.h1,
        paddingLeft: '32px'
    }
});

class MockUpPageHeading extends React.Component<MockUpPageHeadingProps>
{
    public render(): React.ReactNode
    {
        return (
            <header css={headingStyle}>
                <span>{this.props.title}</span>
            </header>
        );
    }
}

export default MockUpPageHeading;
