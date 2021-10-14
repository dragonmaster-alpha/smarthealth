import {storiesOf} from '@storybook/react';
import MultipleSelectionFieldLabel from 'main/component/MultipleSelectionFieldLabel';
import {observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import React from 'react';

/**
 * Allow debugging of MultipleSelectionFieldLabel component
 *
 * @author Thompson 2/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@observer
class Tester extends React.Component<{ readOnly?: boolean }>
{
    @observable
    private input = 'ABC';

    @observable
    private selections = ['Hello', 'World'];

    public render(): React.ReactNode
    {
        return (
            <>
                <MultipleSelectionFieldLabel readOnly={this.props.readOnly} value={this.selections}
                    onValueChange={value => runInAction(() =>
                    {
                        this.selections = value;
                    })} />
                <br />
                <InputText value={this.input}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => runInAction(() =>
                    {
                        this.input = event.target.value;
                    })} />
                <Button label="Add" onClick={() => runInAction(() =>
                {
                    this.selections.push(this.input);
                    this.input = '';
                })} />
            </>
        );
    }

}

storiesOf('Component/MultipleSelectionFieldLabel', module)
    .add('Standard', () => <Tester />)
    .add('readOnly', () => <Tester readOnly={true} />);
