import {css, SerializedStyles} from '@emotion/core';
import lodash from 'lodash';
import {background, colour, field, font, form} from 'main/application/ThemeConstants';
import Scroll from 'main/container/Scroll';
import FormDataUtility from 'main/utility/FormDataUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {border, px} from 'main/utility/StyleUtility';
import {observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FieldLayout from 'smarthealth-javascript/FieldLayout';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FormSection from 'smarthealth-javascript/FormSection';
import MockUpFieldLabel from 'test/design/MockUpFieldLabel';
import MockUpFormField from 'test/design/MockUpFormField';
import MockUpTabBar from 'test/design/MockUpTabBar';

/**
 * Mockup form based on a form description
 *
 * @author Larry 8/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpFormProps
{
    data: EntityData;
    editing?: boolean;
    form: FormDescription;
}

class FormContext
{
    private column: number;

    /**
     * Set after a section is finished. If the next element is a section it is cleared. If the next element is a field
     * an end of section header is inserted.
     */
    public endOfSection: boolean;

    public readonly gridColumns: number;

    private row: number;

    constructor(layoutColumns: number)
    {
        this.gridColumns = layoutColumns * 2;
        this.row = 0;
        this.column = 0;
        this.endOfSection = false;
    }

    /**
     * @return values for gridColumn style
     */
    public fillRow(): string
    {
        this.column += 1;
        const from = this.column;
        this.nextRow();
        return `${from} / -1`;
    }

    public isFirstColumn(): boolean
    {
        return this.column === 0;
    }

    public isFirstRow(): boolean
    {
        return this.row === 0;
    }

    public isOddRow(): boolean
    {
        return (this.row % 2) === 1;
    }

    public nextColumn(columnsToAdvance: number = 1)
    {
        this.column += columnsToAdvance;
        this.wrapRow();
    }

    /**
     * @return number of columns left on this row
     */
    public nextRow(): number
    {
        if (this.column === 0)
        {
            return 0;
        }
        const columnsLeft = this.gridColumns - this.column;
        this.column = 0;
        this.row += 1;
        return columnsLeft;
    }

    private wrapRow()
    {
        while (this.column >= this.gridColumns)
        {
            this.column -= this.gridColumns;
            this.row += 1;
        }
    }
}

const formStyle = css({
    backgroundColor: colour.white,
    border: form.border,
    color: colour.text,
    font: font.text,
    position: 'relative'
});

const oddRowStyle = css({
    backgroundColor: background.gridRow
});

const evenRowStyle = css({
    backgroundColor: colour.white
});

const sectionFirstStyle = css({
    backgroundColor: background.section,
    color: colour.text,
    font: font.h3,
    gridColumn: '1/-1',
    padding: px(field.viewPaddingHeightPx + 2, 16)
});

const sectionStyle = css(sectionFirstStyle, {
    borderTop: border(colour.tabBorder)
});

const sectionEndStyle = css({
    height: '2px',
    backgroundColor: colour.tabBorder,
    gridColumn: '1/-1'
});

const tabbedFormStyle = css({
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    overflow: 'hidden'
});

const tabContainerStyle = css({
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: '40px 1fr',
    overflow: 'hidden',
    borderStyle: 'solid solid none solid',
    borderColor: colour.tabBorder,
    borderWidth: '2px'
});

const tabBarStyle = css({
    backgroundColor: background.main,
    borderLeft: form.border,
    borderRight: form.border,
    padding: px(8, 16, 0)
});

const tabContentStyle = css({
    border: form.border
});

@observer
class MockUpForm extends React.Component<MockUpFormProps>
{
    @observable
    private selectedTabIndex: number = 0;

    private fillRow(context: FormContext): React.ReactNode
    {
        if (context.isFirstColumn())
        {
            return null;
        }

        const rowStyle = this.rowStyle(context);
        return <div css={rowStyle} style={{ gridColumn: context.fillRow() }}></div>;
    }

    private formGridStyle(context: FormContext): SerializedStyles
    {
        const style = {
            display: 'grid',
            gridTemplateColumns: `${lodash.repeat('auto ', context.gridColumns - 1)} 1fr`
        };

        return css(style);
    }

    private isVisible(field: FormField)
    {
        if (!field.state)
        {
            return true;
        }
        else if (this.props.editing)
        {
            return field.state.editState !== FieldEditState.Hidden;
        }
        else
        {
            return !field.state.viewStateHidden;
        }
    }

    public render(): React.ReactNode
    {
        if (FormDescriptionUtility.hasTabs(this.props.form))
        {
            return this.renderFormWithTabs();
        }
        else
        {
            return <Scroll>{this.renderGrid(this.props.form.fieldsAndSections)}</Scroll>;
        }
    }

    private renderEndOfSection(context: FormContext): React.ReactNode
    {
        if (context.endOfSection)
        {
            context.endOfSection = false;
            return <div css={sectionEndStyle}></div>;
        }
        else
        {
            return <></>;
        }
    }

    private renderField(context: FormContext, field: FormField): React.ReactNode
    {
        const value = FormDataUtility.get(this.props.data, field);
        const rowStyle = this.rowStyle(context);
        if (field.layout && field.layout.spanLine)
        {
            const firstColumn = context.isFirstColumn();
            const span: string = context.fillRow();
            return (
                <div css={rowStyle}
                    style={{ gridColumn: span, paddingLeft: firstColumn ? '8px' : 0, paddingRight: '16px' }}>
                    <MockUpFormField field={field} value={value} editing={this.props.editing} />
                </div>
            );
        }
        else
        {
            context.nextColumn();
            return (
                <div css={rowStyle}>
                    <MockUpFormField field={field} value={value} editing={this.props.editing} />
                </div>
            );
        }
    }

    private renderFieldOrSection(context: FormContext, fieldOrSection: FormFieldOrSection): React.ReactNode
    {
        if (fieldOrSection.section)
        {
            return this.renderSection(context, fieldOrSection.section);
        }
        else if (fieldOrSection.field)
        {
            if (this.isVisible(fieldOrSection.field))
            {
                return (
                    <>
                        {this.renderEndOfSection(context)}
                        {this.renderLabelAndField(context, fieldOrSection.field)}
                    </>
                );
            }
            else
            {
                return null;
            }
        }
        else if (fieldOrSection.subheading)
        {
            return <div>{fieldOrSection.subheading}</div>;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private renderFieldsAndSections(context: FormContext, fieldsAndSections: FormFieldOrSection[]): React.ReactNode
    {
        return fieldsAndSections.map(fieldOrSection => this.renderFieldOrSection(context, fieldOrSection));
    }

    private renderFormWithTabs()
    {
        const { form } = this.props;
        const beforeTabs = form.fieldsAndSections.filter(fieldOrSection => !fieldOrSection.tabs);
        const { tabs } = form.fieldsAndSections.find(fieldOrSection => !!fieldOrSection.tabs);

        const tabNames = tabs.tabs.map(tab => ({ name: tab.title }));
        const tabContext = new FormContext(form.layoutColumns);

        const sections = tabs.tabs[this.selectedTabIndex].sections;

        return (
            <div css={tabbedFormStyle}>
                <div>{this.renderGrid(beforeTabs)}</div>
                <div css={tabContainerStyle}>
                    {this.renderTabBar(tabNames)}
                    <Scroll>
                        <div css={css(this.formGridStyle(tabContext), tabContentStyle)}>
                            {this.renderFieldsAndSections(tabContext, sections)}
                        </div>
                    </Scroll>
                </div>
            </div>
        );
    }

    private renderGrid(fieldsAndSections: FormFieldOrSection[])
    {
        const context: FormContext = new FormContext(this.props.form.layoutColumns);

        return (
            <div css={formStyle}>
                <div css={this.formGridStyle(context)}>
                    {this.renderFieldsAndSections(context, fieldsAndSections)}
                    {this.fillRow(context)}
                </div>
            </div>
        );
    }

    private renderLabel(context: FormContext, field: FormField): React.ReactNode
    {
        const style = this.rowStyle(context);
        context.nextColumn();
        return (
            <div css={style}>
                <MockUpFieldLabel label={field.label} labelPosition={field.layout && field.layout.labelPosition} />
            </div>
        );
    }

    private renderLabelAboveAndField(context: FormContext, fieldDesc: FormField,
        fillRow: React.ReactNode): React.ReactNode
    {
        const layout: FieldLayout = fieldDesc.layout;
        const value = FormDataUtility.get(this.props.data, fieldDesc);
        const rowStyle = this.rowStyle(context);
        if (layout && layout.spanLine)
        {
            const divSpan = context.fillRow();
            const divPadding = px(field.viewPaddingHeightPx, 8, 0, context.isFirstColumn() ? 16 : 0);
            const fieldMargin = this.props.editing ?
                0 :
                FormFieldTypes.isText(fieldDesc) ?
                    px(-field.viewPaddingHeightPx, 0, 0, -8) :
                    px(0, 8, 0, -8);
            return (
                <>
                    {fillRow}
                    <div css={rowStyle} style={{ gridColumn: divSpan, padding: divPadding }}>
                        <MockUpFieldLabel label={fieldDesc.label} labelPosition={layout.labelPosition} />
                        <div style={{ margin: fieldMargin }}>
                            <MockUpFormField field={fieldDesc} value={value} editing={this.props.editing} />
                        </div>
                    </div>
                </>
            );
        }
        else
        {
            context.nextColumn();
            return (
                <>
                    {fillRow}
                    <div css={rowStyle}>
                        <MockUpFieldLabel label={fieldDesc.label} labelPosition={layout.labelPosition} />
                        <MockUpFormField field={fieldDesc} value={value} editing={this.props.editing} />
                    </div>
                </>
            );
        }
        return (
            <>
                {this.renderLabel(context, fieldDesc)}
                {this.renderField(context, fieldDesc)}
            </>
        );

    }

    private renderLabelAndField(context: FormContext, field: FormField): React.ReactNode
    {
        const layout: FieldLayout = field.layout;
        const fillRow = layout && layout.newLine && this.fillRow(context);
        if (layout && (layout.labelPosition === FieldLabelPosition.Omit))
        {
            return (
                <>
                    {fillRow}
                    {this.renderField(context, field)}
                </>
            );
        }
        else if (layout && (layout.labelPosition === FieldLabelPosition.Above))
        {
            return this.renderLabelAboveAndField(context, field, fillRow);
        }
        else
        {
            return (
                <>
                    {fillRow}
                    {this.renderLabel(context, field)}
                    {this.renderField(context, field)}
                </>
            );
        }
    }

    private renderSection(context: FormContext, section: FormSection): React.ReactNode
    {
        return (
            <>
                {this.sectionStart(context)}
                {section.layoutShow &&
                <div css={context.isFirstRow() ? sectionFirstStyle : sectionStyle}>{section.title}</div>}
                {section.fieldsAndSections.map(
                    sectionFields => this.renderFieldOrSection(context, sectionFields))}
                {this.sectionEnd(context)}
            </>
        );
    }

    private renderTabBar(tabNames: any)
    {
        return (
            <div css={tabBarStyle}>
                <MockUpTabBar tabs={tabNames} selectedIndex={this.selectedTabIndex} onSelection={selectedIndex =>
                {
                    runInAction(() =>
                    {
                        this.selectedTabIndex = selectedIndex;
                    });
                }} />
            </div>
        );
    }

    private rowStyle(context: FormContext): SerializedStyles
    {
        return context.isOddRow() ? oddRowStyle : evenRowStyle;
    }

    private sectionEnd(context: FormContext)
    {
        context.endOfSection = true;
        return this.fillRow(context);
    }

    private sectionStart(context: FormContext): React.ReactNode
    {
        context.endOfSection = false;
        return this.fillRow(context);
    }
}

export default MockUpForm;
