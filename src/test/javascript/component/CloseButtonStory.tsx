import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import CloseButton from 'main/component/CloseButton';
import React from 'react';

/**
 * Tester for Chip
 *
 * @author Larry 16/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function onClose()
{
    storybookAction('onClose')('onClose()');
}

storiesOf('Component/CloseButton', module)
    .add('standard', () =>
    {
        return <CloseButton onClose={onClose} />;
    })
    .add('small', () =>
    {
        return <CloseButton onClose={onClose} small={true} />;
    })
    .add('disabled', () =>
    {
        return <CloseButton onClose={onClose} disabled={true} />;
    })
    .add('small, disabled', () =>
    {
        return <CloseButton onClose={onClose} small={true} disabled={true} />;
    });
