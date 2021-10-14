/**
 * Constants for DateTimeField and associated components.
 *
 * @author Thompson 12/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */

export const OVERLAY_SIDE_PADDING = 12;
export const OVERLAY_TOP_PADDING = 8;

// Restrict input characters for Day and Month inputs. Restrict to only numbers, characters, /, -, . and space.
export const DATE_INPUT_RESTRICTOR = new RegExp(/^[0-9A-Za-z\/\-. ]*$/);

export const YEAR_INPUT_RESTRICTOR = new RegExp(/^[0-9]*$/);
