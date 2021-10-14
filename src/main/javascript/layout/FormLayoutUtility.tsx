import FormFieldLayoutState from 'main/layout/FormFieldLayoutState';
import FieldStateUtility from 'main/utility/FieldStateUtility';
import FormDescriptionUtility from 'main/utility/FormDescriptionUtility';
import FormFieldOrSection from 'smarthealth-javascript/FormFieldOrSection';

/**
 * Methods to support FormLayout
 *
 * TODO add fieldStates parameter
 *
 * @author Larry 5/02/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const GRID_STANDARD_UNIT = 'auto';
const GRID_FILL_UNIT = '1fr';

export function buildTemplateRows(layoutColumns: number, fieldsAndSections: FormFieldOrSection[],
    editing: boolean): string
{
    // need a separate layout state as we are going to iterate through the fields and sections
    const layoutState = new FormFieldLayoutState(layoutColumns);

    const fillHeightRows = new Set<number>();

    const onField = (fieldOrSection: FormFieldOrSection) =>
    {
        if (FieldStateUtility.isVisible(editing, fieldOrSection.field.state))
        {
            const { layout } = fieldOrSection.field;
            if (layout && layout.newLine)
            {
                layoutState.nextLine();
            }
            if (layout && layout.skip)
            {
                layoutState.skip(layout.skip);
            }

            if (layout && layout.fillHeight)
            {
                fillHeightRows.add(layoutState.currentRow);
            }

            if (layout && layout.spanLine)
            {
                layoutState.fillLine();
            }
            else if (layout && layout.span)
            {
                layoutState.fill(layout.span);
            }
            else
            {
                layoutState.fill(1);
            }
        }
    };

    const onSectionSubheadingOrSectionEnd = (fieldOrSection: FormFieldOrSection) =>
    {
        layoutState.nextLine();
        layoutState.fillLine();
    };

    FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(fieldsAndSections,
        onField, onSectionSubheadingOrSectionEnd, onSectionSubheadingOrSectionEnd, onSectionSubheadingOrSectionEnd);
    // fill the last line
    layoutState.nextLine();

    const templateRows = [];
    for (let i = 0; i < layoutState.currentRow; i += 1)
    {
        templateRows[i] = fillHeightRows.has(i) ? GRID_FILL_UNIT : GRID_STANDARD_UNIT;
    }
    return templateRows.join(' ');
}

// TODO buildTemplateColumns not used at the moment
// @ts-ignore
export function buildTemplateColumns({ layoutColumns, fieldsAndSections, editing }: FormFieldLayoutState): string
{
    // need a separate layout state as we are going to iterate through the fields and sections
    const layoutState = new FormFieldLayoutState(layoutColumns);

    const fillWidthLayoutColumns = new Set<number>();

    const onField = (fieldOrSection: FormFieldOrSection) =>
    {
        if (FieldStateUtility.isVisible(editing, fieldOrSection.field.state))
        {
            // TODO
            // const currentLayoutColumn = layoutState.currentLayoutColumn;
            // const gridLayout = layoutState.next(fieldOrSection.field.layout);
            // if (fieldOrSection.field.layout && fieldOrSection.field.layout.fillWidth)
            // {
            //     const skipLayoutColumns = gridLayout.skipGridColumns / FormFieldLayoutState.LAYOUT_TO_GRID;
            //     const startAtLayoutColumn = (currentLayoutColumn + skipLayoutColumns) % layoutColumns;
            //
            //     for (let fieldAtGridColumn = (startAtLayoutColumn * FormFieldLayoutState.LAYOUT_TO_GRID) + 1
            //         ; fieldAtGridColumn <= ((startAtLayoutColumn * FormFieldLayoutState.LAYOUT_TO_GRID)
            //         + gridLayout.fieldSpanGridColumns)
            //         ; fieldAtGridColumn += 2)
            //     {
            //         fillWidthLayoutColumns.add(fieldAtGridColumn);
            //     }
            // }
        }
    };

    const onSectionSubheadingOrSectionEnd = (fieldOrSection) =>
    {
        layoutState.nextLine();
        layoutState.fillLine();
    };

    FormDescriptionUtility.traverseFieldsSectionsAndSubheadings(fieldsAndSections, onField,
        onSectionSubheadingOrSectionEnd, onSectionSubheadingOrSectionEnd, onSectionSubheadingOrSectionEnd);

    const templateColumn = [];
    for (let i = 0; i < layoutState.gridColumns; i += 1)
    {
        templateColumn[i] = fillWidthLayoutColumns.has(i) ? GRID_FILL_UNIT : GRID_STANDARD_UNIT;
    }
    return templateColumn.join(' ');
}
