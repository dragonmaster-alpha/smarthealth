import classNames from 'classnames';
import {colour, font} from 'main/application/ThemeConstants';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import MockUpMenuListItems from 'test/design/MockUpMenuListItems';

/**
 * Item on the menu bar
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpMenuItemProps
{
    name: string;
    onClick: () => void;
    selected?: boolean;
}

@observer
export class MockUpMenuItem extends React.Component<MockUpMenuItemProps>
{
    @observable
    private hover: boolean;

    @action.bound
    private onHover(hover: boolean)
    {
        this.hover = hover;
    }

    public render(): React.ReactNode
    {
        return (
            <span id="file" onClick={this.props.onClick} onMouseEnter={() => this.onHover(true)}
                onMouseLeave={() => this.onHover(false)}
                style={{
                    cursor: 'pointer', marginRight: '2em', paddingRight: '5px', position: 'relative',
                    color: (this.hover || this.props.selected) ? colour.primary2a : colour.text
                }}>
                    {this.props.name}&nbsp;
                <span className={classNames('shicon',
                    {
                        'sh-chevron-down': !this.props.selected,
                        'sh-chevron-up': this.props.selected
                    })}
                    style={{ font: font.chevron, marginLeft: '8px' }} />
                {
                    this.props.selected &&
                    <MockUpMenuListItems options={['Link 1', 'Link 2', 'Link 3', 'Link 4']} />
                }
                </span>
        );
    }
}
