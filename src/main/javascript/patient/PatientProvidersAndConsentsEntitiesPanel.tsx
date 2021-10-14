import Entities from 'main/component/Entities';
import EntityList from 'main/component/EntityList';
import PatientIDProps from 'main/patient/PatientIDProps';
// tslint:disable-next-line:max-line-length
import PatientProvidersAndConsentsPanel, {PatientProvidersAndConsentsPanelData} from 'main/patient/PatientProvidersAndConsentsPanel';
import {inject} from 'mobx-react';
import React from 'react';
import EntityReference from 'smarthealth-javascript/EntityReference';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicalGroupMember from 'smarthealth-javascript/MedicalGroupMember';
import PatientMedicalGroupAssociation from 'smarthealth-javascript/PatientMedicalGroupAssociation';
import {programDescriptions} from 'smarthealth-javascript/Program';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';

/**
 * Entities component to load PatientProvidersAndConsentsPanel.tsx
 *
 * @author Thompson 23/10/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */

interface ProviderRowEntityCache extends MedicalGroupMember
{
    data: {
        [key: string]: any;
    };
    metadata: ServiceSummary;
}

@inject('entityCache')
class PatientProvidersAndConsentsEntitiesPanel extends React.Component<PatientIDProps>
{
    private getProvidersTableData(providers)
    {
        const providersEntityCache = providers.map((provider) =>
        {
            const tableRow: ProviderRowEntityCache = {
                ...this.props.entityCache.get({ id: provider.memberID, type: EntityType.MedicalGroupMember }).value,
                ...this.props.entityCache.get({ id: provider.serviceID, type: EntityType.ServiceRecord }).value,
                user: this.props.entityCache.get(
                    { id: provider.memberID.userID, type: EntityType.User }).value
            };
            if (tableRow.metadata && tableRow.metadata.program)
            {
                return {
                    ...tableRow,
                    metadata: {
                        ...tableRow.metadata,
                        program: programDescriptions[tableRow.metadata.program]
                    }
                };
            }
            else
            {
                return tableRow;
            }
        });

        return providersEntityCache;
    }

    public render()
    {
        const entities: { [key: string]: EntityReference } = {
            patient: {
                type: EntityType.Patient,
                id: this.props.patientID
            },
            patientClinical: {
                type: EntityType.PatientClinical,
                id: this.props.patientID
            },
            medicalGroupAssociations: {
                type: EntityType.EntityReferenceList,
                id: EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicalGroupAssociations,
                    { patientID: this.props.patientID })
            },
            providers: {
                type: EntityType.PatientProviderAssociation,
                id: this.props.patientID
            },
            formDescription: {
                type: EntityType.FormDescription,
                id: 'Patient.ProvidersAndConsents'
            }
        };

        return (
            <Entities entities={entities} render={(data) =>
            {
                data.providers = this.getProvidersTableData(data.providers);
                return <EntityList<PatientMedicalGroupAssociation> references={data.medicalGroupAssociations}
                    render={(associations) =>
                    {
                        const providerAndConsentPanelData: PatientProvidersAndConsentsPanelData = {
                            patient: data.patient,
                            patientClinical: data.patientClinical,
                            medicalGroupAssociations: associations,
                            providers: data.providers
                        };
                        return <PatientProvidersAndConsentsPanel data={providerAndConsentPanelData}
                            formDescription={data.formDescription} patientID={this.props.patientID} />;
                    }} />;
            }} />
        );
    }
}

export default PatientProvidersAndConsentsEntitiesPanel;
