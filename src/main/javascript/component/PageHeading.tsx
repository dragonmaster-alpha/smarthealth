import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Heading for the application page
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const headingStyle = css({
    alignItems: 'center',
    display: 'flex',
    '>span': {
        color: colour.text,
        font: font.h1,
        paddingLeft: '32px'
    }
});

@inject('componentStore')
@observer
class PageHeading extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        const { currentPage } = this.props.componentStore;
        const title = currentPage && currentPage.title;
        return (
            <header css={headingStyle}>
                <span>{title}</span>
            </header>
        );
    }
}

export default PageHeading;
