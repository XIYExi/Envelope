import React, { FC, memo, useEffect, useState } from 'react';
import { Select, Image, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import * as Icon from '@ant-design/icons';
import logo from '../../../../assets/absolute/Select.svg';
import { ISelectConfig } from '@/materials/absolute-antd/control/Select/schema';

const { Option } = Select;

interface ISelectProProps extends ISelectConfig {
  isTpl: boolean;
  onChange?: (e: any) => void;
}

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const colors = [
    { value: 'gold' },
    { value: 'lime' },
    { value: 'green' },
    { value: 'cyan' },
  ];
  const [color, setColor] = useState(
    Math.floor(Math.random() * (3 - 0 + 1)) + 0,
  );

  return (
    <Tag
      color={colors[color].value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const ASelect: FC<ISelectProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    options,
    allowClear,
    autoFocus,
    bordered,
    clearIcon,
    defaultActiveFirstOption,
    defaultOpen,
    disabled,
    listHeight,
    loading,
    maxTagCount,
    maxTagPlaceholder,
    maxTagTextLength,
    mode,
    placeholder,
    placement,
    showArrow,
    showSearch,
    suffixIcon,
    virtual,
  } = restProps;

  const [option, setOption] = useState<string[]>([]);
  const [value, setValue] = useState<any>();

  useEffect(() => {
    const arr = options.split('-');
    setOption(arr);
    console.log(arr);
  }, [options]);

  const handleChange = (e: string[]) => {
    // console.log(`selected ${e}`);
    setValue(e);
    props.onChange && props.onChange(e);
  };

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={''} />
        </div>
      )}
      {!isTpl && (
        <div>
          <Select
            value={value}
            tagRender={tagRender}
            style={{ width: '100%' }}
            placeholder={placeholder}
            placement={placement}
            mode={mode}
            allowClear={allowClear}
            autoFocus={autoFocus}
            // @ts-ignore
            clearIcon={React.createElement(Icon[clearIcon])}
            bordered={bordered}
            defaultActiveFirstOption={defaultActiveFirstOption}
            defaultOpen={defaultOpen}
            disabled={disabled}
            listHeight={listHeight}
            loading={loading}
            maxTagTextLength={maxTagTextLength}
            maxTagCount={maxTagCount}
            maxTagPlaceholder={maxTagPlaceholder}
            showArrow={showArrow}
            showSearch={showSearch}
            // @ts-ignore
            suffixIcon={React.createElement(Icon[suffixIcon])}
            virtual={virtual}
            onChange={handleChange}
          >
            {option.map((item, i) => (
              <Option value={item} label={item} key={i}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </React.Fragment>
  );
};
export default memo(ASelect);
