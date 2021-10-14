import HandlerStore from 'main/store/HandlerStore';

/**
 * Server calls for versions
 *
 * @author Uditha 3/10/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class VersionHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getVersion(target)
    {
        // Value of the target must  be a valid value from VersionTarget enum in VersionRestController.java
        const result = await this.handlers.axios.get(`/versions/${target}`);
        return result.data;
    }
}

export default VersionHandler;
