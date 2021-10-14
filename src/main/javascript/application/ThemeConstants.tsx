/**
 * Constants for the application theme
 *
 * @author Larry 22/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
import {border} from 'main/utility/StyleUtility';

export const tagLine = 'We need a new tagline for the Web UI';

export const colour = {
    cool: '#4ECAFF',
    error: '#E81E00',
    success: '#00C245',
    sunset: '#FFCC35',
    warning: '#FF891D',

    primary2: '#032DA5',
    primary2a: '#003ADE',
    primary6: '#3D4F83',

    // colour.navigation is also for field "require" font colour and "X" button in Toast
    navigation: '#9BA8CB',
    navigation2: '#8A96B6',
    white: 'white',
    sidebarSelected: '#FFC71F',
    border: '#DCE1EC',
    tabBorder: '#b6c3f6',
    label: '#3D4F83',
    text: '#242D3B',
    disabled: '#686868',
    hover: '#686868',
    focus: '#003ADE',
    placeholder: '#ADADAD'
};

export const background = {
    white: 'white',
    main: '#f6f7fa',
    navigation: '#171f48',
    gridRow: '#f1f1f3',
    section: '#dee3f3',
    buttonHover: '#f3f4ff',
    disabled: '#E3E3E3'
};

export function rowBackgroundColour(oddRow: boolean)
{
    return oddRow ? background.gridRow : background.white;
}

export const fontName = 'Roboto, Arial, Helvetica, sans-serif';

export const font = {
    h1: `500 24px ${fontName}`,
    h2: `500 20px ${fontName}`,
    h3: `500 16px ${fontName}`,
    text: `14px ${fontName}`,
    label: `500 14px ${fontName}`,
    menu: `14px ${fontName}`,
    navHeading: `500 14px ${fontName}`,
    navItem1: `16px ${fontName}`,
    navItem2: `14px ${fontName}`,
    navItemIcon: `18px ${fontName}`,
    button: `500 16px ${fontName}`,
    buttonSmall: `500 14px ${fontName}`,
    chevron: `500 8px ${fontName}`,
    chevronSmall: `6px ${fontName}`,
    doubleChevron: `500 10px ${fontName}`,
    corporate: `ryoGothic, ${fontName}`,
    alertCount: `500 9px ${fontName}`
};

export const form = {
    border: border(colour.tabBorder),
    buttonBarHeight: '56px'
};

const invalidBoxShadow = `0 0 2px 2px ${colour.error}`;

export const dropdownBoxShadow = '2px 2px 2px rgba(0, 0, 0, 0.2), -2px 2px 2px rgba(0, 0, 0, 0.2)';

export const field = {
    border: border(colour.border),
    borderInvalid: border(colour.error),
    borderRadius: '4px',
    heightPx: 32,
    borderPx: 1,
    marginHeightPx: 3,
    paddingHeightPx: 3,
    // viewPaddingHeightPx: this.borderPx + this.marginHeightPx + this.paddingHeightPx,
    viewPaddingHeightPx: 7,
    viewPaddingWidthPx: 8,
    focus: {
        border: border(colour.focus),
        outline: 'none'
    },
    focusInvalid: {
        border: border(colour.focus),
        outline: 'none',
        boxShadow: invalidBoxShadow
    },
    hover: {
        border: border(colour.hover)
    },
    hoverInvalid: {
        border: border(colour.hover),
        boxShadow: invalidBoxShadow
    }
};

// include at the end of the styles ...hoverAndFocus - they need to be in this order
export const hoverAndFocus = {
    ':hover': field.hover,
    ':focus': field.focus
};

// include at the end of the styles ...hoverAndFocusWithin - they need to be in this order
export const hoverAndFocusWithin = {
    ':hover': field.hover,
    ':focus-within': field.focus
};

export const table = {
    border: border(colour.tabBorder),
    cell: {
        border: border(colour.border)
    }
};

export const sidebar = {
    border: 'solid 1px #1F3464',
    paddingLeft: '1.5em',
    width: '288px'
};

export const title = {
    border: 'solid 1px #CCD2E1',
    height: '64px'
};

/**
 * All zIndexes need to go here to ensure that their order is correct
 */
export const zIndex = {
    overlay: 100,
    modalDialog: 200,
    toast: 300
};
