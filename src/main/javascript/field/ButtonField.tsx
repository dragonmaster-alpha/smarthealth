import {field} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import BaseField, {BaseFieldProps} from 'main/field/BaseField';
import {px} from 'main/utility/StyleUtility';
import React from 'react';
import FormFieldButton from 'smarthealth-javascript/FormFieldButton';

/**
 * Button for form field
 *
 * @author Thompson 20/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ButtonFieldProps extends BaseFieldProps<FormFieldButton, string>
{
    onClick: () => void;
    small?: boolean;
}

class ButtonField extends BaseField<FormFieldButton, string, ButtonFieldProps>
{
    private renderButton(disabled: boolean)
    {
        if (this.props.small)
        {
            return (
                <div style={{ margin: px(field.marginHeightPx, 0) }}>
                    <Button disabled={disabled} onClick={this.props.onClick} small={true} title={this.field.label}
                        tooltip={this.toolTip} />
                </div>
            );
        }
        else
        {
            return <Button disabled={disabled} onClick={this.props.onClick} title={this.field.label}
                tooltip={this.toolTip} />;
        }
    }

    protected renderEditing(): React.ReactNode
    {
        return this.renderButton(this.readOnly);
    }

    protected renderView(): React.ReactNode
    {
        return this.renderButton(!this.field.enableInView);
    }
}

export default ButtonField;
