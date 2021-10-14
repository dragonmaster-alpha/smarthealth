import RowTracker from 'main/utility/RowTracker';

/**
 * Unit test for RowTracker
 *
 * @author Larry 6/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
test('RowTracker insert', () =>
{
    const rowTracker = new RowTracker(4);
    expect(rowTracker.getKeys())
        .toEqual(['R0', 'R1', 'R2', 'R3']);

    rowTracker.insert(0);
    expect(rowTracker.getKeys())
        .toEqual(['R4', 'R0', 'R1', 'R2', 'R3']);

    rowTracker.insert(2);
    expect(rowTracker.getKeys())
        .toEqual(['R4', 'R0', 'R5', 'R1', 'R2', 'R3']);

    rowTracker.insert(6);
    expect(rowTracker.getKeys())
        .toEqual(['R4', 'R0', 'R5', 'R1', 'R2', 'R3', 'R6']);

    rowTracker.insert(100);
    expect(rowTracker.getKeys())
        .toEqual(['R4', 'R0', 'R5', 'R1', 'R2', 'R3', 'R6', 'R7']);
});

test('RowTracker append', () =>
{
    const rowTracker = new RowTracker(2);
    expect(rowTracker.getKeys())
        .toEqual(['R0', 'R1']);

    rowTracker.append();
    expect(rowTracker.getKeys())
        .toEqual(['R0', 'R1', 'R2']);

    rowTracker.append();
    expect(rowTracker.getKeys())
        .toEqual(['R0', 'R1', 'R2', 'R3']);
});

test('RowTracker remove', () =>
{
    const rowTracker = new RowTracker(6);
    expect(rowTracker.getKeys())
        .toEqual(['R0', 'R1', 'R2', 'R3', 'R4', 'R5']);

    rowTracker.remove(0);
    expect(rowTracker.getKeys())
        .toEqual(['R1', 'R2', 'R3', 'R4', 'R5']);

    rowTracker.remove(2);
    expect(rowTracker.getKeys())
        .toEqual(['R1', 'R2', 'R4', 'R5']);

    rowTracker.remove(3);
    expect(rowTracker.getKeys())
        .toEqual(['R1', 'R2', 'R4']);

    rowTracker.remove(6);
    expect(rowTracker.getKeys())
        .toEqual(['R1', 'R2', 'R4']);
});

test('RowTracker initially empty', () =>
{
    const rowTracker = new RowTracker(0);
    rowTracker.insert(0);
    expect(rowTracker.getKeys())
        .toEqual(['R0']);

    rowTracker.insert(0);
    expect(rowTracker.getKeys())
        .toEqual(['R1', 'R0']);

    rowTracker.remove(0);
    expect(rowTracker.getKeys())
        .toEqual(['R0']);
});
