import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import EditViewFormComponent from 'main/form/EditViewFormComponent';
import {autorun} from 'mobx';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import FieldEditState from 'smarthealth-javascript/FieldEditState';
import FormDescription from 'smarthealth-javascript/FormDescription';
import FormFieldBoolean from 'smarthealth-javascript/FormFieldBoolean';
import FormFieldGroup from 'smarthealth-javascript/FormFieldGroup';
import FormFieldType from 'smarthealth-javascript/FormFieldType';
import SetEntity from 'test/component/SetEntity';
import SetStore from 'test/component/SetStore';
import FullScreen from 'test/container/FullScreen';
import {SERVICE_TYPE_185} from 'test/data/ServiceTypeMother';
import FormTester from 'test/form/FormTester';
import {
    BOOLEAN_INTERPRETER, createFormDescription, FORM_FIELD_MOTHER_DATA, NUMBER_WEIGHT,
    SERVICE_RECORD_REFERENCE_BUTTON_ONLY, TEXT_EMAIL, TEXT_NAME
} from 'test/model/FormFieldMother';

/**
 * Debugger for Field Condition implementation.
 *
 * @author Thompson 8/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Form/Field Conditional', module)
    .add('hideInView', () =>
    {
        // TODO use knobs
        const form: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...TEXT_NAME,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'interpreter',
                                        testTrue: true
                                    },
                                    then: {
                                        editState: FieldEditState.Enabled,
                                        viewStateHidden: true
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            layoutColumns: 1
        };
        return <FullScreen><FormTester formDescription={form} /></FullScreen>;
    })
    .add('FieldEditState hidden', () =>
    {
        // TODO use knobs
        const form: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...TEXT_NAME,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'interpreter',
                                        testTrue: true
                                    },
                                    then: {
                                        editState: FieldEditState.Hidden
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            layoutColumns: 1
        };
        return <FullScreen><FormTester formDescription={form} /></FullScreen>;
    })
    .add('FieldEditState readOnly', () =>
    {
        // TODO use knobs
        const form: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...TEXT_NAME,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'interpreter',
                                        testTrue: true
                                    },
                                    then: {
                                        editState: FieldEditState.ReadOnly
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            layoutColumns: 1
        };
        return <FullScreen><FormTester formDescription={form} /></FullScreen>;
    })
    .add('FieldEditState mandatory', () =>
    {
        // TODO use knobs
        const form: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...TEXT_NAME,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'interpreter',
                                        testTrue: true
                                    },
                                    then: {
                                        editState: FieldEditState.Mandatory
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            layoutColumns: 1
        };
        return <FullScreen><FormTester formDescription={form} /></FullScreen>;
    })
    .add('field state dependent', () =>
    {
        const form: FormDescription = {
            fieldsAndSections: [
                {
                    field: BOOLEAN_INTERPRETER
                },
                {
                    field: {
                        ...TEXT_NAME,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'interpreter',
                                        testTrue: true
                                    },
                                    then: {
                                        editState: FieldEditState.Mandatory
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    field: {
                        ...TEXT_EMAIL,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [
                                {
                                    condition: {
                                        fieldID: 'name',
                                        testMandatory: true
                                    },
                                    then: {
                                        editState: FieldEditState.Mandatory
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            layoutColumns: 1
        };
        return (
            <FullScreen>
                <FormTester formDescription={form} />
                <h3>Description</h3>
                <p>Test a field state condition change based on other field state condition</p>
            </FullScreen>
        );
    })
    .add('GroupField inner fields fieldState reaction',
        () =>
        {
            const booleanField: FormFieldBoolean = {
                id: 'hideGroupInnerFields',
                label: 'Hide group inner fields',
                type: FormFieldType.Boolean,
                state: { editState: FieldEditState.Enabled }
            };
            const groupField: FormFieldGroup = {
                fields: [
                    {
                        ...NUMBER_WEIGHT,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [{
                                condition: {
                                    fieldID: 'hideGroupInnerFields',
                                    testTrue: true
                                },
                                then: { editState: FieldEditState.Hidden }
                            }]
                        }
                    },
                    {
                        ...SERVICE_RECORD_REFERENCE_BUTTON_ONLY,
                        fieldIf: {
                            elseState: { editState: FieldEditState.Enabled },
                            ifs: [{
                                condition: {
                                    fieldID: 'hideGroupInnerFields',
                                    testTrue: true
                                },
                                then: { editState: FieldEditState.Hidden }
                            }]
                        }
                    }
                ],
                id: 'group',
                label: 'Group',
                state: { editState: FieldEditState.Enabled },
                type: FormFieldType.Group
            };

            const data = FORM_FIELD_MOTHER_DATA;
            const description = createFormDescription([
                booleanField,
                groupField
            ]);
            return (
                <SetStore set={(appStore) =>
                {
                    autorun(() =>
                    {
                        storybookAction('serviceToOpenInTabStore')(appStore.componentStore.serviceToOpenInTabStore);
                    });
                }}>
                    <FullScreen>
                        <SetEntity id={185} value={SERVICE_TYPE_185} type={EntityType.ServiceType}>
                            <EditViewFormComponent formDescription={description} data={data}
                                onSave={() =>
                                {
                                    storybookAction('onSave')();
                                    return true;
                                }} />
                        </SetEntity>
                    </FullScreen>
                    <h3>Description</h3>
                    <ol>
                        <li>Test the inner fields in Group field can react to fieldState changes.</li>
                        <li>If Hide group inner fields is checked then the two fields in Group field will be hidden.
                        </li>
                    </ol>
                </SetStore>
            );
        });
