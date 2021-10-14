import LungFunctionGraph from 'main/summary/lungFunction/LungFunctionGraph';
import React from 'react';
import {DotProps} from 'recharts';
import ObservationType from 'smarthealth-javascript/ObservationType';

/**
 * Render a Graph dot marker in the Lung Function Graph.
 *
 * - square shape represent FEV1 and FEV1 % Predicted
 * - diamond shape represent FVC and FVC % Predicted
 *
 * @author Thompson 5/06/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface LungFunctionGraphDotMarkerProps extends DotProps
{
    activeFillDot?: boolean;
    observationType: ObservationType.PreBDFEV1
        | ObservationType.PreBDFEV1Predicted
        | ObservationType.PreBDFVC
        | ObservationType.PreBDFVCPredicted;
}

class LungFunctionGraphDotMarker extends React.Component<LungFunctionGraphDotMarkerProps>
{
    public static readonly SQUARE_SIDE_LENGTH = 6;

    private static readonly STROKE_WIDTH = 1;

    public render()
    {
        const centerXCoordinate = this.props.cx;
        const centerYCoordinate = this.props.cy;
        // Dots are still drawn in Recharts LineChart component if they do not have a value. These no value dots are
        // drawn with a X-coordinate without a Y-coordinate.
        if (!centerYCoordinate)
        {
            return null;
        }

        if ((this.props.observationType === ObservationType.PreBDFEV1)
            || (this.props.observationType === ObservationType.PreBDFEV1Predicted))
        {
            const shapeColour = this.props.observationType === ObservationType.PreBDFEV1
                ? LungFunctionGraph.PREBDFEV1_LINE_COLOUR
                : LungFunctionGraph.PREBDFEV1PREDICTED_LINE_COLOUR;
            return (
                <rect x={centerXCoordinate - (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH / 2)}
                    y={centerYCoordinate - (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH / 2)}
                    width={LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH}
                    height={LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH}
                    style={{
                        fill: this.props.activeFillDot ? shapeColour : '#fff',
                        strokeWidth: LungFunctionGraphDotMarker.STROKE_WIDTH, stroke: shapeColour
                    }} />
            );
        }
        else if ((this.props.observationType === ObservationType.PreBDFVC)
            || (this.props.observationType === ObservationType.PreBDFVCPredicted))
        {
            const shapeColour = this.props.observationType === ObservationType.PreBDFVC
                ? LungFunctionGraph.PREBDFVC_LINE_COLOUR
                : LungFunctionGraph.PREBDFVCPREDICTED_LINE_COLOUR;
            // We minus centerXCoordinate and centerYCoordinate by half of SQUARE_SIDE_LENGTH, to draw rect centered.
            // Otherwise, rect will be drawn off alignment to the bottom right.
            return (
                <rect x={centerXCoordinate - (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH / 2)}
                    y={centerYCoordinate - (LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH / 2)}
                    width={LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH}
                    height={LungFunctionGraphDotMarker.SQUARE_SIDE_LENGTH}
                    style={{
                        fill: this.props.activeFillDot ? shapeColour : '#fff',
                        strokeWidth: LungFunctionGraphDotMarker.STROKE_WIDTH, stroke: shapeColour
                    }}
                    // rotate(<a> [<x> <y>]). <a> is degrees. The rotation is about the point [<x> <y>]
                    transform={`rotate(45, ${centerXCoordinate}, ${centerYCoordinate})`}
                />
            );
        }
    }
}

export default LungFunctionGraphDotMarker;
