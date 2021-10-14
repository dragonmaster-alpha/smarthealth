import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import React from 'react';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import serviceFormDescriptions from 'smarthealth-rest-test/formdesc/service/ServiceFormDescriptions';

/**
 * Show where the field types are used
 *
 * @author Larry 19/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
function usesFieldType(form: FormDescription, predicate: (field: FormField) => boolean): boolean
{
    return FormDescriptionUtility.allFields(form)
        .some(predicate);
}

function linkToStory(serviceType)
{
    const program = serviceType.program && serviceType.program.toLowerCase()
        .replaceAll(' ', '-');
    const name = serviceType.name.toLowerCase()
        .replaceAll(' ', '-');
    const href = `/?path=/story/form-service-${program || 'standard'}--${name}-${serviceType.id}`;

    return <li><a href={href}>{serviceType.name}</a></li>;
}

export function fieldUsage(type: FormFieldType): React.ReactElement
{
    return fieldUsagePredicate(`Form field type ${type}`, field => field.type === type);
}

export function fieldUsagePredicate(description: string, predicate: (field: FormField) => boolean): React.ReactElement
{
    return (
        <>
            <div>
                {description} is used in service records:
            </div>
            <ul>
                {serviceFormDescriptions
                    .filter(serviceType => usesFieldType(serviceType.formDesc, predicate))
                    .map(serviceType => linkToStory(serviceType))}
            </ul>
        </>
    );
}
