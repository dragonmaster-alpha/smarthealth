import lodash from 'lodash';
import Message from 'main/data/Message';
import {action, computed, observable} from 'mobx';

/**
 * A message to be displayed temporarily
 *
 * @author Larry 23/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class MessageStore
{
    @observable
    private message: Message = null;

    @computed
    public get hasMessage(): boolean
    {
        return !lodash.isNil(this.message);
    }

    @action
    public error(message: string, title: string = 'Error')
    {
        this.message = { severity: 'error', summary: title, detail: message };
    }

    @action
    public info(message: string, title: string = 'Information')
    {
        this.message = { severity: 'info', summary: title, detail: message };
    }

    @action
    public pop(): Message
    {
        const message = this.message;
        this.message = null;
        return message;
    }

    @action
    public success(message: string, title: string = 'Success')
    {
        this.message = { severity: 'success', summary: title, detail: message };
    }

    @action
    public todo(message: string)
    {
        this.message = { severity: 'warn', summary: 'TODO', detail: message };
    }

    @action
    public warning(message: string, title: string = 'Warning')
    {
        this.message = { severity: 'warn', summary: title, detail: message };
    }
}

export default MessageStore;
