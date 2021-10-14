import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import ButtonSeparator from 'main/component/ButtonSeparator';
import IconButton from 'main/component/IconButton';
import {PROGRAMS} from 'main/data/Programs';
import NewServiceDialog from 'main/service/NewServiceDialog';
import ServiceRecordHistorySearch from 'main/service/ServiceRecordHistorySearch';
import {SummaryTab} from 'main/store/ServiceRecordTabStore';
import StoreProps from 'main/store/StoreProps';
import SummaryTabPanel from 'main/summary/SummaryTabPanel';
import {action, observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import Program, {programAbbreviations, programDescriptions} from 'smarthealth-javascript/Program';
import SummaryType, {
    summaryTypeProgram, summaryTypeSortOrder, summaryTypeTitle
} from 'smarthealth-javascript/SummaryType';

/**
 * Toolbar for controlling the service record history list contents
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const toolbarStyle = css({
    alignItems: 'center',
    display: 'flex',
    gap: '6px',
    justifyContent: 'flex-end'
});

@inject('appStore', 'componentStore')
@observer
class ServiceRecordHistoryToolbar extends React.Component<StoreProps>
{
    @observable
    private activeProgramButton: Program;

    @action.bound
    private onClickProgramFilter(program: Program)
    {
        this.props.componentStore.serviceRecordTabStore.closeAllSummaries();
        this.props.componentStore.serviceRecordTabStore.selectFirstTab();

        if (program === this.activeProgramButton)
        {
            // clicking the button again unselect the program
            this.activeProgramButton = null;
            this.props.appStore.sessionStore.serviceRecordListStore.clearFilters();
            return;
        }

        this.activeProgramButton = program;
        this.setProgramSummaries(program);
        this.props.appStore.sessionStore.serviceRecordListStore.filterByProgram(program);
    }

    @autobind
    private onNewServiceRecord()
    {
        this.props.appStore.componentStore.modalDialog.show(<NewServiceDialog />);
    }

    public render(): React.ReactNode
    {
        return (
            <div css={toolbarStyle}>
                <ServiceRecordHistorySearch />
                <ButtonSeparator />
                {this.renderProgramFilterButtons()}
                <ButtonSeparator />
                <IconButton icon="add" toolTip="New Service Record" onClick={this.onNewServiceRecord} />
            </div>
        );
    }

    private renderProgramFilterButtons(): React.ReactNode
    {
        return PROGRAMS.map(program =>
        {
            // <SHIcon icon={`program-${programAbbreviations[program].toLowerCase()}`}
            //     title={programDescriptions[program]} style={{ color: colour.primary2 }} />
            return <IconButton icon={`program-${programAbbreviations[program].toLowerCase()}`}
                toolTip={programDescriptions[program]}
                primary={this.activeProgramButton === program}
                onClick={() => this.onClickProgramFilter(program)} />;
        });
    }

    private setProgramSummaries(program: Program)
    {
        this.props.componentStore.serviceRecordTabStore.closeAllSummaries();

        // determine summary types for program and sort
        const summaryTypes: SummaryType[] = Object.keys(SummaryType)
            .map(key => SummaryType[key])
            .filter(summaryType => program === summaryTypeProgram[summaryType])
            .sort((type1, type2) => summaryTypeSortOrder[type1] - summaryTypeSortOrder[type2]);

        summaryTypes.forEach(summaryType =>
        {
            const summary: SummaryTab = observable({
                key: summaryType,
                render: () => (<SummaryTabPanel summaryType={summaryType} />),
                title: summaryTypeTitle[summaryType],
                visible: true
            });
            this.props.componentStore.serviceRecordTabStore.addSummary(summary);

            // load the data and update visibility
            this.props.appStore.entityCache.summary.load(summaryType)
                .then(value =>
                {
                    runInAction(() =>
                        summary.visible = !!value
                    );
                })
                .catch(() =>
                {
                    runInAction(() =>
                        summary.visible = false
                    );
                });
        });
    }
}

export default ServiceRecordHistoryToolbar;
