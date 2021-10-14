import {css} from '@emotion/core';
import {background} from 'main/application/ThemeConstants';
import HomeButton from 'main/component/HomeButton';
import Scroll from 'main/container/Scroll';
import ActionDescription from 'main/page/ActionDescription';
import PageDescription from 'main/page/PageDescription';
import StoreProps from 'main/store/StoreProps';
import {inject, observer} from 'mobx-react';
import React from 'react';

/**
 * Display a home page of buttons
 *
 * @author Larry 10/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface HomePageProps extends StoreProps
{
    buttons: (PageDescription | ActionDescription)[];
}

const homePageStyle = css({
    backgroundColor: background.main,
    paddingTop: '32px'
});

const gridStyle = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gridTemplateRows: 'repeat(auto-fit, 190px)',
    alignItems: 'start',
    justifyItems: 'center'
});

@inject('appStore')
@observer
class HomePage extends React.Component<HomePageProps>
{
    public render(): React.ReactNode
    {
        const buttons = this.props.buttons
            .filter(button => !button.visible || button.visible(this.props.appStore));

        return (
            <main css={homePageStyle}>
                <Scroll>
                    <div css={gridStyle}>
                        {buttons.map(button => <HomeButton key={button.key || button.title} page={button} />)}
                    </div>
                </Scroll>
            </main>
        );
    }
}

export default HomePage;
