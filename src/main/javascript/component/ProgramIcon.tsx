import lodash from 'lodash';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';
import Program, {programAbbreviations, programDescriptions} from 'smarthealth-javascript/Program';

/**
 * An icon for a program
 *
 * @author Larry 24/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ProgramIconProps
{
    program: Program | string;
}

class ProgramIcon extends React.Component<ProgramIconProps>
{
    public render(): React.ReactNode
    {
        if (!this.props.program)
        {
            return null;
        }
        else if (lodash.isString(this.props.program))
        {
            if (this.props.program in Program)
            {
                return this.renderProgram(this.props.program as Program);
            }
            else
            {
                return '?';
            }
        }
        else
        {
            return this.renderProgram(this.props.program as Program);
        }
    }

    private renderProgram(program: Program)
    {
        return <SHIcon icon={`program-${programAbbreviations[program].toLowerCase()}`}
            title={programDescriptions[program]} style={{ color: colour.primary2 }} />;
    }
}

export default ProgramIcon;
