import {css} from '@emotion/core';
import classNames from 'classnames';
import lodash from 'lodash';
import {background, colour, font} from 'main/application/ThemeConstants';
import SHIcon from 'main/component/SHIcon';
import Scroll from 'main/container/Scroll';
import PageDescriptions from 'main/page/PageDescriptions';
import {PATIENT_DETAILS_PAGE} from 'main/patient/PatientDetailsPage';
import {PATIENT_HOME_PAGE} from 'main/patient/PatientHomePage';
import {SERVICE_RECORDS_PAGE} from 'main/service/ServiceRecordsPage';
import StoreProps from 'main/store/StoreProps';
import {USER_HOME_PAGE} from 'main/user/UserHomePage';
import {px} from 'main/utility/StyleUtility';
import {inject, observer} from 'mobx-react';
import React from 'react';
import MockUpSidebarHeading from 'test/design/MockUpSidebarHeading';

/**
 * The component for the nav tree
 *
 * TODO There seems to be an issue with PrimeReact where setting a selection causes too much recursion. This is
 * preventing me from selecting a node externally to be selected in the tree. Current workaround is to not select the
 * node in the tree when required externally, and (sometimes) prevent selecting the current node. Because it seems the
 * selection code is broken this doesn't work 100%.
 *
 * @author Larry 26/02/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
const NAV_TREE_ITEMS = [
    USER_HOME_PAGE, PageDescriptions.advisories, PageDescriptions.providerAlerts, PageDescriptions.meetings,
    PageDescriptions.patientList,
    PageDescriptions.restTester,
    PATIENT_HOME_PAGE, PATIENT_DETAILS_PAGE, PageDescriptions.patientAlerts,
    PageDescriptions.patientMedications, PageDescriptions.patientConditions, PageDescriptions.patientClinicalMeasures,
    PageDescriptions.patientPathology, PageDescriptions.patientLungFunction, SERVICE_RECORDS_PAGE
];

// @ts-ignore
const navStyle = css({
    backgroundColor: background.navigation,
    paddingTop: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '&>:last-child': {
        flexGrow: 1
    }
});

// @ts-ignore
const navHeadingStyle = css({
    padding: px(0, 24, 8)
});

const itemStyle = css({
    padding: '0.3em 1em 0.3em 1.2em',
    cursor: 'pointer',
    font: font.navItem1,
    '&:hover': {
        backgroundColor: colour.primary2,
        '>.shicon': {
            color: colour.white
        }
    },
    '>.shicon': {
        color: colour.navigation,
        font: font.navItemIcon,
        verticalAlign: 'top'
    },
    '>.text': {
        color: colour.white,
        paddingLeft: '1em'
    },
    '&.secondary': {
        font: font.navItem2,
        '>.shicon': {
            paddingLeft: '1em'
        }
    },
    '&.selected': {
        background: `linear-gradient(90deg, ${colour.sidebarSelected} 0.3em, ${colour.primary2} 0.3em)`,
        '>.shicon': {
            color: colour.white
        }
    }
});

@inject('appStore', 'componentStore')
@observer
class NavTree extends React.Component<StoreProps>
{
    public render()
    {
        const nodes = NAV_TREE_ITEMS
            .filter(node => !node.visible || node.visible(this.props.appStore));
        const currentPage = this.props.componentStore.currentPage;
        return (
            <nav css={navStyle}>
                <div css={navHeadingStyle}><MockUpSidebarHeading title="Navigation" /></div>
                <Scroll>
                    <div>
                        {nodes.map((node) => (
                            <div css={itemStyle} className={
                                classNames({
                                    secondary: !node.primary,
                                    selected: currentPage && currentPage.key === node.key
                                })}
                                key={node.key} onClick={() => this.props.componentStore.selectPage(node)}>
                                {lodash.isString(node.icon) ? <SHIcon icon={node.icon} title={node.title} />
                                    : node.icon
                                }
                                <span className="text">{node.title}</span>
                                {node.annotation && <span style={{ marginLeft: '16px' }}>{node.annotation}</span>}
                            </div>
                        ))}
                    </div>
                </Scroll>
            </nav>
        );
    }
}

export default NavTree;
