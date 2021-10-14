import {css} from '@emotion/core';
import {background, colour, field} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * A bar to show progress.
 *
 * TODO Only indeterminate is implemented. Need to implement percentage.
 *
 * @author Larry 5/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface ProgressBarProps
{
    indeterminate?: boolean;
}

const progressBarIndeterminateStyle = css({
    height: '6px',
    backgroundColor: background.gridRow,
    borderRadius: field.borderRadius,
    position: 'relative',
    '>div': {
        backgroundColor: colour.primary2,
        borderRadius: field.borderRadius,
        position: 'absolute',
        width: '50%',
        height: '100%',
        left: 0,
        overflow: 'hidden',
        animation: 'animation 5s linear infinite'
    },
    '@keyframes animation': {
        '0%': { transform: 'translateX(-25%) scaleX(50%)' },
        '4%': { transform: 'translateX(-25%) scaleX(50%)' },
        '16%': { transform: 'translateX(0%) scaleX(100%)' },
        '38%': { transform: 'translateX(100%) scaleX(100%)' },
        '50%': { transform: 'translateX(125%) scaleX(50%)' },
        '54%': { transform: 'translateX(125%) scaleX(50%)' },
        '66%': { transform: 'translateX(100%) scaleX(100%)' },
        '88%': { transform: 'translateX(0%) scaleX(100%)' },
        '100%': { transform: 'translateX(-25%) scaleX(50%)' }
    }
});

class ProgressBar extends React.Component<ProgressBarProps>
{
    public render(): React.ReactNode
    {
        if (this.props.indeterminate)
        {
            return (
                <div css={progressBarIndeterminateStyle}>
                    <div>&nbsp;</div>
                </div>
            );
        }
        else
        {
            return <>TODO</>;
        }
    }
}

export default ProgressBar;
