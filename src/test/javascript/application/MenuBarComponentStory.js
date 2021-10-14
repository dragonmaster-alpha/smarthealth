import {storiesOf} from '@storybook/react';
import MenuBarComponent from 'main/application/MenuBarComponent';
import React from 'react';
import {PATIENT_HARRY_POTTER} from 'test/model/PatientMother';
import MockSessionStore from 'test/store/MockSessionStore';

/**
 * Allow debugging of Sidebar component
 *
 * Needs to use Provider from mobx because the child controls also require the sessionStore.
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
storiesOf('Application/MenuBarComponent', module)
    .add('Without patient', () => (
        <MenuBarComponent />
    ))
    .add('With patient', () => (
        <MenuBarComponent sessionStore={new MockSessionStore({ currentPatient: PATIENT_HARRY_POTTER })} />
    ));
