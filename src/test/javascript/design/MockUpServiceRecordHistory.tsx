import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, colour, field, font, zIndex} from 'main/application/ThemeConstants';
import ColumnSortButton from 'main/component/ColumnSortButton';
import DateTime from 'main/component/DateTime';
import StoreProps from 'main/store/StoreProps';
import {border, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {programDescriptions} from 'smarthealth-javascript/Program';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import MockUpFilterComponent from 'test/design/MockUpFilterComponent';
import MockUpNewServiceDialog from 'test/design/MockUpNewServiceDialog';
import MockUpServiceHistoryCollapseButton from 'test/design/MockUpServiceHistoryCollapseButton';
import MockUpServiceHistoryFilterButton from 'test/design/MockUpServiceHistoryFilterButton';
import MockUpServiceRecordAddButton from 'test/design/MockUpServiceRecordAddButton';
import MockUpServiceRecordHistoryMenu from 'test/design/MockUpServiceRecordHistoryMenu';
import MockUpServiceType from 'test/design/MockUpServiceType';
import MockUpToast from 'test/design/MockUpToast';
import serviceSummaries from 'test/service/ServiceRecordListStory.ServiceSummaries.json';

/**
 * Render the service record history section
 *
 * @author Larry 21/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const collapsedStyle = css({ display: 'none' });

const outerDivStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto'
});

const filterDivStyle = css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '6px',
    hr: {
        border: 'none',
        borderLeft: border(colour.tabBorder),
        margin: px(4, 0),
        width: '1px',
        height: '20px'
    }
});

const tableDivStyle = css({
    borderBottom: field.border,
    maxHeight: '150px',
    overflow: 'auto'
});

const tableStyle = css({
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: colour.white,
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

const collapseDivStyle = css({
    textAlign: 'right'
});

@inject('sessionStore')
@observer
class MockUpServiceRecordHistory extends React.Component<StoreProps>
{
    @observable
    private collapsed: boolean;

    @observable
    private program: string;

    @observable
    private search: string;

    @observable
    private toast: boolean;

    @autobind
    private addService()
    {
        this.props.componentStore.modalDialog.show(<MockUpNewServiceDialog />);
    }

    @action.bound
    private onCloseToast()
    {
        this.toast = false;
    }

    @action.bound
    private onOpen(serviceSummary: ServiceSummary)
    {
        this.toast = true;
        setTimeout(this.onCloseToast, 5000);
    }

    @action.bound
    private onSearchChange(value: string)
    {
        this.search = value;
    }

    @action.bound
    private onToggleCollapse(collapsed)
    {
        this.collapsed = collapsed;
    }

    public render(): React.ReactNode
    {
        const programs = ['cancer', 'cf', 'imm', 'watch', 'renal'];
        const programTitles = {
            cancer: 'Cancer', cf: 'Cystic Fibrosis', imm: 'Immunology & ID', watch: 'Patient Watch', renal: 'Renal'
        };

        const filteredServiceSummaries = serviceSummaries.filter(serviceSummary => !this.program ||
            (programDescriptions[serviceSummary.program] === programTitles[this.program]));

        return (
            <div css={outerDivStyle}>
                <div css={this.collapsed ? collapsedStyle : tableDivStyle}>
                    <table css={tableStyle}>
                        <thead>
                        <tr>
                            <th>Service Date <ColumnSortButton twoState={true} /></th>
                            <th>Service Type</th>
                            <th>Owner</th>
                            <th colSpan={2}>
                                <div css={filterDivStyle}>
                                    <span style={{ flexGrow: 1 }}>Details</span>
                                    <MockUpFilterComponent value={this.search} onValueChange={this.onSearchChange} />
                                    <hr />
                                    {programs.map(program => (
                                        <MockUpServiceHistoryFilterButton program={program}
                                            title={programTitles[program]}
                                            selected={this.program === program}
                                            onToggle={selected => this.setProgram(program, selected)} />
                                    ))}
                                    <hr />
                                    <MockUpServiceRecordAddButton onClick={this.addService} />
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredServiceSummaries.map(serviceSummary => (
                            <tr onClick={() => this.onOpen(serviceSummary as ServiceSummary)}>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <DateTime date={serviceSummary.serviceDate} />
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <MockUpServiceType serviceSummary={serviceSummary as ServiceSummary} />
                                </td>
                                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    St Vincent's Hospital, Darlinghurst
                                </td>
                                <td>{serviceSummary.summaryLine}</td>
                                <td>
                                    <MockUpServiceRecordHistoryMenu serviceSummary={serviceSummary as ServiceSummary} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {(filteredServiceSummaries.length === 0) && 'No service records found'}
                </div>
                <div css={collapseDivStyle}>
                    <MockUpServiceHistoryCollapseButton collapsed={this.collapsed} onToggle={this.onToggleCollapse} />
                </div>
                {
                    this.toast &&
                    <span style={{ position: 'absolute', bottom: '80px', right: '16px', zIndex: zIndex.toast }}>
                        <MockUpToast onClose={this.onCloseToast} text="Click will open this service"
                            title="Open Service" />
                    </span>
                }
            </div>
        );
    }

    @action
    private setProgram(program: string, selected: boolean)
    {
        if (this.program === program)
        {
            this.program = null;
        }
        else
        {
            this.program = program;
        }
    }
}

export default MockUpServiceRecordHistory;
