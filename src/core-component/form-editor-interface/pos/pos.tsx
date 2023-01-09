import React, { FC, memo, useState } from 'react';
import { TPosItem, TPosType } from '../../type';
import styled from 'styled-components';
import { InputNumber } from 'antd';

interface PosProps {
  value?: TPosType;
  onChange?: (v: TPosItem | string) => void;
}

const PosSpan = styled.span`
  margin-right: 3px;
`

const PosItem = styled.div`
  margin-right: 10px;
`

const PosWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: -10px;
  padding: 0;
  position: relative;
`

const Pos:FC<PosProps> = (props: PosProps) => {

  const {
    value,
    onChange
  } = props;

  const [x,setX] = useState<any>(value && value[0]);
  const [y, setY] = useState<any>(value && value[1]);

  const handleChange = (index:number, v: TPosItem | string | null) => {
    let arr:any = value || [];
    arr[index] = v;
    if(index === 0)
      setX(v);
    else
      setY(v);
    onChange && onChange(arr);
  }

  return (
    <React.Fragment>
      <PosWrapper>
        <PosItem>
          <PosSpan>X: </PosSpan>
          <InputNumber value={x} defaultValue={x} onChange={(value)=>handleChange(0, value)} />
        </PosItem>

        <PosItem>
          <PosSpan>Y: </PosSpan>
          <InputNumber value={y} defaultValue={y} onChange={(value)=>handleChange(1, value)}/>
        </PosItem>
      </PosWrapper>
    </React.Fragment>
  )
}

export default memo(Pos);
