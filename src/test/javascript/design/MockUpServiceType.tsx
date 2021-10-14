import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import React from 'react';
import {programAbbreviations, programDescriptions} from 'smarthealth-javascript/Program';
import ServiceStatus from 'smarthealth-javascript/ServiceStatus';
import ServiceSummary from 'smarthealth-javascript/ServiceSummary';
import serviceTypes from 'smarthealth-rest-test/servicetypes.json';

/**
 * TODO Larry Document the purpose of this class
 *
 * @author Larry 20/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpServiceTypeProps
{
    serviceSummary: ServiceSummary;
}

const spanStyle = css({
    display: 'grid',
    gridTemplateColumns: '20px 1fr auto'
});

class MockUpServiceType extends React.Component<MockUpServiceTypeProps>
{
    private lookup(serviceTypeID: number): React.ReactNode
    {
        const serviceType = serviceTypes.find(serviceType => serviceType.serviceTypeID === serviceTypeID);
        return serviceType ? serviceType.abbreviation : 'unknown';
    }

    public render(): React.ReactNode
    {
        // {this.props.programIcons && this.renderProgramIcon(serviceSummary.program)}
        //

        return (
            <span css={spanStyle}>
                <span>{this.renderProgramIcon()}</span>
                <span>{this.lookup(this.props.serviceSummary.serviceType)}</span>
                <span>
                    {
                        (this.props.serviceSummary.status === ServiceStatus.DRAFT) &&
                        <SHIcon icon="draft" style={{ color: colour.warning }} />
                    }
                </span>
            </span>
        );
    }

    private renderProgramIcon(): React.ReactNode
    {
        const { program } = this.props.serviceSummary;
        if (program)
        {
            return <SHIcon icon={`program-${programAbbreviations[program].toLowerCase()}`}
                title={programDescriptions[program]} style={{ color: colour.primary2 }} />;
        }
        else
        {
            return null;
        }
    }
}

export default MockUpServiceType;
