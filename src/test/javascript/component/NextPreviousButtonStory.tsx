import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import NextPreviousButton from 'main/component/NextPreviousButton';
import React from 'react';

/**
 * Tester for NextPreviousButton
 *
 * @author Thompson 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
storiesOf('Component/NextPreviousButton', module)
    .add('Left', () => <NextPreviousButton onClick={storybookAction('onClick')} previous={true} toolTip="Left" />)
    .add('Left disabled', () =>
        <NextPreviousButton disabled={true} onClick={storybookAction('onClick')} previous={true} toolTip="Left" />
    )
    .add('Right', () => <NextPreviousButton onClick={storybookAction('onClick')} toolTip="Right" />)
    .add('Right disabled', () =>
        <NextPreviousButton disabled={true} onClick={storybookAction('onClick')} toolTip="Right" />
    );
