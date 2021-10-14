import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {font} from 'main/application/ThemeConstants';
import IconBordelessButton from 'main/component/IconBordelessButton';
import BaseField, {BaseFieldProps} from 'main/field/BaseField';
import DateUtility from 'main/utility/DateUtility';
import {serviceRecordReferenceToolTip} from 'main/utility/ToolTipUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Field for service record reference
 *
 * @author Larry 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface ServiceRecordReferenceFieldProps
    extends BaseFieldProps<FormFieldServiceRecordReference, ServiceRecordReference>
{
    serviceType: ServiceType;
}

const spanStyle = css({
    font: font.text,
    '>button': {
        marginLeft: '8px'
    }
});

@inject('appStore')
@observer
class ServiceRecordReferenceField
    extends BaseField<FormFieldServiceRecordReference, ServiceRecordReference, ServiceRecordReferenceFieldProps>
{
    protected buildToolTip(): string
    {
        const toolTip = super.buildToolTip();
        if (toolTip)
        {
            return toolTip;
        }

        if (!this.props.value || !this.props.serviceType)
        {
            return null;
        }

        return serviceRecordReferenceToolTip(this.props.value, this.props.serviceType, this.props.appStore);
    }

    @autobind
    private onOpenService()
    {
        this.props.appStore.actionStore.openService(this.props.value);
    }

    private renderButton()
    {
        return <IconBordelessButton icon="servicerecord-small" toolTip="Open Service Record"
            onClick={this.onOpenService} />;
    }

    protected renderEditing(): React.ReactNode
    {
        return this.renderView();
    }

    protected renderObject(value): React.ReactNode
    {
        if (this.field.displayType === ServiceRecordReferenceDisplayType.ServiceDate)
        {
            const dateTime = DateUtility.formatEventDateTime(this.props.value.serviceDate,
                this.props.appStore.i18nStore.locale);
            return (
                <span css={spanStyle}>
                    {dateTime}
                    {this.renderButton()}
                </span>
            );
        }
        else if (this.field.displayType === ServiceRecordReferenceDisplayType.Summary)
        {
            return (
                <span css={spanStyle}>
                    {this.props.value.summary}
                    {this.renderButton()}
                </span>
            );
        }
        else
        {
            return this.renderButton();
        }
    }
}

export default ServiceRecordReferenceField;
