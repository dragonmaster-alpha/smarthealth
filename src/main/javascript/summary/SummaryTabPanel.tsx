import StoreProps from 'main/store/StoreProps';
import CysticFibrosisSummaryEntitiesPanel from 'main/summary/CysticFibrosisSummaryEntitiesPanel';
import HaemodialysisSummaryEntitiesPanel from 'main/summary/HaemodialysisSummaryEntitiesPanel';
import PatientWatchSummaryEntityPanel from 'main/summary/PatientWatchSummaryEntityPanel';
import RenalSummaryEntitiesPanel from 'main/summary/RenalSummaryEntitiesPanel';
import SummaryEntitiesPanel from 'main/summary/SummaryEntitiesPanel';
import {inject} from 'mobx-react';
import React from 'react';
import SummaryType from 'smarthealth-javascript/SummaryType';

/**
 * Factory for a summary tab
 *
 * @author Thompson 10/01/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface SummaryTabComponentProps extends StoreProps
{
    summaryType: SummaryType;
}

@inject('appStore')
class SummaryTabPanel extends React.Component<SummaryTabComponentProps>
{
    public render(): React.ReactNode
    {
        const { summaryType } = this.props;
        if (summaryType === SummaryType.CysticFibrosis)
        {
            return <CysticFibrosisSummaryEntitiesPanel />;
        }
        else if (summaryType === SummaryType.Haemodialysis)
        {
            return <HaemodialysisSummaryEntitiesPanel />;
        }
        else if (summaryType === SummaryType.PatientWatch)
        {
            return <PatientWatchSummaryEntityPanel />;
        }
        else if (summaryType === SummaryType.Renal)
        {
            return <RenalSummaryEntitiesPanel />;
        }
        else
        {
            return <SummaryEntitiesPanel summaryType={summaryType} />;
        }
    }

}

export default SummaryTabPanel;
