import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import LungFunctionGraphDotMarker from 'main/summary/lungFunction/LungFunctionGraphDotMarker';
// tslint:disable-next-line
import LungFunctionGraphSummaryDataModel, {GraphPeriod} from 'main/summary/lungFunction/LungFunctionGraphSummaryDataModel';
import DateUtility from 'main/utility/DateUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from 'recharts';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';
import ObservationType, {
    observationTypeDescriptions, observationTypeUnits
} from 'smarthealth-javascript/ObservationType';

/**
 * Render a Lung Function line graphs which consist of Pre-BD FEV1 % Predicted, Pre-BD FEV1, Pre-BD FVC % Predicted and
 * Pre-BD FVC measurements
 *
 * @author Thompson 9/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface LungFunctionGraphProps extends StoreProps
{
    observations: Observation[];
    period: GraphPeriod;
}

@inject('appStore')
@observer
class LungFunctionGraph extends React.Component<LungFunctionGraphProps>
{
    public static readonly PREBDFEV1PREDICTED_LINE_COLOUR: string = '#ff0000';

    public static readonly PREBDFEV1_LINE_COLOUR: string = '#800000';

    public static readonly PREBDFVCPREDICTED_LINE_COLOUR: string = '#0202fe';

    public static readonly PREBDFVC_LINE_COLOUR: string = '#05058c';

    public static readonly STROKE_DASHARRAY: string = '2 2';

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
        const model = new LungFunctionGraphSummaryDataModel(this.props.observations, this.props.period,
            this.props.appStore.dateTime.today());
        // This is to avoid cases where for example given 1 data point with the default tickCount of 5. This will
        // render 5 of the same x-axis date label. Which doesn't present nicely, this is why we limit the tickCount if
        // there are less than 5 data points.
        const tickCount = model.data.length < 5 ? model.data.length : 5;
        return (
            <ResponsiveContainer width="95%" height="80%">
                <LineChart data={model.data}>
                    <CartesianGrid />
                    <Tooltip content={this.renderTooltip} isAnimationActive={false} />

                    <XAxis dataKey="unixEpochMilliSeconds" domain={['auto', 'auto']}
                        label={{ value: 'Date', position: 'insideBottom', offset: -5 }} type="number"
                        tickCount={tickCount} tickFormatter={this.formatDateTick} />
                    <YAxis yAxisId="predicted" label={{ value: '% Predicted', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="litres" label={{ value: 'Litres', angle: 90, position: 'insideRight' }}
                        orientation="right" />

                    <Line yAxisId="predicted" dataKey={ObservationType.PreBDFEV1Predicted}
                        dot={<LungFunctionGraphDotMarker observationType={ObservationType.PreBDFEV1Predicted} />}
                        activeDot={<LungFunctionGraphDotMarker activeFillDot={true}
                            observationType={ObservationType.PreBDFEV1Predicted} />} isAnimationActive={false}
                        name={observationTypeDescriptions[ObservationType.PreBDFEV1Predicted]}
                        stroke={LungFunctionGraph.PREBDFEV1PREDICTED_LINE_COLOUR}
                        strokeDasharray={LungFunctionGraph.STROKE_DASHARRAY} type="linear"
                        unit={observationTypeUnits[ObservationType.PreBDFEV1Predicted]} />
                    <Line yAxisId="litres" dataKey={ObservationType.PreBDFEV1}
                        dot={<LungFunctionGraphDotMarker observationType={ObservationType.PreBDFEV1} />}
                        activeDot={<LungFunctionGraphDotMarker activeFillDot={true}
                            observationType={ObservationType.PreBDFEV1} />} isAnimationActive={false}
                        legendType="diamond" name={observationTypeDescriptions[ObservationType.PreBDFEV1]}
                        stroke={LungFunctionGraph.PREBDFEV1_LINE_COLOUR} type="linear"
                        unit={observationTypeUnits[ObservationType.PreBDFEV1]} />
                    <Line yAxisId="predicted" dataKey={ObservationType.PreBDFVCPredicted}
                        dot={<LungFunctionGraphDotMarker observationType={ObservationType.PreBDFVCPredicted} />}
                        activeDot={<LungFunctionGraphDotMarker activeFillDot={true}
                            observationType={ObservationType.PreBDFVCPredicted} />} isAnimationActive={false}
                        name={observationTypeDescriptions[ObservationType.PreBDFVCPredicted]}
                        stroke={LungFunctionGraph.PREBDFVCPREDICTED_LINE_COLOUR}
                        strokeDasharray={LungFunctionGraph.STROKE_DASHARRAY} type="linear"
                        unit={observationTypeUnits[ObservationType.PreBDFVCPredicted]} />
                    <Line yAxisId="litres" dataKey={ObservationType.PreBDFVC}
                        dot={<LungFunctionGraphDotMarker observationType={ObservationType.PreBDFVC} />}
                        activeDot={<LungFunctionGraphDotMarker activeFillDot={true}
                            observationType={ObservationType.PreBDFVC} />} isAnimationActive={false}
                        name={observationTypeDescriptions[ObservationType.PreBDFVC]}
                        stroke={LungFunctionGraph.PREBDFVC_LINE_COLOUR} type="linear"
                        unit={observationTypeUnits[ObservationType.PreBDFVC]} />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    @autobind
    private renderTooltip(props: TooltipProps): React.ReactNode
    {
        const dateTimeStampNumber = (typeof props.label === 'string')
            ? Number.parseInt(props.label, 10)
            : props.label;
        const date: EventDateTime = DateUtility.unixEpochMilliSecondsToEventDateTimeDay(dateTimeStampNumber);
        const dateFormatted = this.props.appStore.i18nStore.formatEventDateTime(date);

        return (
            <div className="cp-LungFunctionGraph-tooltip">
                <span>{dateFormatted}</span>
                {props.payload && props.payload.map((observationTypePayload, index) => (
                    observationTypePayload.value
                        ? (
                            <span className="cp-LungFunctionGraph-tooltip-measurement" key={index}
                                style={{ color: observationTypePayload.color }}>
                            {observationTypePayload.name}: {observationTypePayload.value} {observationTypePayload.unit}
                            </span>
                        )
                        : null
                ))}
            </div>
        );
    }
}

export default LungFunctionGraph;
