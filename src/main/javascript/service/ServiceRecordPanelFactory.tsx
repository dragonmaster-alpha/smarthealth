import EditViewFormComponent, {EditViewFormComponentProps} from 'main/form/EditViewFormComponent';
import EmergencyAccessService from 'main/service/customServices/EmergencyAccessService';
import ImagingService from 'main/service/customServices/ImagingService';
import ImmunologyAdvancedLiverDiseaseAssessmentService
    from 'main/service/customServices/ImmunologyAdvancedLiverDiseaseAssessmentService';
import ImmunologyAnoscopyService from 'main/service/customServices/ImmunologyAnoscopyService';
import LungFunctionService from 'main/service/customServices/LungFunctionService';
import MedicationService from 'main/service/customServices/MedicationService';
import PathologyService from 'main/service/customServices/PathologyService';
import * as React from 'react';
import EntityData from 'smarthealth-javascript/EntityData';
import ServiceTypeEnum from 'smarthealth-javascript/ServiceTypeEnum';

/**
 * Factory component to render the appropriate Service
 *
 * @author Thompson 28/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
function serviceRecordPanelFactory(serviceTypeID: number,
    props: EditViewFormComponentProps<EntityData>): React.ReactNode
{
    switch (serviceTypeID)
    {
    case ServiceTypeEnum.EnergencyAccess:
        return <EmergencyAccessService {...props} />;
    case ServiceTypeEnum.Imaging:
        return <ImagingService {...props} />;
    case ServiceTypeEnum.ImmunologyAdvancedLiverDiseaseAssessment:
        return <ImmunologyAdvancedLiverDiseaseAssessmentService {...props} />;
    case ServiceTypeEnum.ImmunologyAnoscopy:
        return <ImmunologyAnoscopyService {...props} />;
    case ServiceTypeEnum.LungFunction:
        return <LungFunctionService {...props} />;
    case ServiceTypeEnum.Medication:
        return <MedicationService {...props} />;
    case ServiceTypeEnum.Pathology:
        return <PathologyService {...props} />;
    default:
        return <EditViewFormComponent<EntityData> {...props} />;
    }
}

export default serviceRecordPanelFactory;
