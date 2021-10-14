import {autobind} from 'core-decorators';
import {ServiceRecordReferenceEntityHyperlinkProps} from 'main/component/ServiceRecordReferenceEntityHyperlink';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import Tooltip from 'primereact/tooltip';
import React from 'react';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Render a value with service record info tooltip. User can click on the value which opens the Service Record.
 *
 * @author Thompson 17/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ServiceRecordReferenceHyperlinkProps extends StoreProps, ServiceRecordReferenceEntityHyperlinkProps
{
    serviceType: ServiceType;
}

@inject('appStore')
class ServiceRecordReferenceHyperlink extends React.Component<ServiceRecordReferenceHyperlinkProps>
{
    private linkRef;

    public componentDidMount()
    {
        const tooltipValue = `${this.props.serviceType.abbreviation
        }\n${this.props.appStore.i18nStore.formatEventDateTime(this.props.service.serviceDate)
        }\n${this.props.service.summary}`;
        // Implementation of Tooltip referenced from PrimeReact InputText
        // https://github.com/primefaces/primereact/blob/master/src/components/inputtext/InputText.js
        if (this.linkRef)
        {
            // @ts-ignore
            new Tooltip({
                content: tooltipValue,
                target: this.linkRef,
                options: { position: 'bottom' }
            });
        }
    }

    @autobind
    private onClickOpenService()
    {
        this.props.appStore.actionStore.openService(this.props.service);
    }

    public render()
    {
        return (
            <span ref={(ref) => this.linkRef = ref} className="cp-ServiceRecordReferenceHyperlink"
                onClick={this.onClickOpenService}>
                {this.props.value}
            </span>
        );
    }
}

export default ServiceRecordReferenceHyperlink;
