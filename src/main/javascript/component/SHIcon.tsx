import lodash from 'lodash';
import React from 'react';

/**
 * Display a Smart Health icon
 *
 * @author Larry 8/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SHIconProps
{
    icon: string;
    noTitle?: boolean;
    style?: React.CSSProperties;
    title?: string;
}

// tslint:disable-next-line:variable-name
const SHIcon: React.FC<SHIconProps> = (props) =>
{
    const className = `shicon sh-${props.icon}`;
    const title = props.noTitle ? '' : (props.title || lodash.startCase(props.icon));
    return <span className={className} style={props.style} title={title}></span>;
};

export default SHIcon;
