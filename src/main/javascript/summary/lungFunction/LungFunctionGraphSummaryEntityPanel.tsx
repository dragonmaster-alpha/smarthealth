import Entity from 'main/component/Entity';
import StoreProps from 'main/store/StoreProps';
import LungFunctionGraphSummaryPanel from 'main/summary/lungFunction/LungFunctionGraphSummaryPanel';
import {inject} from 'mobx-react';
import React from 'react';
import EntityType from 'smarthealth-javascript/EntityType';
import Observation from 'smarthealth-javascript/Observation';
import ObservationGroup from 'smarthealth-javascript/ObservationGroup';

/**
 * Load observations data to display LungFunctionGraphSummaryPanel.tsx.
 *
 * @author Thompson 27/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

@inject('appStore')
class LungFunctionGraphSummaryEntityPanel extends React.Component<StoreProps>
{
    public render()
    {
        return (
            <Entity<Observation[]> id={ObservationGroup.LungFunction} type={EntityType.Observations} render={(data) => (
                <LungFunctionGraphSummaryPanel observations={data} />
            )} />
        );
    }
}

export default LungFunctionGraphSummaryEntityPanel;
