import {css} from '@emotion/core';
import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import MockUpForm from 'test/design/MockUpForm';

/**
 * Display of a service record for the mockup
 *
 * @author Larry 8/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceRecordProps
{
    data: { [field: string]: any };
    editing?: boolean;
    form: FormDescription;
    invalidFields?: { [field: string]: boolean };
    title: string;
}

const divStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    '>h2': {
        backgroundColor: colour.primary6,
        color: colour.white,
        font: font.h2,
        padding: '8px 16px',
        margin: 0
    }
});

class MockUpServiceRecord extends React.Component<MockUpServiceRecordProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={divStyle}>
                <MockUpForm form={this.props.form} data={this.props.data} editing={this.props.editing} />
            </div>
        );
    }
}

export default MockUpServiceRecord;
