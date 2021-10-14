import LungFunctionGraph from 'main/summary/lungFunction/LungFunctionGraph';
import LungFunctionGraphDotMarker from 'main/summary/lungFunction/LungFunctionGraphDotMarker';
import React from 'react';
import ObservationType, {observationTypeDescriptions} from 'smarthealth-javascript/ObservationType';

/**
 * Render a legend for the Lung Function Graph.
 *
 * @author Thompson 5/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class LungFunctionGraphLegend extends React.Component
{
    // Account for diamond height, since diamond is a rotated square.
    private static readonly SVG_LEGEND_HEIGHT_MULTIPLIER: number = 2;

    // Account for the width to present a pass through line.
    private static readonly SVG_LEGEND_SIDE_LENGTH_MULTIPLIER: number = 6;

    public render()
    {
        const svgLegendIconWidth = (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH
            * LungFunctionGraphLegend.SVG_LEGEND_SIDE_LENGTH_MULTIPLIER);
        const svgLegendIconHeight = (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH
            * LungFunctionGraphLegend.SVG_LEGEND_HEIGHT_MULTIPLIER);
        return (
            <div className="LungFunctionGraphLegend">
                <svg width={svgLegendIconWidth} height={svgLegendIconHeight}>
                    <line x1={0} y1={svgLegendIconHeight / 2} x2={svgLegendIconWidth} y2={svgLegendIconHeight / 2}
                        stroke={LungFunctionGraph.PREBDFEV1PREDICTED_LINE_COLOUR}
                        strokeDasharray={LungFunctionGraph.STROKE_DASHARRAY} />
                    <LungFunctionGraphDotMarker cx={svgLegendIconWidth / 2} cy={svgLegendIconHeight / 2}
                        observationType={ObservationType.PreBDFEV1Predicted} />
                </svg>
                <span>{observationTypeDescriptions[ObservationType.PreBDFEV1Predicted]}</span>
                <svg width={svgLegendIconWidth} height={svgLegendIconHeight}>
                    <line x1={0} y1={svgLegendIconHeight / 2} x2={svgLegendIconWidth} y2={svgLegendIconHeight / 2}
                        stroke={LungFunctionGraph.PREBDFEV1_LINE_COLOUR} />
                    <LungFunctionGraphDotMarker cx={svgLegendIconWidth / 2} cy={svgLegendIconHeight / 2}
                        observationType={ObservationType.PreBDFEV1} />
                </svg>
                <span>{observationTypeDescriptions[ObservationType.PreBDFEV1]}</span>
                <svg width={svgLegendIconWidth} height={svgLegendIconHeight}>
                    <line x1={0} y1={svgLegendIconHeight / 2} x2={svgLegendIconWidth} y2={svgLegendIconHeight / 2}
                        stroke={LungFunctionGraph.PREBDFVCPREDICTED_LINE_COLOUR}
                        strokeDasharray={LungFunctionGraph.STROKE_DASHARRAY} />
                    <LungFunctionGraphDotMarker cx={svgLegendIconWidth / 2}
                        cy={svgLegendIconHeight / 2} observationType={ObservationType.PreBDFVCPredicted} />
                </svg>
                <span>{observationTypeDescriptions[ObservationType.PreBDFVCPredicted]}</span>
                <svg width={svgLegendIconWidth} height={svgLegendIconHeight}>
                    <line x1={0} y1={svgLegendIconHeight / 2} x2={svgLegendIconWidth} y2={svgLegendIconHeight / 2}
                        stroke={LungFunctionGraph.PREBDFVC_LINE_COLOUR} />
                    <LungFunctionGraphDotMarker cx={svgLegendIconWidth / 2} cy={svgLegendIconHeight / 2}
                        observationType={ObservationType.PreBDFVC} />
                </svg>
                <span>{observationTypeDescriptions[ObservationType.PreBDFVC]}</span>
            </div>
        );
    }
}

export default LungFunctionGraphLegend;
