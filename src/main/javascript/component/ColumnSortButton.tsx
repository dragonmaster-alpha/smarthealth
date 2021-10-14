import {css} from '@emotion/core';
import lodash from 'lodash';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Button to indicate sorting in a table column. Usually a 3 state button, but can be restricted to 2 state.
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

interface ColumnSortButtonProps
{
    onClick?: (newSort) => void;
    sortOrder?: SortOrder;
    twoState?: boolean;
}

const buttonStyle = css({
    backgroundColor: 'inherit',
    border: 'none',
    color: colour.primary2a,
    cursor: 'pointer',
    display: 'inline-block',
    padding: px(0, 0, 0, 4),
    width: '10px',
    height: '16px',
    position: 'relative',
    verticalAlign: '4px',
    ':hover': {
        color: colour.primary2
    },
    ':active': {
        color: colour.primary2a
    },
    '.sh-chevron-up': {
        position: 'absolute',
        left: '2px',
        fontSize: '5px',
        top: 0
    },
    '.sh-chevron-down': {
        position: 'absolute',
        left: '2px',
        fontSize: '5px',
        top: '8px'
    }
});

const TOOL_TIP = {
    [SortOrder.none]: 'Unsorted',
    [SortOrder.up]: 'Sort ascending',
    [SortOrder.down]: 'Sort descending'
};

@observer
class ColumnSortButton extends React.Component<ColumnSortButtonProps>
{
    @observable
    private sortOrder: SortOrder;

    constructor(props)
    {
        super(props);
        this.sortOrder = props.sortOrder | (props.twoState ? SortOrder.up : SortOrder.none);
    }

    @action
    public componentDidUpdate(prevProps: Readonly<ColumnSortButtonProps>): void
    {
        if (!lodash.isNil(this.props.sortOrder))
        {
            this.sortOrder = this.props.sortOrder;
        }
    }

    private next(): SortOrder
    {
        if (this.sortOrder === SortOrder.none)
        {
            return SortOrder.up;
        }
        else if (this.sortOrder === SortOrder.up)
        {
            return SortOrder.down;
        }
        else
        {
            return this.props.twoState ? SortOrder.up : SortOrder.none;
        }
    }

    @action.bound
    private onClick(event: React.MouseEvent)
    {
        const newSort = this.next();
        if (this.props.onClick)
        {
            this.props.onClick(newSort);
        }
        else
        {
            this.sortOrder = newSort;
        }
        event.stopPropagation();
    }

    public render(): React.ReactNode
    {
        const title = TOOL_TIP[this.sortOrder];
        return (
            <button css={buttonStyle} onClick={this.onClick} title={title}>
                {(this.sortOrder !== SortOrder.down) && <SHIcon icon="chevron-up" title={title} />}
                {(this.sortOrder !== SortOrder.up) && <SHIcon icon="chevron-down" title={title} />}
            </button>
        );
    }
}

export default ColumnSortButton;
