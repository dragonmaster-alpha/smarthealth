import FilterComponent from 'main/component/FilterComponent';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Tester for FilterComponent
 *
 * @author Larry 13/01/2021
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2021
 */
@observer
class FilterComponentTester extends React.Component
{
    @observable
    private value = '';

    @action.bound
    private onValueChange(value)
    {
        this.value = value;
    }

    public render(): React.ReactNode
    {
        return (
            <div style={{ margin: '8px' }}>
                <FilterComponent value={this.value} onValueChange={this.onValueChange} />
            </div>
        );
    }
}

export default {
    title: 'Component/FilterComponent',
    component: FilterComponentTester
};

export const simple = () => <FilterComponentTester />;
