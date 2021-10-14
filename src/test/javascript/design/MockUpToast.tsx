import {autobind} from 'core-decorators';
import {colour, field} from 'main/application/ThemeConstants';
import React from 'react';

/**
 * Toast message panel.
 *
 * @author Thompson 5/10/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MockUpToastProps
{
    onClose?: () => void;
    text: string;
    title: string;
}

class MockUpToast extends React.Component<MockUpToastProps>
{
    @autobind
    private onClose()
    {
        this.props.onClose && this.props.onClose();
    }

    public render()
    {
        return (
            <div style={{
                backgroundColor: colour.white,
                border: 'solid 1px #cdd2e1',
                borderRadius: field.borderRadius,
                boxShadow: '0 2px 14px 0 rgba(0, 0, 0, 0.04), 0 2px 6px 0 rgba(0, 0, 0, 0.11)',
                display: 'flex',
                padding: '10px',
                justifyContent: 'space-between',
                width: '308px'
            }}>
                <span className="shicon sh-success" style={{
                    color: colour.success, fontSize: '20px', marginLeft: '-2px', marginTop: '-2px'
                }} />
                <div style={{
                    color: colour.primary6,
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    flexGrow: 1,
                    margin: '0px 8px'
                }}>
                    <span style={{ fontWeight: 500, marginBottom: '4px' }}>{this.props.title}</span>
                    <span>{this.props.text}</span>
                </div>
                <span className="shicon sh-close"
                    style={{ color: colour.navigation, fontSize: '14px', cursor: 'pointer' }}
                    onClick={this.onClose} />
            </div>
        );
    }
}

export default MockUpToast;
