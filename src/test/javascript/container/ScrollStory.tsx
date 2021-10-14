import {css} from '@emotion/core';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import ErrorBoundary from 'main/component/ErrorBoundary';
import Scroll from 'main/container/Scroll';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import ConsultationNotes from 'smarthealth-rest-test/formdesc/service/Form.Service.ConsultationNote.json';
import SocialWorkerAssessment from 'smarthealth-rest-test/formdesc/service/Form.Service.SocialWorkerAssessment.json';
import TextMother from 'test/data/TextMother';

/**
 *  Tester for ScrollPanel.tsx
 *
 * @author Thompson 14/06/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
// tslint:disable-next-line:variable-name
const ImageTest: React.FC<{ url: string }> = (props) =>
{
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ backgroundColor: 'lightblue' }}>Header</div>
            <div style={{ flexGrow: 1 }}>
                <Scroll>
                    <div style={{ backgroundColor: 'lightpink', padding: '16px' }}>
                        <img src={props.url} />
                    </div>
                </Scroll>
            </div>
            <div style={{ backgroundColor: 'lightblue' }}>Footer</div>
        </div>
    );
};

const buttonsStyle = css({
    textAlign: 'center',
    '.p-button': {
        margin: '0 0.5em'
    }
});

// tslint:disable-next-line:variable-name
const FormTest: React.FC<{ formDescription: FormDescription, title: string }> = (props) =>
{
    const data = {};
    const formContext = FormContext.build(null, props.formDescription);
    formContext.editing = true;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h2 className="content-h2">{props.title}</h2>
            <div style={{ flexGrow: 1 }}>
                <Scroll>
                    <ErrorBoundary>
                        <FormComponent context={formContext} data={data} />
                    </ErrorBoundary>
                </Scroll>
            </div>
            <div css={buttonsStyle}>
                <Button label="Save" key="Save" onClick={action('onClickSave')} />
                <Button label="Cancel" key="Cancel" onClick={action('onClickSave')} />
            </div>
        </div>
    );
};

storiesOf('Container/Scroll', module)
    .add('Small Image', () =>
    {
        return <ImageTest url="https://i.imgur.com/uj9yrxM.png" />;
    })
    .add('Medium Image', () =>
    {
        return <ImageTest url="https://www.hackingwithswift.com/uploads/matrix.jpg" />;
    })
    .add('Large image', () =>
    {
        return <ImageTest url="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86" />;
    })
    // .add('Small Form', () =>
    // {
    //     return <FormTest formDescription={PatientNotes as FormDescription} title="Patient Notes" />;
    // })
    .add('Medium Form', () =>
    {
        return <FormTest formDescription={ConsultationNotes as FormDescription} title="Consultation Notes" />;
    })
    .add('Long Form', () =>
    {
        return <FormTest formDescription={SocialWorkerAssessment as FormDescription}
            title="Social Worker Assessment" />;
    })
    .add('Medium text', () =>
    {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ backgroundColor: 'lightblue' }}>Header</div>
                <div style={{ flexGrow: 1 }}>
                    <Scroll>
                        {TextMother.text(500)}
                    </Scroll>
                </div>
                <div style={{ backgroundColor: 'lightblue' }}>Footer</div>
            </div>
        );
    })
    .add('Long text', () =>
    {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ backgroundColor: 'lightblue' }}>Header</div>
                <div style={{ flexGrow: 1 }}>
                    <Scroll>
                        {TextMother.text(5000)}
                    </Scroll>
                </div>
                <div style={{ backgroundColor: 'lightblue' }}>Footer</div>
            </div>
        );
    })
    .add('Very long text', () =>
    {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ backgroundColor: 'lightblue' }}>Header</div>
                <div style={{ flexGrow: 1 }}>
                    <Scroll>
                        {TextMother.text(50000)}
                    </Scroll>
                </div>
                <div style={{ backgroundColor: 'lightblue' }}>Footer</div>
            </div>
        );
    })
    .add('Tabs (doesn\'t work properly', () =>
    {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ flexGrow: 1 }}>
                    <TabView>
                        <TabPanel header="Medium text">
                            {TextMother.text(500)}
                        </TabPanel>
                        <TabPanel header="Long text">
                            {TextMother.text(5000)}
                        </TabPanel>
                        <TabPanel header="Very long text">
                            <Scroll>
                                {TextMother.text(50000)}
                            </Scroll>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        );
    });
