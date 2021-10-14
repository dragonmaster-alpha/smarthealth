import MedicationProductIcon from 'main/component/MedicationProductIcon';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';

/**
 * Display Product or Generic icon with name for a given medication product.
 *
 * @author Thompson 11/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationProductProps
{
    codedValue: CodedValue;
}

class MedicationProduct extends React.Component<MedicationProductProps>
{
    public render()
    {
        if (!this.props.codedValue)
        {
            return null;
        }

        return (
            <span className="cp-MedicationProduct">
                <MedicationProductIcon codedValue={this.props.codedValue} />
                <span className="cp-MedicationProduct-name">{this.props.codedValue.value}</span>
            </span>
        );
    }
}

export default MedicationProduct;
