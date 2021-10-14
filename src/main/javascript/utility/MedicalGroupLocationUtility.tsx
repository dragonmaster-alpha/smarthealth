import {SelectionListOption} from 'main/component/SelectionList';
import {EMPTY} from 'main/field/FieldConstants';
import MedicalGroup from 'smarthealth-javascript/MedicalGroup';
import MedicalGroupLocationConstants from 'smarthealth-javascript/MedicalGroupLocationConstants';
import MedicalGroupLocationDigest from 'smarthealth-javascript/MedicalGroupLocationDigest';

/**
 * MedicalGroupLocation Utility
 *
 * @author Priyanka 4/03/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class MedicalGroupLocationUtility
{
    public static buildLocationOptions(medicalGroup: MedicalGroup, mandatory: boolean):
        SelectionListOption<MedicalGroupLocationDigest>[]
    {
        let options = [];
        if (medicalGroup)
        {
            const locations = medicalGroup.locations;
            if (!locations || (locations.length === 0))
            {
                options = [{
                    value: {
                        id: MedicalGroupLocationConstants.SUBURB,
                        name: medicalGroup.address.city
                    },
                    label: medicalGroup.address.city
                }];
            }
            else
            {
                options = locations.map(v => ({ value: v, label: v.name }));
            }
        }

        if (!mandatory)
        {
            options.unshift({ value: null, label: EMPTY });
        }

        return options;
    }
}

export default MedicalGroupLocationUtility;
