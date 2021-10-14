import {storiesOf} from '@storybook/react';
import OverlayPanel from 'main/container/OverlayPanel';
import {observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {Button} from 'primereact/button';
import React from 'react';

/**
 * Allow debugging of OverlayPanel container
 *
 * @author Thompson 8/05/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
@observer
class Tester extends React.Component
{
    @observable
    private show: boolean;

    public render(): React.ReactNode
    {
        return (
            <>
                <Button label="Toggle OverlayPanel" onClick={() => runInAction(() =>
                {
                    this.show = !this.show;
                })} />
                {this.show && <OverlayPanel onExit={() => runInAction(() =>
                {
                    this.show = false;
                })}>
                    <div style={{ border: '1px solid black' }}>
                        <h4>I'm the OverlayPanel and it works!</h4>
                        <h5>Hello world..</h5>
                    </div>
                </OverlayPanel>
                }
            </>
        );
    }
}

storiesOf('Container/OverlayPanel', module)
    .add('Standard', () => <Tester />);
