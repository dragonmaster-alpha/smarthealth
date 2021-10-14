import CloseButton from 'main/component/CloseButton';
import TabBar from 'main/component/TabBar';
import React from 'react';

/**
 * Tester for TabBar.
 *
 * content is ignored
 *
 * @author Larry 12/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */

export default {
    title: 'Component/TabBar'
};

export const simple = () =>
{
    const tabs = [
        { title: 'Overview', content: <div /> },
        { title: 'Demographics', content: <div /> },
        { title: 'Insurers and Identifiers', content: <div /> },
        { title: 'Contacts', content: <div /> },
        { title: 'Family / Social', content: <div /> },
        { title: 'Medical Alerts', content: <div /> },
        { title: 'Allergies', content: <div /> },
        { title: 'Providers and Consents', content: <div /> }
    ];
    return <TabBar tabs={tabs} />;
};

export const withCloseButtonsAndToolTips = () =>
{
    const closeButton = <CloseButton onClose={() => null} />;
    const tabs = [
        { title: 'Consultation Note', content: <div />, decoration: closeButton, toolTip: '10/10/2020' },
        { title: 'Pathology', content: <div />, decoration: closeButton, toolTip: '10/10/2020' },
        { title: 'Consultation Note', content: <div />, decoration: closeButton, toolTip: '5/11/2020' },
        { title: 'Pathology', content: <div />, decoration: closeButton, toolTip: '20/10/2020' }
    ];
    return <TabBar tabs={tabs} />;
};

export const small = () =>
{
    const tabs = [
        { title: 'Provider', content: <div /> },
        { title: 'Medical Group', content: <div /> }
    ];
    return <TabBar tabs={tabs} small={true} />;
};
