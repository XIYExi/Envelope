import React, { ReactText } from 'react';
import { Button } from 'antd';
import {
  baseFormDateTpl,
  baseFormMyRadioTpl,
  baseFormMyCheckboxTpl,
  baseFormMySelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormTextTipTpl,
  baseFormUnionType,
} from '../../type';
import styled from 'styled-components';

// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const PopoverBaseButton = styled(Button)`
  color: #fff;
  background-color: #4A4A4A;
`

const PopoverProButton = styled(PopoverBaseButton)`
  border-radius: 2px;
  line-height:0;
`


const BasePopoverForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <PopoverProButton
        onChange={() => onChange}
      >
        {label}
      </PopoverProButton>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <PopoverBaseButton onChange={() => onChange}>
        {label}
      </PopoverBaseButton>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <PopoverBaseButton onChange={() => onChange}>
        {label}
      </PopoverBaseButton>
    );
  },
  MyRadio: (props: baseFormMyRadioTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <PopoverBaseButton onChange={() => onChange}>
        {label}
      </PopoverBaseButton>
    );
  },
  MyCheckbox: (
    props: baseFormMyCheckboxTpl & { onChange: (v: Array<ReactText> | undefined) => void },
  ) => {
    const { label, onChange } = props;
    return (
      <div>
        <PopoverBaseButton onChange={() => onChange}>
          {label}
        </PopoverBaseButton>
      </div>
    );
  },
  Date: (props: baseFormDateTpl & { onChange: (v: Date) => void }) => {
    const { label, onChange } = props;
    return (
      <PopoverBaseButton onChange={() => onChange}>
        {label}
      </PopoverBaseButton>
    );
  },
  MySelect: (
    props: baseFormMySelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },
  ) => {
    const { label, onChange } = props;
    return (
      <PopoverBaseButton onChange={() => onChange}>
        {label}
      </PopoverBaseButton>
    );
  },
  MyTextTip: (props: baseFormTextTipTpl) => {
    const { label } = props;
    return (
      <PopoverProButton>
        {label}
      </PopoverProButton>
    );
  },
}

export default BasePopoverForm;

