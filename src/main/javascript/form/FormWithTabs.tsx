import Scroll from 'main/container/Scroll';
import TabPane from 'main/container/TabPane';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import FormContext from 'main/form/FormContext';
import FormFieldsAndSections from 'main/form/FormFieldsAndSections';
import FormLayout from 'main/layout/FormLayout';
import {grid} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Display a form with tabs, including scrolling.
 *
 * @author Larry 6/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface FormWithTabsProps<T>
{
    context: FormContext<T>;
    data: T;
    onFieldChange: OnFieldChange;
}

@observer
class FormWithTabs<T> extends React.Component<FormWithTabsProps<T>>
{
    public render()
    {
        const { formDescription } = this.props.context;
        const { fieldsAndSections } = formDescription;
        if (fieldsAndSections[0].tabs == null)
        {
            // there are fields before the tabs
            return (
                <div style={grid(null, 'auto 1fr')}>
                    <FormFieldsAndSections context={this.props.context} data={this.props.data}
                        fieldsAndSections={fieldsAndSections} onFieldChange={this.props.onFieldChange} />
                    {this.renderTabs(formDescription)}
                </div>
            );
        }
        else
        {
            return (
                <div style={grid()}>
                    {this.renderTabs(formDescription)}
                </div>
            );
        }
    }

    // TODO width of main form may be different from tab forms - need to make it look right
    private renderTabs(formDescription: FormDescription): React.ReactNode
    {
        const tabsFieldOrSection = formDescription.fieldsAndSections.find(
            fieldOrSection => !!fieldOrSection.tabs);
        const tabs = tabsFieldOrSection.tabs;

        const renderableTabs = tabs.tabs.map(tab =>
        {
            const tabContent = (
                <Scroll>
                    <FormLayout editing={this.props.context.editing} fieldsAndSections={tab.sections}
                        layoutColumns={formDescription.layoutColumns}>
                        <FormFieldsAndSections context={this.props.context} data={this.props.data}
                            fieldsAndSections={tab.sections} onFieldChange={this.props.onFieldChange} />
                    </FormLayout>
                </Scroll>
            );
            return { title: tab.title, key: tab.id, content: tabContent };
        });

        return <TabPane tabs={renderableTabs} />;
    }
}

export default FormWithTabs;
