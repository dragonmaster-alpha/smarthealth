import {action, observable} from 'mobx';
import MedicalGroupAndLocationsDigest from 'smarthealth-javascript/MedicalGroupAndLocationsDigest';

/**
 * State of the OIDC login
 *
 * @author Larry 7/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
export const STATE_CHECK_VERSION = 'checkVersion';
export const STATE_OIDC_SETTINGS = 'oidcSettings';
export const STATE_AUTHENTICATE = 'authenticate';
export const STATE_LOGIN = 'login';
export const STATE_SELECT_MEMBER = 'member';

class OIDCStore
{
    @observable
    public error: string;

    @observable
    public groupsAndLocations: MedicalGroupAndLocationsDigest[];

    @observable
    public state: string;

    @action
    public clear()
    {
        this.error = undefined;
        this.groupsAndLocations = undefined;
        this.state = undefined;
    }

    @action
    public setError(error: string)
    {
        this.error = error;
        this.state = undefined;
    }

    @action
    public setState(state: string)
    {
        this.state = state;
        this.error = undefined;
    }
}

export default OIDCStore;
