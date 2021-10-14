import {css} from '@emotion/core';
import {storiesOf} from '@storybook/react';
import {background, colour, field, font} from 'main/application/ThemeConstants';
import ColumnSortButton from 'main/component/ColumnSortButton';
import ErrorBoundary from 'main/component/ErrorBoundary';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {SortOrder} from 'test/design/MockUpSortButton';

/**
 * Tester for ColumnSortButton
 *
 * @author Larry 23/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const DATA = [['alpha', 'artichoke'], ['beta', 'beetroot'], ['gamma', 'carrot'], ['delta', 'daikon radish']];

const tableStyle = css({
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: colour.white,
    font: font.text,
    width: '100%',
    thead: {
        tr: {
            th: {
                backgroundColor: colour.white,
                top: 0,
                position: 'sticky',
                color: colour.label,
                font: font.label,
                textAlign: 'left',
                padding: '4px',
                borderLeft: field.border,
                borderBottom: field.border,
                ':first-child': {
                    paddingLeft: '32px'
                }
            }
        }
    },
    tbody: {
        tr: {
            ':nth-of-type(even)': {
                backgroundColor: background.gridRow,
                borderLeft: field.border
            },
            ':nth-of-type(odd) td': {
                borderLeft: field.border
            },
            ':hover': {
                backgroundColor: background.section
            },
            td: {
                font: font.text,
                padding: '4px',
                cursor: 'pointer',
                ':first-child': {
                    paddingLeft: '32px'
                },
                ':last-child': {
                    borderLeft: 'none'
                }
            }
        }
    }
});

@observer
class Table1 extends React.Component
{
    @observable
    private sortOrder;

    @action.bound
    private onClick(newSort)
    {
        this.sortOrder = newSort;
    }

    public render()
    {
        const sorted = this.sort(DATA);
        return (
            <table css={tableStyle}>
                <thead>
                <tr>
                    <th>Letter <ColumnSortButton sortOrder={this.sortOrder} onClick={this.onClick} /></th>
                    <th>Vegetable</th>
                </tr>
                </thead>
                <tbody>
                {sorted.map(row => <ErrorBoundary>
                    <tr>{row.map(cell => <td>{cell}</td>)}</tr>
                </ErrorBoundary>)}
                </tbody>
            </table>
        );
    }

    private sort(data: string[][]): string[][]
    {
        const copy = [...data];
        copy.sort((r1, r2) =>
        {
            if (this.sortOrder === SortOrder.up)
            {
                return r1[0].localeCompare(r2[0]);
            }
            else if (this.sortOrder === SortOrder.down)
            {
                return r2[0].localeCompare(r1[0]);
            }
            else
            {
                return 0;
            }
        });
        return copy;
    }
}

@observer
class Table2 extends React.Component
{
    @observable
    private sortOrder = SortOrder.up;

    @action.bound
    private onClick(newSort)
    {
        this.sortOrder = newSort;
    }

    public render()
    {
        const sorted = this.sort(DATA);
        return (
            <table css={tableStyle}>
                <thead>
                <tr>
                    <th>Letter</th>
                    <th>
                        Vegetable <ColumnSortButton sortOrder={this.sortOrder} onClick={this.onClick} twoState={true} />
                    </th>
                </tr>
                </thead>
                <tbody>
                {sorted.map(row => <tr>{row.map(cell => <td>{cell}</td>)}</tr>)}
                </tbody>
            </table>
        );
    }

    private sort(data: string[][]): string[][]
    {
        const copy = [...data];
        copy.sort((r1, r2) =>
        {
            return r1[1].localeCompare(r2[1]) * ((this.sortOrder === SortOrder.up) ? 1 : -1);
        });
        return copy;
    }
}

storiesOf('Component/ColumnSortButton', module)
    .add('States (alignment)', () => (
        <div style={{ display: 'flex', gap: '2px' }}>
            <ColumnSortButton sortOrder={SortOrder.none} />
            <ColumnSortButton sortOrder={SortOrder.up} />
            <ColumnSortButton sortOrder={SortOrder.down} />
            <ColumnSortButton sortOrder={SortOrder.none} />
        </div>
    ))
    .add('Tri state', () => (
        <Table1 />
    ))
    .add('Two state', () => (
        <Table2 />
    ));
