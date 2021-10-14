import lodash from 'lodash';
import React from 'react';
import CodedValue from 'smarthealth-javascript/CodedValue';
import MIMSConstants from 'smarthealth-javascript/MIMSConstants';

/**
 * Display a P if the Medication Product is of type Product and G if is of type Generics.
 *
 * @author Thompson 15/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

interface MedicationProductIconProps
{
    codedValue: CodedValue;
}

class MedicationProductIcon extends React.Component<MedicationProductIconProps>
{
    public render()
    {
        if (lodash.isNil(this.props.codedValue))
        {
            return null;
        }

        if (this.props.codedValue.codeSet === MIMSConstants.MIMS_Product_CodeSet)
        {
            return <span className="cp-MedicationProductIcon" title="Product">P</span>;
        }
        else if (this.props.codedValue.codeSet === MIMSConstants.MIMS_Generics_CodeSet)
        {
            return <span className="cp-MedicationProductIcon" title="Generic">G</span>;
        }
        else
        {
            // We need a space that can scale with the text to keep a list of Product names to align horizontally.
            // Adding a &nbsp; did not work as it was too little. So we have gone with adding the character 'G' like
            // above.
            // e.g. Use case:
            // In the Medication Summary table, if a medication doesn't have an icon, we still want the product
            // name to horizontally align with the above and below product name of the medications with icons.
            return <span className="cp-MedicationProductIcon-hide">G</span>;
        }
    }
}

export default MedicationProductIcon;
