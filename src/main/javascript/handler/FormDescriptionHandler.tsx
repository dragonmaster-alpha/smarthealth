import HandlerStore from 'main/store/HandlerStore';
import FormDescription from 'smarthealth-javascript/FormDescription';

/**
 * Client access to server Form Description Handler
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class FormDescriptionHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getFormDescription(formDescID: string): Promise<FormDescription>
    {
        // replace . with _ to avoid file type problems
        const id = formDescID.replace(new RegExp('\\.', 'g'), '_');
        const result = await this.handlers.axios.get(`/forms/${id}`);
        return result.data;
    }
}

export default FormDescriptionHandler;
