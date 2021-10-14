import {storiesOf} from '@storybook/react';
import DiagnosticResultsTableTransform from 'main/field/DiagnosticResultsTableTransform';
import React from 'react';
import resultsTableWithDepthValue from 'test/field/DiagnosticResultsTableSourceData.json';

/**
 * Allow testing for DiagnosticResultsTableTransform.tsx.
 *
 * @author Thompson 22/04/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Field/Custom', module)
    .add('DiagnosticResultsTable',
        () =>
        {
            return (
                <DiagnosticResultsTableTransform data={resultsTableWithDepthValue} />
            );
        });
