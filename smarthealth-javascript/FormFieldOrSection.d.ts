import FormField from './FormField';
import FormSection from './FormSection';
import FormTabs from './FormTabs';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.form.FormFieldOrSection
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface FormFieldOrSection {
    field?: FormField;
    section?: FormSection;
    subheading?: string;
    tabs?: FormTabs;
}
export default FormFieldOrSection;
