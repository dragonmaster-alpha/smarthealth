import Entity from 'main/component/Entity';
import EntityList from 'main/component/EntityList';
import StoreProps from 'main/store/StoreProps';
import MedicationSummaryExpandableTable from 'main/summary/medication/MedicationSummaryExpandableTable';
import React from 'react';
import EntityReferenceList from 'smarthealth-javascript/EntityReferenceList';
import EntityReferenceListType from 'smarthealth-javascript/EntityReferenceListType';
import EntityReferenceListTypeUtility from 'smarthealth-javascript/EntityReferenceListTypeUtility';
import EntityType from 'smarthealth-javascript/EntityType';
import MedicationSummary from 'smarthealth-javascript/MedicationSummary';

/**
 * Load MedicationSummaries data for MedicationSummaryExpandableTable.
 *
 * @author Thompson 9/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MedicationSummaryEntityTreeTableProps extends StoreProps
{
    onMedicationSummaryChange: (medicationSummary: MedicationSummary) => void;
}

class MedicationSummaryExpandableEntityTable extends React.Component<MedicationSummaryEntityTreeTableProps>
{
    public render()
    {
        return (
            <Entity<EntityReferenceList>
                id={EntityReferenceListTypeUtility.buildID(EntityReferenceListType.MedicationsLatest)}
                type={EntityType.EntityReferenceList}
                render={(data) => (
                    <EntityList<MedicationSummary> references={data}
                        render={(data) => (
                            <MedicationSummaryExpandableTable data={data}
                                onMedicationSummaryChange={this.props.onMedicationSummaryChange} />
                        )}
                    />
                )}
            />
        );
    }
}

export default MedicationSummaryExpandableEntityTable;
