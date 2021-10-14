/**
 * To support adding and removing rows in the table we need a unique key for each row/tr. We need to match these keys to
 * the row and make sure they don't repeat. We need to support adding and removing the row keys.
 *
 * @author Larry 6/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */

class RowTracker
{
    private readonly keys: string[];

    // @ts-ignore
    private nextKey: number;

    constructor(rowCount: number)
    {
        this.keys = [];
        this.nextKey = 0;
        for (let i: number = 0; i < rowCount; i += 1)
        {
            this.insert(i);
        }
    }

    public append()
    {
        this.insert(this.keys.length);
    }

    public getKey(row: number): string
    {
        return this.keys[row];
    }

    public getKeys(): string[]
    {
        return this.keys;
    }

    public insert(beforeRow: number)
    {
        this.keys.splice(beforeRow, 0, `R${this.nextKey}`);
        this.nextKey += 1;
    }

    public remove(row: number)
    {
        this.keys.splice(row, 1);
    }
}

export default RowTracker;
