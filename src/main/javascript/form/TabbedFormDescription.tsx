import FormDescriptionTab from 'main/form/FormDescriptionTab';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';

/**
 * Data structure to hold non-tabbed sections and fields into header.
 * Otherwise if section has layoutTabName it is a tab and stored as tabs.
 *
 * @author Thompson 22/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class TabbedFormDescription
{
    // TODO The JSON form descriptions have been changed to incorporate the tabs. This is no longer necessary.
    public static build(fieldsAndSections: FormFieldOrSection[]): TabbedFormDescription
    {
        const description: TabbedFormDescription = new TabbedFormDescription();
        description.tabs = [];
        const current: FormFieldOrSection[] = [];
        description.header = current;
        fieldsAndSections.forEach((fieldOrSection: FormFieldOrSection) =>
        {
            if (fieldOrSection.field || fieldOrSection.subheading)
            {
                current.push(fieldOrSection);
            }
            else if (fieldOrSection.section)
            {
                current.push(fieldOrSection);
            }
            else
            {
                throw new ShouldNeverGetHereError();
            }
        });
        return description;
    }

    public header: FormFieldOrSection[];

    public tabs: FormDescriptionTab[];
}

export default TabbedFormDescription;
