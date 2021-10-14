import HomePage from 'main/component/HomePage';
import PageDescription from 'main/page/PageDescription';
import PageDescriptions from 'main/page/PageDescriptions';
import {NEW_PATIENT_ACTION, OPEN_HARRY_POTTER_ACTION, OPEN_PATIENT_ACTION} from 'main/store/ActionStore';
import StoreProps from 'main/store/StoreProps';
import React from 'react';

/**
 * Home page for the  user.
 *
 * @author Larry 09/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export const USER_HOME_PAGE: PageDescription = {
    key: 'Provider',
    title: 'Provider',
    icon: 'user-small',
    primary: true,
    renderPanel: () => <UserHomePage />
};

const USER_HOME_BUTTONS = [OPEN_PATIENT_ACTION, OPEN_HARRY_POTTER_ACTION, NEW_PATIENT_ACTION,
    PageDescriptions.advisories, PageDescriptions.providerAlerts, PageDescriptions.meetings,
    PageDescriptions.patientList
];

class UserHomePage extends React.Component<StoreProps>
{
    public render(): React.ReactNode
    {
        return <HomePage buttons={USER_HOME_BUTTONS} />;
    }
}

export default UserHomePage;
