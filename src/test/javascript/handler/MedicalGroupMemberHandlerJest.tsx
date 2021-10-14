import MockAdapter from 'axios-mock-adapter';
import MedicalGroupMemberHandler from 'main/handler/MedicalGroupMemberHandler';
import AppStore from 'main/store/AppStore';
import member from 'smarthealth-rest-test/medicalgroupmember.json';

/**
 * Test MedicalGroupHandler
 *
 * @author Larry 18/12/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
test('get medical group member', async () =>
{
    const appStore = new AppStore();
    const mock = new MockAdapter(appStore.handlers.axios);

    mock.onGet(`/medicalgroups/${member.memberID.groupID}/members/${member.memberID.userID}`)
        .reply(200, member);

    const handler = new MedicalGroupMemberHandler(appStore.handlers);
    const result = await handler.getMedicalGroupMember(member.memberID);
    expect(result)
        .toEqual(member);
});
