import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, field, font, form} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ProgramIcon from 'main/component/ProgramIcon';
import ButtonBar from 'main/container/ButtonBar';
import ModalDialog from 'main/container/ModalDialog';
import Scroll from 'main/container/Scroll';
import TabPane, {Tab} from 'main/container/TabPane';
import StoreProps from 'main/store/StoreProps';
import {grid, px} from 'main/utility/StyleUtility';
import {observable, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import React, {ReactNode} from 'react';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';
import TextMother from 'test/data/TextMother';

/**
 * Select a service record type to create
 *
 * @author Larry 31/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
const contentStyle = css({
    minWidth: '800px',
    maxWidth: '80vw',
    minHeight: '400px',
    maxHeight: '80vh',
    ...grid(null, `1fr ${form.buttonBarHeight}`),
    padding: px(8, 16, 0),
    backgroundColor: background.main
});

const innerTabsStyle = css({
    border: form.border,
    ...grid()
});

const tableBorderStyle = css({
    border: form.border,
    ...grid()
});

const tableStyle = css({
    borderCollapse: 'separate',
    borderSpacing: 0,
    font: font.text,
    width: '100%',
    tbody: {
        tr: {
            ':nth-of-type(even)': {
                backgroundColor: background.gridRow
            },
            ':nth-of-type(odd)': {
                backgroundColor: background.white,
                td: {
                    borderRight: field.border
                }
            },
            td: {
                padding: px(2, 6),
                ':first-of-type': {
                    whiteSpace: 'nowrap'
                },
                ':last-of-type': {
                    borderRight: 'none',
                    textAlign: 'right'
                }
            }
        }
    }
});

@inject('appStore', 'componentStore')
@observer
class NewServiceDialog extends React.Component<StoreProps>
{
    @observable
    private items: NewServiceMenuItem[];

    public componentDidMount()
    {
        this.props.appStore.handlers.serviceRecordHandler.getMenuItems()
            .then(items => runInAction(() => this.items = items));
    }

    @autobind
    private onCancel()
    {
        this.props.componentStore.modalDialog.close();
    }

    @autobind
    private async onCreate(item: NewServiceMenuItem)
    {
        if (item.action)
        {
            this.props.componentStore.message.todo(`Run action ${item.action}`);
        }
        else
        {
            const serviceType = await this.props.appStore.entityCache.serviceTypes.load(item.serviceType.serviceTypeID);
            const serviceTypeProgramSpecific = {
                ...serviceType,
                program: item.program
            };
            await this.props.appStore.actionStore.createNewService(serviceTypeProgramSpecific);
        }
        this.props.componentStore.modalDialog.close();
    }

    public render(): ReactNode
    {
        const tabs = this.items && this.items.map(item =>
        {
            return { title: this.renderTabTitleWithProgram(item), content: this.renderTabContent(item.children) };
        });

        return (
            <ModalDialog heading="New Service Record">
                <div css={contentStyle}>
                    {
                        this.items ?
                            <TabPane tabs={tabs} /> :
                            'Loading...'
                    }
                    <ButtonBar>
                        <Button title="Cancel" onClick={this.onCancel} />
                    </ButtonBar>
                </div>
            </ModalDialog>
        );
    }

    @autobind
    private renderTabContent(items: NewServiceMenuItem[])
    {
        if (!items)
        {
            return '(Empty)';
        }

        if (items[0].children)
        {
            const tabs: Tab[] = items.map(item =>
            {
                return { title: item.name, content: this.renderTabContent(item.children) };
            });
            return (
                <div css={innerTabsStyle}>
                    <TabPane tabs={tabs} tabBarPadding={px(8, 8, 0)} />
                </div>
            );
        }
        else
        {
            return (
                <div css={tableBorderStyle}>
                    <Scroll>
                        <table css={tableStyle}>
                            <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item['description']}</td>
                                    <td>
                                        <Button title="Create" small onClick={() => this.onCreate(item)}
                                            tooltip={`Create ${item.name}`} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Scroll>
                </div>
            );
        }
    }

    private renderTabTitleWithProgram(item: NewServiceMenuItem): React.ReactNode
    {
        if (item.program)
        {
            return <span><ProgramIcon program={item.program} /> {item.name}</span>;
        }
        else
        {
            return item.name;
        }
    }

    private setIDs(items: NewServiceMenuItem[], prefix: string)
    {
        items.forEach((item, i) =>
        {
            item['id'] = `${prefix}${i}`;
            if (!item.description)
            {
                item.description = `Generated: ${TextMother.text(100)}`;
            }
            if (item.children)
            {
                this.setIDs(item.children, `${prefix}${i}.`);
            }
        });
    }
}

export default NewServiceDialog;
