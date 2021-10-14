import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';

/**
 * Render icon and medical group name
 *
 * @author Thompson 2/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicalGroupIconAndNameProps
{
    medicalGroup: MedicalGroup | MedicalGroupDigest;
    toolTip?: string;
}

const medicalGroupIconAndNameStyle = css({
    color: colour.text,
    font: font.text,
    '.shicon': {
        fontSize: '16px',
        height: '17px',
        lineHeight: 1,
        marginRight: '2px',
        verticalAlign: '-2px'
    }
});

class MedicalGroupIconAndName extends React.Component<MedicalGroupIconAndNameProps>
{
    public render()
    {
        const { medicalGroup } = this.props;
        return (
            <span css={medicalGroupIconAndNameStyle} title={this.props.toolTip}>
                <SHIcon icon={medicalGroup.participating ? 'medicalgroup' : 'medicalgroup-nonparticipating'}
                    noTitle={true} />
                <span>{medicalGroup.name}</span>
            </span>
        );
    }
}

export default MedicalGroupIconAndName;
