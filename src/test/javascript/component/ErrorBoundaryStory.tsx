import {storiesOf} from '@storybook/react';
import ErrorBoundary from 'main/component/ErrorBoundary';
import React from 'react';

/**
 * Allow debugging of ErrorBoundary component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
// tslint:disable-next-line:variable-name
const RenderError = () =>
{
    throw new Error('Render error');
};

storiesOf('Component/ErrorBoundary', module)
    .add('No error', () => (<ErrorBoundary>OK</ErrorBoundary>))
    .add('Error', () => (<ErrorBoundary><RenderError /></ErrorBoundary>));
