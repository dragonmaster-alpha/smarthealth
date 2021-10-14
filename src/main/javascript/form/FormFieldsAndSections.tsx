import ErrorBoundary from 'main/component/ErrorBoundary';
import FieldContext from 'main/field/FieldContext';
import FieldFactory from 'main/field/FieldFactory';
import SimpleFieldContext from 'main/field/SimpleFieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import FormContext from 'main/form/FormContext';
import FormSubheading from 'main/form/FormSubheading';
import SectionEnd from 'main/form/SectionEnd';
import SectionHeading from 'main/form/SectionHeading';
import FormFieldLayoutError from 'main/layout/FormFieldLayoutError';
import FormFieldLayoutState from 'main/layout/FormFieldLayoutState';
import FormLabelAndField from 'main/layout/FormLabelAndField';
import FormLayout from 'main/layout/FormLayout';
import FormLineLayout from 'main/layout/FormLineLayout';
import SkipGridColumns from 'main/layout/SkipGridColumns';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormSection from 'smarthealth-javascript/FormSection';

/**
 * Display fields and sections (and other bits) for all or part of a form. This ignores tabs.
 *
 * @author Larry 6/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
export interface FormFieldsAndSectionsProps<T>
{
    context: FormContext<T>;
    data: T;
    fieldsAndSections: FormFieldOrSection[];
    onFieldChange: OnFieldChange;
}

@observer
class FormFieldsAndSections<T> extends React.Component<FormFieldsAndSectionsProps<T>>
{
    private fillLastLine(layoutState: FormFieldLayoutState)
    {
        const { skipGridColumns, oddRow } = layoutState.nextLine();
        return <SkipGridColumns columns={skipGridColumns} oddRow={oddRow} />;
    }

    private layoutField(fieldContext: FieldContext, layoutState: FormFieldLayoutState): React.ReactNode
    {
        const { layout } = fieldContext.field;

        const components = [];
        try
        {
            if (layout && layout.newLine)
            {
                const { skipGridColumns, oddRow } = layoutState.nextLine();
                if (skipGridColumns > 0)
                {
                    components.push(<SkipGridColumns columns={skipGridColumns} oddRow={oddRow} />);
                }
            }

            if (layout && layout.skip)
            {
                const { skipGridColumns, oddRow } = layoutState.skip(layout.skip);
                if (skipGridColumns > 0)
                {
                    components.push(<SkipGridColumns columns={skipGridColumns} oddRow={oddRow} />);
                }
            }

            if (layout && layout.spanLine)
            {
                const { gridColumns, oddRow } = layoutState.fillLine();
                components.push(
                    <FormLabelAndField fieldContext={fieldContext} gridColumns={gridColumns} oddRow={oddRow}>
                        {this.renderFieldField(fieldContext)}
                    </FormLabelAndField>
                );
            }
            else
            {
                const layoutColumns = (layout && layout.span) || 1;
                const { gridColumns, oddRow } = layoutState.fill(layoutColumns);
                components.push(
                    <FormLabelAndField fieldContext={fieldContext} gridColumns={gridColumns} oddRow={oddRow}>
                        {this.renderFieldField(fieldContext)}
                    </FormLabelAndField>
                );
            }
        }
        catch (error)
        {
            const { gridColumns, oddRow } = layoutState.fill(1);
            components.push(<FormFieldLayoutError fieldID={fieldContext.field.id} gridColumns={gridColumns}
                message={error.message} oddRow={oddRow} />);
        }

        return components;
    }

    private layoutLine(layoutState: FormFieldLayoutState, children: React.ReactNode): React.ReactNode
    {
        const components = [];
        {
            const { skipGridColumns, oddRow } = layoutState.nextLine();
            if (skipGridColumns > 0)
            {
                components.push(<SkipGridColumns columns={skipGridColumns} oddRow={oddRow} />);
            }
        }

        const { gridColumns, oddRow } = layoutState.fillLine();
        components.push(<FormLineLayout gridColumns={gridColumns} oddRow={oddRow}>{children}</FormLineLayout>);
        return components;
    }

    public render(): React.ReactNode
    {
        const layoutState = new FormFieldLayoutState(this.props.context.formDescription.layoutColumns);
        return (
            <FormLayout editing={this.props.context.editing}
                fieldsAndSections={this.props.fieldsAndSections}
                layoutColumns={this.props.context.formDescription.layoutColumns}>
                {this.renderFieldSectionOrSectionEnd(this.props.fieldsAndSections, layoutState)}
                {this.fillLastLine(layoutState)}
            </FormLayout>
        );
    }

    private renderField(field: FormField, layoutState: FormFieldLayoutState): React.ReactNode
    {
        const formContext = this.props.context;
        if (!FieldStateUtility.isVisible(formContext.editing, formContext.fieldStates[field.id]))
        {
            return null;
        }

        const fieldContext = SimpleFieldContext.build(formContext, field);
        return (
            <ErrorBoundary key={field.id} message={`Error in field ${field.id}`}>
                {this.layoutField(fieldContext, layoutState)}
            </ErrorBoundary>
        );
    }

    private renderFieldField(fieldContext: FieldContext): React.ReactNode
    {
        return <FieldFactory context={fieldContext} data={this.props.data} onFieldChange={this.props.onFieldChange} />;
    }

    private renderFieldOrSection(fieldOrSection: FormFieldOrSection, layoutState: FormFieldLayoutState): React.ReactNode
    {
        if (fieldOrSection.field)
        {
            return this.renderField(fieldOrSection.field, layoutState);
        }
        else if (fieldOrSection.section)
        {
            return this.renderSection(fieldOrSection.section, layoutState);
        }
        else if (fieldOrSection.subheading)
        {
            return this.renderSubheading(fieldOrSection.subheading, layoutState);
        }
        else if (fieldOrSection.tabs)
        {
            // tabs are rendered separately
            return null;
        }
        else
        {
            return `Unknown element: ${JSON.stringify(fieldOrSection)}`;
        }
    }

    private renderFieldSectionOrSectionEnd(fieldsAndSections: FormFieldOrSection[],
        layoutState: FormFieldLayoutState): React.ReactNode
    {
        return fieldsAndSections.map((fieldOrSection: FormFieldOrSection, i: number) =>
        {
            const endSection = FormDescriptionUtility.isEndSection(i, fieldsAndSections);

            return (
                <>
                    {this.renderFieldOrSection(fieldOrSection, layoutState)}
                    {endSection && this.renderSectionEnd(layoutState)}
                </>
            );
        });
    }

    private renderSection(section: FormSection, layoutState: FormFieldLayoutState): React.ReactNode
    {
        return (
            <>
                {section.layoutShow && this.layoutLine(layoutState, <SectionHeading title={section.title} />)}
                {this.renderFieldSectionOrSectionEnd(section.fieldsAndSections, layoutState)}
            </>
        );
    }

    private renderSectionEnd(layoutState: FormFieldLayoutState): React.ReactNode
    {
        return this.layoutLine(layoutState, <SectionEnd />);
    }

    private renderSubheading(subheading: string, layoutState: FormFieldLayoutState): React.ReactNode
    {
        return this.layoutLine(layoutState, <FormSubheading title={subheading} />);
    }
}

export default FormFieldsAndSections;
