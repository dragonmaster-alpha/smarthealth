import classNames from 'classnames';
import React from 'react';

/**
 * Display result value and present value with abnormal styling it is abnormal.
 *
 * A result is abnormal if abnormalFlag is defined and is not equal to 'N'.
 *
 * @author Thompson 10/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface AbnormalResultProps
{
    abnormalFlag: string;
    value: React.ReactNode;
}

class AbnormalResult extends React.Component<AbnormalResultProps>
{
    public static isAbnormal(abnormalFlag: string): boolean
    {
        if (!abnormalFlag || (abnormalFlag === 'N'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    public render()
    {
        return (
            <span className={classNames({ 'is-abnormal': AbnormalResult.isAbnormal(this.props.abnormalFlag) })}>
                {this.props.value}
            </span>
        );
    }
}

export default AbnormalResult;
