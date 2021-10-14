import classNames from 'classnames';
import {autobind} from 'core-decorators';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Component to display a list of strings and allowing each string to be removed.
 *
 * Based on PrimeReact Chips
 * https://github.com/primefaces/primereact/blob/master/src/components/chips/Chips.js
 *
 * @author Thompson 2/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
interface MultipleSelectionFieldLabelProps
{
    className?: string;
    onValueChange?: (value) => void;
    readOnly?: boolean;
    value: string[];
}

@observer
class MultipleSelectionFieldLabel extends React.Component<MultipleSelectionFieldLabelProps>
{
    @autobind
    private onRemoveChip(i: number): void
    {
        const { value } = this.props;
        value.splice(i, 1);
        this.props.onValueChange(value);
    }

    public render(): React.ReactNode
    {
        const { className, value, readOnly } = this.props;
        const chips = value
            ? (
                value.map((chipValue, i) =>
                {
                    return (
                        <li key={chipValue + i}
                            className={classNames('cp-multipleselectionfieldlabel-token',
                                readOnly ? 'is-disabled' : null)}>
                            {chipValue}
                            <button disabled={readOnly} onClick={() => this.onRemoveChip(i)}>
                                <i className="pi pi-times" />
                            </button>
                        </li>
                    );
                })
            )
            : null;

        return (
            <ul className={classNames('cp-multipleselectionfieldlabel', className)}>
                {chips}
            </ul>
        );
    }
}

export default MultipleSelectionFieldLabel;
