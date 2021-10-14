import {font} from 'main/application/ThemeConstants';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {MockUpMenuItem} from 'test/design/MockUpMenuItem';

/**
 * Menu bar for mockup
 *
 * @author Larry 23/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@observer
class MockUpMenu extends React.Component
{
    @observable
    private menuSelected: string;

    @action.bound
    private onMenuItemClick(menuItem: string)
    {
        if (this.menuSelected === menuItem)
        {
            this.menuSelected = null;
        }
        else
        {
            this.menuSelected = menuItem;
        }
    }

    public render(): React.ReactNode
    {
        const items = ['File', 'Patient', 'Help'];
        return (
            <nav style={{
                display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                font: font.h3
            }}>
                {
                    items.map(item => <MockUpMenuItem name={item} onClick={() => this.onMenuItemClick(item)}
                        selected={this.menuSelected === item} />)
                }
            </nav>
        );
    }
}

export default MockUpMenu;
