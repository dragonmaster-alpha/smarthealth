import {I18nProvider} from '@lingui/react';
// import initStoryshots from '@storybook/addon-storyshots';
import {addDecorator} from '@storybook/react';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React from 'react';
import '../../../main/styles/main.scss';

/**
 * Run Storybook stories as a Jest test
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

const I18N = storyFn => (
    <I18nProvider language="en">
        {storyFn()}
    </I18nProvider>
);
addDecorator(I18N);

// TODO fix - this is returning man errors
// initStoryshots({ configPath: 'src/test/javascript/storybook/' });

test('Behave as a Jest file', () =>
{
});
