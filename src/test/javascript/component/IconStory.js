import {storiesOf} from '@storybook/react';
import Icon from 'main/component/Icon';
import React from 'react';

/**
 * Allow debugging of Icon component
 *
 * @author Larry 08/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Component/Icon', module)
    .add('User', () => (<Icon name="user" />))
    .add('Patient', () => (<Icon name="patient/patient" />));
