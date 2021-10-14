/**
 * Contains the current state for laying out the form, allowing us to calculate how to progress to a new line, etc
 *
 * @author Larry 22/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class FormFieldLayoutState
{
    // conversion from number of fields in the layout to number of fields in the grid
    public static readonly LAYOUT_TO_GRID = 2;

    private currentLayoutColumnInternal: number;

    private currentRowInternal: number;

    public readonly gridColumns: number;

    public readonly layoutColumns: number;

    constructor(layoutColumns: number)
    {
        this.verifyLayoutColumn(layoutColumns);

        this.layoutColumns = layoutColumns;

        this.gridColumns = this.layoutColumns * FormFieldLayoutState.LAYOUT_TO_GRID;

        this.currentLayoutColumnInternal = 0;
        this.currentRowInternal = 0;
    }

    public get currentLayoutColumn()
    {
        return this.currentLayoutColumnInternal;
    }

    public get currentRow(): number
    {
        return this.currentRowInternal;
    }

    private advance(layoutColumns: number): void
    {
        this.currentLayoutColumnInternal += layoutColumns;
        if (this.currentLayoutColumnInternal >= this.layoutColumns)
        {
            this.currentLayoutColumnInternal = 0;
            this.currentRowInternal += 1;
        }
    }

    public fill(layoutColumns: number): { gridColumns: number, oddRow: boolean }
    {
        if ((this.currentLayoutColumnInternal + layoutColumns) > this.layoutColumns)
        {
            throw new Error(`field span ${layoutColumns} out of layout boundary`);
        }

        const oddRow = this.isOddRow();
        this.advance(layoutColumns);
        return { oddRow, gridColumns: layoutColumns * FormFieldLayoutState.LAYOUT_TO_GRID };
    }

    public fillLine(): { gridColumns: number, oddRow: boolean }
    {
        const layoutColumns = this.layoutColumns - this.currentLayoutColumnInternal;
        return this.fill(layoutColumns);
    }

    public isFirstRow(): boolean
    {
        return this.currentRow === 0;
    }

    public isOddRow(): boolean
    {
        return (this.currentRow % 2) === 1;
    }

    public isStartOfLine(): boolean
    {
        return this.currentLayoutColumnInternal === 0;
    }

    public nextLine(): { skipGridColumns: number, oddRow: boolean }
    {
        if (this.isStartOfLine())
        {
            // already on the next line
            return { skipGridColumns: 0, oddRow: this.isOddRow() };
        }

        const skipLayoutColumns = this.layoutColumns - this.currentLayoutColumnInternal;
        const oddRow = this.isOddRow();
        this.advance(skipLayoutColumns);
        return { oddRow, skipGridColumns: skipLayoutColumns * FormFieldLayoutState.LAYOUT_TO_GRID };
    }

    public skip(skipLayoutColumns: number): { skipGridColumns: number, oddRow: boolean }
    {
        if ((this.currentLayoutColumnInternal + skipLayoutColumns) > this.layoutColumns)
        {
            throw new Error(`skip ${skipLayoutColumns} out of layout boundary`);
        }

        const oddRow = this.isOddRow();
        this.advance(skipLayoutColumns);
        return { oddRow, skipGridColumns: skipLayoutColumns * FormFieldLayoutState.LAYOUT_TO_GRID };
    }

    private verifyLayoutColumn(layoutColumn: number): void
    {
        if (!layoutColumn || layoutColumn <= 0)
        {
            throw new Error('FormDescription layoutColumn must be greater than 0');
        }
    }
}

export default FormFieldLayoutState;
