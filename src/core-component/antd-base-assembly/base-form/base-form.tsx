import { Input, Radio, Select, Checkbox, DatePicker, List, InputNumber, RadioChangeEvent } from 'antd';
import {
  baseFormDateTpl,
  baseFormMyCheckboxTpl,
  baseFormMyRadioTpl, baseFormMySelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl, baseFormTextTipTpl,
  baseFormTextTpl,
  baseFormUnionType,
} from '@/core-component/type';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { formatTime } from '@/core-utils/tool';


type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const RadioItem = styled(Radio)`
  margin-top: 10px;
`

const RadioTitle = styled.div`
  padding: 19px 14px;
`

const RadioWrapper = styled.div`
  margin-bottom: 10px;
`

const MyListItem = styled(List.Item)<{
  color: string;
  fontSize: number;
}>`
  color: ${props=>props.color};
  font-size: ${props=>props.fontSize};
`

const BaseForm: TBaseForm ={
  Text: (props: baseFormTextTpl & {onChange: (v: ChangeEvent<HTMLInputElement>)=>void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <>
        <List.Item title={label}>
          <Input allowClear type="text" placeholder={placeholder} onChange={onChange} />
        </List.Item>
      </>
    )
  },
  Textarea: (props: baseFormTextAreaTpl & {onChange: (v: ChangeEvent<HTMLTextAreaElement>)=>void}) => {
    const { label, placeholder, onChange } = props;
    return (
      <>
        <List.Item title={label}>
          <Input.TextArea
            placeholder={placeholder}
            onChange={onChange}
            autoSize={true}
            showCount={true}
            />
        </List.Item>
      </>
    )
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: number | string | null) => void} )=>{
    const { label, placeholder, onChange } = props;
    return(
      <>
        <InputNumber
          placeholder={placeholder}
          onChange={onChange}
          keyboard={true}
        />
      </>
    )
  },
  MyRadio: (props: baseFormMyRadioTpl & { onChange: (v: RadioChangeEvent) => void } ) => {
    const { label, options, onChange } = props;
    return(
      <>
        <RadioWrapper>
          <RadioTitle>{label}</RadioTitle>
          <List.Item>
            <Radio.Group onChange={onChange}>
              {
                options.map((item, i) => {
                  return (
                    <RadioItem value={item.value} key={i}>
                      {item.label}
                    </RadioItem>
                  );
                })
              }
            </Radio.Group>
          </List.Item>
        </RadioWrapper>
      </>
    )
  },
  MyCheckbox: (props: baseFormMyCheckboxTpl & {onChange: (v: CheckboxValueType[])=>void}) => {
    const {label, options, onChange} = props;
    return(
      <RadioWrapper>
        <RadioTitle>{label}</RadioTitle>
        <List.Item>
          <Checkbox.Group onChange={onChange}>
            {
              options.map((item, i) => {
                return (
                  <RadioItem value={item.value} key={i}>
                    {item.label}
                  </RadioItem>
                );
              })
            }
          </Checkbox.Group>
        </List.Item>
      </RadioWrapper>
    )
  },
  Date: (props: baseFormDateTpl & {onChange: (v: string)=>void})=>{
    const { label, placeholder, onChange } = props;
    const [value, setValue] = useState<any>('');
    const handleChange = (v: any) => {
      setValue(v);
      onChange && onChange(formatTime('yyyy-MM-dd', v));
    };
    const handleOk = () => {
      onChange && onChange(value);
    }
    return (
      <>
        <List.Item title={label}>
          <DatePicker
            placeholder={placeholder}
            mode="date"
            value={value}
            onChange={handleChange}
            onOk={handleOk}
          />
        </List.Item>
      </>
    );
  },
  MySelect: (props: baseFormMySelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },) => {
    const { label, options, onChange } = props;
    return (
      <>
        <List.Item title={label}>
          <Select options={options} onChange={onChange} />
        </List.Item>
      </>
    );
  },
  MyTextTip: (props: baseFormTextTipTpl) => {
    const { label, color, fontSize } = props;
    return (
      <>
        <MyListItem
          color={color}
          fontSize={fontSize}
          title={label}
        />
      </>
    );
  }
}

export default BaseForm;
