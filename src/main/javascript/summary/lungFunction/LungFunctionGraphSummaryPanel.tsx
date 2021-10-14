import StoreProps from 'main/store/StoreProps';
import LungFunctionGraph from 'main/summary/lungFunction/LungFunctionGraph';
import LungFunctionGraphLegend from 'main/summary/lungFunction/LungFunctionGraphLegend';
import {GraphPeriod} from 'main/summary/lungFunction/LungFunctionGraphSummaryDataModel';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Dropdown} from 'primereact/dropdown';
import React from 'react';
import Observation from 'smarthealth-javascript/Observation';

/**
 * Render a Lung Function line graphs which consist of Pre-BD FEV1 % Predicted, Pre-BD FEV1, Pre-BD FVC % Predicted and
 * Pre-BD FVC measurements. These 4 line graphs visibility can be toggled on and off individually. Users can also
 * select the period for which Lung Function observations are graphed.
 *
 * The default view for the Lung Function Graph plots:
 * - Pre-BD FEV1 % Predicted
 * - Last 12 months
 *
 * TODO current implementation differs from SmartRM and JavaUI. Larry will review and approve implementation once
 *  finished.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR1885
 *
 * @author Thompson 27/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface LungFunctionGraphSummaryPanelProps extends StoreProps
{
    observations: Observation[];
}

export type ChartData = ChartPoint[];

interface ChartPoint
{
    dateTimeStamp: number;

    [observationTypeKey: string]: any;
}

@inject('appStore')
@observer
class LungFunctionGraphSummaryPanel extends React.Component<LungFunctionGraphSummaryPanelProps>
{
    private static readonly PERIOD_DROPDOWN_OPTIONS = [
        { label: 'Last 12 Months', value: GraphPeriod.last12Months },
        { label: 'Last 2 Years', value: GraphPeriod.last2Years },
        { label: 'Last 5 Years', value: GraphPeriod.last5Years },
        { label: 'Last 10 Years', value: GraphPeriod.last10Years },
        { label: 'Patient\'s lifetime', value: GraphPeriod.lifeTime }
    ];

    @observable
    private lungFunctionPeriodSelection: GraphPeriod = GraphPeriod.last12Months;

    @action.bound
    private onPeriodDropdownChange(e)
    {
        this.lungFunctionPeriodSelection = e.value;
    }

    public render()
    {
        // TODO how to set proper dimension to graph so the graph dimension is dynamic when ServiceRecordList is
        // rendered
        return (
            <div className="cp-LungFunctionGraphSummaryPanel">
                <LungFunctionGraph observations={this.props.observations} period={this.lungFunctionPeriodSelection} />
                <div className="cp-LungFunctionGraphSummaryPanel-footer">
                    <span>
                        <label>Period: </label>
                        <Dropdown options={LungFunctionGraphSummaryPanel.PERIOD_DROPDOWN_OPTIONS}
                            onChange={this.onPeriodDropdownChange} value={this.lungFunctionPeriodSelection} />
                    </span>
                    <LungFunctionGraphLegend />
                </div>
            </div>
        );
    }
}

export default LungFunctionGraphSummaryPanel;
