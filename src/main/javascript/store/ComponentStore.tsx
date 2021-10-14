import PageDescription from 'main/page/PageDescription';
import {PATIENT_HOME_PAGE} from 'main/patient/PatientHomePage';
import {SERVICE_RECORDS_PAGE} from 'main/service/ServiceRecordsPage';
import AppStore from 'main/store/AppStore';
import MessageStore from 'main/store/MessageStore';
import ModalDialogStore from 'main/store/ModalDialogStore';
import ServiceRecordTabStore from 'main/store/ServiceRecordTabStore';
import {USER_HOME_PAGE} from 'main/user/UserHomePage';
import {action, computed, observable} from 'mobx';
import ServiceRecord from 'smarthealth-javascript/ServiceRecord';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Stores the state of the various application components that determines what is being displayed.
 *
 * @author Larry 28/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class ComponentStore
{
    private readonly appStore: AppStore;

    @observable
    public currentPage: PageDescription = null;

    public readonly message: MessageStore = new MessageStore();

    public readonly modalDialog: ModalDialogStore = new ModalDialogStore();

    @observable
    private serviceRecordTabStoreInternal: ServiceRecordTabStore;

    // TODO review
    @observable
    public serviceToOpenInTabStore: { serviceSummary: ServiceSummary, serviceRecord?: ServiceRecord } = null;

    @observable
    public userSidebarCollapsed: boolean;

    public constructor(appStore: AppStore)
    {
        this.appStore = appStore;
    }

    @computed
    public get serviceRecordTabStore(): ServiceRecordTabStore
    {
        if (!this.serviceRecordTabStoreInternal)
        {
            this.serviceRecordTabStoreInternal = new ServiceRecordTabStore(this.appStore);
        }
        return this.serviceRecordTabStoreInternal;
    }

    @action
    public closePatient()
    {
        this.serviceToOpenInTabStore = null;
        if (this.serviceRecordTabStoreInternal)
        {
            this.serviceRecordTabStoreInternal.close();
            this.serviceRecordTabStoreInternal = null;
        }
    }

    @action.bound
    public selectPage(page: PageDescription)
    {
        this.currentPage = page;
    }

    public selectPatientHomePage()
    {
        this.selectPage(PATIENT_HOME_PAGE);
    }

    @action
    public selectServiceHistoryPage()
    {
        if (!this.currentPage || !this.currentPage.hasServiceRecordList)
        {
            this.currentPage = SERVICE_RECORDS_PAGE;
        }
    }

    public selectUserHomePage()
    {
        this.selectPage(USER_HOME_PAGE);
    }
}

export default ComponentStore;
