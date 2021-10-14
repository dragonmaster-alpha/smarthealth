import {css} from '@emotion/core';
import {field, hoverAndFocus} from 'main/application/ThemeConstants';
import CollapseSingleButton from 'main/component/CollapseSingleButton';
import SelectionList from 'main/component/SelectionList';
import OverlayPanel from 'main/container/OverlayPanel';
import StoreProps from 'main/store/StoreProps';
import CalendarUtility from 'main/utility/CalendarUtility';
import FormFieldWidthUtility from 'main/utility/FormFieldWidthUtility';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Allow selection of a month in a year.
 *
 * @author Thompson 18/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MonthDropdownInputProps extends StoreProps
{
    onSelection: (value: number) => void;
    value: number;
}

// TODO style copied from DropdownFieldComponent
const dropdownStyle = css({
    marginTop: px(-field.marginHeightPx),
    marginBottom: px(field.marginHeightPx),
    position: 'relative'
});

const selectionInputStyle = css({
    border: field.border,
    display: 'inline-flex',
    margin: px(field.marginHeightPx, 0),
    padding: px(field.paddingHeightPx, 7, field.paddingHeightPx)
});

// TODO style copied from BorderUtility
const borderNormalStyle = css({
    border: field.border,
    borderRadius: field.borderRadius,
    ...hoverAndFocus
});

@inject('componentStore')
@observer
class MonthSelectorOld extends React.Component<MonthDropdownInputProps>
{
    // Limit input size to maximum month word length which is September
    private static MONTH_MAX_LENGTH: number = 9;

    @observable
    private selectionVisibility: boolean = false;

    @action.bound
    private onClickToggleSelectionList()
    {
        this.selectionVisibility = !this.selectionVisibility;
    }

    @action.bound
    private onOverlayExit()
    {
        // TODO this is causing the DateTimeFieldDayOverlay to close
        // this.selectionVisibility = false;
        this.props.componentStore.message.todo('onOverlayExit');
    }

    @action.bound
    private onSelectionMonth(month: number)
    {
        this.props.onSelection(month);
    }

    public render()
    {
        return (
            <div>
                <div css={[selectionInputStyle, borderNormalStyle]} onClick={this.onClickToggleSelectionList}
                    title="Month">
                    <span style={{
                        width: `${FormFieldWidthUtility.adjustWidth(MonthSelectorOld.MONTH_MAX_LENGTH)}em`
                    }}>{CalendarUtility.convertToMonth(this.props.value)}</span>
                    <CollapseSingleButton collapsed={!this.selectionVisibility}
                        onToggle={this.onClickToggleSelectionList} small={true} />
                </div>
                {this.selectionVisibility && this.renderMonthSelectionList()}
            </div>
        );
    }

    private renderMonthSelectionList(): React.ReactNode
    {
        return (
            <div css={dropdownStyle}>
                <OverlayPanel onExit={() => this.onOverlayExit}>
                    <SelectionList<number> onExit={this.onOverlayExit} onSelection={this.onSelectionMonth}
                        options={CalendarUtility.MONTH_OPTIONS} size={MonthSelectorOld.MONTH_MAX_LENGTH} />
                </OverlayPanel>
            </div>
        );
    }
}

export default MonthSelectorOld;
