import AutoCloser from 'main/utility/AutoCloser';
import {px} from 'main/utility/StyleUtility';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * A div that fills the available space and has sizes assigned.
 *
 * Checks the size and position of the itself regularly and if it changes uses a placeholder object to
 * recalculate the screen space left. This means that is the component resizes its internal state can be lost and the
 * state may need to be externalised.
 *
 * @author Larry 21/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@observer
class FillSpace extends React.Component
{
    private autoCloser = new AutoCloser();

    @observable
    private height;

    @observable
    private left;

    private ref: React.RefObject<HTMLDivElement> = React.createRef();

    @observable
    private top;

    @observable
    private width;

    public componentDidMount()
    {
        this.autoCloser.setInterval(() => this.onTimer(), 100);
        this.autoCloser.addEventListener(window, 'resize', this.onWindowResize);
    }

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    @action.bound
    private onTimer()
    {
        if (this.ref.current)
        {
            const rect = this.ref.current.getBoundingClientRect();
            if (this.top !== rect.top)
            {
                this.top = rect.top;
                // make it recalculate the height
                this.height = null;
            }
            else if (this.height !== rect.height)
            {
                this.top = rect.top;
                this.height = rect.height;
            }

            if (this.left !== rect.left)
            {
                this.left = rect.left;
                // make it recalculate the width
                this.width = null;
            }
            else if (this.width !== rect.width)
            {
                this.left = rect.left;
                this.width = rect.width;
            }
        }
    }

    @action.bound
    private onWindowResize()
    {
        // force recalculation of sizes
        this.height = null;
    }

    public render(): React.ReactNode
    {
        const sized = this.width && this.height;
        return (
            <div ref={this.ref} style={{
                overflow: 'hidden', width: sized ? px(this.width) : '100%', height: sized ? px(this.height) : '100%'
            }}>
                {sized ? this.props.children : 'Recalculating size ...'}
            </div>
        );
    }
}

export default FillSpace;
