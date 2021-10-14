import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import {background, font, form} from 'main/application/ThemeConstants';
import Button from 'main/component/Button';
import ProgramIcon from 'main/component/ProgramIcon';
import ButtonBar from 'main/container/ButtonBar';
import ModalDialog from 'main/container/ModalDialog';
import Scroll from 'main/container/Scroll';
import TabPane, {Tab} from 'main/container/TabPane';
import StoreProps from 'main/store/StoreProps';
import {grid, px} from 'main/utility/StyleUtility';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import React from 'react';
import NewServiceMenuItem from 'smarthealth-javascript/NewServiceMenuItem';
import MENU from 'smarthealth-rest-test/newservicemenu.json';
import TextMother from 'test/data/TextMother';

/**
 * Dialog to allow selection of service type to create
 *
 * @author Larry 23/11/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const contentStyle = css({
    minWidth: '600px',
    maxWidth: '80vw',
    minHeight: '400px',
    maxHeight: '80vh',
    ...grid(null, `1fr ${form.buttonBarHeight}`),
    padding: px(8, 16, 0),
    backgroundColor: background.main
});

const tableStyle = css({
    font: font.text,
    border: form.border,
    tr: {
        ':nth-of-type(even)': {
            backgroundColor: background.gridRow
        },
        ':nth-of-type(odd)': {
            backgroundColor: background.white
        }
    }
});

@inject('componentStore', 'sessionStore')
@observer
class MockUpNewServiceDialog extends React.Component<StoreProps>
{
    private items: NewServiceMenuItem[];

    @observable
    private selectedItems: NewServiceMenuItem[] = [];

    constructor(props)
    {
        super(props);
        this.items = MENU as NewServiceMenuItem[];
        this.setIDs(this.items, '');
    }

    private buildCategoryTabs(): Tab[]
    {
        return this.items.map(item =>
        {
            return { title: this.renderTabTitleWithProgram(item), content: this.renderTabContent(item) };
        });
    }

    // @ts-ignore
    private isSelected(item: NewServiceMenuItem): boolean
    {
        return this.selectedItems.some(selectedItem => selectedItem['id'] === item['id']);
    }

    @autobind
    private onCancel()
    {
        this.props.componentStore.modalDialog.close();
    }

    @autobind
    private onCreate(item: NewServiceMenuItem)
    {
        this.props.componentStore.modalDialog.close();
        if (item.action)
        {
            this.props.componentStore.message.todo(`Run action ${item.action}`);
        }
        else
        {
            this.props.componentStore.message.todo(`Create ${item.name}`);
        }
    }

    public render(): React.ReactNode
    {
        return (
            <ModalDialog heading="New Service Record">
                <div css={contentStyle}>
                    <TabPane tabs={this.buildCategoryTabs()} />
                    <ButtonBar>
                        <Button title="Cancel" onClick={this.onCancel} />
                    </ButtonBar>
                </div>
            </ModalDialog>
        );
    }

    @autobind
    private renderTabContent(parent: NewServiceMenuItem)
    {
        if (!parent.children)
        {
            return '(Empty)';
        }

        if (parent.children[0].children)
        {
            const tabs: Tab[] = parent.children.map(item =>
            {
                return { title: item.name, content: this.renderTabContent(item) };
            });
            return (
                <div style={{ ...grid(), border: form.border, padding: px(8, 8, 0) }}>
                    <TabPane tabs={tabs} />
                </div>
            );
        }
        else
        {
            return (
                <Scroll>
                    <table css={tableStyle}>
                        {parent.children.map(item =>
                        {
                            return (
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap' }}>{item.name}</td>
                                    <td>{item['description']}</td>
                                    <td><Button title="Create" small onClick={() => this.onCreate(item)}
                                        tooltip={`Create ${item.name}`} />
                                    </td>
                                </tr>
                            )
                                ;
                        })}
                    </table>
                </Scroll>
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

export default MockUpNewServiceDialog;
