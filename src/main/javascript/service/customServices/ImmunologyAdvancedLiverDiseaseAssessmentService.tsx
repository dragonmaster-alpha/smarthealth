import {autobind} from 'core-decorators';
import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import FormCalculation from 'main/form/FormCalculation';
import {inject, observer} from 'mobx-react';
import React from 'react';
import ChildPughClassParameters from 'smarthealth-javascript/ChildPughClassParameters';
import EntityData from 'smarthealth-javascript/EntityData';
import MELDParameters from 'smarthealth-javascript/MELDParameters';

/**
 * Display Immunology Advanced Liver Disease Assessment Service with Child Pugh Class and MELD Score server-side
 * calculation fields.
 *
 * @author Thompson 13/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('appStore')
@observer
class ImmunologyAdvancedLiverDiseaseAssessmentService
    extends React.Component<EditViewFormComponentProps<EntityData>>
{
    private childPughClassCalculation: FormCalculation;

    private meldCalculation: FormCalculation;

    @autobind
    private async calculateChildPughClass(values: any[]): Promise<string>
    {
        const [pathologyResults, ascites, encephalopathy] = values;
        const bilirubin = pathologyResults.find(pathologyResult => pathologyResult.Name === 'Bilirubin');
        const albumin = pathologyResults.find(pathologyResult => pathologyResult.Name === 'Albumin');
        const inr = pathologyResults.find(pathologyResult => pathologyResult.Name === 'INR');

        const childPughClassParameters: ChildPughClassParameters = {
            ascites, encephalopathy, albumin: albumin.Value, albuminUnits: albumin.Units,
            bilirubin: bilirubin.Value, bilirubinUnits: bilirubin.Units, inr: inr.Value
        };
        const childPughClassValue = await this.props.appStore.handlers.calculateHandler.calculateChildPughClass(
            childPughClassParameters);

        return childPughClassValue;
    }

    @autobind
    private async calculatorMELD(values: any[]): Promise<number>
    {
        const [pathologyResults, dialysisTwoOrMore] = values;
        const bilirubin = pathologyResults.find(pathologyResult => pathologyResult.Name === 'Bilirubin');
        const creatinine = pathologyResults.find(pathologyResult => pathologyResult.Name === 'Creatinine');
        const inr = pathologyResults.find(pathologyResult => pathologyResult.Name === 'INR');

        const meldParameters: MELDParameters = {
            dialysisTwoOrMore, bilirubin: bilirubin.Value, bilirubinUnits: bilirubin.Units,
            creatinine: creatinine.Value, creatinineUnits: creatinine.Units,
            inr: inr.Value
        };
        const meldValue = await this.props.appStore.handlers.calculateHandler.calculateMELD(meldParameters);

        return meldValue;
    }

    private onFinishEditing()
    {
        if (this.childPughClassCalculation)
        {
            this.childPughClassCalculation.cleanUp();
            this.childPughClassCalculation = null;
        }
        if (this.meldCalculation)
        {
            this.meldCalculation.cleanUp();
            this.meldCalculation = null;
        }
    }

    @autobind
    private onStartEditing(editData: EntityData)
    {
        this.childPughClassCalculation = new FormCalculation(editData, 'Prognostic.ChildPughClass',
            ['Diagnostics.PathologyResults', 'SyntheticFunction.Ascites', 'SyntheticFunction.Encephalopathy'],
            this.calculateChildPughClass);
        this.meldCalculation = new FormCalculation(editData, 'Prognostic.MeldScore',
            ['Diagnostics.PathologyResults', 'SyntheticFunction.Dialysis'], this.calculatorMELD);
    }

    public render()
    {
        return <EditViewFormComponent<EntityData> {...this.props} onStartEditing={this.onStartEditing}
            onFinishEditing={this.onFinishEditing} />;
    }
}

export default ImmunologyAdvancedLiverDiseaseAssessmentService;
