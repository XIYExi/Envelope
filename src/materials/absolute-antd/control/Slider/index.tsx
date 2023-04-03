import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Silder.svg';
import { ISlideConfig } from '@/materials/absolute-antd/control/Slider/schema';
import { Image, Slider } from 'antd';

/*begin to delete*/
interface ISlideProProps extends ISlideConfig {
  isTpl: boolean;
  onChange?: (e: any) => void;
}
/*end to delete*/

const ASlider: FC<ISlideProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    allowClear,
    defaultValue,
    disabled,
    dots,
    included,
    marks = '0-26-37-80',
    min,
    max,
    range,
    reverse,
    step,
  } = restProps;

  const [value, setValue] = useState<number | [number, number]>();
  const [mark, setMark] = useState<{ [key: number]: string }>();

  useEffect(() => {
    if (!range) {
      setValue(defaultValue[0]);
    } else {
      // @ts-ignore
      setValue([defaultValue[0], defaultValue[1]]);
    }
  }, [range, defaultValue]);

  const handleChange = useCallback((e: any) => {
    //console.log(e)
    setValue(e);
    props.onChange && props.onChange(e);
  }, []);

  useEffect(() => {
    const arr = marks.split('-');
    let json: { [key: number]: string } = {};

    arr.map((item, i) => {
      json[Number(item)] = item;
    });

    //console.log(json)
    setMark(json);
  }, [marks]);

  // @ts-ignore
  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={''} />
        </div>
      )}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Slider
            value={value}
            disabled={disabled}
            dots={dots}
            included={included}
            marks={mark}
            min={min}
            max={max}
            range={range}
            reverse={reverse}
            step={step === 0 ? null : step}
            onChange={handleChange}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(ASlider);
