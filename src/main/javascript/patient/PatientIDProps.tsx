import StoreProps from 'main/store/StoreProps';

/**
 * Componebt properties with a patient ID.
 *
 * @author Larry 15/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface PatientIDProps extends StoreProps
{
    patientID: number;
}

export default PatientIDProps;
