import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import HandlerStore from 'main/store/HandlerStore';
import EntityReference from 'smarthealth-javascript/EntityReference';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroupMember from 'smarthealth-javascript/MedicalGroupMember';
import MedicalGroupMemberDigest from 'smarthealth-javascript/MedicalGroupMemberDigest';
import MemberID from 'smarthealth-javascript/MemberID';

/**
 * Client access to MedicalGroup REST Interfaces
 *
 * @author Larry 17/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class MedicalGroupMemberHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async addMedicalGroupMemberRecent(memberID: MemberID)
    {
        const entityReference: EntityReference = {
            associatedID: memberID.userID, id: memberID.groupID, type: EntityType.MedicalGroupMember
        };
        const result = await this.handlers.axios.post('/medicalgroupmembers/recents', entityReference);

        if (result.status !== HttpStatus.NO_CONTENT)
        {
            LOG.warn(`Adding Medical Group Member with userID: ${memberID.userID
            } and groupID: ${memberID.groupID} into recents failed.`);
        }
    }

    public async findMedicalGroupMemberByFamilyName(familyNamePrefix: string): Promise<MedicalGroupMemberDigest[]>
    {
        const result = await this.handlers.axios.get(`/medicalgroupmembers?familyNamePrefix=${familyNamePrefix}`);
        return result.data;
    }

    public async getMedicalGroupMember(id: MemberID): Promise<MedicalGroupMember>
    {
        const result = await this.handlers.axios.get(`/medicalgroups/${id.groupID}/members/${id.userID}`);
        return result.data;
    }
}

export default MedicalGroupMemberHandler;
