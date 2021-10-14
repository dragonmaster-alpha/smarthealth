import {storiesOf} from '@storybook/react';
import NewPatientDialog from 'main/patient/NewPatientDialog';
import React from 'react';
import MockSessionStore from 'test/store/MockSessionStore';

/**
 * Allow debugging of NewPatientDialog
 *
 * @author Larry 19/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Patient/NewPatientDialog', module)
    .add('Standard', () => (<NewPatientDialog sessionStore={new MockSessionStore()} />));
