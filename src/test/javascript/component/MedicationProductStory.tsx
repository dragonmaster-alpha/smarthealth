import {storiesOf} from '@storybook/react';
import MedicationProduct from 'main/component/MedicationProduct';
import React from 'react';

/**
 * Story for MedicationProduct
 *
 * @author Larry 15/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/MedicationProduct', module)
    .add('Product',
        () =>
        {
            const codedValue = {
                code: '6354',
                codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Product',
                value: 'Lactobac Sachets'
            };
            return <MedicationProduct codedValue={codedValue} />;
        })
    .add('Generics',
        () =>
        {
            const codedValue = {
                code: '2798',
                codeSet: 'http://ns.smarthealth.com.au/valueset/MIMS_Generics',
                value: 'Lacosamide'
            };
            return <MedicationProduct codedValue={codedValue} />;
        });
