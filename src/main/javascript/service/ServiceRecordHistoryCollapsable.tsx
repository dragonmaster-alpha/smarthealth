import {css} from '@emotion/core';
import CollapseDoubleButton from 'main/component/CollapseDoubleButton';
import {grid} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import ServiceRecordHistory from './ServiceRecordHistory';

/**
 * Wrap the ServiceRecordHistory to make it collapsable
 *
 * TODO determine why the list sometimes disappears after collapse/expand
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const outerDivStyle = css({
    ...grid(null, 'auto 1fr')
});

const collapseDivStyle = css({
    textAlign: 'right'
});

@observer
class ServiceRecordHistoryCollapsable extends React.Component
{
    @observable
    private collapsed: boolean;

    @action.bound
    private onToggle()
    {
        this.collapsed = !this.collapsed;
    }

    public render(): React.ReactNode
    {
        const buttonDiv = (
            <div css={collapseDivStyle}>
                <CollapseDoubleButton collapsed={this.collapsed} onToggle={this.onToggle}
                    title="Service Record History" />
            </div>
        );

        if (this.collapsed)
        {
            return buttonDiv;
        }
        else
        {
            return (
                <div css={outerDivStyle}>
                    <ServiceRecordHistory />
                    {buttonDiv}
                </div>
            );
        }
    }
}

export default ServiceRecordHistoryCollapsable;
