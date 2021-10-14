import {colour, font} from 'main/application/ThemeConstants';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import MockUpCheckboxField from 'test/design/MockUpCheckboxField';
import MockUpDateTimeField from 'test/design/MockUpDateTimeField';
import MockUpFieldLabel from 'test/design/MockUpFieldLabel';
import MockUpGridCell from 'test/design/MockUpGridCell';
import MockUpGroupFields from 'test/design/MockUpGroupFields';
import MockUpHyperlinkField from 'test/design/MockUpHyperlinkField';
import MockUpSelectionField from 'test/design/MockUpSelectionField';
import MockUpTextField, {TextFieldSize} from 'test/design/MockUpTextField';

/**
 * The patient details form.
 *
 * Out of date.
 *
 * @author Larry 25/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpPatientDetailsFormProps
{
    data: EntityData;
    edit?: boolean;
    invalidFields?: { [field: string]: boolean };
}

class MockUpPatientDetailsForm extends React.Component<MockUpPatientDetailsFormProps>
{
    private buildPatientsDetailLabelsAndFields(): React.ReactNode[]
    {
        return [
            <MockUpFieldLabel label="EHR Consent" />,
            <MockUpGroupFields>
                <>
                    <MockUpTextField editing={this.props.edit} size={TextFieldSize.small}
                        value={this.props.data.ehrConsent} />&nbsp;
                    <MockUpHyperlinkField name="See details"
                        toPath="https://www.smarthealth.com.au/patient-ehr-consent" />
                </>
            </MockUpGroupFields>,
            null,
            null,
            null,
            null,

            <MockUpFieldLabel label="Title" />,
            <MockUpSelectionField editing={this.props.edit} size={10}
                value={this.props.data.title} />,
            <MockUpFieldLabel label="Sex" />,
            <MockUpSelectionField editing={this.props.edit} size={10} mandatory={true}
                value={this.props.data.sex} />,
            null,
            null,

            <MockUpFieldLabel label="Given name" />,
            <MockUpTextField editing={this.props.edit}
                mandatory={true}
                size={TextFieldSize.medium} value={this.props.data.givenName} />,
            <MockUpFieldLabel label="Preferred name" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium}
                invalid={this.props.invalidFields && this.props.invalidFields.preferredName}
                value={this.props.data.preferredName} />,
            <MockUpFieldLabel label="Other given names" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium}
                value={this.props.data.otherGivenNames} />,

            <MockUpFieldLabel label="Family name" />,
            <MockUpTextField editing={this.props.edit} mandatory={true}
                size={TextFieldSize.medium} value={this.props.data.familyName} />,
            <MockUpFieldLabel label="Also known as" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium}
                value={this.props.data.alsoKnownAs} />,
            null,
            null,

            <MockUpFieldLabel label="Date of birth" />,
            <MockUpDateTimeField editing={this.props.edit} value={this.props.data.dateOfBirth} mandatory={true} />,
            null,
            null,
            null,
            null,

            <MockUpFieldLabel label="Address 1" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.large} value={this.props.data.address1} />,
            <MockUpFieldLabel label="Address 2" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.large} value={this.props.data.address2} />,
            null,
            null,

            <MockUpFieldLabel label="City" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium} value={this.props.data.city} />,
            <MockUpFieldLabel label="State" />,
            <MockUpSelectionField editing={this.props.edit} mandatory={true} size={10}
                value={this.props.data.state} />,
            <MockUpFieldLabel label="Postcode" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.small} value={this.props.data.postcode} />,

            <MockUpFieldLabel label="Country" />,
            <MockUpSelectionField editing={this.props.edit} size={100}
                value={this.props.data.country} />,
            null,
            null,
            null,
            null,

            <MockUpFieldLabel label="Phone(M)" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium} value={this.props.data.phoneM} />,
            <MockUpFieldLabel label="Phone(H)" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium} value={this.props.data.phoneH} />,
            <MockUpFieldLabel label="SMS notification" />,
            <MockUpCheckboxField editing={this.props.edit} value={this.props.data.smsNotification} />,

            <MockUpFieldLabel label="Email" />,
            <MockUpTextField editing={this.props.edit}
                invalid={this.props.invalidFields && this.props.invalidFields.email}
                mandatory={true} size={TextFieldSize.large} value={this.props.data.email}
            />,
            null,
            null,
            <MockUpFieldLabel label="Email notification" />,
            <MockUpCheckboxField editing={this.props.edit} value={this.props.data.emailNotification} />,

            <MockUpFieldLabel label="Country of birth" />,
            <MockUpSelectionField editing={this.props.edit} size={100}
                value={this.props.data.countryOfBirth} />,
            null,
            null,
            null,
            null,

            <MockUpFieldLabel label="Aboriginal/TSI" />,
            <MockUpSelectionField editing={this.props.edit} size={40}
                value={this.props.data.aboriginalTSI} />,
            null,
            null,
            null,
            null,

            <MockUpFieldLabel label="Language" />,
            <MockUpSelectionField editing={this.props.edit} size={100}
                value={this.props.data.language} />,
            <MockUpFieldLabel label="Interpreter req" />,
            <MockUpSelectionField editing={this.props.edit} size={40}
                value={this.props.data.interpreterReq} />,
            null,
            null,

            <MockUpFieldLabel label="Marital status" />,
            <MockUpSelectionField editing={this.props.edit} size={100}
                value={this.props.data.maritalStatus} />,
            <MockUpFieldLabel label="Religion" />,
            <MockUpTextField editing={this.props.edit} size={TextFieldSize.medium} value={this.props.data.religion} />,
            null,
            null
        ];
    }

    public render(): React.ReactNode
    {
        let isRowEven = false;
        return (
            // Applying an outer div to avoid our grid content from filling height which causes all rows in grid to
            // have height auto.
            // It is filling height because of the parent div of MockUpPatientDetailsForm having the style
            // gridTemplateRows: '40px 1fr', 1fr being the cause.
            <div style={{ backgroundColor: colour.white, border: 'solid 1px #dee3f3' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr',
                    padding: '4px 0px',
                    font: font.text
                }}>
                    {this.buildPatientsDetailLabelsAndFields()
                        .map((labelOrField, fieldIndex) =>
                        {
                            // if statement to avoid 0 % 6 = 0 which will flip isRowEven variable prematurely
                            if (fieldIndex !== 0)
                            {
                                isRowEven = ((fieldIndex % 6) === 0) ? !isRowEven : isRowEven;
                            }

                            return (
                                <MockUpGridCell rowGuideBackground={isRowEven}>
                                    {labelOrField}
                                </MockUpGridCell>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default MockUpPatientDetailsForm;
