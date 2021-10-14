import lodash from 'lodash';
import {SortOrder} from 'main/component/ColumnSortButton';
import TableData from 'main/data/TableData';
import TableFieldColumnSortVisitor from 'main/field/TableFieldColumnSortVisitor';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldValueSet from 'smarthealth-javascript/FormFieldValueSet';
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';
import {
    MEMBER_BARNEY_STINSON, MEMBER_DOCTOR_DOLITTLE, MEMBER_MARSHALL_ERIKSEN, MEMBER_MARSHALL_STINSON, MEMBER_TED_ERIKSEN,
    MEMBER_TED_MOSBY
} from 'test/data/MedicalGroupMemberAggregateMother';
import {PHILLIP_GENERAL_PRACTICE, PILLS_PHARMACY, ST_VASELINE} from 'test/data/MedicalGroupMother';

/**
 * Tester for TableFieldColumnSortVisitor.tsx
 *
 * @author Thompson 21/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const sort = (field: FormField, sortOrder: SortOrder, tableData: TableData) =>
{
    const sortFunction = TableFieldColumnSortVisitor.accept(field);
    return sortFunction(field, sortOrder, tableData);
};

describe('BooleanField', () =>
{
    const field: FormFieldBoolean = {
        id: 'field',
        label: 'Field',
        state: { editState: FieldEditState.Enabled },
        type: FormFieldType.Boolean
    };
    const expectedValue = [
        { field: null, familyName: 'Do', age: 29 },
        { field: false, familyName: 'Re', age: 53 },
        { field: true, familyName: 'Mi', age: 47 }
    ];

    expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
        .toEqual(expectedValue);
    expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
        .toEqual(expectedValue.reverse());
});

describe('DateTimeField', () =>
{
    const field: FormFieldDateTime = {
        id: 'Date',
        label: 'Date',
        type: FormFieldType.DateTime,
        precisionDay: true,
        state: { editState: FieldEditState.Enabled }
    };
    test('empty', () =>
    {
        const value = [];
        const expectedValue = [];
        expect(sort(field, SortOrder.up, value))
            .toEqual(expectedValue);
    });

    test('with null', () =>
    {
        const value = [
            { Date: null, name: 'Vin', age: 29 },
            { Date: null, name: 'Tom', age: 29 },
            { Date: null, name: 'Sam', age: 29 }
        ];
        const expectedValue = [
            { Date: null, name: 'Vin', age: 29 },
            { Date: null, name: 'Tom', age: 29 },
            { Date: null, name: 'Sam', age: 29 }
        ];
        expect(sort(field, SortOrder.up, value))
            .toEqual(expectedValue);
    });

    test('order invalid dateString and EventDateTime values', () =>
    {
        const expectedValue = [
            { Date: '195/5/', name: 'Vin', age: 29 },
            { Date: { iso: '2020-01-18' }, name: 'Vin', age: 29 },
            { Date: { iso: '2021' }, name: 'Vin', age: 29 },
            { Date: { iso: '2021-06' }, name: 'Vin', age: 29 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
    });

    const expectedValue = [
        { Date: { iso: '1955-12-01' }, name: 'Vin', age: 29 },
        { Date: { iso: '1955-12-10' }, name: 'Vin', age: 29 },
        { Date: { iso: '2009-05-20' }, name: 'Vin', age: 29 },
        { Date: { iso: '2009-06-20' }, name: 'Vin', age: 29 },
        { Date: { iso: '2020-01-18' }, name: 'Vin', age: 29 },
        { Date: { iso: '2021-01-18' }, name: 'Vin', age: 29 }
    ];
    test('sorts all Dates', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });

    test('sorts all Dates with null value', () =>
    {
        const expectedValue = [
            { Date: null, name: 'Vin', age: 29 },
            { Date: { iso: '1955-12-01' }, name: 'Vin', age: 29 },
            { Date: { iso: '1955-12-10' }, name: 'Vin', age: 29 },
            { Date: { iso: '2009-06-20' }, name: 'Vin', age: 29 },
            { Date: { iso: '2020-01-18' }, name: 'Vin', age: 29 },
            { Date: { iso: '2021-01-18' }, name: 'Vin', age: 29 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('EnumField', () =>
{
    const field: FormFieldEnum = {
        id: 'field',
        label: 'ATSI',
        type: FormFieldType.Enum,
        enumType: 'ATSI',
        state: { editState: FieldEditState.Enabled }
    };
    const expectedValue = [
        { field: { label: null }, date: { iso: '1985-11-23' }, age: 50 },
        { field: { label: 'Both Aboriginal and TSI' }, date: { iso: '1985-11-23' }, age: 50 },
        { field: { label: 'Neither Aboriginal nor TSI' }, date: { iso: '1985-11-23' }, age: 50 },
        { field: { label: 'TSI but not Aboriginal ' }, date: { iso: '1985-11-23' }, age: 50 }
    ];
    test('order Enum with null value', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('MemberField', () =>
{
    const field: FormFieldMember = {
        id: 'Member',
        label: 'Member',
        state: { editState: FieldEditState.Enabled },
        type: FormFieldType.Member
    };

    test('order Members with null value', () =>
    {
        const expectedMembers: {}[] = [
            { Member: null, date: { iso: '1970-03-22' }, age: 20 },
            { Member: MEMBER_BARNEY_STINSON, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_DOCTOR_DOLITTLE, date: { iso: '1970-09-22' }, age: 63 },
            { Member: MEMBER_MARSHALL_ERIKSEN, date: { iso: '1970-07-22' }, age: 77 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedMembers)))
            .toEqual(expectedMembers);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedMembers)))
            .toEqual(expectedMembers.reverse());
    });

    test('order with same name', () =>
    {
        const expectedMembers: {}[] = [
            { Member: MEMBER_BARNEY_STINSON, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_DOCTOR_DOLITTLE, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_DOCTOR_DOLITTLE, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_MARSHALL_ERIKSEN, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_TED_MOSBY, date: { iso: '1970-08-22' }, age: 60 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedMembers)))
            .toEqual(expectedMembers);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedMembers)))
            .toEqual(expectedMembers.reverse());
    });

    test('order with same givenName and different familyName', () =>
    {
        const expectedShortMember: {}[] = [
            { Member: MEMBER_TED_ERIKSEN, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_TED_MOSBY, date: { iso: '1970-08-22' }, age: 60 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedShortMember)))
            .toEqual(expectedShortMember);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedShortMember)))
            .toEqual(expectedShortMember.reverse());

        const expectedLongMembers: {}[] = [
            { Member: MEMBER_BARNEY_STINSON, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_DOCTOR_DOLITTLE, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_MARSHALL_ERIKSEN, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_MARSHALL_STINSON, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_TED_ERIKSEN, date: { iso: '1970-08-22' }, age: 60 },
            { Member: MEMBER_TED_MOSBY, date: { iso: '1970-08-22' }, age: 60 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedLongMembers)))
            .toEqual(expectedLongMembers);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedLongMembers)))
            .toEqual(expectedLongMembers.reverse());
    });
});

describe('MedicalGroupField', () =>
{
    const field: FormFieldMedicalGroup = {
        id: 'MedicalGroup',
        label: 'Medical group',
        state: { editState: FieldEditState.Enabled },
        type: FormFieldType.MedicalGroup
    };
    const recentMedicalGroups = [ST_VASELINE, PHILLIP_GENERAL_PRACTICE, PILLS_PHARMACY];
    const value: {}[] = recentMedicalGroups.map(value =>
    {
        return {
            [field.id]: { value, name: value.name, city: value.address.city, state: value.address.state },
            date: { iso: '2000-01-13' }, age: 40
        };
    });
    value.push({ MedicalGroup: null, date: { iso: '2000-01-13' }, age: 40 });

    const expectedRecentMedicalGroups = [{
        [field.id]: null, date: { iso: '2000-01-13' }, age: 40
    }, {
        [field.id]: {
            value: PHILLIP_GENERAL_PRACTICE, name: PHILLIP_GENERAL_PRACTICE.name,
            city: PHILLIP_GENERAL_PRACTICE.address.city,
            state: PHILLIP_GENERAL_PRACTICE.address.state
        }, date: { iso: '2000-01-13' }, age: 40
    }, {
        [field.id]: {
            value: PILLS_PHARMACY, name: PILLS_PHARMACY.name, city: PILLS_PHARMACY.address.city,
            state: PILLS_PHARMACY.address.state
        }, date: { iso: '2000-01-13' }, age: 40
    }, {
        [field.id]: {
            value: ST_VASELINE, name: ST_VASELINE.name, city: ST_VASELINE.address.city, state: ST_VASELINE.address.state
        }, date: { iso: '2000-01-13' }, age: 40
    }];

    test('order MedicalGroup with null value', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedRecentMedicalGroups)))
            .toEqual(expectedRecentMedicalGroups);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedRecentMedicalGroups)))
            .toEqual(expectedRecentMedicalGroups.reverse());
    });
});

describe('MedicalGroupLocationField', () =>
{
    const field: FormFieldMedicalGroupLocation = {
        id: 'Location',
        label: 'Location',
        state: { editState: FieldEditState.Enabled },
        type: FormFieldType.MedicalGroupLocation
    };
    const expectedValue = [
        { Location: null, date: { iso: '2000-05-15' }, name: 'Sam' },
        { Location: { enabled: true, id: 1, name: 'Here', version: 0 }, date: { iso: '2000-05-15' }, name: 'Sam' },
        { Location: { enabled: true, id: 1, name: 'Here', version: 0 }, date: { iso: '2000-05-15' }, name: 'Sam' },
        { Location: { enabled: true, id: 2, name: 'There', version: 0 }, date: { iso: '2000-05-15' }, name: 'Sam' },
        { Location: { enabled: true, id: 2, name: 'There', version: 0 }, date: { iso: '2000-05-15' }, name: 'Sam' }
    ];
    test('order MedicalGroupLocation with null value', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('NumberField', () =>
{
    const field: FormFieldNumber = {
        id: 'field',
        label: 'Field',
        type: FormFieldType.Number,
        acceptNegative: true,
        precision: 5,
        scale: 2,
        state: { editState: FieldEditState.Enabled }
    };
    const expectedValue = [
        { field: null, date: { iso: '2000-10-20' }, name: 'Vince' },
        { field: 100.00, date: { iso: '2000-10-20' }, name: 'Vince' },
        { field: 100.00, date: { iso: '2000-10-20' }, name: 'Vince' },
        { field: 200.00, date: { iso: '2000-10-20' }, name: 'Vince' }
    ];

    test('order NumberField with null value', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('ServiceRecordReferenceField', () =>
{
    test('Sort of displayType=serviceDate', () =>
    {
        const field: FormFieldServiceRecordReference = {
            displayType: ServiceRecordReferenceDisplayType.ServiceDate,
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.ServiceRecordReference
        };

        const expectedValue: TableData = [
            { field: { serviceDate: { iso: '2010-01-09' }, summary: 'AV fistula, Left Forearm, Duration - 60 mins' } },
            { field: { serviceDate: { iso: '2010-02-09' }, summary: 'AV fistula, Left Forearm, Duration - 60 mins' } },
            { field: { serviceDate: { iso: '2010-02-10' }, summary: 'AV fistula, Left Forearm, Duration - 60 mins' } },
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, Duration - 60 mins' } },
            { field: { serviceDate: { iso: '2051-01-09' }, summary: 'AV fistula, Left Forearm, Duration - 60 mins' } }
        ];

        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });

    test('Sort of displayType=summary', () =>
    {
        const field: FormFieldServiceRecordReference = {
            displayType: ServiceRecordReferenceDisplayType.Summary,
            id: 'field',
            label: 'Field',
            state: { editState: FieldEditState.Enabled },
            type: FormFieldType.ServiceRecordReference
        };

        const expectedValue: TableData = [
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, A' } },
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, Y' } },
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, a' } },
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, t' } },
            { field: { serviceDate: { iso: '2020-01-09' }, summary: 'AV fistula, Left Forearm, y' } }
        ];

        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('TextField', () =>
{
    const field: FormFieldText = {
        id: 'field',
        label: 'Field',
        type: FormFieldType.Text,
        size: 10,
        state: { editState: FieldEditState.Enabled }
    };

    test('empty', () =>
    {
        const value = [];
        const expectedValue = [];
        expect(sort(field, SortOrder.up, value))
            .toEqual(expectedValue);
    });

    test('all null value', () =>
    {
        const value = [
            { field: null, date: { iso: '2000-10-20' }, age: 20 },
            { field: null, date: { iso: '2000-10-20' }, age: 20 },
            { field: null, date: { iso: '2000-10-20' }, age: 20 }
        ];
        const expectedValue = [
            { field: null, date: { iso: '2000-10-20' }, age: 20 },
            { field: null, date: { iso: '2000-10-20' }, age: 20 },
            { field: null, date: { iso: '2000-10-20' }, age: 20 }
        ];
        expect(sort(field, SortOrder.up, value))
            .toEqual(expectedValue);
    });

    const expectedValue = [
        { field: '123', date: { iso: '2000-10-20' }, age: 20 },
        { field: 'abc', date: { iso: '2000-10-20' }, age: 20 },
        { field: 'bcd', date: { iso: '2000-10-20' }, age: 20 }
    ];
    test('order with alphabet and number', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });

    test('return same order', () =>
    {
        const value = [
            { field: '123', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'abc', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'bcd', date: { iso: '2000-10-20' }, age: 20 }
        ];
        const expectedValue = [
            { field: '123', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'abc', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'bcd', date: { iso: '2000-10-20' }, age: 20 }
        ];
        expect(sort(field, SortOrder.up, value))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, value))
            .toEqual(expectedValue.reverse());
    });

    test('With duplicate initial characters', () =>
    {
        const expectedValue = [
            { field: '11bcd', date: { iso: '2000-10-20' }, age: 20 },
            { field: '123', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'aaac', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'aabc', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'describe', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'description', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'sam', date: { iso: '2000-10-20' }, age: 20 },
            { field: 'sim', date: { iso: '2000-10-20' }, age: 20 }
        ];
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

describe('ValueSetField', () =>
{
    const field: FormFieldValueSet = {
        id: 'Assessment.Laterality',
        label: 'Laterality',
        state: { editState: FieldEditState.Enabled },
        type: FormFieldType.ValueSet,
        valueSetID: 'Bodystructure.Laterality'
    };
    const expectedValue = [{
        ['Assessment.Laterality']: null, australianBorn: true, age: 29
    }, {
        'Assessment.Laterality': {
            code: 'B', codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
            value: 'Bilateral'
        }, australianBorn: true, age: 29
    }, {
        'Assessment.Laterality': {
            code: 'L', codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
            value: 'Left'
        }, australianBorn: true, age: 29
    }, {
        'Assessment.Laterality': {
            code: 'N', codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
            value: 'Not applicable'
        }, australianBorn: true, age: 29
    }, {
        'Assessment.Laterality': {
            code: 'R', codeSet: 'http://meteor.aihw.gov.au/content/index.phtml/itemId/422769',
            value: 'Right'
        }, australianBorn: true, age: 29
    }];
    test('order ValueSet with null value', () =>
    {
        expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue);
        expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
            .toEqual(expectedValue.reverse());
    });
});

test('Field with valuePath', () =>
{
    const field: FormFieldText = {
        id: 'givenName',
        label: 'Field',
        type: FormFieldType.Text,
        size: 40,
        valuePath: 'name.givenName'
    };

    const expectedValue = [
        { name: { givenName: 'Fred', familyName: 'Astaire' }, date: { iso: '1899-05-10' } },
        { name: { givenName: 'Ginger', familyName: 'Rogers' }, date: { iso: '1911-07-16' } },
        { name: { givenName: 'Irving', familyName: 'Berlin' }, date: { iso: '1888-05-11' } }
    ];

    expect(sort(field, SortOrder.up, lodash.shuffle(expectedValue)))
        .toEqual(expectedValue);
    expect(sort(field, SortOrder.down, lodash.shuffle(expectedValue)))
        .toEqual(expectedValue.reverse());
});
