import {css} from '@emotion/core';
import lodash from 'lodash';
import {background, colour, font, table} from 'main/application/ThemeConstants';
import IconButton from 'main/component/IconButton';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDataUtility from 'main/utility/FormDataUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import FormField from 'smarthealth-javascript/FormField';
import FormFieldTable from 'smarthealth-javascript/FormFieldTable';
import MockUpFormField from 'test/design/MockUpFormField';

/**
 * Text field with Edit and View mode.
 *
 * @author Thompson 1/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpTableFieldProps
{
    editing: boolean;
    field: FormFieldTable;
    value: [];
}

const tableStyle = css({
    gridColumn: '1/-1',
    width: '100%',
    borderTop: table.border,
    borderBottom: table.border,
    borderCollapse: 'collapse',
    backgroundColor: colour.white,
    marginBottom: '4px',
    textAlign: 'left',
    'thead tr': {
        borderLeft: table.border,
        borderRight: table.border,
        th: {
            color: colour.label,
            font: font.label,
            padding: '4px 8px',
            ':not(:first-of-type)': {
                borderLeft: table.cell.border
            },
            ':not(:last-of-type)': {
                borderRight: table.cell.border
            }
        }
    },
    'tbody tr': {
        borderLeft: table.border,
        borderRight: table.border,
        ':first-of-type': {
            borderTop: table.cell.border
        },
        ':nth-of-type(even)': {
            backgroundColor: background.gridRow
        },
        ':nth-of-type(odd) td': {
            ':not(:first-child)': {
                borderLeft: table.cell.border
            },
            ':not(:last-child)': {
                borderRight: table.cell.border
            }
        },
        // ':focus-within': {
        //     ...field.focus
        // },
        td: {
            color: colour.text,
            font: font.text
        }
    }
});

@observer
class MockUpTableField extends React.Component<MockUpTableFieldProps>
{
    @observable
    private nextRowKey: number;

    // allows a new row to be inserted and leave other components unchanged
    @observable
    private rowKeys: number[] = [];

    @observable
    private value: any[] = [];

    public componentDidMount()
    {
        this.value = this.props.value || [];
        this.value.forEach((row, index) => this.rowKeys.push(index));
        this.nextRowKey = this.value.length;
    }

    @action.bound
    private onAddRow()
    {
        const row = {};
        const { columns } = this.props.field;
        columns.forEach(column =>
        {
            FormDataUtility.set(row, column, null);
        });
        this.value.unshift(row);
        this.rowKeys.unshift(this.nextRowKey);
        this.nextRowKey += 1;
        // TODO find a way to set the focus to the first component once it renders
    }

    @action.bound
    private onRemoveRow(rowToRemove: number)
    {
        lodash.pullAt(this.value, [rowToRemove]);
        lodash.pullAt(this.rowKeys, [rowToRemove]);
    }

    public render(): React.ReactNode
    {
        const { columns } = this.props.field;
        return (
            <>
                <table css={tableStyle}>
                    <thead>
                    <tr>
                        {this.renderHeaders(columns)}
                        {this.props.editing &&
                        <th><IconButton icon="add" toolTip="Add row" small={true} onClick={() => this.onAddRow()} />
                        </th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRows(this.value, columns)}
                    </tbody>
                </table>
            </>
        );
    }

    private renderCell(column: FormField, row: EntityData): React.ReactNode
    {
        return (
            <td>
                <MockUpFormField field={column} value={FormDataUtility.get(row, column)} editing={this.props.editing} />
            </td>
        );
    }

    private renderHeader(column): React.ReactNode
    {
        if (column.units)
        {
            return `${column.label} (${column.units})`;
        }
        else
        {
            return column.label;
        }
    }

    private renderHeaders(columns)
    {
        return columns.filter(column => FieldStateUtility.isVisible(this.props.editing, column.state))
            .map(column =>
            {
                if (FieldStateUtility.isVisible(this.props.editing, column.state))
                {
                    return <th>{this.renderHeader(column)}</th>;
                }
                else
                {
                    return null;
                }
            });
    }

    private renderRow(columns: FormField[], row, rowNumber: number)
    {
        return (
            <tr key={this.rowKeys[rowNumber]}>
                {columns.filter(column => FieldStateUtility.isVisible(this.props.editing, column.state))
                    .map(column =>
                    {
                        if (FieldStateUtility.isVisible(this.props.editing, column.state))
                        {
                            return this.renderCell(column, row);
                        }
                        else
                        {
                            return null;
                        }
                    })}
                {this.props.editing &&
                <td style={{ textAlign: 'center' }}>
                    <IconButton icon="cross" toolTip="Remove row" small={true}
                        onClick={() => this.onRemoveRow(rowNumber)} />
                </td>
                }
            </tr>
        );
    }

    private renderRows(value, columns: FormField[]): React.ReactNode
    {
        return value && value.map((row, rowNumber) => this.renderRow(columns, row, rowNumber));
    }
}

export default MockUpTableField;
