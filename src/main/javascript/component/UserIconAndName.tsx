import css from '@emotion/css';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {fullName} from 'main/format/NameFormat';
import React from 'react';
import User from 'smarthealth-javascript/User';
import UserDigest from 'smarthealth-javascript/UserDigest';

/**
 * Render correct participating icon with user full name format
 *
 * @author Thompson 2/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface UserIconAndNameProps
{
    toolTip?: string;
    user: User | UserDigest;
}

const userIconAndNameStyle = css({
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

class UserIconAndName extends React.Component<UserIconAndNameProps>
{
    public render()
    {
        const { user } = this.props;
        return (
            <span css={userIconAndNameStyle} title={this.props.toolTip}>
                <SHIcon icon={user.participating ? 'user-small' : 'user-nonparticipating-small'} noTitle={true} />
                <span>{fullName(user.name)}</span>
            </span>
        );
    }
}

export default UserIconAndName;
