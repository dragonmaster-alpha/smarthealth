import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import LOG from 'loglevel';
import ContentPanel from 'main/application/ContentPanel';
import MenuBarComponent from 'main/application/MenuBarComponent';
import MessagesComponent from 'main/application/MessagesComponent';
import ModalDialogs from 'main/application/ModalDialogs';
import Sidebar from 'main/application/Sidebar';
import {sidebar, title} from 'main/application/ThemeConstants';
import ApplicationLogo from 'main/component/ApplicationLogo';
import ErrorBoundary from 'main/component/ErrorBoundary';
import PageHeading from 'main/component/PageHeading';
import StoreProps from 'main/store/StoreProps';
import AutoCloser from 'main/utility/AutoCloser';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Layout of the main components of the Smart Health Application
 *
 * TODO the beforeunload does not consistently show the dialog
 *
 * TODO the handleUnload does not seem to clear session state
 *
 * TODO auto-logging out is temporarily disabled
 *
 * @author Uditha 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */

// @ts-ignore
function handleBeforeUnload(event)
{
    // LOG.info('About to leave page');
    // this message is not displayed in modern browsers
    const message = 'You are about to leave Smart Health. You may lose your work. Are you sure?';
    // eslint-disable-next-line no-param-reassign
    event.returnValue = message;
    return message;
}

const divStyle = css({
    display: 'grid',
    gridTemplateColumns: `${sidebar.width} 1fr`,
    gridTemplateRows: `${title.height} 1fr`,
    height: '100vh',
    position: 'relative',
    '&>header': {
        borderBottom: title.border,
        display: 'flex',
        justifyContent: 'space-between'
    }
});

@inject('actionStore')
@observer
class ApplicationLayout extends React.Component<StoreProps>
{
    private autoCloser = new AutoCloser();

    public componentDidMount()
    {
        // disable to make development easier
        // window.addEventListener('beforeunload', handleBeforeUnload);
        // this.autoCloser.addEventListener(window, 'beforeunload', handleBeforeUnload);
    }

    public componentWillUnmount()
    {
        this.autoCloser.onUnmount();
    }

    // TODO this isn't used
    @autobind
    public handleUnload()
    {
        LOG.info('Logging out because leaving page');
        this.props.actionStore.logout();
    }

    public render()
    {
        return (
            <div css={divStyle}>
                <ApplicationLogo />
                <header>
                    <PageHeading />
                    <MenuBarComponent />
                </header>
                <Sidebar />
                <ErrorBoundary>
                    <ContentPanel />
                </ErrorBoundary>
                <ModalDialogs />
                <MessagesComponent />
            </div>
        );
    }
}

export default ApplicationLayout;
