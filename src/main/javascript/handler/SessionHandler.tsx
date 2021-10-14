import * as HttpStatus from 'http-status-codes';
import HandlerStore from 'main/store/HandlerStore';
import OIDCDetails from 'smarthealth-javascript/OIDCDetails';
import PossibleLogins from 'smarthealth-javascript/PossibleLogins';
import ServerDetails from 'smarthealth-javascript/ServerDetails';
import WebUISession from 'smarthealth-javascript/WebUISession';

/**
 * Server calls for session management
 *
 * @author Larry 5/04/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class SessionHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async closePatient(): Promise<WebUISession>
    {
        const sessionPatchRequest = { patientID: null };
        return this.patchSession(sessionPatchRequest);
    }

    public async getOIDCSettings(): Promise<OIDCDetails>
    {
        // uses .. prefix because this in not part of the WebUI REST API
        const result = await this.handlers.axios.get('../oidc');
        return result.data;
    }

    public async getServerDetails(): Promise<ServerDetails>
    {
        const result = await this.handlers.axios.get('info');
        return result.data;
    }

    public async openPatient(patientID, purpose, setting): Promise<WebUISession>
    {
        const sessionPatchRequest = { patientID, purpose, setting };
        return this.patchSession(sessionPatchRequest);
    }

    public async patchSession(sessionPatchRequest): Promise<WebUISession>
    {
        const { sessionID } = this.handlers.appStore.sessionStore;
        const result = await this.handlers.axios.patch(`sessions/${sessionID}`, sessionPatchRequest);
        return result.data;
    }

    public async sendAcceptTermsOfUse(): Promise<void>
    {
        const { sessionID } = this.handlers.appStore.sessionStore;
        const result = await this.handlers.axios.post(`sessions/${sessionID}/termsOfUse`, { accept: true },
            { validateStatus: status => status === HttpStatus.NO_CONTENT });
        return result.data;
    }

    public async sendLogin(): Promise<PossibleLogins>
    {
        const { sessionStorage } = window;
        const result = await this.handlers.axios.post('sessions', { code: sessionStorage.oidcCode },
            { validateStatus: status => status === HttpStatus.CREATED });
        return result.data;
    }

    public async sendLogout(): Promise<void>
    {
        const { sessionID } = this.handlers.appStore.sessionStore;
        const result = await this.handlers.axios.delete(`sessions/${sessionID}`,
            { validateStatus: status => status === HttpStatus.NO_CONTENT });
        return result.data;
    }

    public async setCurrentMedicalGroupAndLocation(groupID, locationID): Promise<WebUISession>
    {
        const sessionPatchRequest = { groupID, locationID };
        return this.patchSession(sessionPatchRequest);
    }
}

export default SessionHandler;
