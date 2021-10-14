import {autobind} from 'core-decorators';
import StoreProps from 'main/store/StoreProps';
import {modalWait} from 'main/wait/WaitModalComponent';
import {action, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {ProgressSpinner} from 'primereact/progressspinner';
import React from 'react';

/**
 * Common AboutPanel
 *
 * @author Uditha 28/09/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
interface AboutDialogProps extends StoreProps
{
    target: string;
    title: string;
}

@inject('sessionStore', 'handlers')
@observer
class AboutPanel extends React.Component<AboutDialogProps>
{
    @observable
    private loading = true;

    @observable
    private target: {}[] = null;

    public componentDidMount()
    {
        const { versionHandler } = this.props.handlers;
        const promise = versionHandler.getVersion(this.props.target);
        modalWait(promise, this.props.sessionStore)
            .then(this.updateVersion)
            .catch(this.handleError);
    }

    private displayVersionInformation()
    {
        if (this.loading)
        {
            return <ProgressSpinner />;
        }
        if (!this.target)
        {
            return <div>Error Fetching {this.props.title} Version, Please Try Again</div>;
        }

        return (
            <>
                {this.target.map(targetStatus =>
                {
                    const statusKey = Object.keys(targetStatus)[0];
                    return (
                        <div key={statusKey}>
                            {statusKey}: {targetStatus[statusKey] || ''}
                        </div>
                    );
                })}
                <br />
            </>
        );
    }

    @autobind
    @action
    private handleError()
    {
        this.loading = false;
    }

    public render()
    {
        return (
            <div>
                {this.displayVersionInformation()}
            </div>
        );
    }

    @autobind
    @action
    private updateVersion(data)
    {
        this.target = data;
        this.loading = false;
    }
}

export default AboutPanel;
