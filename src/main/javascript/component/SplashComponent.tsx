import {css} from '@emotion/core';
import {background, colour, font, fontName, tagLine} from 'main/application/ThemeConstants';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Splash screen that appears prior to logging in.
 *
 * TODO add copyright <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
 *
 * @author Larry 5/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const splashStyle = css({
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '400px',
    height: '300px',
    '>:first-child': {
        font: `300 75px ${font.corporate}`,
        color: colour.white,
        backgroundColor: background.navigation,
        padding: px(24, 16),
        lineHeight: '0.9em',
        '>:last-child': {
            color: colour.border,
            font: `100 20px ${fontName}`,
            padding: px(16, 0, 0, 4)
        }
    },
    '>:last-child': {
        backgroundColor: background.white,
        border: border(background.navigation),
        font: font.text,
        padding: px(16, 15, 15, 19)
    }
});

// tslint:disable-next-line:variable-name
const SplashComponent: React.FC = (props) => (
    <div css={splashStyle}>
        <div>
            <div>Smart Health</div>
            <div>{tagLine}</div>
        </div>
        <div>
            {props.children}
        </div>
    </div>
);

export default SplashComponent;
