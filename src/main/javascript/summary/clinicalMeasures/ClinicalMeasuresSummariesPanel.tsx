import ClinicalMeasuresAdultWeightChart from 'main/summary/clinicalMeasures/ClinicalMeasuresAdultWeightChart';
import ClinicalMeasuresAdultWeightChartModel from 'main/summary/clinicalMeasures/ClinicalMeasuresAdultWeightChartModel';
import ClinicalMeasuresTable from 'main/summary/clinicalMeasures/ClinicalMeasuresTable';
import {TabPanel, TabView} from 'primereact/tabview';
import React from 'react';
import EventDateTime from 'smarthealth-javascript/EventDateTime';
import Observation from 'smarthealth-javascript/Observation';

/**
 * Display tabs of Clinical Measures for height, weight BMI, Minimum Weight, Maximum Weight and Blood Pressure data in
 * read only view. These date are entered in from various clinical event service records.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR2105
 *
 * @author Thompson 18/08/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ClinicalMeasuresSummariesPanelProps
{
    observations: Observation[];
    patientDateOfBirth: EventDateTime;
}

class ClinicalMeasuresSummariesPanel extends React.Component<ClinicalMeasuresSummariesPanelProps>
{
    private isAdultWeightChartTabVisible(): boolean
    {
        // BMI charts do not apply for observations under 18 years old.
        const cutOffDate = ClinicalMeasuresAdultWeightChartModel.determine18thBirthdayDate(
            this.props.patientDateOfBirth);
        const height = ClinicalMeasuresAdultWeightChartModel.determineMostRecentHeight(this.props.observations);
        const weightDataPoints = ClinicalMeasuresAdultWeightChartModel.generateWeightDataPoints(cutOffDate,
            this.props.observations);
        return !!(height) && (weightDataPoints.length > 0);
    }

    public render()
    {
        const tabPanels = [
            {
                header: 'Clinical Measures',
                panel: <ClinicalMeasuresTable observations={this.props.observations} />,
                visible: true
            },
            {
                header: 'Adult Weight Chart',
                panel: (
                    <div style={{ height: '95vh' }}>
                        <ClinicalMeasuresAdultWeightChart observations={this.props.observations}
                            patientDateOfBirth={this.props.patientDateOfBirth} />
                    </div>
                ),
                visible: this.isAdultWeightChartTabVisible()
            }
        ];
        const visibleTabPanels = tabPanels.filter(tabPanel => tabPanel.visible);
        return (
            <TabView>
                {visibleTabPanels.map(tabPanel => (tabPanel.visible && (
                    <TabPanel header={tabPanel.header} key={tabPanel.header}>
                        {tabPanel.panel}
                    </TabPanel>
                )))}
            </TabView>
        );
    }
}

export default ClinicalMeasuresSummariesPanel;
