import React from 'react';

/**
 * Component to display a Smart Health standard png icon
 *
 * @author Larry 28/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

interface IconProps
{
    name: string;
    tooltip?: string;
}

class Icon extends React.Component<IconProps>
{
    public render()
    {
        if (!this.props.name)
        {
            return null;
        }
        return <img alt={this.props.name} src={`/assets/icon/${this.props.name}.png`} title={this.props.tooltip} />;
    }
}

export default Icon;
