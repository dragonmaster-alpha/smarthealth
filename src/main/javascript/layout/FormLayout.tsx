import {css} from '@emotion/core';
import {colour, font, form} from 'main/application/ThemeConstants';
import {buildTemplateRows} from 'main/layout/FormLayoutUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {observer} from 'mobx-react';
import * as React from 'react';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';

/**
 * Layout a form
 *
 * @author Larry 22/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FormLayoutProps
{
    editing: boolean;
    fieldsAndSections: FormFieldOrSection[];
    layoutColumns: number;
}

const formLayoutStyle = css({
    // TODO background set to pink to highlight any layout errors
    backgroundColor: 'pink',
    border: form.border,
    color: colour.text,
    display: 'grid',
    font: font.text
});

// TODO need to fix height issue. Refer to code review/ http://git.smarthealth.com.au:8080/smarthealth/review/CR-SH55
const formLayoutFillHeightStyle = css({ height: '100%' });

@observer
class FormLayout extends React.Component<FormLayoutProps>
{
    public render()
    {
        const { editing, fieldsAndSections, layoutColumns } = this.props;
        const hasFillHeight = FormDescriptionUtility.isFillHeight(fieldsAndSections);

        const gridTemplateRows = hasFillHeight ? buildTemplateRows(layoutColumns, fieldsAndSections, editing) : null;
        const gridTemplateColumns = `repeat(${layoutColumns * 2 - 1}, auto) 1fr`;

        const style = hasFillHeight ? css(formLayoutStyle, formLayoutFillHeightStyle) : formLayoutStyle;

        return (
            <div css={style} style={{ gridTemplateColumns, gridTemplateRows }}>
                {this.props.children}
            </div>
        );
    }
}

export default FormLayout;
