import {css} from '@emotion/core';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Heading for a section in a form
 *
 * @author Larry 4/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SectionHeadingProps
{
    firstSection?: boolean;
    title: string;
}

const sectionFirstStyle = css({
    backgroundColor: background.section,
    color: colour.text,
    font: font.h3,
    gridColumn: '1/-1',
    padding: px(field.viewPaddingHeightPx + 2, 16)
});

const sectionStyle = css(sectionFirstStyle, {
    borderTop: border(colour.tabBorder)
});

class SectionHeading extends React.Component<SectionHeadingProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={this.props.firstSection ? sectionFirstStyle : sectionStyle}>
                {this.props.title}
            </div>
        );
    }
}

export default SectionHeading;
