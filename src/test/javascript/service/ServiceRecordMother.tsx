import lodash from 'lodash';
import TableData, {TableRow} from 'main/data/TableData';
import EnumUtility from 'main/utility/EnumUtility';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDataUtility from 'main/utility/FormDataUtility';
import moment from 'moment';
import EntityData from 'smarthealth-javascript/EntityData';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldDateTime from 'smarthealth-javascript/FormFieldDateTime';
import FormFieldNumber from 'smarthealth-javascript/FormFieldNumber';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import MedicalGroupLocationConstants from 'smarthealth-javascript/MedicalGroupLocationConstants';
import Precision from 'smarthealth-javascript/Precision';
import {MEMBERID_BILL_GOLFALOT} from 'test/data/MedicalGroupMemberAggregateMother';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import TextMother from 'test/data/TextMother';
import MockUpDateTimeField from 'test/design/MockUpDateTimeField';

/**
 * Create random service record data for testing.
 *
 * @author Larry 14/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const EXCLUDE_FIELDS = ['ID', 'Patient', 'SetID', 'Version'];

class ServiceRecordMother
{
    public static createRandomData(formDesc: FormDescription): EntityData
    {
        const data = {};
        formDesc.fieldsAndSections.forEach(
            fieldOrSection => ServiceRecordMother.createRandomFieldOrSection(fieldOrSection, data));
        return data;
    }

    public static createRandomField(field: FormField, data: EntityData)
    {
        if (EXCLUDE_FIELDS.indexOf(field.id) >= 0)
        {
            // ignore the field
        }
        else if (!FieldStateUtility.isMandatory(field.state) && ServiceRecordMother.generateRandomBoolean())
        {
            // leave optional fields empty half the time
        }
        else
        {
            const value = ServiceRecordMother.createRandomValue(field);
            if (!lodash.isNil(value))
            {
                FormDataUtility.set(data, field, value);
            }
        }
    }

    private static createRandomFieldOrSection(fieldOrSection: FormFieldOrSection, data: EntityData)
    {
        if (fieldOrSection.field)
        {
            ServiceRecordMother.createRandomField(fieldOrSection.field, data);
        }
        else if (fieldOrSection.section)
        {
            fieldOrSection.section.fieldsAndSections.forEach(
                fieldOrSection => ServiceRecordMother.createRandomFieldOrSection(fieldOrSection, data));
        }
    }

    public static createRandomValue(field: FormField)
    {
        if (FormFieldTypes.isBoolean(field))
        {
            return ServiceRecordMother.generateRandomBoolean();
        }
        else if (FormFieldTypes.isDateTime(field))
        {
            return ServiceRecordMother.generateRandomDate(field);
        }
        else if (FormFieldTypes.isEnum(field))
        {
            const e = EnumUtility.ENUMS[field.enumType];
            const selection = ServiceRecordMother.generateRandomSelection(Object.keys(e));
            return e[selection];
        }
        else if (FormFieldTypes.isNumber(field))
        {
            return ServiceRecordMother.generateRandomNumber(field);
        }
        else if (FormFieldTypes.isSelection(field))
        {
            return ServiceRecordMother.generateRandomSelection(field.options);
        }
        else if (FormFieldTypes.isText(field))
        {
            return ServiceRecordMother.generateRandomText(field.size);
        }
        else if (FormFieldTypes.isMedicalGroup(field))
        {
            return ST_VINCENTS_HOSPITAL.groupID;
        }
        else if (FormFieldTypes.isMedicalGroupLocation(field))
        {
            return { id: MedicalGroupLocationConstants.SUBURB, name: ST_VINCENTS_HOSPITAL.address.city };
        }
        else if (FormFieldTypes.isMember(field))
        {
            return MEMBERID_BILL_GOLFALOT;
        }
        else if (FormFieldTypes.isTable(field))
        {
            return ServiceRecordMother.generateRandomTable(field);
        }
        else
        {
            return null;
        }
    }

    private static generateRandomBoolean(): boolean
    {
        return Math.random() < 0.5;
    }

    private static generateRandomDate(field: FormFieldDateTime): EventDateTime
    {
        function twoDigits(number: number)
        {
            return (number < 10) ? `0${number}` : number;
        }

        const year = ServiceRecordMother.generateRandomInteger(1920, 2020);
        const month = ServiceRecordMother.generateRandomInteger(1, 12);
        const day = ServiceRecordMother.generateRandomInteger(1, 28);
        const hours = moment()
            .format('HH');
        const minutes = moment()
            .format('mm');
        if (MockUpDateTimeField.determineFieldHighestPrecision(field) === Precision.Minute)
        {
            return { iso: `${year}-${twoDigits(month)}-${twoDigits(day)}T${hours}:${minutes}` };
        }
        else if (MockUpDateTimeField.determineFieldHighestPrecision(field) === Precision.Day)
        {
            return { iso: `${year}-${twoDigits(month)}-${twoDigits(day)}` };
        }
    }

    private static generateRandomInteger(min: number, max: number): number
    {
        const range = max - min;
        return Math.floor(Math.random() * range) + min;
    }

    private static generateRandomNumber(field: FormFieldNumber): number
    {
        if (!lodash.isNil(field.maximum))
        {
            return ServiceRecordMother.generateRandomInteger(field.minimum || 0, field.maximum);
        }

        const max = Math.pow(10, field.precision) - 1;
        const min = field.acceptNegative ? -max : 0;
        const int = ServiceRecordMother.generateRandomInteger(min, max);
        const number = (field.scale > 0) ? int / Math.pow(10, field.scale) : int;
        return number;
    }

    private static generateRandomSelection(selections: string[])
    {
        return selections[ServiceRecordMother.generateRandomInteger(0, selections.length - 1)];
    }

    private static generateRandomTable(field: FormFieldTable): TableData
    {
        const rowCount = ServiceRecordMother.generateRandomInteger(1, 6);
        const data = [];
        for (let r = 0; r < rowCount; r += 1)
        {
            data.push(ServiceRecordMother.generateRandomTableRow(field));
        }
        return data;
    }

    private static generateRandomTableRow(field: FormFieldTable): TableRow
    {
        const row = {};
        field.columns.forEach(column =>
        {
            const value = ServiceRecordMother.createRandomValue(column);
            FormDataUtility.set(row, column, value);
        });
        return row;
    }

    private static generateRandomText(size: number)
    {
        return TextMother.text(size);
    }
}

export default ServiceRecordMother;
