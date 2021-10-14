import {storiesOf} from '@storybook/react';
import React from 'react';
import MinimumBrowserSupportTable from 'test/config/MinimumBrowserSupportTable';

/**
 * Show a browser support table.
 *
 * @author Thompson 8/07/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('BrowserSupport', module)
    .add('Support table', () => <MinimumBrowserSupportTable />);
