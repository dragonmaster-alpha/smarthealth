import {storiesOf} from '@storybook/react';
import EnumUtility from 'main/utility/EnumUtility';
import React from 'react';
import FormFieldEnum from 'smarthealth-javascript/FormFieldEnum';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import FormFieldTypes from 'smarthealth-javascript/FormFieldTypes';
import FieldTester from 'test/field/FieldTester';
import {fieldUsagePredicate} from 'test/field/FieldUsageUtility';

/**
 * Allow debugging of EnumField component
 *
 * @author Priyanka 26/02/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const stories = storiesOf('Field/EnumField', module);

Object.keys(EnumUtility.ENUMS)
    .forEach(e =>
    {
        stories.add(e, () =>
        {
            const field: FormFieldEnum = {
                id: 'field',
                label: e,
                type: FormFieldType.Enum,
                enumType: e
            };
            return <FieldTester field={field} />;
        });
    });

Object.keys(EnumUtility.ENUMS)
    .forEach(e =>
    {
        stories.add(`Usage: ${e}`, () =>
            fieldUsagePredicate(`Field Enum ${e}`,
                field => FormFieldTypes.isEnum(field) && (field.enumType === e))
        );
    });
