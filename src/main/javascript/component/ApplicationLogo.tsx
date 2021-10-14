import {css} from '@emotion/core';
import {background, colour, font, sidebar} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';

/**
 * Logo appearing in the top left of the application
 *
 * TODO add copyright <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const logoStyle = css({
    alignItems: 'center',
    backgroundColor: background.navigation,
    borderBottom: sidebar.border,
    color: colour.white,
    display: 'flex',
    gap: '6px',
    paddingLeft: sidebar.paddingLeft
});

const logoTextStyle = css({
    font: `500 29px ${font.corporate}`
});

// tslint:disable-next-line:variable-name
const ApplicationLogo: React.FC = (props) =>
{
    return (
        <div css={logoStyle}>
            <SHIcon icon="logo" style={{ fontSize: '35px' }} />
            <span css={logoTextStyle}>Smart Health</span>
        </div>
    );
};

export default ApplicationLogo;
