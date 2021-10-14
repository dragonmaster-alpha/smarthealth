import StoreProps from 'main/store/StoreProps';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {ST_VINCENTS_HOSPITAL} from 'test/data/MedicalGroupMother';
import {BILL_GOLFALOT} from 'test/model/NameMother';
import ApplicationLayout from './ApplicationLayout';

/**
 * Main App Component, All the child component will be loaded inside this App Component
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const MEDICAL_GROUP = {
    address: {
        address1: '390 Victoria Street',
        address2: '',
        city: 'Darlinghurst',
        country: 'Australia',
        postcode: '2010',
        state: 'NSW'
    },
    enabled: true,
    fax: '(02) 9332 4142',
    groupID: 26,
    locations: [],
    name: 'St Vincent\'s Hospital',
    participating: true,
    phone: '(02) 8382 1111',
    practiceSettingCode: '8401-5',
    programs: [],
    timeZone: 'Australia/Sydney',
    version: 0
};

const USER = {
    active: true,
    homeMedicalGroupID: ST_VINCENTS_HOSPITAL.groupID,
    name: BILL_GOLFALOT,
    participating: true,
    userID: 19
};

const MEMBER = {
    active: true,
    memberID: { groupID: MEDICAL_GROUP.groupID, userID: USER.userID },
    providerNum: '123456AF',
    role: 'Medical Practitioner'
};

@inject('appStore')
@observer
class AppComponent extends React.Component<StoreProps>
{
    @action
    public componentDidMount()
    {
        this.props.appStore.sessionStore.session = {
            groupID: MEDICAL_GROUP.groupID,
            permissions: {
                admin: [34, 14],
                clinical: [1, 98, 4, 7],
                serviceTypes: []
            },
            termsOfUseAgreed: true,
            usePAS: false,
            userID: USER.userID
        };
        this.props.appStore.entityCache.medicalGroups.set(MEDICAL_GROUP.groupID, MEDICAL_GROUP);
        this.props.appStore.entityCache.users.set(USER.userID, USER);
        this.props.appStore.entityCache.medicalGroupMembers.set(MEMBER.memberID, MEMBER);
        this.props.appStore.componentStore.selectUserHomePage();
    }

    public render()
    {
        return <ApplicationLayout/>;
        // if (!this.props.sessionStore.loggedIn)
        // {
        //     return <ErrorBoundary><SplashComponent><OIDCLogin /></SplashComponent><ModalDialogs /></ErrorBoundary>;
        // }
        // else
        // {
        //     return <WebsocketHOC><ApplicationLayout /></WebsocketHOC>;
        // }
    }
}

export default AppComponent;
