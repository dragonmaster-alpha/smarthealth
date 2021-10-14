import {storiesOf} from '@storybook/react';
import WaitModalComponent from 'main/wait/WaitModalComponent';
import React from 'react';

/**
 * Allow debugging of WaitModalComponent component
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Wait/WaitModalComponent', module)
    .add('Standard', () => <WaitModalComponent />);
