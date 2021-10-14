import {css} from '@emotion/core';
import NavTree from 'main/application/NavTree';
import PatientSidebar from 'main/patient/PatientSidebar';
import StoreProps from 'main/store/StoreProps';
import UserSidebar from 'main/user/UserSidebar';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Sidebar with patient sidebar, user sidebar and nav tree
 *
 * @author Larry 28/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const asideStyle = css({
    display: 'flex',
    flexDirection: 'column',
    '&>:last-child': {
        flexGrow: 1
    }
});

@inject('sessionStore')
@observer
class Sidebar extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        const { sessionStore } = this.props;
        return (
            <aside css={asideStyle}>
                {sessionStore.currentPatientID && <PatientSidebar />}
                <UserSidebar />
                <NavTree />
            </aside>
        );
    }
}

export default Sidebar;
