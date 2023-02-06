import React, { FC, memo, useEffect } from 'react';
import { Input, Button, Popconfirm } from 'antd';
import { MinusCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { TMutiTextDefaultType } from '@/engine-lib-absolute/core-component/type';


interface MultiTextProps {
  onChange?: (v: TMutiTextDefaultType) => void;
  value?: TMutiTextDefaultType;
}


const MultiInputWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
`

const DeleteBtn = styled.span`
  margin-left: 12px;
  cursor: pointer;
  align-self: center;
`

const MultiTextWrapper = styled.div`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  padding: 0;
  position: relative;
`


const MultiText:FC<MultiTextProps> = (props) => {

  const { value, onChange } = props;

  const handleAdd = () => {
    onChange && onChange([...value!, '新增项目']);
  };

  const handleDel = (index: number) => {
    let newList = value!.filter((_item, i) => i !== index);
    onChange && onChange(newList);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let newList = value!.map((item, i) => (i === index ? e.target.value : item));
    onChange && onChange(newList);
  };

  useEffect(() => {
    // @ts-ignore
    window['currentCates'] = value!;
    return () => {
      // @ts-ignore
      window['currentCates'] = null;
    };
  }, [value]);

  return (
    <MultiTextWrapper>
      {value && value.length ? (
        value!.map((item, i) => {
          return (
            <MultiInputWrapper key={i}>
              <Input defaultValue={item} onChange={e => handleChange(i, e)} />
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={() => handleDel(i)}
                placement="leftTop"
                okText="确定"
                cancelText="取消"
              >
                <DeleteBtn>
                  <MinusCircleFilled />
                </DeleteBtn>
              </Popconfirm>
            </MultiInputWrapper>
          );
        })
      ) : (
        <MultiInputWrapper>
          <Input />
        </MultiInputWrapper>
      )}
      {
        value && value.length < 3 && (
          <MultiInputWrapper>
            <Button block onClick={handleAdd}>
              添加项目
            </Button>
          </MultiInputWrapper>
        )
      }
    </MultiTextWrapper>
  );
}

export default memo(MultiText);
