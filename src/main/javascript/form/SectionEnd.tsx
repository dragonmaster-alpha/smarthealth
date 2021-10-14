import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Component that denotes the end of all sections in the form
 *
 * @author Larry 4/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const sectionEndStyle = css({
    height: '2px',
    backgroundColor: colour.tabBorder,
    gridColumn: '1/-1'
});

class SectionEnd extends React.Component
{
    public render(): React.ReactNode
    {
        return <div css={sectionEndStyle} />;
    }
}

export default SectionEnd;
