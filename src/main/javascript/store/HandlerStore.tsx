import axios from 'axios/index';
import {autobind} from 'core-decorators';
import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import CalculateHandler from 'main/handler/CalculateHandler';
import EntityReferenceListHandler from 'main/handler/EntityReferenceListHandler';
import FormDescriptionHandler from 'main/handler/FormDescriptionHandler';
import MedicalGroupHandler from 'main/handler/MedicalGroupHandler';
import MedicalGroupMemberHandler from 'main/handler/MedicalGroupMemberHandler';
import MedicationHandler from 'main/handler/MedicationHandler';
import ObservationsHandler from 'main/handler/ObservationsHandler';
import PathologyHandler from 'main/handler/PathologyHandler';
import PatientHandler from 'main/handler/PatientHandler';
import ServiceRecordHandler from 'main/handler/ServiceRecordHandler';
import ServiceTypeHandler from 'main/handler/ServiceTypeHandler';
import SessionHandler from 'main/handler/SessionHandler';
import SummaryHandler from 'main/handler/SummaryHandler';
import UserHandler from 'main/handler/UserHandler';
import ValueSetHandler from 'main/handler/ValueSetHandler';
import VersionHandler from 'main/handler/VersionHandler';
import WebsocketHandler from 'main/handler/WebsocketHandler';
import AppStore from 'main/store/AppStore';
import * as React from 'react';

/**
 * Contains singleton instances of the handlers
 *
 * @author Larry 21/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class HandlerStore
{
    public appStore: AppStore;

    public readonly axios = axios.create({
        baseURL: `https://${window.location.hostname || 'localhost'}/smarthealth-server/rest/webui`,
        timeout: 5000
    });

    public calculateHandler: CalculateHandler;

    public entityReferenceListHandler: EntityReferenceListHandler;

    public formDescriptionHandler: FormDescriptionHandler;

    public medicalGroupHandler: MedicalGroupHandler;

    public medicalGroupMemberHandler: MedicalGroupMemberHandler;

    public medicationHandler: MedicationHandler;

    public observationsHandler: ObservationsHandler;

    public pathologyHandler: PathologyHandler;

    public patientHandler: PatientHandler;

    public serviceRecordHandler: ServiceRecordHandler;

    public serviceTypeHandler: ServiceTypeHandler;

    public sessionHandler: SessionHandler;

    public summaryHandler: SummaryHandler;

    public userHandler: UserHandler;

    public valueSetHandler: ValueSetHandler;

    public versionHandler: VersionHandler;

    public websocketHandler: WebsocketHandler;

    constructor(appStore: AppStore)
    {
        this.appStore = appStore;

        this.calculateHandler = new CalculateHandler(this);
        this.entityReferenceListHandler = new EntityReferenceListHandler(this);
        this.formDescriptionHandler = new FormDescriptionHandler(this);
        this.medicalGroupHandler = new MedicalGroupHandler(this);
        this.medicalGroupMemberHandler = new MedicalGroupMemberHandler(this);
        this.medicationHandler = new MedicationHandler(this);
        this.observationsHandler = new ObservationsHandler(this);
        this.patientHandler = new PatientHandler(this);
        this.pathologyHandler = new PathologyHandler(this);
        this.serviceRecordHandler = new ServiceRecordHandler(this);
        this.sessionHandler = new SessionHandler(this);
        this.serviceTypeHandler = new ServiceTypeHandler(this);
        this.summaryHandler = new SummaryHandler(this);
        this.userHandler = new UserHandler(this);
        this.valueSetHandler = new ValueSetHandler(this);
        this.versionHandler = new VersionHandler(this);
        this.websocketHandler = new WebsocketHandler(this);

        this.axios.interceptors.response.use(null, this.handleError);
    }

    private findReason(error)
    {
        return error.response.data.hasOwnProperty('message') ? error.response.data.message : error.response.data;
    }

    @autobind
    public handleError(error)
    {
        LOG.info(`error: ${JSON.stringify(error, null, 2)}`);
        if (!error.response)
        {
            // TODO timeout or other exception
            return Promise.reject(error);
        }
        else if (error.response.status === HttpStatus.FORBIDDEN)
        {
            const reason = this.findReason(error);
            LOG.warn(reason);
            this.appStore.componentStore.modalDialog.show(<OKDialog icon={DialogIcons.error} message={reason}
                header="Forbidden" />);
            return Promise.reject(error);
        }
        else if (error.response.status === HttpStatus.UNAUTHORIZED)
        {
            this.appStore.sessionStore.setUnauthorised(this.findReason(error));
        }
        else if (error.response.status === HttpStatus.BAD_REQUEST)
        {
            const reason = this.findReason(error);
            LOG.warn(`Bad Request: ${reason}`);
            // TODO this can't show if we are inside a modal wait and returning immediately cancels this rather than
            // the modal wait
            // this.sessionStore.modalDialog.showAndWait(<OKDialog icon={DialogIcons.error}
            // message={reason} header="Bad Request" />);
            return Promise.reject(error);
        }
        else if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR)
        {
            const reason = this.findReason(error);
            LOG.warn(`Server Error: ${reason}`);
            // TODO this can't show if we are inside a modal wait and returning immediately cancels this rather than
            // the modal wait
            // this.sessionStore.modalDialog.showAndWait(<OKDialog icon={DialogIcons.error}
            // message={reason} header="Server Error" />);
            return Promise.reject(error);
        }
        else
        {
            return Promise.reject(error);
        }
    }

    public setAuthToken(token: string)
    {
        if (token)
        {
            this.axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        }
        else
        {
            this.axios.defaults.headers.common = { Authorization: undefined };
        }
    }
}

export default HandlerStore;
