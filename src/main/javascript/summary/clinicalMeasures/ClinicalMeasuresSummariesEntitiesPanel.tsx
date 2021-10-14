import Entities, {EntityReferences} from 'main/component/Entities';
import StoreProps from 'main/store/StoreProps';
import ClinicalMeasuresSummariesPanel from 'main/summary/clinicalMeasures/ClinicalMeasuresSummariesPanel';
import {inject} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Load data to display ClinicalMeasuresSummariesPanel.tsx.
 *
 * @author Thompson 19/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('sessionStore')
class ClinicalMeasuresSummariesEntitiesPanel extends React.Component<StoreProps>
{
    public render()
    {
        const entities: EntityReferences = {
            observations: {
                id: ObservationGroup.ClinicalMeasures,
                type: EntityType.Observations
            },
            patient: {
                id: this.props.sessionStore.currentPatientID,
                type: EntityType.Patient
            }
        };

        return (
            <Entities entities={entities}
                render={(data) => <ClinicalMeasuresSummariesPanel observations={data.observations}
                    patientDateOfBirth={data.patient.dateOfBirth} />} />
        );
    }
}

export default ClinicalMeasuresSummariesEntitiesPanel;
