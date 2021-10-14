import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Button to allow sorting in a table column
 *
 * @author Larry 20/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export enum SortOrder
{
    none,
    up,
    down
}

interface MockUpSortButtonProps
{
    onClick?: () => void;
    sort?: SortOrder;
}

const buttonStyle = css({
    paddingLeft: '4px',
    color: colour.primary2a,
    ':hover': {
        color: colour.primary2
    },
    '.sh-chevron-up': {
        fontSize: '6px',
        verticalAlign: '6px'
    },
    '.sh-chevron-down': {
        fontSize: '6px'
    }
});

const CHEVRON = {
    [SortOrder.none]: 'chevron-up-down',
    [SortOrder.up]: 'chevron-up',
    [SortOrder.down]: 'chevron-down'
};

@observer
class MockUpSortButton extends React.Component<MockUpSortButtonProps>
{
    @observable
    private sortOrder: SortOrder;

    constructor(props)
    {
        super(props);
        this.sortOrder = props.sortOrder | SortOrder.none;
    }

    // TODO componentDidUpdate()

    @action.bound
    private onClick()
    {
        if (this.sortOrder === SortOrder.none)
        {
            this.sortOrder = SortOrder.up;
        }
        else if (this.sortOrder === SortOrder.up)
        {
            this.sortOrder = SortOrder.down;
        }
        else
        {
            this.sortOrder = SortOrder.none;
        }
    }

    public render(): React.ReactNode
    {
        return (
            <span css={buttonStyle} onClick={this.onClick}>
                <SHIcon icon={CHEVRON[this.sortOrder]} />
            </span>
        );
    }
}

export default MockUpSortButton;
