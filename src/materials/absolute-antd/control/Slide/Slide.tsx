import React, {FC, memo} from 'react';
import logo from '../../../../assets/absolute/Silder.svg';
import { ISlideConfig } from '@/materials/absolute-antd/control/Slide/schema';

interface ISlideProProps extends ISlideConfig {
  isTpl: boolean;
  onChange?: (e:any)=>void;
}

const ASlide:FC<ISlideProProps> = (props) => {

  const {
    allowClear,
    defaultValue,
    disabled,
    dots,
    included,
    marks,
    min,
    max,
    range,
    reverse,
    step,
    isTpl
  } = props;


  return (
    <React.Fragment>

    </React.Fragment>
  )
}

export default memo(ASlide);
