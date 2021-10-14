import {autobind} from 'core-decorators';
import ButtonField from 'main/field/ButtonField';
import FieldContext from 'main/field/FieldContext';
import {OnFieldChange} from 'main/form/CustomFieldRenderer';
import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import AutoCloser from 'main/utility/AutoCloser';
import {action, runInAction} from 'mobx';
import React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';

/**
 * Display Immunology Anoscopy/Peri-anal Exam with custom calculation for Entirely normal fields and Exam Complete
 * buttons to fill in missing false values for IntraAnalAbnormalities and PeriAnalAbnormalities.
 *
 * https://rm.smarthealth.com.au/smartrm/#!/PV8/FR3078
 *
 * @author Thompson 19/03/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class ImmunologyAnoscopyService extends React.Component<EditViewFormComponentProps<EntityData>>
{
    private autoCloser = new AutoCloser();

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    private initialiseNormalHRAIntaAnalCalculation(editData: EntityData)
    {
        this.autoCloser.createMobXAutorun(() =>
        {
            const entirelyNormal = editData.HRAIntraAnal.IntraAnalAbnormalities.every((abnormality: any) =>
            {
                if (!abnormality.Acetowhite && !abnormality.ProminentVessels && !abnormality.Punctation
                    && !abnormality.LugolsNegative && !abnormality.Other)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });

            runInAction(() => editData.HRAIntraAnal.NormalHRAIntraAnal = entirelyNormal);
        });
    }

    private initialiseNormalPeriAnalCalculation(editData: EntityData)
    {
        this.autoCloser.createMobXAutorun(() =>
        {
            const entirelyNormal = editData.PeriAnal.PeriAnalAbnormalities.every((abnormality: any) =>
            {
                if (!abnormality.SkinTag && !abnormality.Warts && !abnormality.Dermatitis && !abnormality.Fissure
                    && !abnormality.Other)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });

            runInAction(() => editData.PeriAnal.NormalPeriAnal = entirelyNormal);

        });
    }

    @action.bound
    private onFinishEditing()
    {
        this.autoCloser.onUnmount();
    }

    @action.bound
    private onIntraAnalExamCompleteClick(data: EntityData)
    {
        const abnormalitiiesWithFilledfalse = data.HRAIntraAnal.IntraAnalAbnormalities.map(abnormality => ({
            ...abnormality,
            Acetowhite: abnormality.Acetowhite || false,
            Punctation: abnormality.Punctation || false,
            ProminentVessels: abnormality.ProminentVessels || false,
            LugolsNegative: abnormality.LugolsNegative || false,
            Other: abnormality.Other || false
        }));

        data.HRAIntraAnal.IntraAnalAbnormalities = abnormalitiiesWithFilledfalse;
    }

    @action.bound
    private onPeriAnalExamCompleteClick(data: EntityData)
    {
        const abnormalitiiesWithFilledFalse = data.PeriAnal.PeriAnalAbnormalities.map(abnormality => ({
            ...abnormality,
            SkinTag: abnormality.SkinTag || false,
            Warts: abnormality.Warts || false,
            Dermatitis: abnormality.Dermatitis || false,
            Fissure: abnormality.Fissure || false,
            Excoriation: abnormality.Excoriation || false,
            Other: abnormality.Other || false
        }));

        data.PeriAnal.PeriAnalAbnormalities = abnormalitiiesWithFilledFalse;
    }

    @autobind
    private onStartEditing(editData: EntityData)
    {
        this.initialiseNormalHRAIntaAnalCalculation(editData);
        this.initialiseNormalPeriAnalCalculation(editData);
    }

    public render()
    {
        const customFields = {
            'HRAIntraAnal.intraAnalAbnormalitiesExamComplete': this.renderHRAButton,
            'PeriAnal.periAnalAbnormalitiesExamComplete': this.renderPeriAnalButton
        };
        return <EditViewFormComponent<EntityData> {...this.props} customFields={customFields}
            onStartEditing={this.onStartEditing} onFinishEditing={this.onFinishEditing} />;
    }

    @autobind
    private renderHRAButton(context: FieldContext, value: any, data: EntityData,
        onFieldChange: OnFieldChange): React.ReactNode
    {
        return <ButtonField context={context} onClick={() => this.onIntraAnalExamCompleteClick(data)}
            onFieldChange={onFieldChange} small={true} value={value} />;
    }

    @autobind
    private renderPeriAnalButton(context: FieldContext, value: any, data: EntityData,
        onFieldChange: OnFieldChange)
    {
        return <ButtonField context={context} onClick={() => this.onPeriAnalExamCompleteClick(data)}
            onFieldChange={onFieldChange} small={true} value={value} />;
    }
}

export default ImmunologyAnoscopyService;
