import classNames from 'classnames';
import {autobind} from 'core-decorators';
import ServiceRecordReferenceEntityHyperlink from 'main/component/ServiceRecordReferenceEntityHyperlink';
import StoreProps from 'main/store/StoreProps';
import ClinicalMeasuresTableModel from 'main/summary/clinicalMeasures/ClinicalMeasuresTableModel';
import {isObservation} from 'main/utility/ObservationsUtility';
import {inject} from 'mobx-react';
import {Column, ColumnProps} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType, {
    observationTypeDescriptions, observationTypeScale
} from 'smarthealth-javascript/ObservationType';

/**
 * Display a table to present the latest 12 clinical measures. If there are more than one clinical measures on the same
 * date, the clinical measure with the latest service record date and time will be used.
 *
 * BMI row are calculated if there is a weight and height.
 *
 * Weights are displayed in bold red if Min and Max Goal Weight are specified and the weight is out of range.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3185
 *
 * @author Thompson 18/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ClinicalMeasuresTableProps extends StoreProps
{
    observations: Observation[];
}

@inject('appStore')
class ClinicalMeasuresTable extends React.Component<ClinicalMeasuresTableProps>
{
    @autobind
    private generateColumn(column: ColumnProps): React.ReactNode
    {
        if (column.field === 'measure')
        {
            return <Column {...column} body={this.renderMeasures} />;
        }
        else
        {
            return <Column {...column} body={this.renderValue} />;
        }
    }

    public render()
    {
        const model = new ClinicalMeasuresTableModel(this.props.appStore, this.props.observations);
        return (
            <DataTable value={model.values}>
                {model.columns.map(this.generateColumn)}
            </DataTable>
        );
    }

    private renderMeasures(rowData, col): React.ReactNode
    {
        // BMI is not an observationType so observationTypeDescriptions will not have description string for BMI
        return observationTypeDescriptions[rowData[col.field]]
            ? observationTypeDescriptions[rowData[col.field]]
            : rowData[col.field];
    }

    @autobind
    private renderValue(rowData, column): React.ReactNode
    {
        const cellValue = rowData[column.field] && rowData[column.field];
        if (!cellValue)
        {
            return null;
        }

        if (isObservation(cellValue))
        {
            const value = (cellValue && cellValue.valueNumber)
                ? cellValue.valueNumber.toFixed(observationTypeScale[cellValue.observationType])
                : cellValue.valueString;
            if (cellValue.observationType === ObservationType.Weight)
            {
                return this.renderWeight(cellValue, column);
            }
            else
            {
                return <ServiceRecordReferenceEntityHyperlink service={cellValue.serviceRecordReference}
                    value={value} />;
            }
        }
        else
        {
            // if value is not an Observation then it is a BMI value
            return cellValue;
        }
    }

    private renderWeight(observation: Observation, column): React.ReactNode
    {
        const minGoalWeightRowData = column.value.find(value => value['measure'] === ObservationType.MinGoalWeight);
        const minGoalWeight = minGoalWeightRowData[column.field] && minGoalWeightRowData[column.field].valueNumber;
        const maxGoalWeightRowData = column.value.find(value => value['measure'] === ObservationType.MaxGoalWeight);
        const maxGoalWeight = maxGoalWeightRowData[column.field] && maxGoalWeightRowData[column.field].valueNumber;
        const weight = observation.valueNumber;

        let weightOutOfRange = false;
        if ((weight < minGoalWeight) || (weight > maxGoalWeight))
        {
            weightOutOfRange = true;
        }
        return (
            <span className={classNames({ 'is-abnormal': weightOutOfRange })}>
                <ServiceRecordReferenceEntityHyperlink service={observation.serviceRecordReference} value={weight} />
            </span>
        );
    }
}

export default ClinicalMeasuresTable;
