import {css} from '@emotion/core';
import {colour} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import {border, px} from 'main/utility/StyleUtility';
import React from 'react';

/**
 * Display service record search field in service record toolbar.
 *
 * TODO make it do something
 *
 * @author Larry 27/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const searchStyle = css({
    border: border(colour.primary2),
    borderRadius: '4px',
    padding: px(2),
    '.shicon': {
        fontSize: '12px',
        padding: px(0, 4, 0, 2),
        verticalAlign: '-2px',
        color: colour.primary2
    },
    input: {
        border: 'none'
    }
});

class ServiceRecordHistorySearch extends React.Component
{
    public render(): React.ReactNode
    {
        return (
            <span css={searchStyle} title="Search (not implemented)">
                <SHIcon icon="search" />
                <input type="text" />
            </span>
        );
    }
}

export default ServiceRecordHistorySearch;
