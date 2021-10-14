import {css} from '@emotion/core';
import {background, colour, dropdownBoxShadow, field, font} from 'main/application/ThemeConstants';
import OverlayPanel from 'main/container/OverlayPanel';
import {px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Mockup for an overlay
 *
 * @author Larry 11/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MockUpOverlayProps
{
    onExit: (event) => void;
}

const dropdownPlaceholderStyle = css({
    marginTop: px(-field.marginHeightPx),
    marginBottom: px(field.marginHeightPx),
    position: 'relative'
});

const dropdownStyle = css({
    backgroundColor: colour.white,
    border: field.border,
    borderRadius: field.borderRadius,
    boxShadow: dropdownBoxShadow,
    color: colour.text,
    font: font.text,
    div: {
        cursor: 'pointer',
        padding: px(4, 8),
        ':hover': {
            backgroundColor: background.buttonHover
        }
    }
});

class MockUpOverlay extends React.Component<MockUpOverlayProps>
{
    public render(): React.ReactNode
    {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        return (
            <div css={dropdownPlaceholderStyle}>
                <OverlayPanel onExit={this.props.onExit}>
                    <div css={dropdownStyle}>
                        {options.map(option => <div>{option}</div>)}
                    </div>
                </OverlayPanel>
            </div>
        );
    }
}

export default MockUpOverlay;
