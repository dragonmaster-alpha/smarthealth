import {action as storybookAction} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import SelectionList from 'main/component/SelectionList';
import OverlayPanel from 'main/container/OverlayPanel';
import React from 'react';

/**
 * Story for SelectionList
 *
 * @author Larry 23/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Component/SelectionList', module)
    .add('Standard', () =>
    {
        const options = ['Gastrointestinal', 'Urinary tract', 'Genital tract', 'Lymphatic', 'Wound'].map(
            item => ({ label: item, value: item }));
        return (
            <OverlayPanel onExit={() => null}>
                <SelectionList onSelection={selection => storybookAction('selecton')(selection)} options={options}
                    size={16} />
            </OverlayPanel>
        );
    })
    .add('7 options', () =>
    {
        const options = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'].map(
            item => ({ label: item, value: item }));
        return (
            <OverlayPanel onExit={() => null}>
                <SelectionList onSelection={selection => storybookAction('selecton')(selection)} options={options}
                    size={16} />
            </OverlayPanel>
        );
    })
    .add('10 options', () =>
    {
        const options = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth',
            'Tenth'].map(item => ({ label: item, value: item }));
        return (
            <OverlayPanel onExit={() => null}>
                <SelectionList onSelection={selection => storybookAction('selecton')(selection)}
                    options={options} size={16} />
            </OverlayPanel>
        );
    })
    .add('With other', () =>
    {
        const options = ['Gastrointestinal', 'Urinary tract', 'Genital tract', 'Lymphatic', 'Wound'].map(
            item => ({ label: item, value: item }));
        return (
            <OverlayPanel onExit={() => null}>
                <SelectionList onSelection={selection => storybookAction('selecton')(selection)} options={options}
                    other={true} size={20} />
            </OverlayPanel>
        );
    })
    .add('10 options and other', () =>
    {
        const options = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth',
            'Tenth'].map(item => ({ label: item, value: item }));
        return (
            <OverlayPanel onExit={() => null}>
                <SelectionList onSelection={selection => storybookAction('selecton')(selection)} options={options}
                    other={true} size={20} />
            </OverlayPanel>
        );
    });
