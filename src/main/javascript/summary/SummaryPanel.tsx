import FormComponent from 'main/form/FormComponent';
import FormContext from 'main/form/FormContext';
import StoreProps from 'main/store/StoreProps';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Display a particular service summary based on the SummaryType.
 *
 * @author Thompson 6/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export interface SummaryPanelProps extends StoreProps
{
    data: EntityData;
    formDescription: FormDescription;
}

@inject('appStore')
@observer
class SummaryPanel extends React.Component<SummaryPanelProps>
{
    @observable
    private readonly formContext: FormContext;

    constructor(props)
    {
        super(props);
        this.formContext = FormContext.build(props.appStore, props.formDescription);
    }

    public render()
    {
        return <FormComponent context={this.formContext} data={this.props.data} />;
    }
}

export default SummaryPanel;
