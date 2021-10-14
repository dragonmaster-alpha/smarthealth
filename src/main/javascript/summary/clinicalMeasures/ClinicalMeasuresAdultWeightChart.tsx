import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import ClinicalMeasuresAdultWeightChartModel from 'main/summary/clinicalMeasures/ClinicalMeasuresAdultWeightChartModel';
import DateUtility from 'main/utility/DateUtility';
import {inject} from 'mobx-react';
import React from 'react';
import {
    CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis
} from 'recharts';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';

/**
 * Render an Adult Weight Chart in Time View with horizontal reference lines for 3 BMI numbers. The 3 horizontal
 * reference lines are for BMI numbers 25(green line), 20(green line) and 18.5 (red line). The chart display all
 * weights recorded while the patient has been an Adult (18 years or older).
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR2103
 *
 * @author Thompson 20/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ClinicalMeasuresAdultWeightChartProps extends StoreProps
{
    observations: Observation[];
    patientDateOfBirth: EventDateTime;
}

@inject('appStore')
class ClinicalMeasuresAdultWeightChart extends React.Component<ClinicalMeasuresAdultWeightChartProps>
{
    private static BMI_18_AND_A_HALF_LINE_COLOUR: string = '#ff1717';

    private static BMI_20_LINE_COLOUR: string = '#079c07';

    private static BMI_25_LINE_COLOUR: string = '#1aa217';

    @autobind
    private formatDateTick(unixEpochMilliSeconds: number): React.ReactNode
    {
        // unixEpochMilliSeconds is "Infinity" when an empty array is provided to the data property of Recharts
        // LineChart component. Check if unixEpochMilliSeconds is not an Infinity number.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite
        if (!isFinite(unixEpochMilliSeconds))
        {
            return null;
        }

        return this.props.appStore.i18nStore.formatEventDateTime(
            DateUtility.unixEpochMilliSecondsToEventDateTimeDay(unixEpochMilliSeconds));
    }

    public render()
    {
        const model = new ClinicalMeasuresAdultWeightChartModel(this.props.observations, this.props.patientDateOfBirth);
        // This is to avoid cases where for example given 1 data point with the default tickCount of 5. This will
        // render 5 of the same x-axis date label. Which doesn't present nicely, this is why we limit the tickCount if
        // there are less than 5 data points.
        const tickCount = model.values.length < 5 ? model.values.length : 5;
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.values} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={this.renderTooltip} isAnimationActive={false} />

                    <XAxis dataKey="unixEpochMilliSeconds" domain={['auto', 'auto']}
                        label={{ value: 'Date', position: 'insideBottom', offset: -5 }} type="number"
                        tickCount={tickCount} tickFormatter={this.formatDateTick} />
                    <YAxis yAxisId="weight" />
                    <Line yAxisId="weight" dataKey="weight" isAnimationActive={false} />

                    <ReferenceLine label={props => this.renderBMILabel(props, 'BMI 25')}
                        stroke={ClinicalMeasuresAdultWeightChart.BMI_25_LINE_COLOUR} strokeDasharray="1 0"
                        y={model.bmi25Weight} yAxisId="weight" />
                    <ReferenceLine label={props => this.renderBMILabel(props, 'BMI 20')}
                        stroke={ClinicalMeasuresAdultWeightChart.BMI_20_LINE_COLOUR} strokeDasharray="1 0"
                        y={model.bmi20Weight} yAxisId="weight" />
                    <ReferenceLine label={props => this.renderBMILabel(props, 'BMI 18.5')}
                        stroke={ClinicalMeasuresAdultWeightChart.BMI_18_AND_A_HALF_LINE_COLOUR} strokeDasharray="1 0"
                        y={model.bmi18AndAHalfWeight} yAxisId="weight" />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    private renderBMILabel(props, label: string): React.ReactElement
    {
        // Co-ordinate (0,0) starts at the top left corner.
        const LABEL_RIGHT_PADDING = 30;
        const LABEL_TOP_PADDING = -7;
        const x = props.viewBox.x + LABEL_RIGHT_PADDING;
        const y = props.viewBox.y + LABEL_TOP_PADDING;
        return (
            <text x={x} y={y}>
                {label}
            </text>
        );
    }

    @autobind
    private renderTooltip(props: TooltipProps): React.ReactElement
    {
        return (
            <div className="cp-ClinicalMeasuresAdultWeightChart-tooltip">
                {props.payload.map(dataPoint =>
                {
                    const date: EventDateTime = DateUtility.unixEpochMilliSecondsToEventDateTimeDay(
                        dataPoint.payload.unixEpochMilliSeconds);
                    const dateFormatted = this.props.appStore.i18nStore.formatEventDateTime(date);
                    return <span>{dateFormatted}: {dataPoint.payload.weight}kg</span>;
                })}
            </div>
        );
    }
}

export default ClinicalMeasuresAdultWeightChart;
