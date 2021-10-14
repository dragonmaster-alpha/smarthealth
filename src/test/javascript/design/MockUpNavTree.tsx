import {css} from '@emotion/core';
import Scroll from 'main/container/Scroll';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import MockUpNavItem from 'test/design/MockUpNavItem';
import MockUpSidebarHeading from 'test/design/MockUpSidebarHeading';

/**
 * Navigation tree for Mockup
 *
 * @author Larry 22/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpNavTreeProps
{
    items: { icon: string, name: string, primary?: boolean }[];
    selection?: string;
}

const navStyle = css({
    paddingTop: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '&>:last-child': {
        flexGrow: 1
    }
});

const navHeadingStyle = css({
    padding: px(0, 16, 8)
});

@observer
class MockUpNavTree extends React.Component<MockUpNavTreeProps>
{
    @observable
    private selection: string;

    constructor(props: MockUpNavTreeProps)
    {
        super(props);
        this.selection = props.selection || props.items[0].name;
    }

    @action.bound
    private onSelection(selection: string)
    {
        this.selection = selection;
    }

    public render(): React.ReactNode
    {
        return (
            <nav css={navStyle}>
                <div css={navHeadingStyle}><MockUpSidebarHeading title="Navigation" /></div>
                <div>
                    <Scroll>
                        {this.props.items.map((item) =>
                            <MockUpNavItem icon={item.icon} name={item.name} primary={item.primary}
                                selected={this.selection === item.name} onSelection={this.onSelection} />
                        )}
                    </Scroll>
                </div>
            </nav>
        );
    }
}

export default MockUpNavTree;
