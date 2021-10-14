import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import IDPair from 'main/data/IDPair';
import HandlerStore from 'main/store/HandlerStore';
import EntityReference from 'smarthealth-javascript/EntityReference';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupDigest from 'smarthealth-javascript/MedicalGroupDigest';

/**
 * Client access to MedicalGroup REST Interfaces
 *
 * @author Larry 17/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class MedicalGroupHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async addMedicalGroupRecent(id: number)
    {
        const entityReference: EntityReference = {
            id,
            type: EntityType.MedicalGroup
        };
        const result = await this.handlers.axios.post('/medicalgroups/recents', entityReference)
            .catch(err => err.response);

        if (result.status !== HttpStatus.NO_CONTENT)
        {
            LOG.error(`unsuccessfully added Medical Group with id: ${id} into recents`);
        }
    }

    public async findMedicalGroups(substring: string): Promise<MedicalGroupDigest[]>
    {
        const result = await this.handlers.axios.get(`/medicalgroups/?substring=${substring}`);
        return result.data;
    }

    public async getMedicalGroup(id: number): Promise<MedicalGroup>
    {
        const result = await this.handlers.axios.get(`/medicalgroups/${id}`);
        return result.data;
    }

    public async getMedicalGroupList(key: IDPair): Promise<String[]>
    {
        const result = await this.handlers.axios.get(`/medicalgroups/${key.id}/lists/${key.associatedID}`);
        return result.data;
    }
}

export default MedicalGroupHandler;
