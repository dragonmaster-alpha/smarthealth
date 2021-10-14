import {css} from '@emotion/core';
import {AxiosRequestConfig} from 'axios';
import {autobind} from 'core-decorators';
import REST_TESTER from 'main/component/RestTesterFormDescription';
import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import AppStore from 'main/store/AppStore';
import HandlerStore from 'main/store/HandlerStore';
import FormDataUtility from 'main/utility/FormDataUtility';
import {action, observable, runInAction, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button} from 'primereact/button';
import * as React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Component to test REST API end points
 *
 * @author Thompson 5/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface RestTesterProps
{
    appStore?: AppStore;
    handlers?: HandlerStore;
}

const buttonsStyle = css({
    textAlign: 'center',
    '.p-button': {
        margin: '0 0.5em'
    }
});

@inject('appStore', 'handlers')
@observer
class RestTester extends React.Component<RestTesterProps>
{
    @observable
    private data: any = { response: '', responseStatus: '' };

    @observable
    private readonly formContext: FormContext;

    constructor(props)
    {
        super(props);
        this.data.baseUrl = this.props.handlers.axios.defaults.baseURL;
        const restDescription = REST_TESTER as FormDescription;

        const observableData = toJS(this.data);
        // unless fields are there components are not controlled
        FormDataUtility.populateMissingFieldsWithNulls(observableData, restDescription.fieldsAndSections);
        this.data = observableData;

        this.formContext = FormContext.build(props.appStore, restDescription);
        this.formContext.editing = true;
    }

    @action.bound
    private async onClickSend()
    {
        try
        {
            const request: AxiosRequestConfig = {
                method: this.data.requestMethod,
                url: `${this.data.requestUrl}`,
                data: this.data.requestBody && JSON.parse(this.data.requestBody)
            };
            this.data.responseStatus = 'Sending';
            this.data.response = '';
            const response = await this.props.handlers.axios.request(request);
            runInAction(() =>
            {
                this.data.responseStatus = `${response.status} ${response.statusText}`;
                this.data.response = JSON.stringify(response.data, null, 4);
            });
        }
        catch (error)
        {
            runInAction(() =>
            {
                if (error.response)
                {
                    this.data.responseStatus = `${error.response.status} ${error.response.statusText}`;
                }
                this.data.response = JSON.stringify(error, null, 4);
            });
        }
    }

    @autobind
    private onCopy(jsonFormat: boolean): void
    {
        const keyDoubleQuote: RegExp = /\"([^(\")"]+)\":/g;
        const response: string = jsonFormat
            ? this.data.response
            : this.data.response.replace(keyDoubleQuote, '$1:');

        // @ts-ignore
        navigator.clipboard.writeText(response);
    }

    public render()
    {
        return (
            <div className="cp-restTester">
                <FormComponent context={this.formContext} data={this.data} />
                <div css={buttonsStyle} className="p-col-12">
                    <Button label="Send" onClick={this.onClickSend} />
                    <Button label="Copy as JSON" onClick={() => this.onCopy(true)} disabled={!this.data.response} />
                    <Button label="Copy as Object" onClick={() => this.onCopy(false)} disabled={!this.data.response} />
                </div>
            </div>
        );
    }
}

export default RestTester;
