import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import ProgramIcon from 'main/component/ProgramIcon';
import SHIcon from 'main/component/SHIcon';
import StoreProps from 'main/store/StoreProps';
import ServiceTypeFormatter from 'main/utility/ServiceTypeFormatter';
import {grid} from 'main/utility/StyleUtility';
import React from 'react';
import Program from 'smarthealth-javascript/Program';
import ServiceType from 'smarthealth-javascript/ServiceType';

/**
 * Display service type with annotations for program and draft status
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface ServiceTypeAnnotatedProps extends StoreProps
{
    draft?: boolean;
    program?: Program;
    serviceType: ServiceType;
}

const spanStyle = css({
    ...grid('20px 1fr auto')
});

class ServiceTypeAnnotated extends React.Component<ServiceTypeAnnotatedProps>
{
    public render(): React.ReactNode
    {
        return (
            <span css={spanStyle}>
                <span><ProgramIcon program={this.props.serviceType.program || this.props.program} /></span>
                <span>{ServiceTypeFormatter.formatName(this.props.serviceType, this.props.program)}</span>
                <span>
                    {
                        (this.props.draft) &&
                        <SHIcon icon="draft" style={{ color: colour.warning }} />
                    }
                </span>
            </span>
        );
    }
}

export default ServiceTypeAnnotated;
