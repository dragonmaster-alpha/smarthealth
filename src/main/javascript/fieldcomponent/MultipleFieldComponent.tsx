import {css} from '@emotion/core';
import {autobind} from 'core-decorators';
import lodash from 'lodash';
import {colour} from 'main/application/ThemeConstants';
import Chip from 'main/component/Chip';
import BaseFieldComponent, {BaseFieldComponentProps} from 'main/fieldcomponent/BaseFieldComponent';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {px} from 'main/utility/StyleUtility';
import {observer} from 'mobx-react';
import React from 'react';

/**
 * Field component to allow display and removal of multiple values.
 *
 * @author Larry 29/12/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
interface MultipleFieldComponentProps extends BaseFieldComponentProps
{
    renderValue?: (value) => string;
}

const multipleContentStyle = css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px 8px',
    minHeight: '17px',
    minWidth: '100px',
    padding: px(1, 0)
});

const requiredStyle = css({
    color: colour.placeholder
});

@observer
class MultipleFieldComponent extends BaseFieldComponent<MultipleFieldComponentProps>
{
    private buildChips()
    {
        if (lodash.isNil(this.props.value))
        {
            return this.buildMandatoryChip();
        }
        else if (lodash.isArray(this.props.value))
        {
            if (this.props.value.length === 0)
            {
                return this.buildMandatoryChip();
            }
            else
            {
                const chips = this.props.value.map(item =>
                    <Chip text={this.renderValue(item)} onClose={() => this.onChipClose(item)}
                        disabled={this.readOnly} />
                );
                return chips;
            }
        }
        else
        {
            throw new ShouldNeverGetHereError();
        }
    }

    private buildMandatoryChip()
    {
        return this.mandatory ? <span css={requiredStyle}>Required</span> : null;
    }

    @autobind
    private onChipClose(item)
    {
        if (lodash.isArray(this.props.value))
        {
            const value = this.props.value.filter(entry => entry !== item);
            this.props.onValueChange((value.length > 0) ? value : null);
        }
    }

    public render(): React.ReactNode
    {
        return <span css={multipleContentStyle}>{this.buildChips()}</span>;
    }

    private renderValue(value): string
    {
        if (this.props.renderValue)
        {
            return this.props.renderValue(value);
        }
        else if (lodash.isString(value))
        {
            return value;
        }
        else
        {
            return 'Cannot render object!';
        }
    }
}

export default MultipleFieldComponent;
