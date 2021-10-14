import Entity from 'main/component/Entity';
import StoreProps from 'main/store/StoreProps';
import LungFunctionObservationsSummaryPanel from 'main/summary/lungFunction/LungFunctionObservationsSummaryPanel';
import {inject} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Load observations data to display LungFunctionObservationsSummaryPanel.tsx.
 *
 * @author Thompson 12/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('appStore')
class LungFunctionObservationsSummaryEntityPanel extends React.Component<StoreProps>
{
    public render()
    {
        return (
            <Entity<Observation[]> id={ObservationGroup.LungFunction} type={EntityType.Observations} render={(data) => (
                <LungFunctionObservationsSummaryPanel observations={data} />
            )} />
        );
    }
}

export default LungFunctionObservationsSummaryEntityPanel;
