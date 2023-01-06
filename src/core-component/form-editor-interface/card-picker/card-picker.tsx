import React, { FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICardPickerConfigType } from '@/core-component/type';
import { Icon, SemanticICONS } from 'semantic-ui-react';

// type对应icon的类型，这里设置为string，对应semantic ui Icon中所有的名字，不规范就不渲染
interface CardPickerType extends Omit<ICardPickerConfigType<SemanticICONS>, 'type' | 'key' | 'name'> {
  onChange?: (v: string) => void;
  type: SemanticICONS;
}

const CardPickerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  position: relative;
`

const Picker = styled.div<{ selected: boolean }>`
  display: inline-block;
  padding: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover {
    border-color: #4091f7;
  }
  border-color: ${props => props.selected ? '#4091f7' : '#fff'};
`

const SemanticIcon = styled(Icon)`
  size: 20px!important;
  color: #4091f7!important;
`


const CardPicker:FC<CardPickerType> = (props) => {
  const { type, icons, onChange } = props;

  const [selected, setSelected] = useState<string>(type);

  const handlePicker = (v: string) => {
    if (onChange){
      onChange(v);
      return;
    }
    setSelected(v);
  }

  useEffect(()=>{
    setSelected(type);
  },[type])

  return(
    <CardPickerWrapper>
      {
        icons.map((item, i) => {
          return(
            <Picker
              selected={selected === item}
              key={i}
              onClick={() => handlePicker(item)}
            >
              <SemanticIcon name={item} loading={false}/>
            </Picker>
          )
        })
      }
    </CardPickerWrapper>
  )

}

export default memo(CardPicker);

