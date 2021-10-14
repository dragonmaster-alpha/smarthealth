import LOG from 'loglevel';
import {action, observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Allow debugging of HomeButton component
 *
 * @author Larry 22/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface ErrorBoundaryProps
{
    message?: string;
}

@observer
class ErrorBoundary extends React.Component<ErrorBoundaryProps>
{
    @observable
    private error: string;

    @observable
    private retries: number = 0;

    public componentDidCatch(error, info)
    {
        LOG.warn(error, info);
        runInAction(() =>
        {
            this.error = error.message;
        });
    }

    @action.bound
    private onClick()
    {
        this.error = null;
        this.retries += 1;
    }

    public render()
    {
        if (!this.error)
        {
            return this.props.children;
        }

        const retries = ((this.retries > 0) && <div>{this.retries} retries</div>);
        return (
            <div className="ui-component ui-messages-error">
                <button type="button" style={{ float: 'right', backgroundColor: 'Transparent', border: 'none' }}
                    onClick={this.onClick}>
                    <span className="fa fa-fw fa-close" />
                </button>
                <div><b>{this.props.message || 'Component Error'}</b></div>
                <div>{this.error}</div>
                {retries}
            </div>
        );
    }
}

export default ErrorBoundary;
