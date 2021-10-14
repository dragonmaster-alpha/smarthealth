import {css} from '@emotion/core';
import React from 'react';
import PatientPAS from 'smarthealth-javascript/PatientPAS';

/**
 * Render PAS control indicator if under PAS control
 *
 * @author Thompson 31/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientPASIndicatorProps
{
    pas: PatientPAS;
    sourcePASID?: number;
}

const spanStyle = css({
    fontWeight: 600,
    marginRight: '3em',
    textAlign: 'right',
    width: '100%'
});

class PatientPASIndicator extends React.Component<PatientPASIndicatorProps>
{
    public render()
    {
        const { pas, sourcePASID } = this.props;
        if ((pas.pasID && !sourcePASID) || ((sourcePASID !== undefined) && (pas.pasID === sourcePASID)))
        {
            return <span css={spanStyle}>Under Control of {pas.pasName}</span>;
        }
        else if (sourcePASID)
        {
            return <span css={spanStyle}>Under Control of PAS</span>;
        }
        else
        {
            return <span css={spanStyle}>&nbsp;</span>;
        }
    }
}

export default PatientPASIndicator;
