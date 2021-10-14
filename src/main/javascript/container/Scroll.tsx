import FillSpace from 'main/container/FillSpace';
import React from 'react';

/**
 * Define a region that scrolls.
 *
 * Scrolling regions can't be nested. Scrolling regions need to be able to determine their size using <FillSpace>. If
 * the size is not absolute they should be inside a grid or a flexbox. If they are inside a grid they need an absolute
 * size or size 1fr (for both width and height). If they are inside a flexbox they need flexGrow set.
 *
 * @author Larry 24/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
class Scroll extends React.Component
{
    public render(): React.ReactNode
    {
        return (
            <FillSpace>
                <div style={{ height: '100%', overflow: 'auto', width: '100%' }}>
                    {this.props.children}
                </div>
            </FillSpace>
        );
    }
}

export default Scroll;
