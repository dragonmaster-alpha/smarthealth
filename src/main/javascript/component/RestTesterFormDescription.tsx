import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FieldLabelPosition from 'smarthealth-javascript/FieldLabelPosition';
import FormFieldType from 'smarthealth-javascript/FormFieldType';

/**
 * Form Description to describe RestTester UI
 *
 * @author Thompson 16/08/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const REST_TESTER = {
    description: '',
    fieldsAndSections: [
        {
            field: {
                id: 'baseUrl',
                label: 'Base URL',
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    spanLine: true
                },
                readOnly: true,
                size: 100,
                type: FormFieldType.Text
            }
        },
        {
            field: {
                id: 'requestMethod',
                label: 'Method',
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    span: 1
                },
                state: { editState: FieldEditState.Mandatory },
                options: [
                    'get',
                    'post',
                    'put',
                    'patch',
                    'delete'
                ],
                size: 10,
                type: FormFieldType.Selection
            }
        },
        {
            field: {
                id: 'requestUrl',
                label: 'Request',
                layout: {
                    labelPosition: FieldLabelPosition.Before,
                    span: 1,
                    fillWidth: true
                },
                mandatory: true,
                size: 100,
                type: FormFieldType.Selection,
                options: [
                    '/forms/{id}',
                    '/info',
                    '/medicalgroups/{id}',
                    '/medicalgroups/{id}/lists/{type}',
                    '/medicalgroups/{id}/members/{id}',
                    '/medications/{id}',
                    '/medications/generics/{genericCode}/formulations',
                    '/medications/history',
                    '/medications/latest',
                    '/medications/license/mims',
                    '/medications/products?prefix=',
                    '/medications/products/{productCode}/formulations',
                    '/medications/products/{productCode}/formulations/{formulationCode}/packs',
                    '/medications/recents',
                    '/observations/ClinicalMeasures',
                    '/observations/LungFunction',
                    '/patients/{id}',
                    '/patients/{id}/clinical',
                    '/patients/{id}/contacts',
                    '/patients/{id}/demographics',
                    '/patients/{id}/familysocial',
                    '/patients/{id}/identifiers',
                    '/services',
                    '/services/{id}',
                    '/services/{id}?_summary=true',
                    '/services/menuitems',
                    '/servicetypes',
                    '/sessions',
                    '/summaries/{type}',
                    '/users/{id}',
                    '/valuesets/{id}',
                    '/versions'
                ],
                editable: true
            }
        },
        {
            field: {
                id: 'requestBody',
                label: 'Body',
                layout: {
                    labelPosition: FieldLabelPosition.Above,
                    spanLine: true
                },
                size: 5000,
                type: FormFieldType.Text
            }
        },
        {
            field: {
                id: 'responseStatus',
                label: 'Response Status',
                layout: {
                    labelPosition: FieldLabelPosition.Before
                },
                readOnly: true,
                size: 100,
                type: FormFieldType.Text
            }
        },
        {
            field: {
                id: 'response',
                label: 'Response',
                layout: {
                    labelPosition: FieldLabelPosition.Above,
                    newLine: true,
                    spanLine: true
                },
                readOnly: true,
                size: 50000,
                type: FormFieldType.Text
            }
        }
    ],
    id: 'RestTester',
    layoutColumns: 2
};

export default REST_TESTER;
