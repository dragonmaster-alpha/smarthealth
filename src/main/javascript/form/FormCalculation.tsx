import lodash from 'lodash';
import {Calculator} from 'main/utility/Calculator';
import {autorun, IReactionDisposer, runInAction} from 'mobx';

/**
 * When data changes update the calculated field data.
 *
 * cleanUp() must be called when calculation / form is finished with.
 *
 * @author Thompson 19/09/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FormCalculation
{
    private readonly calculationAutorunDisposer: IReactionDisposer;

    constructor(editData: {}, fieldID: string, paramFieldIDs: string[], calculator: Calculator)
    {
        this.calculationAutorunDisposer = autorun(async () =>
        {
            const values: any[] = paramFieldIDs.map(
                (paramFieldId: string) => lodash.get(editData, paramFieldId));
            const result = await calculator(values);
            runInAction(() =>
            {
                lodash.set(editData, fieldID, result);
            });
        });
    }

    public cleanUp(): void
    {
        this.calculationAutorunDisposer();
    }
}

export default FormCalculation;
