import HandlerStore from 'main/store/HandlerStore';
import User from 'smarthealth-javascript/User';

/**
 * Client access to User REST Interfaces
 *
 * @author Larry 14/05/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class UserHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getMemberAlerts()
    {
        // TODO need to review the URL for this
        const result = await this.handlers.axios.get('/alerts');
        return result.data;
    }

    public async getUser(userID: number): Promise<User>
    {
        const result = await this.handlers.axios.get(`/users/${userID}`);
        return result.data;
    }
}

export default UserHandler;
