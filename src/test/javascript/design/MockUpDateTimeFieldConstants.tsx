import {css} from '@emotion/core';
import {colour, dropdownBoxShadow} from 'main/application/ThemeConstants';
import {border} from 'main/utility/StyleUtility';

/**
 * Constants for MockUpDateTimeField
 *
 * @author Larry 24/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export const OVERLAY_SIDE_PADDING = 12;
export const OVERLAY_TOP_PADDING = 8;

export const dateTimeOverlayStyle = css({
    backgroundColor: colour.white,
    border: border(colour.border),
    boxShadow: dropdownBoxShadow
});
