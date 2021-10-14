import {css} from '@emotion/core';
import classNames from 'classnames';
import {colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Item used in navigation pane
 *
 * @author Larry 22/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpNavItemProps
{
    icon: string;
    name: string;
    onSelection: (string) => void;
    primary?: boolean;
    selected?: boolean;
}

const itemStyle = css({
    padding: '0.3em 1em 0.3em 1.2em',
    cursor: 'pointer',
    font: font.navItem1,
    '&:hover': {
        backgroundColor: colour.primary2,
        '>.shicon': {
            color: colour.white
        }
    },
    '>.shicon': {
        color: colour.navigation,
        font: font.navItemIcon,
        verticalAlign: 'top'
    },
    '>.text': {
        color: colour.white,
        paddingLeft: '1em'
    },
    '&.secondary': {
        font: font.navItem2,
        '>.shicon': {
            paddingLeft: '1em'
        }
    },
    '&.selected': {
        background: `linear-gradient(90deg, ${colour.sidebarSelected} 0.3em, ${colour.primary2} 0.3em)`,
        '>.shicon': {
            color: colour.white
        }
    }
});

@observer
class MockUpNavItem extends React.Component<MockUpNavItemProps>
{
    public render(): React.ReactNode
    {
        return (
            <div css={itemStyle}
                className={classNames({ secondary: !this.props.primary, selected: this.props.selected })}
                onClick={() => this.props.onSelection(this.props.name)}>
                <SHIcon icon={this.props.icon} />
                <span className="text">{this.props.name}</span>
            </div>
        );
    }
}

export default MockUpNavItem;
