import HttpStatus from 'http-status-codes';
import LOG from 'loglevel';
import DialogIcons from 'main/dialog/DialogIcons';
import OKDialog from 'main/dialog/OKDialog';
import HandlerStore from 'main/store/HandlerStore';
import React from 'react';
import ChildPughClassParameters from 'smarthealth-javascript/ChildPughClassParameters';
import MELDParameters from 'smarthealth-javascript/MELDParameters';

/**
 * Client access to Calculate REST interface
 *
 * @author Thompson 18/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class CalculateHandler
{
    private readonly handlers: HandlerStore;

    constructor(handlers: HandlerStore)
    {
        this.handlers = handlers;
    }

    public async calculateChildPughClass(parameters: ChildPughClassParameters): Promise<string>
    {
        if (!parameters.albumin || !parameters.albuminUnits || !parameters.ascites
            || !parameters.bilirubin || !parameters.bilirubinUnits
            || !parameters.encephalopathy || !parameters.inr)
        {
            return null;
        }

        const result = await this.handlers.axios.post('/$calculate/childpughclass', parameters)
            .catch(error => error.response);

        if (result.status === HttpStatus.OK)
        {
            return result.data.value;
        }
        else
        {
            LOG.warn(`calculateChildPughClass error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error with server-side calculation for Child Pugh Class : ${result.status
                }. Please contact your local administrator.`} />);
            return null;
        }
    }

    public async calculateMELD(parameters: MELDParameters): Promise<number>
    {
        if (!parameters.bilirubin || !parameters.bilirubinUnits
            || !parameters.creatinine || !parameters.creatinineUnits
            || !parameters.dialysisTwoOrMore || !parameters.inr)
        {
            return null;
        }

        const result = await this.handlers.axios.post('/$calculate/meld', parameters)
            .catch(error => error.response);

        if (result.status === HttpStatus.OK)
        {
            return result.data.value;
        }
        else
        {
            LOG.warn(`calculateMELD error ${JSON.stringify(result)}`);
            this.handlers.appStore.componentStore.modalDialog.show(<OKDialog header="Error" icon={DialogIcons.error}
                message={`Error with server-side calculation for MELD: ${result.status
                }. Please contact your local administrator.`} />);
            return null;
        }
    }
}

export default CalculateHandler;
