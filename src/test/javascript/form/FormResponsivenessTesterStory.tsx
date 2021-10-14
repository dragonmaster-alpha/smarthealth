import {storiesOf} from '@storybook/react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React from 'react';
import {
    renderDateTimeField, renderMedicalGroupField, renderSelectionField, renderTextAreaField, renderTextField
} from 'test/field/TableResponsivenessTesterStory';

/**
 * Tester for Table column responsiveness
 *
 * @author Thompson 19/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

storiesOf('HTML/Form Responsiveness', module)
    .add('standard',
        () =>
        {
            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr', gridGap: '0.5em'
                    }}>
                        <div style={{ textAlign: 'right' }}>Provider:</div>
                        <div>{renderMedicalGroupField('Mr Peter Richard')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Summary:</div>
                        <div style={{ gridColumn: 'span 5' }}>{renderTextAreaField('suspend call no')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Induction</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Program start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Screening start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Program end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC extract date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Care Team</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Care model:</div>
                        <div>{renderSelectionField('Los Angeles')}</div>
                        <div style={{ textAlign: 'right' }}>Care team:</div>
                        <div>{renderSelectionField('New York')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Tele-Care Guide:</div>
                        <div>{renderMedicalGroupField('Mr Jon Hughes')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Healthcare Providers and Support Services</h4>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                            <DataTable>
                                <Column field="name" header="Name" style={{ width: '30%' }}
                                    body={(rowData) => renderMedicalGroupField(rowData.name)} />
                                <Column field="role" header="Role" style={{ width: '30%' }}
                                    body={(rowData) => renderTextField(rowData.role)} />
                                <Column field="city" header="City" style={{ width: '25%' }}
                                    body={(rowData) => renderSelectionField(rowData.city)} />
                                <Column field="date" header="Date" style={{ width: '15%' }}
                                    body={(rowData) => renderDateTimeField(rowData.date)} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            );
        })
    .add('fields with maxWidth: 100% and width: (input width)em',
        () =>
        {
            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr', gridGap: '0.5em'
                    }}>
                        <div style={{ textAlign: 'right' }}>Provider:</div>
                        <div>{renderMedicalGroupField('Mr Peter Richard', { width: '100%', maxWidth: '20em' })}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>Summary:</div>
                        <div style={{ gridColumn: 'span 5' }}>{renderTextAreaField('suspend call no')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Induction</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Program start date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>Screening start date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>Program end date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>HLCC start date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>HLCC extract date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>
                        <div style={{ textAlign: 'right' }}>HLCC end date:</div>
                        <div>{renderDateTimeField(new Date(), { maxWidth: '9em', width: 'calc(100% - 2em)' })}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Care Team</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Care model:</div>
                        <div>{renderSelectionField('Los Angeles',
                            { width: '100%', maxWidth: '10em', minWidth: 0 })}</div>
                        <div style={{ textAlign: 'right' }}>Care team:</div>
                        <div>{renderSelectionField('New York', { width: '100%', maxWidth: '10em', minWidth: 0 })}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Tele-Care Guide:</div>
                        <div>{renderMedicalGroupField('Mr Jon Hughes', { width: '100%', maxWidth: '20em' })}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Healthcare Providers and Support Services</h4>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                            <DataTable>
                                <Column field="name" header="Name" style={{ width: '30%' }}
                                    body={(rowData) => renderMedicalGroupField(rowData.name,
                                        { width: '100%', maxWidth: '20em' })} />
                                <Column field="role" header="Role" style={{ width: '30%' }}
                                    body={(rowData) => renderTextField(rowData.role,
                                        { width: '100%', maxWidth: '22em' })} />
                                <Column field="city" header="City" style={{ width: '25%' }}
                                    body={(rowData) => renderSelectionField(rowData.city,
                                        { width: '100%', maxWidth: '10em', minWidth: 0 })} />
                                <Column field="date" header="Date" style={{ width: '15%' }}
                                    body={(rowData) => renderDateTimeField(rowData.date,
                                        { maxWidth: '9em', width: 'calc(100% - 2em)' })} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            );
        })
    .add('standard fields with minWidth table columns',
        () =>
        {
            const minMedicalGroupWidth = '10em';
            const minTextWidth = '15em';
            const minSelectionWidth = '10em';
            const minDateTimeWidth = '9em';

            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr', gridGap: '0.5em'
                    }}>
                        <div style={{ textAlign: 'right' }}>Provider:</div>
                        <div>{renderMedicalGroupField('Mr Johnathan Richard')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Summary:</div>
                        <div style={{ gridColumn: 'span 5' }}>{renderTextAreaField('suspend call no')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Induction</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Program start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Screening start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Program end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC extract date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Care Team</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Care model:</div>
                        <div>{renderSelectionField('Los Angeles')}</div>
                        <div style={{ textAlign: 'right' }}>Care team:</div>
                        <div>{renderSelectionField('New York')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Tele-Care Guide:</div>
                        <div>{renderMedicalGroupField('Mr Jon Hughes')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Healthcare Providers and Support Services</h4>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                            <DataTable>
                                {/* NOTE: min-width doesn't seem to work but width does and acts like min-width */}
                                <Column field="name" header="Name" bodyStyle={{ width: minMedicalGroupWidth }}
                                    style={{ width: minMedicalGroupWidth }}
                                    body={(rowData) => renderMedicalGroupField(rowData.name,
                                        { width: '100%', maxWidth: '20em' })} />
                                <Column field="role" header="Role" style={{ width: minTextWidth }}
                                    body={(rowData) => renderTextField(rowData.role,
                                        { width: '100%', maxWidth: '22em' })} />
                                <Column field="city" header="City" style={{ width: minSelectionWidth }}
                                    body={(rowData) => renderSelectionField(rowData.city,
                                        { width: '100%', maxWidth: '10em', minWidth: 0 })} />
                                <Column field="date" header="Date" style={{ width: minDateTimeWidth }}
                                    body={(rowData) => renderDateTimeField(rowData.date,
                                        { maxWidth: '9em', width: 'calc(100% - 2em)' })} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            );
        })
    .add('standard fields with minWidth table columns and horizontal scroll',
        () =>
        {
            const minMedicalGroupWidth = '10em';
            const minTextWidth = '15em';
            const minSelectionWidth = '10em';
            const minDateTimeWidth = '9em';

            return (
                <div style={{ margin: '40px 0 0 0' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr', gridGap: '0.5em'
                    }}>
                        <div style={{ textAlign: 'right' }}>Provider:</div>
                        <div>{renderMedicalGroupField('Mr Johnathan Richard')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Summary:</div>
                        <div style={{ gridColumn: 'span 5' }}>{renderTextAreaField('suspend call no')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Induction</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Program start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Screening start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>Program end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC start date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC extract date:</div>
                        <div>{renderDateTimeField(new Date())}</div>
                        <div style={{ textAlign: 'right' }}>HLCC end date:</div>
                        <div>{renderDateTimeField(new Date())}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Care Team</h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>Care model:</div>
                        <div>{renderSelectionField('Los Angeles')}</div>
                        <div style={{ textAlign: 'right' }}>Care team:</div>
                        <div>{renderSelectionField('New York')}</div>
                        <div />
                        <div />
                        <div style={{ textAlign: 'right' }}>Tele-Care Guide:</div>
                        <div>{renderMedicalGroupField('Mr Jon Hughes')}</div>

                        <div style={{ gridColumn: 'span 6' }}>
                            <h4>Healthcare Providers and Support Services</h4>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                            <DataTable style={{ overflowX: 'auto' }}>
                                {/* NOTE: min-width doesn't seem to work but width does and acts like min-width */}
                                <Column field="name" header="Name" bodyStyle={{ width: minMedicalGroupWidth }}
                                    style={{ width: minMedicalGroupWidth }}
                                    body={(rowData) => renderMedicalGroupField(rowData.name,
                                        { width: '100%', maxWidth: '20em' })} />
                                <Column field="role" header="Role" style={{ width: minTextWidth }}
                                    body={(rowData) => renderTextField(rowData.role,
                                        { width: '100%', maxWidth: '22em' })} />
                                <Column field="city" header="City" style={{ width: minSelectionWidth }}
                                    body={(rowData) => renderSelectionField(rowData.city,
                                        { width: '100%', maxWidth: '10em', minWidth: 0 })} />
                                <Column field="date" header="Date" style={{ width: minDateTimeWidth }}
                                    body={(rowData) => renderDateTimeField(rowData.date,
                                        { maxWidth: '9em', width: 'calc(100% - 2em)' })} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            );
        });
