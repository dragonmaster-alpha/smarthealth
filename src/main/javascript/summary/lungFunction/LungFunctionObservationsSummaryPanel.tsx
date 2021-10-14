import {autobind} from 'core-decorators';
import lodash from 'lodash';
import ServiceRecordReferenceEntityHyperlink from 'main/component/ServiceRecordReferenceEntityHyperlink';
import StoreProps from 'main/store/StoreProps';
import LungFunctionObservationsModel from 'main/summary/lungFunction/LungFunctionObservationsModel';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {inject, observer} from 'mobx-react';
import {Column, ColumnProps} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType, {
    observationTypeDescriptions, observationTypeScale, observationTypeUnits
} from 'smarthealth-javascript/ObservationType';

/**
 * Display dynamic Lung Function Observation Table used in the Observations tab for Lung Function. Column 1 is the best
 * within the last 12 months (best is the highest value). The table display up to 12 new date columns for results.
 *
 * Each observation value will link to a service record besides observations which are calculated values.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR2124
 *
 * @author Thompson 8/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface LungFunctionObservationsSummaryPanelProps extends StoreProps
{
    observations: Observation[];
}

@inject('appStore', 'entityCache')
@observer
class LungFunctionObservationsSummaryPanel extends React.Component<LungFunctionObservationsSummaryPanelProps>
{
    private formatNumberScaleAndUnits(value: number, scale: number, units: string): string
    {
        return `${value.toFixed(scale)} ${units}`;
    }

    private generateColumn(column: ColumnProps): React.ReactNode
    {
        if (column.field === 'observationType')
        {
            return <Column key={column.field} body={this.renderObservationDescription} {...column} />;
        }
        else
        {
            return <Column key={column.field} body={this.renderObservationValue} {...column} />;
        }
    }

    private isObservationTypeCalculatedValue(observationType: ObservationType): boolean
    {
        // FEV1Change, FVCChange, PreBDFER and PostBDFER are calculated values. Their formula listed here:
        // https://rm.smarthealth.com.au/smartrm/#!/PV8/FR2124
        return (
            observationType === ObservationType.FEV1Change
            || observationType === ObservationType.FVCChange
            || observationType === ObservationType.PreBDFER
            || observationType === ObservationType.PostBDFER
        );
    }

    public render()
    {
        const model = new LungFunctionObservationsModel(this.props.appStore, this.props.observations);

        return (
            <DataTable value={model.values} rowGroupMode="subheader" groupField="subheader"
                rowGroupHeaderTemplate={this.rowGroupHeaderTemplate} autoLayout={true}
                rowGroupFooterTemplate={this.rowGroupFooterTemplate}>
                {model.columns.map(column => this.generateColumn(column))}
            </DataTable>
        );
    }

    private renderObservationDescription(rowData): React.ReactNode
    {
        if (observationTypeDescriptions[rowData.observationType])
        {
            return observationTypeDescriptions[rowData.observationType];
        }
        else
        {
            return rowData.observationType;
        }
    }

    @autobind
    private renderObservationValue(rowData, column): React.ReactNode
    {
        const observation: Observation = rowData[column.field];
        if (!observation)
        {
            return null;
        }

        if (!lodash.isNil(observation.valueNumber) || !lodash.isNil(observation.valueString))
        {
            // If observationType is not a Calculated Value then observation has a ServiceRecordReference property.
            const serviceLink = !this.isObservationTypeCalculatedValue(observation.observationType);
            const value = observation.valueNumber
                ? this.formatNumberScaleAndUnits(observation.valueNumber,
                    observationTypeScale[observation.observationType],
                    observationTypeUnits[observation.observationType])
                : `${observation.valueString} ${observationTypeUnits[observation.observationType]}`;
            return serviceLink
                ? <ServiceRecordReferenceEntityHyperlink service={observation.serviceRecordReference} value={value} />
                : <span>{value}</span>;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private rowGroupFooterTemplate(): React.ReactNode
    {
        // to use DataTable in rowGroupMode="subheader" a rowGroupFooterTemplate method must be added to DataTable.
        // Otherwise, this.props.rowGroupFooterTemplate is not a function error will occur.
        return null;
    }

    private rowGroupHeaderTemplate(data): React.ReactNode
    {
        return <span className="cp-lungFunctionObservationsSummaryPanel-subHeader">{data.subheader}</span>;
    }
}

export default LungFunctionObservationsSummaryPanel;
