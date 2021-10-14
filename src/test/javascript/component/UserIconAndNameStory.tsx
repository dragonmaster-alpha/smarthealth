import {storiesOf} from '@storybook/react';
import UserIconAndName from 'main/component/UserIconAndName';
import React from 'react';
import {USER_JEMMA_HULL, USER_NON_PARTICIPATING, USER_WILLIAM_WENG} from 'test/data/UserMother';

/**
 * Story for UserIconAndName
 *
 * @author Larry 16/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/UserIconAndName', module)
    .add('Participating', () =>
    {
        return <UserIconAndName user={USER_JEMMA_HULL} />;
    })
    .add('Non-participating', () =>
    {
        return <UserIconAndName user={USER_NON_PARTICIPATING} />;
    })
    .add('Tooltip', () =>
    {
        return <UserIconAndName user={USER_WILLIAM_WENG} toolTip="William Weng (Smart Health @ Darlinghurst)" />;
    });
