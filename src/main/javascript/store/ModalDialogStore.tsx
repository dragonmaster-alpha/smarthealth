import {action, computed, observable} from 'mobx';

/**
 * Store the state of modal dialogs
 *
 * @author Larry 27/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
class ModalDialogStore
{
    @observable
    private dialogs = [];

    private resolveMap = {};

    @computed
    get count(): number
    {
        return this.dialogs.length;
    }

    @computed
    get empty(): boolean
    {
        return this.dialogs.length === 0;
    }

    @action
    public close(value?)
    {
        const modalDialog = this.dialogs.pop();
        if (this.resolveMap[modalDialog])
        {
            this.resolveMap[modalDialog](value);
            delete this.resolveMap[modalDialog];
        }
    }

    @action
    public closeAll()
    {
        while (this.dialogs.length > 0)
        {
            this.close();
        }
    }

    /**
     * Used to render the dialogs
     */
    public map(mapper: (dialog, i) => any): any
    {
        return this.dialogs.map(mapper);
    }

    /**
     * Returns immediately. Cannot return a value
     */
    @action
    public show(modalDialog): void
    {
        this.dialogs.push(modalDialog);
    }

    /**
     * Wait for the dialog to be closed and then return the value passed to close().
     */
    @action
    public showAndWait(modalDialog): Promise<any>
    {
        this.dialogs.push(modalDialog);
        return new Promise((resolve) =>
        {
            this.resolveMap[modalDialog] = resolve;
        });
    }
}

export default ModalDialogStore;
