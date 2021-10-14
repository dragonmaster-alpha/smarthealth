import React from 'react';

/**
 * Render a Terms and Conditions link which when clicked opens a new tab with smarthealth tcs web page:
 * https://www.smarthealth.com.au/patient-tcs
 *
 * @author Thompson 11/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

class TermsAndConditionsLink extends React.Component
{
    public render()
    {
        return (
            <a href="https://www.smarthealth.com.au/patient-tcs" target="_blank">
                Terms and Conditions
            </a>
        );
    }
}

export default TermsAndConditionsLink;
