import {storiesOf} from '@storybook/react';
import AbnormalResult from 'main/component/AbnormalResult';
import React from 'react';

/**
 * Allow debugging of AbnormalResultStory.tsx
 *
 * @author Thompson 10/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/AbnormalResult', module)
    .add('abnormalFlag=null', () => (
        <>
            <AbnormalResult abnormalFlag={null} value={1.20} />
            <h3>Description</h3>
            <ul>
                <li>Present value with normal styling</li>
            </ul>
        </>
    ))
    .add('abnormalFlag="N"', () => (
        <>
            <AbnormalResult abnormalFlag="N" value={1.20} />
            <h3>Description</h3>
            <ul>
                <li>Present value with normal styling</li>
            </ul>
        </>
    ))
    .add('abnormalFlag="L"', () => (
        <>
            <AbnormalResult abnormalFlag="L" value={1.20} /><h3>Description</h3>
            <ul>
                <li>Present value with abnormal styling</li>
            </ul>

        </>
    ));
