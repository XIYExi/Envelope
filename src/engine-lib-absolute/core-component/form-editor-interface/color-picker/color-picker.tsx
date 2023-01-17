import React, { FC, useState } from 'react';
import { SketchPicker, ColorResult, RGBColor } from 'react-color';
import { rgba2Obj } from '../../../core-utils/tool';
import styled from 'styled-components';

export type ColorConfigType = string;


//value 初始值传来，onchange item给的回调
interface ColorProps {
  value?: ColorConfigType;
  onChange?: (v: ColorConfigType) => void;
}

const ColorShowerWrapper = styled.div`
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
  display: inline-block;
  cursor: pointer;
`

/**
 * 不可以使用color作为自定义属性名，因为会重名
 */
const ColorShower = styled.div<{ _color: RGBColor }>`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background: ${props => `rgba(${props._color.r}, ${props._color.g}, ${props._color.b}, ${props._color.a})`};
`

const ColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 999;
`

const ColorPickerCloser = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
`


const ColorPicker:FC<ColorProps> = (props: ColorProps) => {

  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<RGBColor>(rgba2Obj(props.value));

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  }

  const handleClose = () => {
    setDisplayColorPicker(false);
  }

  const handleChange = (color: ColorResult) => {
    setColor(color.rgb);
    props.onChange && props.onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
  }

  return(
    <React.Fragment>
      <div>
        <ColorShowerWrapper onClick={handleClick}>
          <ColorShower _color={color}/>
        </ColorShowerWrapper>
        {
          displayColorPicker ? (
            <React.Fragment>
              <ColorPickerWrapper>
                <SketchPicker color={color} onChange={handleChange} />
              </ColorPickerWrapper>
              <ColorPickerCloser onClick={handleClose}/>
            </React.Fragment>
          ) : null

        }
      </div>
    </React.Fragment>
  )

}

export default ColorPicker;
