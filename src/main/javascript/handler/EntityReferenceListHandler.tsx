import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import HandlerStore from 'main/store/HandlerStore';
import React from 'react';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityUpdate from 'smarthealth-javascript/EntityUpdate';

/**
 * Get entity reference lists from the server
 *
 * @author Larry 16/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class EntityReferenceListHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async getEntityReferenceList(id: string): Promise<EntityReferenceList>
    {
        const result = await this.handlers.axios.get(id);
        return result.data;
    }

    public async updateEntityList(entityList: EntityUpdate[]): Promise<boolean>
    {
        const result = await this.handlers.axios.put('/entities', entityList)
            .catch(err => err.response);
        if (result.status === HttpStatus.NO_CONTENT)
        {
            return true;
        }
        else
        {
            LOG.warn(`updateEntityReferenceList error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error updating EntityReferenceList code: ${result.status
                }. Please contact your local administrator.`} />);
            return false;
        }
    }
}

export default EntityReferenceListHandler;
