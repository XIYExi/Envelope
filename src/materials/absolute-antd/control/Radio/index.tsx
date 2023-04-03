import React, { FC, memo, useEffect, useState } from 'react';
import logo from '../../../../assets/absolute/Radio.svg';
import { IRadioConfig } from '@/materials/absolute-antd/control/Radio/schema';
import { Image, Radio, RadioChangeEvent } from 'antd';

/*begin to delete*/
interface IRadioProProps extends IRadioConfig {
  isTpl: boolean;
  onChange?: (e: Event) => void;
}
/*end to delete*/

const ARadio: FC<IRadioProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { type, buttonStyle, disabled, options, autoFocus } = restProps;

  const [arr, setArr] = useState<string[]>([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const arr: string[] = options.split('-');
    setArr(arr);
  }, [options]);

  const handleChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
    props.onChange && props.onChange(value);
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
          <Radio.Group
            buttonStyle={buttonStyle}
            disabled={disabled}
            onChange={(e) => handleChange(e)}
            value={value}
          >
            {type === 'default'
              ? arr.map((item, i) => (
                  <Radio value={i} key={i} autoFocus={autoFocus}>
                    {item}
                  </Radio>
                ))
              : arr.map((item, j) => (
                  <Radio.Button value={j} key={j} autoFocus={autoFocus}>
                    {item}
                  </Radio.Button>
                ))}
          </Radio.Group>
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(ARadio);
