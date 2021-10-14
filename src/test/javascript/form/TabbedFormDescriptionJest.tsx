import FormDescriptionTab from 'main/form/FormDescriptionTab';
import TabbedFormDescription from 'main/form/TabbedFormDescription';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import CancerCentralNervousSystemMDTReview
    from 'smarthealth-rest-test/formdesc/service/Form.Cancer.CentralNervousSystem.MDTReview.json';

/**
 * Test for TabbedFormDescription.tsx
 *
 * @author Thompson 3/09/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
function extractFieldOrSectionID(fieldOrSection: FormFieldOrSection, fieldOrSectionIDs: string[])
{
    if (fieldOrSection.field)
    {
        fieldOrSectionIDs.push(fieldOrSection.field.id);
    }
    else if (fieldOrSection.section)
    {
        fieldOrSectionIDs.push(fieldOrSection.section.id);
    }
}

test.skip('Extract one section with layoutTabName', () =>
{
    const tab: FormDescription = {
        description: '',
        fieldsAndSections: [{
            section: {
                fieldsAndSections: [{}],
                id: 'firstTab',
                title: 'First Tab'
            }
        }],
        layoutColumns: 1
    };
    const description: TabbedFormDescription = TabbedFormDescription.build(tab.fieldsAndSections);
    const tabsIDs: string[] = description.tabs.map((tab: FormDescriptionTab) => tab.name);
    const expectedID: string[] = ['First Tab'];
    expect(tabsIDs)
        .toEqual(expectedID);
});

test.skip('Extract two sections under the same layoutTabName', () =>
{
    const meetingTab = {
        description: '',
        fieldsAndSections: [{
            section: {
                fieldsAndSections: [{}],
                id: 'meeting',
                layoutTabName: 'Meeting',
                title: 'Meeting'
            }
        }, {
            section: {
                fieldsAndSections: [{}],
                id: 'overview',
                title: 'Overview'
            }
        }],
        layoutColumns: 1
    } as FormDescription;
    const description: TabbedFormDescription = TabbedFormDescription.build(meetingTab.fieldsAndSections);
    const tabContentIDs: string[] = [];
    description.tabs.forEach((tab: FormDescriptionTab) =>
        tab.fieldsAndSection.map(
            (tabFieldOrSection: FormFieldOrSection) => extractFieldOrSectionID(tabFieldOrSection, tabContentIDs)));

    const expectedID: string[] = ['meeting', 'overview'];
    expect(tabContentIDs)
        .toEqual(expectedID);
});

describe.skip('TabbedFormDescription build method extract headers and tabs correctly', () =>
{
    const cancerCentralNervousDescription = CancerCentralNervousSystemMDTReview as FormDescription;
    const description: TabbedFormDescription = TabbedFormDescription.build(
        cancerCentralNervousDescription.fieldsAndSections);

    test('extract of header correctly', () =>
    {
        expect(description.header.length)
            .toEqual(11);
        const expectedHeaderIdOrder = ['Provider', 'ServiceDate', 'Confidentiality', 'Setting', 'Purpose', 'Location',
            'MDTMeetingDate', 'DiscussionStatus', 'Reason', 'MeetingNumber', 'Discussed'];

        const headerIDs: string[] = [];
        description.header.forEach(header => extractFieldOrSectionID(header, headerIDs));
        expect(headerIDs)
            .toEqual(expectedHeaderIdOrder);
    });

    test('extract tabs correctly', () =>
    {
        expect(description.tabs.length)
            .toEqual(8);
        const expectedTabsIdOrder = ['Sysopsis', 'History', 'Diagnostics', 'Supportive Care', 'Meeting Notes',
            'Diagnosis', 'Recommendations', 'Clinical Trial'];

        const tabsIDs: string[] = description.tabs.map((tab: FormDescriptionTab) => tab.name);
        expect(tabsIDs)
            .toEqual(expectedTabsIdOrder);
    });

    test('extract each tab content correctly', () =>
    {
        const expectedTabsIdOrder = [
            ['Synopsis', 'HealthcareProviders', 'Assessment'],
            ['History'],
            ['Pathology', 'Imaging', 'Endoscopy'],
            ['SupportiveCare'],
            ['Discussion'],
            ['DiagnosisAssessment', 'Diagnosis', 'OtherDiagnosis'],
            ['Recommendations'],
            ['ClinicalTrial']
        ];
        const tabsContentIDs: string[][] = [];
        const tabsFieldOrSections: FormFieldOrSection[][] = description.tabs.map(
            (tab: FormDescriptionTab) => tab.fieldsAndSection);

        tabsFieldOrSections.forEach((fieldOrSections: FormFieldOrSection[]) =>
        {
            const tabContentIDs: string[] = [];
            fieldOrSections.map(
                (tabFieldOrSection: FormFieldOrSection) => extractFieldOrSectionID(tabFieldOrSection, tabContentIDs));
            tabsContentIDs.push(tabContentIDs);
        });
        expect(tabsContentIDs)
            .toEqual(expectedTabsIdOrder);
    });
});
