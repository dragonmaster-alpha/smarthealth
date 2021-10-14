import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import HomeButton from 'main/component/HomeButton';
import ActionDescription from 'main/page/ActionDescription';
import PageDescription from 'main/page/PageDescription';
import React from 'react';

/**
 * Allow debugging of HomeButton component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Component/HomeButton', module)
    .add('page', () =>
    {
        const page: PageDescription = { key: 'Test', icon: 'patient', title: 'Test Page' };
        return <HomeButton page={page} />;
    })
    .add('action', () =>
    {
        const action: ActionDescription = {
            key: 'Test',
            icon: 'user',
            title: 'Test Action',
            doAction: appStore =>
            {
                storybookAction('Test')('clicked');
            }
        };
        return <HomeButton page={action} />;
    });
