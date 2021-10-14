import {css} from '@emotion/core';
import {field} from 'main/application/ThemeConstants';
import {px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Heading for a section in a form
 *
 * @author Larry 4/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface FormSubheadingProps
{
    title: string;
}

const subheadingStyle = css({
    fontWeight: 'bold',
    padding: px(field.viewPaddingHeightPx, 8, field.viewPaddingHeightPx, 16)
});

class FormSubheading extends React.Component<FormSubheadingProps>
{
    public render(): React.ReactNode
    {
        return <div css={subheadingStyle}>{this.props.title}</div>;
    }
}

export default FormSubheading;
