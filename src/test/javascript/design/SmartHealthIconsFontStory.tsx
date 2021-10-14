import {storiesOf} from '@storybook/react';
import classNames from 'classnames';
import React from 'react';
import icons from 'smarthealth-javascript/smarthealthicons.json';

/**
 * Showcase for Icons
 *
 * @author Larry 2/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
storiesOf('Design/Icons', module)
    .add('Small black', () =>
    {
        return (
            <>
                {
                    Object.keys(icons)
                        .map(icon => (
                            <div key="{icon}" style={{
                                display: 'inline-block', width: '200px', textAlign: 'center', padding: '10px',
                                margin: '5px', border: '1px black solid'
                            }}>
                                <span className={classNames('shicon', `sh-${icon}`)}
                                    style={{ fontSize: '150%' }}></span>
                                <br />
                                sh-{icon}
                            </div>)
                        )
                }
            </>
        );
    })
    .add('Large blue', () =>
    {
        return (
            <>
                {
                    Object.keys(icons)
                        .map(icon => (
                            <div key="{icon}" style={{
                                display: 'inline-block', width: '200px', textAlign: 'center', padding: '10px',
                                margin: '5px', border: '1px black solid'
                            }}>
                                <span className={classNames('shicon', `sh-${icon}`, 'color-primary-blue')}
                                    style={{ fontSize: '3em' }}></span>
                                <br />
                                sh-{icon}
                            </div>)
                        )
                }
            </>
        );
    })
    .add('Large reverse', () =>
    {
        return (
            <>
                {
                    Object.keys(icons)
                        .map(icon => (
                            <div key="{icon}" style={{
                                display: 'inline-block', width: '200px', textAlign: 'center', padding: '10px',
                                margin: '5px', border: '1px black solid'
                            }}>
                                <span className={classNames('shicon', `sh-${icon}`)}
                                    style={{ fontSize: '3em', color: 'white', backgroundColor: 'black' }}></span>
                                <br />
                                sh-{icon}
                            </div>)
                        )
                }
            </>
        );
    });
