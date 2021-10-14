import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * A count in a circle
 *
 * @author Larry 4/02/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
const spanStyle = css({
    alignItems: 'center',
    backgroundColor: colour.error,
    borderRadius: '50%',
    color: colour.white,
    display: 'inline-flex',
    font: font.alertCount,
    justifyContent: 'center',
    minWidth: '16px',
    padding: '2px 3px',
    textAlign: 'center',
    verticalAlign: '2px'
});

interface AlertCountProps
{
    count: number;
}

class AlertCount extends React.Component<AlertCountProps>
{
    public render(): React.ReactNode
    {
        const { count } = this.props;
        if (count > 0)
        {
            return <div css={spanStyle} title={count.toString()}>{count}</div>;
        }
        else
        {
            return null;
        }
    }
}

export default AlertCount;
