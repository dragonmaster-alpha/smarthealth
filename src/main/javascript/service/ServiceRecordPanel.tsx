import {autobind} from 'core-decorators';
import {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import serviceRecordPanelFactory from 'main/service/ServiceRecordPanelFactory';
import StoreProps from 'main/store/StoreProps';
import FormDataUtility from 'main/utility/FormDataUtility';
import PermissionUtility from 'main/utility/PermissionUtility';
import {computed, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormDescription from 'smarthealth-javascript/FormDescription';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Render an existing Service Record or a new Service Record and buttons
 *
 * @author Larry 25/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface ServiceRecordPanelProps extends StoreProps
{
    formDescription: FormDescription;
    newServiceRecord: boolean;
    onClose: () => void;
    // TODO Larry work out where this state should be
    openTab: (serviceSummary: ServiceSummary) => void;
    serviceRecord: ServiceRecord;
    serviceSummary: ServiceSummary;
    serviceType: ServiceType;
}

@inject('appStore', 'sessionStore', 'handlers')
@observer
class ServiceRecordPanel<T> extends React.Component<ServiceRecordPanelProps>
{
    @computed
    private get canModifyServiceRecord(): boolean
    {
        return PermissionUtility.canModifyServiceRecord(this.props.sessionStore.permissions, this.props.serviceRecord,
            this.props.serviceType);
    }

    @computed
    private get canViewServiceRecord(): boolean
    {
        return PermissionUtility.canViewServiceRecord(this.props.sessionStore.permissions, this.props.serviceRecord,
            this.props.serviceType);
    }

    private async onCreateServiceRecord(serviceRecord: ServiceRecord): Promise<boolean>
    {
        const { handlers } = this.props;
        const dataCleaned = FormDataUtility.prepareObjectForServer(toJS(serviceRecord));
        const newServiceRecord = {
            ...this.props.serviceRecord,
            data: dataCleaned
        };
        const newServiceID: number = await handlers.serviceRecordHandler.createNewServiceRecord(newServiceRecord);

        if (newServiceID !== null)
        {
            this.props.onClose();
            const newServiceSummary: ServiceSummary = {
                ...this.props.serviceSummary,
                serviceID: newServiceID
            };
            this.props.openTab(newServiceSummary);
        }
        else
        {
            return false;
        }
    }

    @autobind
    private onSave(serviceRecord: ServiceRecord, editedServiceRecord: ServiceRecord): Promise<boolean>
    {
        const { handlers, serviceSummary } = this.props;
        const body = {
            data: toJS(editedServiceRecord),
            metadata: toJS(serviceRecord.metadata),
            version: serviceRecord.version
        };
        return handlers.serviceRecordHandler.updateServiceRecord(serviceSummary.serviceID, body);
    }

    public render(): React.ReactNode
    {
        if (!this.canViewServiceRecord)
        {
            return <>No permission to view this service record.</>;
        }

        const { formDescription, onClose, serviceRecord, newServiceRecord } = this.props;
        const onSave = !this.canModifyServiceRecord
            ? null
            : newServiceRecord
                ? (serviceRecord) => this.onCreateServiceRecord(serviceRecord)
                : (editedServiceRecord) => this.onSave(serviceRecord, editedServiceRecord);

        const props: EditViewFormComponentProps<EntityData> = {
            formDescription, onClose, onSave,
            data: serviceRecord.data, initialEditingState: !!newServiceRecord,
            // If user is creating a new service record, the cancel button needs to close the initiated service record.
            onCancel: !!newServiceRecord && onClose
        };
        return serviceRecordPanelFactory(this.props.serviceSummary.serviceType, props);
    }
}

export default ServiceRecordPanel;
