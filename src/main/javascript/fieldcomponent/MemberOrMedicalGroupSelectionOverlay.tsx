import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {colour} from 'main/application/ThemeConstants';
import TabPane from 'main/container/TabPane';
import MedicalGroupSelectionOverlay from 'main/fieldcomponent/MedicalGroupSelectionOverlay';
import MemberSelectionOverlay from 'main/fieldcomponent/MemberSelectionOverlay';
import {grid, px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import MemberOrGroupID from 'smarthealth-javascript/MemberOrGroupID';

/**
 * Dropdown to allow selection of Medical Group Member
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
interface MemberOrMedicalGroupSelectionOverlayProps
{
    onSelection: (memberOrGroupID: MemberOrGroupID) => void;
    selectMedicalGroup?: boolean;
}

const dropdownStyle = css({
    backgroundColor: colour.white,
    ...grid('1fr', '1fr'),
    maxHeight: '350px',
    minWidth: '700px'
});

@observer
class MemberOrMedicalGroupSelectionOverlay extends React.Component<MemberOrMedicalGroupSelectionOverlayProps>
{
    @observable
    private selectedIndex: number;

    @action
    public componentDidMount()
    {
        this.selectedIndex = this.props.selectMedicalGroup ? 1 : 0;
    }

    @action.bound
    private onSelection(selectedIndex: number)
    {
        this.selectedIndex = selectedIndex;
    }

    public render(): React.ReactNode
    {
        const tabs = [
            { title: 'Provider', content: this.renderMemberOverlay() },
            { title: 'Medical Group', content: this.renderMedicalGroupOverlay() }
        ];
        return (
            <div css={dropdownStyle}>
                <TabPane tabs={tabs} selectedIndex={this.selectedIndex} onSelection={this.onSelection} small={true}
                    tabBarPadding={px(8, 8, 0)} />
            </div>
        );
    }

    @autobind
    private renderMedicalGroupOverlay(): React.ReactNode
    {
        return <MedicalGroupSelectionOverlay onSelection={(groupID) => this.props.onSelection({ groupID })} />;
    }

    @autobind
    private renderMemberOverlay(): React.ReactNode
    {
        return <MemberSelectionOverlay onSelection={(memberID) => this.props.onSelection({ memberID })} />;
    }
}

export default MemberOrMedicalGroupSelectionOverlay;
