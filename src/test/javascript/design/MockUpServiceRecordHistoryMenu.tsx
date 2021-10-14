import SHIcon from 'main/component/SHIcon';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {ContextMenu} from 'primereact/contextmenu';
import React from 'react';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Menu on each line of service record history table
 *
 * @author Larry 20/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceRecordHistoryMenuProps
{
    serviceSummary?: ServiceSummary;
}

@observer
class MockUpServiceRecordHistoryMenu extends React.Component<MockUpServiceRecordHistoryMenuProps>
{
    private cm: any;

    @observable
    // @ts-ignore
    private showMenu: boolean;

    @action.bound
    private onClick(e)
    {
        this.cm.show(e);
        // this.showMenu = !this.showMenu;
    }

    public render(): React.ReactNode
    {
        const menu = [{ label: 'Open' }, { label: 'Service Info' }];
        return (
            <span onClick={this.onClick} title="Options" style={{ cursor: 'pointer' }}>
                <ContextMenu model={menu} ref={el => this.cm = el} />
                <SHIcon icon="ellipsis" title="Options" />
            </span>
        );
        // return (
        //     <span onClick={this.onClick}>
        //         <SHIcon icon="ellipsis" title="Options" />
        //         {this.showMenu &&
        //         <OverlayPanel onExit={() => null}>
        //             <div style={{
        //                 backgroundColor: 'white', width: '80px', right: '-16px', position: 'absolute',
        //                 border: border(colour.primary2)
        //             }}>
        //                 Info
        //                 <hr />
        //                 Open
        //             </div>
        //         </OverlayPanel>
        //         }
        //     </span>
        // );
    }
}

export default MockUpServiceRecordHistoryMenu;
