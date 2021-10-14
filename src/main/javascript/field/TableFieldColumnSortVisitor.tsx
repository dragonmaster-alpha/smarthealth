import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {SortOrder} from 'main/component/ColumnSortButton';
import MedicalGroupMemberAggregate from 'main/data/MedicalGroupMemberAggregate';
import TableData, {TableRow} from 'main/data/TableData';
import FormDataUtility from 'main/utility/FormDataUtility';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldButton from 'smarthealth-javascript/FormFieldButton';
import FormFieldConditionsTable from 'smarthealth-javascript/FormFieldConditionsTable';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldFormatted from 'smarthealth-javascript/FormFieldFormatted';
import FormFieldFormSpecific from 'smarthealth-javascript/FormFieldFormSpecific';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldMedicalGroup from 'smarthealth-javascript/FormFieldMedicalGroup';
import FormFieldMedicalGroupList from 'smarthealth-javascript/FormFieldMedicalGroupList';
import FormFieldMedicalGroupLocation from 'smarthealth-javascript/FormFieldMedicalGroupLocation';
import FormFieldMember from 'smarthealth-javascript/FormFieldMember';
import FormFieldMemberOrMedicalGroup from 'smarthealth-javascript/FormFieldMemberOrMedicalGroup';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldSelection from 'smarthealth-javascript/FormFieldSelection';
import FormFieldServiceRecordReference from 'smarthealth-javascript/FormFieldServiceRecordReference';
import FormFieldSnomedTerm from 'smarthealth-javascript/FormFieldSnomedTerm';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldText from 'smarthealth-javascript/FormFieldText';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FormFieldUnsupported from 'smarthealth-javascript/FormFieldUnsupported';
import FormFieldValueSet from 'smarthealth-javascript/FormFieldValueSet';
import FormFieldVisitor from 'smarthealth-javascript/FormFieldVisitor';
import Name from 'smarthealth-javascript/Name';
import ServiceRecordReferenceDisplayType from 'smarthealth-javascript/ServiceRecordReferenceDisplayType';

/**
 * Determine the sortFunction of a field in a table.
 *
 * @author Thompson 21/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

type SortFunction = (field: FormField, sortOrder: SortOrder, tableData: TableData) => TableData;

class TableFieldColumnSortVisitor implements FormFieldVisitor<SortFunction>
{
    public static accept(field: FormField): SortFunction
    {
        return FormFieldTypes.accept(field, new TableFieldColumnSortVisitor());
    }

    private clone(value: TableData): TableData
    {
        return [...value];
    }

    private compare(value1: string | number | boolean, value2: string | number | boolean): number
    {
        if (lodash.isNil(value1))
        {
            return lodash.isNil(value2) ? 0 : -1;
        }
        else if (lodash.isNil(value2))
        {
            return 1;
        }
        else if (value1 < value2)
        {
            return -1;
        }
        else if (value1 > value2)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    private compareMedicalGroupMember(member1: MedicalGroupMemberAggregate,
        member2: MedicalGroupMemberAggregate): number
    {
        return this.compareName(member1 && member1.user.name, member2 && member2.user.name);
    }

    private compareName(name1: Name, name2: Name): number
    {
        if (lodash.isNil(name1))
        {
            return lodash.isNil(name2) ? 0 : -1;
        }
        else if (lodash.isNil(name2))
        {
            return 1;
        }

        let order = 0;
        if (order === 0)
        {
            order = this.compare(name1.givenName, name2.givenName);
        }
        if (order === 0)
        {
            order = this.compare(name1.familyName, name2.familyName);
        }
        return order;
    }

    @autobind
    private defaultSortFunction(field: FormField, sortOrder: SortOrder, tableData: TableData): TableData
    {
        return this.clone(tableData)
            .sort((a: TableRow, b: TableRow) =>
            {
                return this.compare(FormDataUtility.get(a, field), FormDataUtility.get(b, field))
                    * this.order(sortOrder);
            });
    }

    private order(sortOrder: SortOrder): number
    {
        if (sortOrder === SortOrder.up)
        {
            return 1;
        }
        else if (sortOrder === SortOrder.down)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }

    private sortFunctionOnNestedField(pathID: string): SortFunction
    {
        return (field: FormField, sortOrder: SortOrder, tableData: TableData) =>
        {
            return this.clone(tableData)
                .sort((a: TableRow, b: TableRow) =>
                {
                    const objectA = FormDataUtility.get(a, field);
                    const valueA = objectA && lodash.get(objectA, pathID);
                    const objectB = FormDataUtility.get(b, field);
                    const valueB = objectB && lodash.get(objectB, pathID);
                    return this.compare(valueA, valueB) * this.order(sortOrder);
                });
        };
    }

    public visitFormFieldBoolean(field: FormFieldBoolean): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldButton(field: FormFieldButton): SortFunction
    {
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldConditionsTable(field: FormFieldConditionsTable): SortFunction
    {
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldDateTime(field: FormFieldDateTime): SortFunction
    {
        // TODO use DateUtility.compare*()
        return this.sortFunctionOnNestedField('iso');
    }

    public visitFormFieldEnum(field: FormFieldEnum): SortFunction
    {
        return this.sortFunctionOnNestedField('label');
    }

    public visitFormFieldFormSpecific(field: FormFieldFormSpecific): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldFormatted(field: FormFieldFormatted): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldGroup(field: FormFieldGroup): SortFunction
    {
        throw new ShouldNeverGetHereError();
    }

    public visitFormFieldMedicalGroup(field: FormFieldMedicalGroup): SortFunction
    {
        return this.sortFunctionOnNestedField('name');
    }

    public visitFormFieldMedicalGroupList(field: FormFieldMedicalGroupList): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldMedicalGroupLocation(field: FormFieldMedicalGroupLocation): SortFunction
    {
        return this.sortFunctionOnNestedField('name');
    }

    public visitFormFieldMember(field: FormFieldMember): SortFunction
    {
        return (field: FormField, sortOrder: SortOrder, tableData: TableData) =>
        {
            return this.clone(tableData)
                .sort((a: any, b: any) =>
                {
                    return this.compareMedicalGroupMember(FormDataUtility.get(a, field), FormDataUtility.get(b, field))
                        * this.order(sortOrder);
                });
        };
    }

    public visitFormFieldMemberOrMedicalGroup(field: FormFieldMemberOrMedicalGroup): SortFunction
    {
        throw new Error('TODO TableFieldColumnSortVisitor: MemberOrMedicalGroup');
    }

    public visitFormFieldNumber(field: FormFieldNumber): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldSelection(field: FormFieldSelection): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldServiceRecordReference(field: FormFieldServiceRecordReference): SortFunction
    {

        if (field.displayType === ServiceRecordReferenceDisplayType.ServiceDate)
        {
            // TODO use DateUtility.compare*()
            return this.sortFunctionOnNestedField('serviceDate.iso');
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.Summary)
        {
            return this.sortFunctionOnNestedField('summary');
        }
        else if (field.displayType === ServiceRecordReferenceDisplayType.ButtonOnly)
        {
            // column should not be sortable, nothing to sort on
            return null;
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    public visitFormFieldSnomedTerm(field: FormFieldSnomedTerm): SortFunction
    {
        throw new Error('TODO');
    }

    public visitFormFieldTable(field: FormFieldTable): SortFunction
    {
        return null;
    }

    public visitFormFieldText(field: FormFieldText): SortFunction
    {
        return this.defaultSortFunction;
    }

    public visitFormFieldUnsupported(field: FormFieldUnsupported): SortFunction
    {
        return null;
    }

    public visitFormFieldValueSet(field: FormFieldValueSet): SortFunction
    {
        return this.sortFunctionOnNestedField('value');
    }
}

export default TableFieldColumnSortVisitor;
