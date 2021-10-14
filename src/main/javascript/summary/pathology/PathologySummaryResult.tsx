import classNames from 'classnames';
import {autobind} from 'core-decorators';
import AbnormalResult from 'main/component/AbnormalResult';
import ServiceRecordReferenceEntityHyperlink from 'main/component/ServiceRecordReferenceEntityHyperlink';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';
import ServiceRecordReference from 'smarthealth-javascript/ServiceRecordReference';

/**
 * Display a pathology summary value that has abnormal styling and when clicked will navigate to the specific service
 * record.
 *
 * @author Thompson 4/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface PathologySummaryResultProps extends StoreProps
{
    abnormalFlags?: string;
    service: ServiceRecordReference;
    value: React.ReactNode;
}

@inject('appStore')
class PathologySummaryResult extends React.Component<PathologySummaryResultProps>
{
    @autobind
    private onClickOpenService()
    {
        this.props.appStore.actionStore.openService(this.props.service);
    }

    public render()
    {
        const resultAbnormal = AbnormalResult.isAbnormal(this.props.abnormalFlags);
        return (
            <span className={classNames('cp-PathologySummaryResult',
                {
                    'is-abnormal': resultAbnormal
                })}
                onClick={this.onClickOpenService}>
                <ServiceRecordReferenceEntityHyperlink service={this.props.service}
                    value={<AbnormalResult abnormalFlag={this.props.abnormalFlags} value={this.props.value} />} />
            </span>
        );
    }
}

export default PathologySummaryResult;
