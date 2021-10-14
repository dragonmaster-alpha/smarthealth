import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {background, colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import ActionDescription, {isActionDescription} from 'main/page/ActionDescription';
import PageDescription from 'main/page/PageDescription';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Button used on home panels
 *
 * @author Larry 22/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface HomeButtonProps extends StoreProps
{
    page: PageDescription | ActionDescription;
}

const buttonStyle = css({
    width: '160px',
    height: '160px',
    backgroundColor: background.white,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    '&:hover': {
        border: `solid 2px ${colour.primary2a}`
    },
    '& .shicon': {
        fontSize: '500%',
        lineHeight: '70%',
        color: colour.primary2
    },
    '&:hover .shicon': {
        color: colour.primary2a
    },
    '& div': {
        font: font.h3,
        color: colour.text,
        paddingTop: '0.5em'
    },
    '&:hover div': {
        color: colour.primary2a
    },
    '&:active': {
        // stop it moving on click
        padding: 0
    }
});

@inject('appStore', 'componentStore')
class HomeButton extends React.Component<HomeButtonProps>
{
    @autobind
    private onClick(pageOrAction: PageDescription | ActionDescription)
    {
        if (isActionDescription(pageOrAction))
        {
            pageOrAction.doAction(this.props.appStore);
        }
        else
        {
            this.props.componentStore.selectPage(pageOrAction);
        }
    }

    public render(): React.ReactNode
    {
        const { page: pageOrAction } = this.props;
        return (
            <button css={buttonStyle} key={pageOrAction.key} onClick={() => this.onClick(pageOrAction)}>
                {lodash.isString(pageOrAction.icon) ? <SHIcon icon={pageOrAction.icon} /> : pageOrAction.icon}
                <div>{pageOrAction.title}</div>
            </button>
        );
    }
}

export default HomeButton;
